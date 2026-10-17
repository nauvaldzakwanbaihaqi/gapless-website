"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar({ subtitle }: { subtitle?: string }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
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

  const navLinks = [
    { label: "Asesmen", href: "/assessment" },
    { label: "Roadmap Belajar", href: "/roadmap" },
    { label: "Hasil Saya", href: "/gap-analysis" },
    { label: "Harga", href: "/pricing" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="w-full max-w-7xl flex items-center justify-between px-6 md:px-12 py-5 md:py-7 mx-auto relative z-50">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 group">
          <span className="text-3xl text-gray-900 font-black tracking-tight">Gapless</span>
        </Link>
        
        {subtitle && (
          <div className="hidden sm:block text-[10px] font-bold text-gray-400 tracking-[0.4em] uppercase border-l border-gray-200 pl-6">
            {subtitle}
          </div>
        )}
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-sm">
        {navLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors py-1 ${
                active
                  ? "text-brand-primary font-bold border-b-2 border-brand-primary"
                  : "text-gray-500 hover:text-gray-900 font-medium"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Desktop Auth Section */}
      <div className="hidden md:flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700">
              <div className="w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                <User className="w-3 h-3" />
              </div>
              <span>Akun Saya</span>
            </div>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="rounded-full px-5 text-red-600 hover:text-red-700 hover:bg-red-50 transition-all border border-red-100 text-xs font-bold"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Keluar
            </Button>
          </div>
        ) : (
          <Button 
            asChild
            variant="outline" 
            className="rounded-full px-5 h-10 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all border-gray-200 text-xs font-bold shadow-xs flex items-center gap-2"
          >
            <Link href="/login">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Masuk dengan Google
            </Link>
          </Button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex md:hidden items-center gap-2">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
          className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl py-6 px-6 flex flex-col gap-4 md:hidden z-50">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 text-base ${
                isActive(link.href)
                  ? "text-brand-primary font-bold"
                  : "text-gray-600 hover:text-gray-900 font-medium"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100">
            {isLoggedIn ? (
              <Button 
                variant="ghost" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full justify-center rounded-full text-red-600 border border-red-100 text-sm font-bold h-11"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            ) : (
              <Button 
                asChild
                variant="outline" 
                className="w-full justify-center rounded-full border-gray-200 text-gray-800 text-sm font-bold h-11 flex items-center gap-2"
              >
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  Masuk dengan Google
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
