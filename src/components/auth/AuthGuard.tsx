"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isProtectedPage = 
    pathname?.startsWith("/assessment") || 
    pathname?.startsWith("/roadmap") || 
    pathname?.startsWith("/gap-analysis");

  const [loading, setLoading] = useState<boolean>(Boolean(isProtectedPage || isAuthPage));

  useEffect(() => {
    const checkAuth = () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("gapless_session") : null;

      if (!token && isProtectedPage) {
        router.push("/login?error=unauthorized");
      } else if (token && isAuthPage) {
        router.push("/assessment");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router, isProtectedPage, isAuthPage]);

  if (loading && (isProtectedPage || isAuthPage)) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-2 border-brand-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-t-2 border-brand-secondary animate-spin"></div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
