"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook for debouncing values
 * Useful for scroll-based animations to improve performance
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Debounce function for scroll event handlers
 * Uses requestAnimationFrame for optimal performance
 */
export function debounceScroll(
  callback: () => void,
  delay: number = 16
): () => void {
  let rafId: number | null = null;
  let lastCallTime = 0;

  return () => {
    const now = Date.now();
    
    if (now - lastCallTime >= delay) {
      lastCallTime = now;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        callback();
        rafId = null;
      });
    }
  };
}

