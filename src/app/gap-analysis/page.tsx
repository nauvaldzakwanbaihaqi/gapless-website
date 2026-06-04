"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";
import { 
  Brain, 
  Sparkles, 
  Rocket, 
  ChevronRight, 
  Target, 
  ShieldAlert, 
  Award, 
  BarChart3, 
  Zap,
  Users,
  Compass
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface SkillData {
  skill: string;
  current: number;
  target: number;
}

function GapAnalysisContent() {
  const router = useRouter();
  const [chartData, setChartData] = useState<SkillData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeRole, setActiveRole] = useState<string>("");

  const hasFetched = useRef(false);

  const fetchSkillGap = async () => {
    const role = localStorage.getItem("userArchetype") || "Software Engineer";
    setActiveRole(role);
    
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      setError("API Key missing. Please check your configuration.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

      const promptText = `[RANDOM SEED: ${Date.now()}] You are an expert career assessor. The user's identified role is "${role}". 
Generate exactly 6 critical core skills that define this role. For each skill, generate a realistic 'current' proficiency score (between 40 to 65 to show they have potential but are not yet experts) and a 'target' required score (between 85 to 100) to represent industry mastery. 

Return ONLY a valid, minified JSON array:
[{"skill": "Skill Name", "current": 55, "target": 90}]`;

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: promptText }] }],
        generationConfig: {
          responseMimeType: "application/json",
        }
      });
      
      const textResponse = await result.response.text();
      const jsonMatch = textResponse.match(/\[[\s\S]*\]/);
      
      if (!jsonMatch) {
        throw new Error("Invalid AI response: No JSON array found.");
      }

      const parsedData = JSON.parse(jsonMatch[0]);
      setChartData(parsedData);
    } catch (err) {
      console.error("Gap Analysis AI Error:", err);
      setError("Gagal menghasilkan analisis gap. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchSkillGap();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-primary/10 blur-3xl rounded-full" />
          <div className="relative w-24 h-24 rounded-3xl bg-linear-to-br from-brand-primary to-brand-secondary flex items-center justify-center animate-pulse shadow-xl">
            <Brain className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black tracking-tighter text-gray-900 animate-pulse">
            Calculating {activeRole} DNA...
          </h2>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-[10px]">Mapping your behavior to industry benchmarks</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-brand-primary/10 pb-32">
      <Navbar subtitle="Archetype Analysis" />
      
      <main className="max-w-7xl mx-auto px-8 py-16 space-y-24">
        
        {/* Top Hero: The Role Identification */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-brand-primary/5 border border-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em]">
              <Zap className="w-4 h-4" /> Identification Complete
            </div>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] text-gray-900">
              Your Archetype: <br/>
              <span className="bg-clip-text text-transparent bg-linear-to-r from-brand-primary to-brand-secondary">
                {activeRole}
              </span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed font-medium">
              Berdasarkan pola perilakumu, kamu memiliki kecenderungan alami yang sangat kuat untuk berkembang sebagai <span className="text-gray-900 font-bold">{activeRole}</span>.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 rounded-[32px] bg-gray-50 border border-gray-100 space-y-2">
                  <div className="text-brand-primary font-black text-2xl tracking-tighter">88%</div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Natural Match</div>
               </div>
               <div className="p-6 rounded-[32px] bg-gray-50 border border-gray-100 space-y-2">
                  <div className="text-gray-900 font-black text-2xl tracking-tighter">Top 5%</div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Potential Tier</div>
               </div>
            </div>
          </div>

          {/* Spider Chart Visual */}
          <div className="lg:col-span-7 relative h-[600px] group">
            <div className="absolute inset-0 bg-brand-primary/5 blur-[120px] rounded-full animate-pulse" />
            <div className="relative h-full w-full p-8 rounded-[48px] border border-gray-100 bg-white shadow-2xl">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart 
                  cx="50%" 
                  cy="50%" 
                  outerRadius="65%" 
                  margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                  data={chartData}
                >
                  <PolarGrid stroke="#00000010" strokeDasharray="3 3" />
                  <PolarAngleAxis 
                    dataKey="skill" 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: '700' }} 
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Your Potential"
                    dataKey="current"
                    stroke="#0066FF"
                    strokeWidth={3}
                    fill="#0066FF"
                    fillOpacity={0.4}
                  />
                  <Radar
                    name="Industry Master"
                    dataKey="target"
                    stroke="#e2e8f0"
                    strokeWidth={1}
                    fill="#f1f5f9"
                    fillOpacity={0.3}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', fontSize: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                    itemStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(0,102,255,0.4)]" />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Your DNA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gray-200 border border-gray-300" />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Goal</span>
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Archetype Details - New Section */}
        <section className="space-y-12">
           <div className="flex items-end justify-between border-b border-gray-100 pb-8">
              <div className="space-y-2">
                <h2 className="text-4xl font-black tracking-tighter text-gray-900">Industry Archetype</h2>
                <p className="text-gray-500 font-medium">Deep dive into your professional personality metrics.</p>
              </div>
              <div className="hidden md:block h-px flex-1 mx-12 bg-gray-100" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Skill Mapping */}
              <div className="p-10 rounded-[48px] border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all group">
                <div className="w-16 h-16 rounded-3xl bg-brand-primary/5 flex items-center justify-center mb-8 border border-brand-primary/10 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-8 h-8 text-brand-primary" />
                </div>
                <h3 className="text-2xl font-black tracking-tighter mb-4 text-gray-900">Skill Mapping</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                  Visualisasi detail tentang bagaimana skill set kamu saat ini dibandingkan dengan kebutuhan industri global.
                </p>
                <div className="space-y-3">
                  {chartData.slice(0, 3).map((s, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase">
                        <span>{s.skill}</span>
                        <span className="text-gray-700">{s.current}%</span>
                      </div>
                      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-primary" style={{ width: `${s.current}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Career Path */}
              <div className="p-10 rounded-[48px] border border-brand-primary/20 bg-brand-primary/5 relative overflow-hidden group hover:shadow-xl transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-[60px] -translate-y-1/2 translate-x-1/2" />
                <div className="w-16 h-16 rounded-3xl bg-brand-primary flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black tracking-tighter mb-4 text-gray-900">Career Velocity</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                  Estimasi kecepatan karirmu berdasarkan kesiapan fundamental. Kamu berada di jalur akselerasi tinggi.
                </p>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                   <Award className="w-6 h-6 text-brand-primary" />
                   <div>
                      <div className="text-xs font-black text-gray-900 uppercase tracking-widest">Level 01</div>
                      <div className="text-[10px] text-gray-400 font-medium">Ready for Junior Role</div>
                   </div>
                </div>
              </div>

              {/* Card 3: Community & Network */}
              <div className="p-10 rounded-[48px] border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all group">
                <div className="w-16 h-16 rounded-3xl bg-gray-100 flex items-center justify-center mb-8 border border-gray-200 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-2xl font-black tracking-tighter mb-4 text-gray-900">Network Fit</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                  Koneksi terbaik untuk pertumbuhanmu adalah praktisi di bidang <span className="text-gray-900 font-bold">{activeRole}</span>.
                </p>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center overflow-hidden">
                       <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-[10px] font-black text-gray-400">
                    +2k
                  </div>
                </div>
              </div>
           </div>
        </section>

        {/* Final CTA */}
        <section className="relative p-16 rounded-[64px] bg-gray-50 border border-gray-100 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-brand-primary to-transparent" />
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <Compass className="w-4 h-4" /> Next Step: Implementation
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-gray-900">
              Ready to build your <br/><span className="text-brand-primary">professional roadmap?</span>
            </h2>
            <p className="text-lg text-gray-500 font-medium">
              Kami telah menyusun kurikulum belajar yang paling efisien untuk membantumu menutup gap skill dan mencapai target <span className="text-gray-900 font-bold">{activeRole}</span>.
            </p>
            <Button 
              onClick={() => router.push("/roadmap")}
              className="px-16 py-8 rounded-[32px] bg-brand-primary text-white hover:bg-brand-primary/90 text-xl font-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-brand-primary/20 border-none"
            >
              Generate My Roadmap <ChevronRight className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </section>

      </main>
    </div>
  );
}

export default function GapAnalysisPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><h2 className="text-gray-900 uppercase font-black tracking-[0.5em] animate-pulse">Initializing Analysis...</h2></div>}>
      <GapAnalysisContent />
    </Suspense>
  );
}
