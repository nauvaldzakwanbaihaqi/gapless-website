import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, Briefcase, GraduationCap, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import HeroDemoWrapper from "@/components/landing/HeroDemoWrapper";
import AdaptiveCtaButton from "@/components/landing/AdaptiveCtaButton";

export const metadata: Metadata = {
  title: "Gapless - Temukan Jalur Karir Sejatimu",
  description: "Gapless menggunakan AI perilaku untuk memetakan kepribadian unikmu ke roadmap karir berbasis data.",
  keywords: [
    "karir",
    "karier",
    "tes minat bakat",
    "roadmap belajar",
    "gapless",
    "mahasiswa",
    "persiapan karir",
    "software engineer",
    "graphic designer",
    "digital marketing",
    "data analyst"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Gapless - Temukan Jalur Karir Sejatimu",
    description: "Gapless menggunakan AI perilaku untuk memetakan kepribadian unikmu ke roadmap karir berbasis data.",
    url: "/",
    siteName: "Gapless",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gapless - Temukan Jalur Karir Sejatimu",
    description: "Gapless menggunakan AI perilaku untuk memetakan kepribadian unikmu ke roadmap karir berbasis data.",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://gapless.id/#website",
        "url": "https://gapless.id",
        "name": "Gapless",
        "description": "Platform AI pemetaan kepribadian dan roadmap karier untuk mahasiswa.",
        "inLanguage": "id-ID"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://gapless.id/#software",
        "name": "Gapless Career Compass",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "All",
        "description": "Tes minat karier berbasis AI perilaku dan kurikulum roadmap belajar terstruktur."
      }
    ]
  };

  return (
    <div className="w-full min-h-screen selection:bg-brand-primary/10 flex flex-col items-center overflow-x-hidden bg-white text-gray-900 font-sans">
      {/* Structured Data JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Shared Navigation Component */}
      <Navbar />

      {/* Hero Section — Compact, viewport-friendly layout */}
      <header className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-6 pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/5 border border-brand-primary/15 text-brand-primary text-xs font-bold tracking-wide uppercase self-start">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            Kini Terbuka Untuk Mahasiswa Umum
          </div>

          {/* Single Semantic H1 with Responsive Clamping */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-black tracking-tight leading-[1.08] text-gray-900">
            Temukan Jalur <br className="hidden sm:inline" />
            <span className="text-brand-primary">Karir Sejatimu.</span>
          </h1>

          {/* Hero Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
            Berhenti menebak-nebak masa depan. Gapless menggunakan AI perilaku untuk memetakan kepribadian unikmu ke roadmap karir berbasis data.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 md:px-9 bg-brand-primary hover:bg-brand-primary/90 text-white h-13 text-base font-bold shadow-lg shadow-brand-primary/20 border-none transition-all hover:scale-[1.02]"
              >
                <Link href="/assessment">
                  Belum Tahu Minatku <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 md:px-9 h-13 text-base font-bold border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900 transition-all"
              >
                <Link href="/choose-role">
                  Sudah Tahu Minatku
                </Link>
              </Button>
            </div>
            {/* Real Guest Value Help Text */}
            <p className="text-xs text-gray-400 font-medium tracking-wide">
              Tes 5-7 menit • Gratis tanpa kartu kredit • Hasil instan
            </p>
          </div>
        </div>

        {/* Hero Visual Container — Phase 2 Dynamic Animation with Static SSR Fallback */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <HeroDemoWrapper />
        </div>
      </header>

      {/* Bento Grid Features — "Ekosistem Karir Terpadu" */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-10 md:space-y-12 border-t border-gray-100">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-bold text-brand-primary tracking-widest uppercase">
            Fitur Utama
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-gray-900">
            Ekosistem Karir Terpadu
          </h2>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            Semua yang kamu butuhkan untuk bertransisi dari dunia kampus ke industri profesional dengan percaya diri.
          </p>
        </div>

        {/* 3-Card Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Analisis Kepribadian (Large Left Card) */}
          <div className="md:col-span-2 lg:col-span-8 lg:row-span-2 p-7 md:p-9 bg-gray-50/80 border border-gray-200/80 rounded-[32px] md:rounded-[40px] flex flex-col justify-between group hover:border-brand-primary/40 transition-all duration-300 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-13 h-13 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20 shadow-xs">
                  <Brain className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900">
                    Analisis Kepribadian
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 max-w-md">
                    Algoritma AI kami membedah matriks perilaku kamu untuk menemukan kekuatan alami yang seringkali tidak kamu sadari.
                  </p>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-400 shrink-0">
                Contoh tampilan
              </span>
            </div>

            {/* Middle Visual Area: 4 Archetype Cards Showcase */}
            <div className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "The Thinker", role: "Analytical & Logic", tag: "85%" },
                { name: "The Creator", role: "Visual & Creative", tag: "70%" },
                { name: "The Connector", role: "People & Growth", tag: "90%" },
                { name: "The Builder", role: "Execution & Systems", tag: "65%" },
              ].map((arch) => (
                <div
                  key={arch.name}
                  className="p-3.5 rounded-2xl bg-white border border-gray-100 shadow-xs space-y-1 hover:border-brand-primary/30 transition-colors"
                >
                  <div className="text-[10px] uppercase font-black tracking-widest text-brand-primary">
                    Archetype
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-gray-900">
                    {arch.name}
                  </div>
                  <div className="text-[10px] text-gray-400 truncate">
                    {arch.role}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Trait Bars with 4 Real Archetypes */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 p-5 md:p-6 bg-white rounded-[24px] border border-gray-100 shadow-xs">
              {[
                { label: "The Thinker", val: 85 },
                { label: "The Creator", val: 70 },
                { label: "The Connector", val: 90 },
                { label: "The Builder", val: 65 },
              ].map((item) => (
                <div key={item.label} className="space-y-2.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 truncate">
                      {item.label}
                    </span>
                    <span className="text-xs font-bold text-gray-900 tabular-nums">
                      {item.val}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-primary rounded-full transition-all duration-700"
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Rekomendasi Karir (Top Right Card) */}
          <div className="col-span-1 lg:col-span-4 p-7 md:p-8 bg-gray-50/80 border border-gray-200/80 rounded-[32px] md:rounded-[40px] flex flex-col justify-between group hover:border-brand-primary/40 transition-all duration-300 min-h-[280px]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
                  <Briefcase className="w-6 h-6 text-brand-primary" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-400">
                  Contoh tampilan
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-black tracking-tight text-gray-900">
                Rekomendasi Karir
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Pilihan karir yang telah dikurasi khusus berdasarkan profil AI unikmu.
              </p>
            </div>

            {/* Real Catalog Role Chips */}
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "Software Engineer",
                "Graphic Designer",
                "Digital Marketing",
                "Data Analyst",
              ].map((role) => (
                <div
                  key={role}
                  className="px-3 py-1.5 bg-white border border-gray-200/80 rounded-xl text-xs font-bold text-gray-800 shadow-2xs hover:border-brand-primary transition-colors"
                >
                  {role}
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Roadmap Belajar (Bottom Right Card) */}
          <div className="col-span-1 lg:col-span-4 p-7 md:p-8 bg-gray-50/80 border border-gray-200/80 rounded-[32px] md:rounded-[40px] flex flex-col justify-between group hover:border-brand-primary/40 transition-all duration-300 min-h-[280px]">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-800 border border-gray-200">
                <GraduationCap className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="text-xl md:text-2xl font-black tracking-tight text-gray-900">
                Roadmap Belajar
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Kurikulum terstruktur untuk menjembatani kesenjangan skill kamu.
              </p>
            </div>

            {/* Stepper 01 - 02 - 03 */}
            <div className="space-y-3 mt-6">
              {[
                { step: "01", title: "Fondasi Keahlian", active: true },
                { step: "02", title: "Pemetaan Skill", active: false },
                { step: "03", title: "Eksplorasi Minat", active: false },
              ].map((s, idx) => (
                <div key={s.step} className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                      s.active
                        ? "bg-brand-primary text-white shadow-xs"
                        : "bg-white border border-gray-200 text-gray-400"
                    }`}
                  >
                    {s.step}
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      s.active ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Closing CTA — Compact Strip (No extra long scroll) */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16 text-center">
        <div className="p-8 md:p-12 rounded-[32px] md:rounded-[40px] bg-gray-50 border border-gray-200/80 space-y-6 relative overflow-hidden">
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900">
              Siap menemukan arah karier sejatimu?
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
              Mulai dari tes 5-7 menit dan dapatkan rekomendasi karier serta roadmap belajar pribadimu.
            </p>
          </div>
          <div>
            <AdaptiveCtaButton />
          </div>
        </div>
      </section>

      {/* Footer — Clean, no dead # links */}
      <footer className="w-full max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-10 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <div className="text-xs font-bold text-gray-400 tracking-wider uppercase">
          © 2026 GAPLESS PLATFORM. DIBUAT UNTUK MAHASISWA INDONESIA.
        </div>
        <div className="text-xs text-gray-400 font-medium">
          Didesain untuk kejelasan arah masa depanmu.
        </div>
      </footer>
    </div>
  );
}
