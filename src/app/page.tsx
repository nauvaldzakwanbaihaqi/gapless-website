import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, Compass, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import HeroDemoWrapper from "@/components/landing/HeroDemoWrapper";
import BentoEcosystemTour from "@/components/landing/BentoEcosystemTour";
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

      {/* Hero Section — Compact, viewport-friendly layout with top alignment */}
      <header className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-6 pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-7 flex flex-col justify-between self-start lg:min-h-[620px] text-left space-y-8 lg:space-y-0">
          <div className="space-y-6 md:space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/5 border border-brand-primary/15 text-brand-primary text-xs font-bold tracking-wide uppercase self-start">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              Kini Terbuka Untuk Mahasiswa Umum
            </div>

            {/* Single Semantic H1 with Responsive Clamping */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.2rem] font-black tracking-tight leading-[1.08] text-gray-900">
              Temukan Jalur <br className="hidden sm:inline" />
              <span className="text-brand-primary">Karir Sejatimu.</span>
            </h1>

            {/* Hero Paragraph */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              Berhenti menebak-nebak masa depan. Gapless menggunakan AI perilaku untuk memetakan kepribadian unikmu ke roadmap karir berbasis data.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="space-y-3 pt-1">
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

          {/* Cara Kerja Gapless (Workflow Preview) — Menyempurnakan Keseimbangan Ketinggian dengan Kolom Kanan */}
          <div className="pt-6 border-t border-gray-100/90 mt-4">
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary inline-block"></span>
              Bagaimana Gapless Membimbing Kariermu:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100/80 flex flex-col justify-between hover:bg-white hover:border-brand-primary/30 hover:shadow-xs transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-md">
                    01
                  </span>
                  <Brain className="w-4 h-4 text-brand-primary/70" />
                </div>
                <div className="text-xs font-bold text-gray-900 mb-1">Simulasi Kasus</div>
                <p className="text-[11px] text-gray-500 leading-snug">
                  15 studi kasus situasional realistis dalam 5-7 menit.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100/80 flex flex-col justify-between hover:bg-white hover:border-brand-primary/30 hover:shadow-xs transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-md">
                    02
                  </span>
                  <Compass className="w-4 h-4 text-brand-primary/70" />
                </div>
                <div className="text-xs font-bold text-gray-900 mb-1">AI Archetype</div>
                <p className="text-[11px] text-gray-500 leading-snug">
                  AI memetakan pola logika dan gaya kerjamu ke peran nyata.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100/80 flex flex-col justify-between hover:bg-white hover:border-brand-primary/30 hover:shadow-xs transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-md">
                    03
                  </span>
                  <Sparkles className="w-4 h-4 text-brand-primary/70" />
                </div>
                <div className="text-xs font-bold text-gray-900 mb-1">Roadmap Terarah</div>
                <p className="text-[11px] text-gray-500 leading-snug">
                  Kurikulum belajar langkah demi langkah siap kerja.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual Container — Phase 2 Dynamic Animation with Static SSR Fallback */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end self-start">
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

        {/* Interactive Bento Ecosystem Grid with Tour Animation */}
        <BentoEcosystemTour />
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
