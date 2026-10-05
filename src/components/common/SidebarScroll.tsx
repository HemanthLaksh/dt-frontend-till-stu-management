"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface SidebarScrollProps {
  children: ReactNode;
  className?: string;
}

let savedSidebarScroll = 0;

export default function SidebarScroll({
  children,
  className = "",
}: SidebarScrollProps) {
  const pathname = usePathname();

  const navRef = useRef<HTMLElement | null>(null);

  // Save sidebar scroll position whenever user scrolls
  useEffect(() => {
    const nav = navRef.current;

    if (!nav) return;

    const handleScroll = () => {
      savedSidebarScroll = nav.scrollTop;
    };

    nav.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      nav.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Restore sidebar position after route changes
  useEffect(() => {
    const nav = navRef.current;

    if (!nav) return;

    const restoreScroll = () => {
      nav.scrollTop = savedSidebarScroll;
    };

    requestAnimationFrame(() => {
      restoreScroll();

      requestAnimationFrame(() => {
        restoreScroll();
      });
    });
  }, [pathname]);

  return (
    <nav
      ref={navRef}
      className={`flex-1 overflow-y-auto px-3 py-6 ${className}`}
    >
      {children}
    </nav>
  );
}