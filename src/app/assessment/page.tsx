"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Sparkles, Brain, ArrowRight, Rocket } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface AIQuestion {
  id: number;
  question: string;
  choices: string[];
}

function AssessmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedRole = searchParams.get('role');
  
  // State Management
  const [questions, setQuestions] = useState<AIQuestion[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasFetched = useRef(false);

  // Correct Official Generation Function (Safe Local Initialization)
  const handleGenerateQuestions = async () => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("API Key is missing");
      setError("API Key Error: Pastikan NEXT_PUBLIC_GEMINI_API_KEY sudah benar di .env.local.");
      setIsGenerating(false);
      return;
    }
    
    try {
      setError(null);
      setIsGenerating(true);
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });
      
      const randomSeed = `[RANDOM SEED: ${Date.now()} - ${Math.random()}]`;
      let promptText = '';
      
      if (selectedRole) {
        // SPECIFIC ROLE PROMPT
        promptText = `${randomSeed} Generate 5 COMPLETELY NEW AND UNIQUE situational/technical assessment questions in Indonesian specifically for a ${selectedRole}. The questions should test their specific knowledge and problem-solving skills in this exact field. Each question must have 4 distinct choices (only one is the best/correct approach, but make all sound plausible). Return strictly in this JSON array schema: [{"id": 1, "question": "...", "choices": ["...", "...", "...", "..."]}]`;
      } else {
        // GENERAL CONFUSED PROMPT
        promptText = `${randomSeed} Generate 5 COMPLETELY NEW AND UNIQUE engaging career assessment questions in Indonesian for someone confused about their tech/business career path. 

Each question must have exactly 3 subtle options that naturally reflect the psychological work styles and preferences of these 3 distinct career paths (without explicitly naming the career options inside the choices text):
- One option must subtly test for logical problem-solving, coding, architecture, and building systems (Software Engineer)
- One option must subtly test for visual creativity, layout, user experience, and design aesthetics (Graphic Designer)
- One option must subtly test for communication, business growth, strategy, monetization, and marketing (Digital Marketing)

Return strictly in this JSON array schema: [{"id": 1, "question": "...", "choices": ["...", "...", "..."]}]`;
      }
      
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: promptText }] }],
        generationConfig: {
          responseMimeType: "application/json",
        }
      });
      const response = await result.response;
      const textResponse = response.text();
      
      // Robust JSON Extraction
      const jsonMatch = textResponse.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error("Invalid AI response: No JSON array found.");
      }

      const parsedQuestions = JSON.parse(jsonMatch[0]);
      
      setError(null);
      setQuestions(parsedQuestions);
    } catch (err) {
      console.error("JSON Parsing/Generation Error:", err);
      setError("Gagal memuat pertanyaan kuis. Silakan coba lagi atau cek koneksi Anda.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Execution Guard: Trigger safely on mount
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      handleGenerateQuestions();
    }
  }, []);

  // Handle Option Selection
  const handleOptionClick = (choice: string) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentStep] = choice;
    setUserAnswers(updatedAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Phase 2: AI Analytics & Evaluation
  const submitAssessment = async () => {
    // Fast track logic: Skip AI analysis if role already selected
    if (selectedRole) {
      localStorage.setItem('userArchetype', selectedRole);
      router.push("/gap-analysis");
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) return;

    try {
      setIsAnalyzing(true);
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

      const analyticsPrompt = `Berdasarkan jawaban kuis berikut: ${JSON.stringify(userAnswers)}, analisis kecenderungan pola pikir dan gaya kerja user. Kembalikan HANYA SATU dari 3 string ini yang paling cocok, tanpa tanda kutip, tanpa titik, dan tanpa teks tambahan apapun: "Digital Marketing", "Software Engineer", atau "Graphic Designer".`;

      const result = await model.generateContent(analyticsPrompt);
      const response = await result.response;
      const aiResult = response.text().trim();
      const cleanRole = aiResult.replace(/['".]/g, '');

      localStorage.setItem("userArchetype", cleanRole);
      router.push("/gap-analysis");
    } catch (err) {
      console.error("AI Analysis Error:", err);
      setError("Gagal menganalisis hasil kuis. Silakan coba lagi.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // UI Rendering Logic (Simplified for brevity)
  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-red-500 font-bold mb-4 text-2xl">Error Detected</h2>
        <p className="text-gray-500 mb-8 max-w-md">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline" className="rounded-full px-8 border-gray-200">
          Try Again
        </Button>
      </div>
    );
  }

  if (isGenerating || questions.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-primary/10 blur-3xl rounded-full" />
          <div className="relative w-24 h-24 rounded-3xl bg-linear-to-br from-brand-primary to-brand-secondary flex items-center justify-center animate-pulse shadow-xl">
            <Brain className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black tracking-tighter text-gray-900">AI is crafting your path...</h2>
          <p className="text-gray-400 font-medium">Generating unique situational questions for you.</p>
        </div>
        <div className="w-64">
           <Progress value={45} className="h-1 bg-gray-100" />
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-primary/10 blur-3xl rounded-full" />
          <div className="relative w-24 h-24 rounded-3xl bg-linear-to-br from-brand-secondary to-brand-primary flex items-center justify-center animate-spin-slow shadow-xl">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black tracking-tighter text-gray-900">Analyzing DNA...</h2>
          <p className="text-gray-400 font-medium">Mapping your choices to industry archetypes.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-brand-primary/10">
      <Navbar subtitle={selectedRole ? `${selectedRole} Test` : "AI Assessment"} />
      
      <main className="max-w-4xl mx-auto px-8 py-24">
        {/* Progress Bar */}
        <div className="mb-16 space-y-6">
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            <div className="flex items-center gap-4">
              <span className="text-brand-primary">Module 01</span>
              <span>Step {currentStep + 1} of {questions.length}</span>
            </div>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="relative h-1 w-full bg-gray-100 rounded-full overflow-hidden">
             <div 
               className="absolute top-0 left-0 h-full bg-linear-to-r from-brand-primary to-brand-secondary transition-all duration-700 ease-out"
               style={{ width: `${progress}%` }}
             />
          </div>
        </div>

        {/* Question Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-brand-primary/5 to-brand-secondary/5 rounded-[48px] blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
          <div className="relative p-12 rounded-[48px] border border-gray-100 bg-gray-50/50 backdrop-blur-xl shadow-sm">
            <div className="flex items-start gap-8 mb-12">
              <div className="space-y-4">
                 <h3 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight text-gray-900">
                   {currentQuestion.question}
                 </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {currentQuestion.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(choice)}
                  className={`group/choice relative p-6 rounded-3xl border transition-all duration-500 text-left
                    ${userAnswers[currentStep] === choice 
                      ? "bg-brand-primary/5 border-brand-primary shadow-sm" 
                      : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-base font-bold transition-colors ${userAnswers[currentStep] === choice ? "text-brand-primary" : "text-gray-600 group-hover/choice:text-gray-900"}`}>
                      {choice}
                    </span>
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-500
                      ${userAnswers[currentStep] === choice 
                        ? "bg-brand-primary border-brand-primary shadow-lg" 
                        : "border-gray-100 group-hover/choice:border-brand-primary/50 bg-gray-50"}`}>
                      {userAnswers[currentStep] === choice ? (
                        <CheckIcon className="w-5 h-5 text-white" />
                      ) : (
                        <ArrowRight className="w-5 h-5 text-gray-200 group-hover/choice:text-brand-primary transition-colors" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <button 
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-0"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          
          {currentStep === questions.length - 1 && userAnswers[currentStep] && (
            <Button 
              onClick={submitAssessment}
              className="px-10 py-6 rounded-full bg-linear-to-r from-brand-primary to-brand-secondary text-white font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-xl shadow-brand-primary/20 border-none"
            >
              Finish Assessment 
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function AssessmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><h2 className="text-gray-900 font-bold uppercase tracking-widest">Loading Assessment...</h2></div>}>
      <AssessmentContent />
    </Suspense>
  );
}
