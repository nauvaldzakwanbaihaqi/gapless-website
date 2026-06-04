"use client";

import React from "react";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function PricingPage() {
  const router = useRouter();

  const handleUpgrade = () => {
    router.push("/checkout");
  };

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Esensi untuk eksplorasi awal.",
      features: [
        "1x Assessment Dasar",
        "Eksplorasi Karir Terbatas",
        "Public Learning Roadmap",
        "Community Access"
      ],
      cta: "Mulai Gratis",
      popular: false
    },
    {
      name: "Student Pro",
      price: "69.000",
      description: "Akselerasi karir dengan AI penuh.",
      features: [
        "Unlimited Advanced Assessments",
        "AI Career Persona Matching",
        "Personalized Skill Gap Analysis",
        "Locked Roadmap Tiers Unlocked",
        "Direct Industry Mentoring"
      ],
      cta: "Upgrade Sekarang",
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-brand-primary/10">
      <Navbar />

      <main className="max-w-7xl mx-auto px-8 py-20 space-y-24">

        <header className="space-y-6 text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900">Investasi Untuk <br/><span className="bg-clip-text text-transparent bg-linear-to-r from-brand-primary to-brand-secondary">Masa Depanmu</span>.</h1>
            <p className="text-xl text-gray-500 max-w-xl mx-auto leading-relaxed">Pilih paket yang sesuai dengan tahap pengembangan karirmu saat ini.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
            {plans.map((plan) => (
                <div key={plan.name} className={`relative p-12 rounded-[48px] border transition-all duration-500 flex flex-col justify-between h-full ${plan.popular ? 'bg-white border-brand-primary shadow-2xl shadow-brand-primary/10 scale-105 z-10' : 'bg-gray-50 border-gray-100 hover:border-gray-200'}`}>
                    
                    {plan.popular && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 rounded-full bg-brand-primary text-[10px] font-black tracking-widest uppercase text-white shadow-xl shadow-brand-primary/40">
                            Most Recommended
                        </div>
                    )}

                    <div className="space-y-8">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black tracking-tight text-gray-900">{plan.name}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed font-medium">{plan.description}</p>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span className="text-sm font-bold text-gray-400">Rp</span>
                            <span className="text-7xl font-black tracking-tighter text-gray-900">{plan.price}</span>
                            <span className="text-sm font-bold text-gray-400">/Bulan</span>
                        </div>

                        <div className="space-y-4">
                            {plan.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-4 group">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${plan.popular ? 'bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white' : 'bg-gray-200 text-gray-400'}`}>
                                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-12">
                        <Button 
                          onClick={plan.name === "Student Pro" ? handleUpgrade : undefined}
                          className={`w-full h-16 rounded-[24px] text-lg font-black transition-all ${plan.popular ? 'bg-brand-primary hover:bg-brand-primary/90 text-white shadow-xl shadow-brand-primary/20' : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-100'}`}>
                            {plan.cta}
                        </Button>
                    </div>
                </div>
            ))}
        </div>

        <p className="text-center text-xs font-black text-gray-300 tracking-[0.2em] uppercase">Semua paket termasuk update roadmap bulanan dan akses komunitas global.</p>
      </main>
    </div>
  );
}
