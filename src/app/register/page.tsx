"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Github, User, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration logic: simply validate fields and redirect
    if (name && email && password) {
      localStorage.setItem("gapless_session", "mock_token_" + Date.now());
      router.push("/assessment");
    } else {
      setErrorMsg("Semua field harus diisi.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 overflow-hidden relative selection:bg-brand-primary/10 text-gray-900">
      {/* Premium Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md space-y-10 relative z-10">
        {/* Brand Identity */}
        <div className="flex flex-col items-center space-y-4">
          <Link href="/" className="group transition-transform hover:scale-105">
            <span className="text-4xl font-black tracking-tighter text-gray-900">Gapless</span>
          </Link>
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-black tracking-tighter">Mulai Perjalananmu</h1>
            <p className="text-sm text-gray-400 font-medium">Buat akun untuk membuka potensi karirmu.</p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="p-10 rounded-[48px] bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 space-y-8">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2 font-sans">Full Name</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-primary transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-14 bg-gray-50 border border-gray-100 rounded-[20px] pl-12 pr-6 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/5 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2 font-sans">Email Address</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-primary transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <input 
                  type="email" 
                  placeholder="name@university.ac.id"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 bg-gray-50 border border-gray-100 rounded-[20px] pl-12 pr-6 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/5 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2 font-sans">Password</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-primary transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 bg-gray-50 border border-gray-100 rounded-[20px] pl-12 pr-6 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/5 transition-all font-medium"
                />
              </div>
            </div>

            <Button className="w-full h-16 rounded-[24px] bg-brand-primary hover:bg-brand-primary/90 text-white font-black text-base shadow-xl shadow-brand-primary/30 transition-all hover:scale-[1.02] active:scale-95 border-none mt-4 uppercase tracking-widest">
              Create Account <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest"><span className="bg-white px-4 text-gray-300 font-sans">Or connect with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="h-14 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 text-gray-600 transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm">
              <Github className="w-4 h-4 text-gray-900" /> Github
            </button>
            <button className="h-14 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 text-gray-600 transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg> Google
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 font-medium">
          Sudah punya akun? <Link href="/login" className="text-brand-primary font-black hover:underline">Masuk</Link>
        </p>
      </div>
    </div>
  );
}
