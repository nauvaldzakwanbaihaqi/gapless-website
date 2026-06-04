"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({ subtitle }: { subtitle?: string }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check auth status on mount
    const checkAuth = () => {
      const token = localStorage.getItem("gapless_session");
      setIsLoggedIn(!!token);
    };

    checkAuth();

    // Listen for storage changes
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("gapless_session");
    setIsLoggedIn(false);
    router.push("/");
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <nav className="w-full max-w-7xl flex items-center justify-between px-6 md:px-12 py-6 md:py-8 mx-auto relative z-50">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 group">
          <span className="text-3xl text-gray-900 font-black">Gapless</span>
        </Link>
        
        {subtitle && (
          <div className="hidden sm:block text-[10px] font-bold text-gray-400 tracking-[0.4em] uppercase border-l border-gray-200 pl-6">
            {subtitle}
          </div>
        )}
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
        <Link href="/assessment" className="hover:text-brand-primary transition-colors">Assessment</Link>
        <Link href="/roadmap" className="hover:text-brand-primary transition-colors">Roadmap</Link>
        <Link href="/pricing" className="hover:text-brand-primary transition-colors">Pricing</Link>
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <Link href="/assessment" className="hidden sm:flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-brand-primary transition-colors">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="rounded-full px-6 text-red-500 hover:text-red-600 hover:bg-red-50 transition-all border border-red-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Keluar
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Button 
              asChild
              variant="ghost" 
              className="rounded-full px-6 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all border border-gray-200"
            >
              <Link href="/login">Masuk</Link>
            </Button>
            <Button 
              asChild
              className="rounded-full px-6 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold border-none shadow-lg shadow-brand-primary/20 transition-all hover:scale-105"
            >
              <Link href="/register">Daftar</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
