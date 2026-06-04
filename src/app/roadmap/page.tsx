"use client";

import React, { useState, useEffect } from "react";
import { Lock, Sparkles, ChevronDown, ChevronRight, Check, Rocket, BookOpen, Target, Search, Award, Users, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { roadmapData, LearningItem } from "./courseData";

export default function RoadmapPage() {
  const router = useRouter();
  
  // Strict State setup as requested previously
  const [archetype, setArchetype] = useState<string>("Hacker");
  const [userTier, setUserTier] = useState<string>("free");
  const [completedSkills, setCompletedSkills] = useState<string[]>([]);
  const [isBeginnerOpen, setIsBeginnerOpen] = useState(true);
  const [isIntermediateOpen, setIsIntermediateOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedArchetype = localStorage.getItem("userArchetype");
      const savedTier = localStorage.getItem("userTier");
      if (savedArchetype) setArchetype(savedArchetype);
      if (savedTier) setUserTier(savedTier);
    }
  }, []);

  const roleToDataKey: Record<string, string> = {
    "software engineer": "Hacker",
    "software engineering": "Hacker",
    "hacker": "Hacker",
    "graphic designer": "Hipster",
    "hipster": "Hipster",
    "digital marketing": "Hustler",
    "hustler": "Hustler",
    "data analyst": "Hound",
    "hound": "Hound"
  };

  const dataKey = roleToDataKey[archetype.toLowerCase()] || "Hacker";
  const currentContent = roadmapData[dataKey] || roadmapData["Hacker"];

  // Logic for unlocking intermediate tier
  const requiredSkills = currentContent.beginner.skillMapping.map(item => item.title);
  const isBeginnerCompleted = requiredSkills.length > 0 && requiredSkills.every(skill => completedSkills.includes(skill));
  const isIntermediateUnlocked = userTier === "pro" || isBeginnerCompleted;

  const toggleSkill = (skill: string) => {
    setCompletedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const renderListSection = (title: string, items: LearningItem[], icon: React.ReactElement<{ className?: string }>, isIntermediate: boolean = false) => (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-brand-primary/5 flex items-center justify-center text-brand-primary border border-brand-primary/10">
          {React.cloneElement(icon, { className: "w-4 h-4" })}
        </div>
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{title}</h4>
        {isIntermediate && title === "Industry Certification" && (
           <span className="ml-2 px-2 py-0.5 rounded text-[8px] font-black bg-gray-50 border border-gray-100 text-gray-400 uppercase tracking-widest">Pending Verification</span>
        )}
      </div>
      <div className="space-y-4">
        {items.map((item) => {
          const active = completedSkills.includes(item.title);
          return (
            <div key={item.title} className="space-y-2">
                <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleSkill(item.title);
                }}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left group/item
                    ${active 
                    ? "bg-brand-primary/5 border-brand-primary shadow-sm" 
                    : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                    }`}
                >
                <span className={`text-[11px] font-bold leading-relaxed transition-colors ${active ? "text-brand-primary" : "text-gray-500 group-hover/item:text-gray-900"}`}>
                    {item.title}
                </span>
                <div className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center border transition-all duration-300
                    ${active ? "bg-brand-primary border-brand-primary shadow-md" : "border-gray-100 group-hover/item:border-brand-primary/30 bg-gray-50"}`}
                >
                    {active && <Check className="w-4 h-4 text-white" />}
                </div>
                </button>
                
                {/* Source Badge */}
                <div className="px-4 flex items-center gap-1.5 group/source cursor-default">
                    <ExternalLink className="w-3 h-3 text-gray-300 group-hover/source:text-brand-primary transition-colors" />
                    <span className="text-[9px] font-bold text-gray-300 group-hover/source:text-brand-primary transition-colors uppercase tracking-wider">
                        Source: {item.source}
                    </span>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-brand-primary/10">
      <Navbar subtitle={`${archetype} Roadmap`} />

      <main className="max-w-7xl mx-auto px-8 py-24 space-y-24">
        <header className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-50 border border-gray-100 text-gray-500 text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> {archetype} Path Active
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
            Learning <span className="text-brand-primary">Curriculum</span>.
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Kurikulum personal yang dirancang khusus untuk memandu karirmu sebagai <span className="text-gray-900 font-bold">{archetype}</span>.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
          
          {/* Beginner Tier */}
          <div 
            onClick={() => setIsBeginnerOpen(!isBeginnerOpen)}
            className={`relative z-10 p-10 rounded-[48px] border transition-all duration-500 cursor-pointer
              ${isBeginnerOpen ? "bg-white border-brand-primary/20 shadow-xl" : "bg-gray-50/50 border-gray-100 hover:border-gray-200"}`}
          >
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shrink-0">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1 space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <h3 className="text-3xl font-black tracking-tighter">Beginner Tier</h3>
                  <div className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${isBeginnerCompleted ? 'bg-green-100 border-green-200 text-green-600' : 'bg-brand-primary/5 border-brand-primary/10 text-brand-primary'}`}>
                      {isBeginnerCompleted ? 'Completed' : 'Active'}
                  </div>
                </div>
                <p className="text-gray-500 font-medium leading-relaxed">Membangun fondasi dasar. Fokus pada konsep fundamental dan tools esensial.</p>
              </div>
              <div className="shrink-0 pt-4">
                <div className="w-12 h-12 rounded-full border border-gray-100 bg-white flex items-center justify-center transition-all hover:bg-gray-50 hover:border-gray-200">
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-500 ${isBeginnerOpen ? "rotate-180" : ""}`} />
                </div>
              </div>
            </div>

            <div className={`grid transition-all duration-500 ease-in-out ${isBeginnerOpen ? 'grid-rows-[1fr] opacity-100 mt-12' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden border-t border-gray-100 pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {renderListSection("Career Foundation", currentContent.beginner.foundation, <BookOpen />)}
                  {renderListSection("Skill Mapping", currentContent.beginner.skillMapping, <Target />)}
                  {renderListSection("Interest Discovery", currentContent.beginner.interestDiscovery, <Search />)}
                </div>
              </div>
            </div>
          </div>

          {/* Intermediate Tier */}
          <div 
            onClick={() => isIntermediateUnlocked && setIsIntermediateOpen(!isIntermediateOpen)}
            className={`relative z-10 p-10 rounded-[48px] border transition-all duration-500
              ${isIntermediateUnlocked 
                ? "bg-white border-gray-100 shadow-lg cursor-pointer hover:border-brand-primary/20" 
                : "opacity-40 pointer-events-none select-none border-gray-100 bg-gray-50/50"
              }`}
          >
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg transition-all duration-500 shrink-0 ${isIntermediateUnlocked ? "bg-linear-to-br from-brand-primary to-brand-secondary scale-110" : "bg-gray-100"}`}>
                {isIntermediateUnlocked ? <Sparkles className="w-10 h-10 text-white" /> : <Lock className="w-8 h-8 text-gray-400" />}
              </div>
              <div className="flex-1 space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <h3 className="text-3xl font-black tracking-tighter">Intermediate Tier</h3>
                  {isIntermediateUnlocked && (
                    <div className="px-3 py-1 rounded-full border border-brand-primary/10 bg-brand-primary/5 text-brand-primary text-[10px] font-black uppercase tracking-widest">Unlocked</div>
                  )}
                </div>
                <p className="text-gray-500 font-medium leading-relaxed">Pendalaman spesialisasi melalui proyek riil dan sertifikasi industri.</p>
              </div>
              <div className="shrink-0 pt-4">
                <div className={`w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center transition-all ${isIntermediateUnlocked ? "bg-white hover:bg-gray-50" : ""}`}>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-500 ${isIntermediateOpen ? "rotate-180" : ""}`} />
                </div>
              </div>
            </div>

            <div className={`grid transition-all duration-500 ease-in-out ${isIntermediateOpen ? 'grid-rows-[1fr] opacity-100 mt-12' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden border-t border-gray-100 pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {renderListSection("Advanced Project", currentContent.intermediate.foundation, <Rocket />)}
                  {renderListSection("Industry Certification", currentContent.intermediate.skillMapping, <Award />, true)}
                  {renderListSection("Networking", currentContent.intermediate.interestDiscovery, <Users />)}
                </div>
              </div>
            </div>

            {!isIntermediateUnlocked && (
              <div className="absolute inset-0 rounded-[48px] flex flex-col items-center justify-center bg-white/60 z-20 backdrop-blur-xs">
                 <Lock className="w-10 h-10 text-gray-300 mb-4" />
                 <span className="text-xs font-black tracking-[0.3em] uppercase text-gray-400 text-center px-10 leading-relaxed">Complete Beginner Skills <br/> or Upgrade to Unlock</span>
              </div>
            )}
          </div>

          {/* Expert Tier */}
          <div 
            onClick={() => router.push("/pricing")}
            className="relative p-10 rounded-[48px] border border-gray-100 bg-gray-50/30 transition-all duration-500 cursor-pointer hover:border-gray-200"
          >
            <div className="flex flex-col md:flex-row gap-10 items-start opacity-40 grayscale">
                <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center shrink-0">
                    <Lock className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex-1 space-y-4 pt-2">
                    <h3 className="text-3xl font-black tracking-tighter">Expert Tier</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">Akses eksklusif ke strategi leadership dan mentoring langsung dari top industri.</p>
                </div>
            </div>
            <div className="absolute inset-0 rounded-[48px] flex items-center justify-center bg-white/60 z-20 backdrop-blur-xs">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-sm">
                        <Lock className="w-8 h-8 text-gray-300" />
                    </div>
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-400">PREMIUM REQUIRED</span>
                </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
