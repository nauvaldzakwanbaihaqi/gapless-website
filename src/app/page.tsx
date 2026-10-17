import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import BentoEcosystemTour from "@/components/landing/BentoEcosystemTour";
import Footer from "@/components/layout/Footer";

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

      {/* Hero Section — 2 Columns with Left Content & Right Upward-Sliding Animated Demo */}
      <HeroSection />

      {/* Bento Grid Features — "Ekosistem Karir Terpadu" (Compact single-viewport fit) */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12 space-y-4 md:space-y-6 border-t border-gray-100">
        <div className="space-y-1.5 max-w-2xl">
          <div className="text-[11px] font-bold text-brand-primary tracking-widest uppercase">
            Fitur Utama
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
            Ekosistem Karir Terpadu
          </h2>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed">
            Semua yang kamu butuhkan untuk bertransisi dari dunia kampus ke industri profesional dengan percaya diri.
          </p>
        </div>

        {/* Interactive Bento Ecosystem Grid with Tour Animation */}
        <BentoEcosystemTour />
      </section>

      {/* Comprehensive Information & Navigation Footer */}
      <Footer />
    </div>
  );
}
