import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen selection:bg-brand-primary/10 flex flex-col items-center overflow-x-hidden bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section - Asymmetric Layout */}
      <header className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-32 lg:py-40 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7 space-y-8 md:space-y-10 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/5 border border-brand-primary/10 text-brand-primary text-xs font-bold tracking-wide uppercase self-start">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary shadow-[0_0_10px_rgba(0,102,255,0.4)]"></span>
            </span>
            Kini Terbuka Untuk Mahasiswa Umum
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] text-gray-900">
            Temukan Jalur <br />
            <span className="text-brand-primary">Karir Sejatimu</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-lg">
            Berhenti menebak-nebak masa depan. Gapless menggunakan AI perilaku untuk memetakan kepribadian unikmu ke roadmap karir berbasis data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg" className="rounded-full px-8 md:px-10 bg-brand-primary hover:bg-brand-primary/90 text-white h-14 text-base font-bold shadow-[0_20px_40px_rgba(0,102,255,0.2)] border-none transition-all hover:scale-[1.02]">
              <Link href="/assessment">Belum Tahu Minatku <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 md:px-10 h-14 text-base font-bold border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900 transition-all">
              <Link href="/choose-role">Sudah Tahu Minatku</Link>
            </Button>
          </div>
        </div>

        {/* Visual Element - Premium Abstract */}
        <div className="lg:col-span-5 hidden lg:block relative h-[500px] xl:h-[600px] w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full animate-pulse" />
             {/* Floating Premium UI Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 p-8 bg-white border border-gray-100 rounded-[32px] shadow-2xl space-y-6 transform rotate-3 hover:rotate-0 transition-transform duration-700">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg">
                        <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-gray-900">Persona Engine</div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Analyzing...</div>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-linear-to-r from-brand-primary to-brand-secondary rounded-full" />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-gray-500">
                        <span>MATCH SCORE</span>
                        <span className="text-brand-primary">85% CONFIDENCE</span>
                    </div>
                </div>
                <div className="pt-2 flex flex-wrap gap-2">
                    <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-700">Software Engineer</div>
                    <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-400">Graphic Designer</div>
                    <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-400">Digital Marketing</div>
                </div>
             </div>
        </div>
      </header>

      {/* Bento Grid Features - Asymmetric & Premium */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 space-y-12 md:space-y-16">
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">Ekosistem Karir Terpadu</h2>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">Semua yang kamu butuhkan untuk bertransisi dari dunia kampus ke industri profesional dengan percaya diri.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Personality Analysis - Large Main Card */}
          <div className="md:col-span-2 lg:col-span-8 lg:row-span-2 p-8 md:p-10 bg-gray-50 border border-gray-100 rounded-[32px] md:rounded-[40px] flex flex-col justify-between group hover:border-brand-primary/30 transition-all duration-500 overflow-hidden relative h-full min-h-[400px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/5 flex items-center justify-center border border-brand-primary/10">
                    <Brain className="w-7 h-7 text-brand-primary" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Analisis Kepribadian</h3>
                    <p className="text-sm md:text-base text-gray-500 max-w-md">Algoritma AI kami membedah matriks perilaku kamu untuk menemukan kekuatan alami yang seringkali tidak kamu sadari.</p>
                </div>
            </div>
            
            {/* Minimalist Trait Matrix Block */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 p-6 md:p-8 bg-white rounded-[24px] md:rounded-[32px] border border-gray-100 relative z-10 mt-8 shadow-sm">
                {[
                    { label: "Analitis", val: 85, color: "brand-primary" },
                    { label: "Kreatif", val: 70, color: "brand-primary" },
                    { label: "Empati", val: 90, color: "brand-primary" },
                    { label: "Strategis", val: 65, color: "brand-primary" }
                ].map(t => (
                    <div key={t.label} className="space-y-4">
                        <div className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">{t.label}</div>
                        <div className="relative h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                             <div className={`h-full bg-brand-primary rounded-full transition-all duration-1000`} style={{ width: `${t.val}%` }} />
                        </div>
                        <div className="text-lg md:text-xl font-bold tabular-nums text-gray-900">{t.val}%</div>
                    </div>
                ))}
            </div>
          </div>

          {/* Career Recommendations - Asymmetric Right Card */}
          <div className="col-span-1 lg:col-span-4 p-8 md:p-10 bg-gray-50 border border-gray-100 rounded-[32px] md:rounded-[40px] flex flex-col justify-between group hover:border-brand-primary/30 transition-all duration-500 h-full min-h-[300px]">
            <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/5 flex items-center justify-center border border-brand-primary/10">
                    <Briefcase className="w-7 h-7 text-brand-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Rekomendasi Karir</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Pilihan karir yang telah dikurasi khusus berdasarkan profil AI unikmu.</p>
            </div>
            
            {/* Floating Glassmorphic Career Badges */}
            <div className="flex flex-wrap gap-2 mt-8">
                {["Product Manager", "UX Designer", "Data Analyst"].map(role => (
                    <div key={role} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-700 hover:border-brand-primary transition-colors shadow-sm">
                        {role}
                    </div>
                ))}
            </div>
          </div>

          {/* Learning Roadmap - Bottom Right Card */}
          <div className="col-span-1 lg:col-span-4 p-8 md:p-10 bg-gray-50 border border-gray-100 rounded-[32px] md:rounded-[40px] flex flex-col justify-between group hover:border-brand-primary/30 transition-all duration-500 h-full min-h-[300px]">
            <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100">
                    <GraduationCap className="w-7 h-7 text-gray-900" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Learning Roadmap</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Kurikulum terstruktur untuk menjembatani kesenjangan skill kamu.</p>
            </div>
            
            {/* Node-based Milestone Indicator */}
            <div className="flex items-center gap-3 mt-8">
                {[1, 2, 3].map(step => (
                    <React.Fragment key={step}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border transition-all duration-500 ${step === 1 ? 'bg-brand-primary border-brand-primary text-white shadow-lg' : 'bg-white border-gray-200 text-gray-300'}`}>
                            0{step}
                        </div>
                        {step < 3 && <div className="h-px flex-1 bg-gray-200" />}
                    </React.Fragment>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
            <div className="p-8 md:p-16 rounded-[32px] md:rounded-[48px] bg-gray-50 border border-gray-100 space-y-8 md:space-y-10 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-brand-primary to-transparent" />
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">Siap memulai perjalananmu?</h2>
                <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto">Gabung dengan ribuan mahasiswa lainnya yang telah menemukan jalur karir impian mereka.</p>
                <Button asChild size="lg" className="rounded-full px-10 md:px-12 bg-brand-primary text-white hover:bg-brand-primary/90 h-14 md:h-16 text-base md:text-lg font-black transition-all hover:scale-105 border-none shadow-xl">
                    <Link href="/assessment">Daftar Sekarang</Link>
                </Button>
            </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
        <div className="text-[10px] md:text-sm font-bold text-gray-400 tracking-widest uppercase text-center md:text-left">© 2026 GAPLESS PLATFORM. NO CODE, JUST CAREERS.</div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] md:text-xs font-black text-gray-400 tracking-widest uppercase">
            <a href="#" className="hover:text-gray-900 transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Instagram</a>
        </div>
      </footer>
    </div>
  );
}
