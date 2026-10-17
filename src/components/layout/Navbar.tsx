"use client";
import React, { useEffect, useState } from "react";
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
      <div className="hidden md:flex items-center gap-2.5">
        <Link
          href={isLoggedIn ? "/gap-analysis" : "/login"}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50/90 hover:bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-700 transition-colors shadow-xs"
        >
          <div className="w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">
            <User className="w-3 h-3" />
          </div>
          <span>{isLoggedIn ? "Akun Saya" : "Login"}</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="rounded-full px-3 py-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300 transition-all border border-red-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <LogOut className="w-3.5 h-3.5 text-red-600" />
          <span>Keluar</span>
        </button>
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
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            <Link
              href={isLoggedIn ? "/gap-analysis" : "/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800"
            >
              <User className="w-4 h-4 text-brand-primary" />
              <span>{isLoggedIn ? "Akun Saya" : "Login"}</span>
            </Link>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full justify-center rounded-full text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 text-sm font-semibold h-10 flex items-center cursor-pointer transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2 text-red-600" />
              Keluar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
