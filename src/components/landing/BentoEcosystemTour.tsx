"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Brain, Briefcase, GraduationCap, CheckCircle2, Sparkles, ChevronRight } from "lucide-react";

export default function BentoEcosystemTour() {
  const bentoContainerRef = useRef<HTMLDivElement>(null);

  // Element Refs for dynamic cursor target calculation
  const archBuilderRef = useRef<HTMLDivElement>(null);
  const chipSoftwareEngRef = useRef<HTMLDivElement>(null);
  const step02Ref = useRef<HTMLDivElement>(null);

  // States
  const [tourStep, setTourStep] = useState<number>(0);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 120, y: 100 });
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isUserHovered, setIsUserHovered] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [isTabActive, setIsTabActive] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Dynamic visual states driven by tour
  const [selectedArchetype, setSelectedArchetype] = useState<string>("The Builder");
  const [hoveredChip, setHoveredChip] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [barsAnimated, setBarsAnimated] = useState<boolean>(true);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Viewport Observer (tour only runs when in view)
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabActive(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (bentoContainerRef.current) {
      observer.observe(bentoContainerRef.current);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
    };
  }, []);

  // Coordinate calculator relative to bentoContainerRef
  const getCoordinates = useCallback((element: HTMLElement | null) => {
    if (!element || !bentoContainerRef.current) return { x: 120, y: 100 };
    const cRect = bentoContainerRef.current.getBoundingClientRect();
    const eRect = element.getBoundingClientRect();
    return {
      x: eRect.left - cRect.left + eRect.width / 2,
      y: eRect.top - cRect.top + eRect.height / 2,
    };
  }, []);

  // Main Ecosystem Tour Timeline Loop (~14 seconds)
  useEffect(() => {
    if (prefersReducedMotion || !isInView || !isTabActive || isUserHovered) return;

    let active = true;
    let timerIds: NodeJS.Timeout[] = [];

    const schedule = (fn: () => void, delayMs: number) => {
      const id = setTimeout(() => {
        if (active) fn();
      }, delayMs);
      timerIds.push(id);
    };

    const triggerClick = () => {
      setIsClicking(true);
      setTimeout(() => {
        if (active) setIsClicking(false);
      }, 350);
    };

    const runTour = () => {
      // 0.0s: Start tour at Archetype card
      setTourStep(0);
      setSelectedArchetype("The Builder");
      setHoveredChip(null);
      setActiveStep(1);
      setBarsAnimated(false);

      if (archBuilderRef.current) {
        setCursorPos(getCoordinates(archBuilderRef.current));
      }

      // 1.2s: Cursor clicks "The Builder" card
      schedule(() => {
        triggerClick();
        setSelectedArchetype("The Builder");
        setBarsAnimated(true);
        setTourStep(1);
      }, 1200);

      // 3.8s: Cursor glides towards "Rekomendasi Karir" (Software Engineer chip)
      schedule(() => {
        setTourStep(2);
        if (chipSoftwareEngRef.current) {
          setCursorPos(getCoordinates(chipSoftwareEngRef.current));
        }
      }, 3800);

      // 5.2s: Cursor hovers "Software Engineer" chip -> shows tooltip
      schedule(() => {
        setHoveredChip("Software Engineer");
        setTourStep(3);
      }, 5200);

      // 8.0s: Cursor glides towards "Roadmap Belajar" (Step 02)
      schedule(() => {
        setHoveredChip(null);
        setTourStep(4);
        if (step02Ref.current) {
          setCursorPos(getCoordinates(step02Ref.current));
        }
      }, 8000);

      // 9.5s: Cursor clicks Step 02 in Roadmap Belajar
      schedule(() => {
        triggerClick();
        setActiveStep(2);
        setTourStep(5);
      }, 9500);

      // 12.0s: Tour hold state
      schedule(() => {
        setTourStep(6);
      }, 12000);

      // 13.5s: Reset and loop
      schedule(() => {
        runTour();
      }, 13500);
    };

    runTour();

    return () => {
      active = false;
      timerIds.forEach(clearTimeout);
    };
  }, [isInView, isTabActive, isUserHovered, prefersReducedMotion, getCoordinates]);

  // Recalculate target position on resize
  useEffect(() => {
    const handleResize = () => {
      if (tourStep === 1 && archBuilderRef.current) {
        setCursorPos(getCoordinates(archBuilderRef.current));
      } else if ((tourStep === 2 || tourStep === 3) && chipSoftwareEngRef.current) {
        setCursorPos(getCoordinates(chipSoftwareEngRef.current));
      } else if ((tourStep === 4 || tourStep === 5) && step02Ref.current) {
        setCursorPos(getCoordinates(step02Ref.current));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [tourStep, getCoordinates]);

  const archetypes = [
    { name: "The Thinker", role: "Analytical & Logic", val: 85 },
    { name: "The Creator", role: "Visual & Creative", val: 70 },
    { name: "The Connector", role: "People & Growth", val: 90 },
    { name: "The Builder", role: "Execution & Systems", val: 95 },
  ];

  const careerRoles = [
    "Software Engineer",
    "Graphic Designer",
    "Digital Marketing",
    "Data Analyst",
  ];

  const roadmapSteps = [
    { step: "01", title: "Fondasi Keahlian", sub: "Konsep dasar industri & algoritma" },
    { step: "02", title: "Pemetaan Skill", sub: "Framework modern & hands-on project" },
    { step: "03", title: "Eksplorasi Minat", sub: "Portofolio siap kerja & verifikasi" },
  ];

  return (
    <div
      ref={bentoContainerRef}
      onMouseEnter={() => setIsUserHovered(true)}
      onMouseLeave={() => setIsUserHovered(false)}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 relative"
    >
      {/* =========================================================================
          CARD 1: Analisis Kepribadian (Large Left Bento Card)
      ========================================================================= */}
      <div className="md:col-span-2 lg:col-span-8 lg:row-span-2 p-7 md:p-9 bg-gray-50/80 border border-gray-200/80 rounded-[32px] md:rounded-[40px] flex flex-col justify-between group hover:border-brand-primary/40 transition-all duration-300 relative overflow-hidden">
        {/* Subtle Decorative Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[90px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="flex items-start justify-between relative z-10">
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

        {/* Middle Visual Area: 4 Interactive Archetype Cards */}
        <div className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
          {archetypes.map((arch) => {
            const isSelected = selectedArchetype === arch.name;
            const isTarget = arch.name === "The Builder";
            return (
              <div
                key={arch.name}
                ref={isTarget ? archBuilderRef : undefined}
                className={`p-4 rounded-2xl border transition-all duration-400 select-none ${
                  isSelected
                    ? "bg-white border-2 border-brand-primary shadow-md shadow-brand-primary/10 ring-2 ring-brand-primary/10 scale-[1.02]"
                    : "bg-white/80 border-gray-200/80 hover:border-gray-300"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] uppercase font-black tracking-widest text-brand-primary">
                    Archetype
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                  )}
                </div>
                <div className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                  {arch.name}
                </div>
                <div className="text-[10px] text-gray-400 truncate mt-0.5">
                  {arch.role}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trait Bars with 4 Real Archetypes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 p-5 md:p-6 bg-white rounded-[24px] border border-gray-100 shadow-xs relative z-10">
          {archetypes.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 truncate">
                  {item.name}
                </span>
                <span className="text-xs font-bold text-gray-900 tabular-nums">
                  {item.val}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-primary rounded-full transition-all duration-800 ease-out"
                  style={{
                    width: barsAnimated ? `${item.val}%` : "0%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          CARD 2: Rekomendasi Karir (Top Right Card)
      ========================================================================= */}
      <div className="col-span-1 lg:col-span-4 p-7 md:p-8 bg-gray-50/80 border border-gray-200/80 rounded-[32px] md:rounded-[40px] flex flex-col justify-between group hover:border-brand-primary/40 transition-all duration-300 min-h-[290px] relative">
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
        <div className="flex flex-wrap gap-2 mt-6 relative">
          {careerRoles.map((role) => {
            const isHovered = hoveredChip === role;
            const isTarget = role === "Software Engineer";

            return (
              <div
                key={role}
                ref={isTarget ? chipSoftwareEngRef : undefined}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 shadow-2xs select-none ${
                  isHovered
                    ? "bg-brand-primary text-white scale-105 shadow-md shadow-brand-primary/20"
                    : "bg-white border border-gray-200/80 text-gray-800 hover:border-brand-primary"
                }`}
              >
                {role}

                {/* Floating Interactive Tooltip */}
                {isHovered && (
                  <div className="absolute -top-11 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-gray-900 text-white text-[10px] font-bold tracking-wide whitespace-nowrap shadow-xl z-20 animate-in fade-in zoom-in-95 duration-200">
                    Kecocokan 95% • Profil The Builder
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          CARD 3: Roadmap Belajar (Bottom Right Card)
      ========================================================================= */}
      <div className="col-span-1 lg:col-span-4 p-7 md:p-8 bg-gray-50/80 border border-gray-200/80 rounded-[32px] md:rounded-[40px] flex flex-col justify-between group hover:border-brand-primary/40 transition-all duration-300 min-h-[290px]">
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

        {/* Stepper 01 - 02 - 03 with Step 02 Click Target */}
        <div className="space-y-2.5 mt-6">
          {roadmapSteps.map((s, idx) => {
            const stepNum = idx + 1;
            const isActive = activeStep >= stepNum;
            const isTarget = stepNum === 2;

            return (
              <div
                key={s.step}
                ref={isTarget ? step02Ref : undefined}
                className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-300 ${
                  activeStep === stepNum
                    ? "bg-white border border-brand-primary/20 shadow-xs"
                    : ""
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 transition-colors ${
                    isActive
                      ? "bg-brand-primary text-white shadow-xs"
                      : "bg-white border border-gray-200 text-gray-400"
                  }`}
                >
                  {s.step}
                </div>
                <div className="min-w-0">
                  <div
                    className={`text-xs font-bold transition-colors ${
                      isActive ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {s.title}
                  </div>
                  <div className="text-[10px] text-gray-400 truncate">
                    {s.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          VIRTUAL ECOSYSTEM TOUR CURSOR (Only on desktop & when not user-hovered)
      ========================================================================= */}
      {!prefersReducedMotion && !isUserHovered && (
        <div
          className="hidden md:block absolute pointer-events-none z-30 transition-all duration-800 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: `translate3d(${cursorPos.x - 3}px, ${cursorPos.y - 2}px, 0)`,
          }}
          aria-hidden="true"
        >
          {/* SVG Brand Cursor */}
          <svg
            width="22"
            height="26"
            viewBox="0 0 24 28"
            fill="none"
            className="drop-shadow-md"
          >
            <path
              d="M2.5 1.5L21.5 13.5L12 16L8 25.5L2.5 1.5Z"
              fill="#0066FF"
              stroke="white"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>

          {/* Click Ripple Effect */}
          {isClicking && (
            <span className="absolute -top-3.5 -left-3.5 w-9 h-9 rounded-full bg-brand-primary/30 border-2 border-brand-primary animate-ping pointer-events-none" />
          )}
        </div>
      )}
    </div>
  );
}
