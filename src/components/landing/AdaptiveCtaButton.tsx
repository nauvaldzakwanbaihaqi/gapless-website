"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdaptiveCtaButton() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("gapless_session");
    const archetype = localStorage.getItem("userArchetype");
    setIsLoggedIn(!!token);
    setHasResult(!!archetype);
  }, []);

  // Server-rendered / pre-hydration default fallback (Guest state)
  if (!mounted) {
    return (
      <Button
        asChild
        size="lg"
        className="rounded-full px-9 md:px-11 bg-brand-primary hover:bg-brand-primary/90 text-white h-13 md:h-14 text-base font-bold transition-transform hover:scale-[1.02] border-none shadow-lg shadow-brand-primary/20"
      >
        <Link href="/assessment">
          Mulai Tes Gratis <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </Button>
    );
  }

  if (isLoggedIn && hasResult) {
    return (
      <Button
        asChild
        size="lg"
        className="rounded-full px-9 md:px-11 bg-brand-primary hover:bg-brand-primary/90 text-white h-13 md:h-14 text-base font-bold transition-transform hover:scale-[1.02] border-none shadow-lg shadow-brand-primary/20"
      >
        <Link href="/roadmap">
          Lanjut ke Roadmap Belajar <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </Button>
    );
  }

  if (isLoggedIn && !hasResult) {
    return (
      <Button
        asChild
        size="lg"
        className="rounded-full px-9 md:px-11 bg-brand-primary hover:bg-brand-primary/90 text-white h-13 md:h-14 text-base font-bold transition-transform hover:scale-[1.02] border-none shadow-lg shadow-brand-primary/20"
      >
        <Link href="/assessment">
          Mulai Tes <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </Button>
    );
  }

  return (
    <Button
      asChild
      size="lg"
      className="rounded-full px-9 md:px-11 bg-brand-primary hover:bg-brand-primary/90 text-white h-13 md:h-14 text-base font-bold transition-transform hover:scale-[1.02] border-none shadow-lg shadow-brand-primary/20"
    >
      <Link href="/assessment">
        Mulai Tes Gratis <ArrowRight className="ml-2 w-4 h-4" />
      </Link>
    </Button>
  );
}
