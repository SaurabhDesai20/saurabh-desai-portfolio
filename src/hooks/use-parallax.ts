"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

interface UseParallaxOptions {
  speed?: number;
  offset?: number;
}

/**
 * Hook for subtle parallax scrolling effect
 * Respects reduced motion preferences
 */
export function useParallax(options: UseParallaxOptions = {}) {
  const { speed = 0.5, offset = 0 } = options;
  const [scrollY, setScrollY] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId: number | null = null;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return 0;
  }

  return scrollY * speed + offset;
}

