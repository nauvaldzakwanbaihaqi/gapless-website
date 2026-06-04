"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error") === "unauthorized") {
      setErrorMsg("Silakan login terlebih dahulu untuk mengakses fitur ini.");
    }
  }, [searchParams]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    if (email && password) {
      localStorage.setItem("gapless_session", "mock_token_" + Date.now());
      router.push("/assessment");
    } else {
      setErrorMsg("Email dan password harus diisi.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 overflow-hidden relative">
      {/* Background Glows (Softer for Light Mode) */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-primary/5 blur-[100px] rounded-full" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center space-y-4">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-4xl font-black tracking-tighter text-gray-900">Gapless</span>
          </Link>
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Selamat Datang Kembali</h1>
            <p className="text-sm text-gray-400">Masuk untuk melanjutkan perjalanan karirmu.</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-10 rounded-[40px] bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Email Address</label>
              <input 
                type="email" 
                placeholder="name@university.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Password</label>
                <Link href="#" className="text-[10px] font-black text-brand-primary hover:underline transition-colors uppercase tracking-widest">Forgot?</Link>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all"
              />
            </div>
            <Button className="w-full h-14 rounded-2xl bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-base shadow-xl shadow-brand-primary/20 transition-all hover:scale-[1.02] border-none">
              Sign In <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest"><span className="bg-white px-4 text-gray-300">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 rounded-xl border-gray-100 bg-white hover:bg-gray-50 text-gray-600 transition-all text-xs font-bold">
              <Github className="mr-2 w-4 h-4" /> Github
            </Button>
            <Button variant="outline" className="h-12 rounded-xl border-gray-100 bg-white hover:bg-gray-50 text-gray-600 transition-all text-xs font-bold">
              <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg> Google
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400">
          Belum punya akun? <Link href="/register" className="text-brand-primary font-bold hover:underline">Daftar sekarang</Link>
        </p>
      </div>
    </div>
  );
}
