"use client";

import { useEffect, useRef } from "react";

interface AriaLiveRegionProps {
  message: string;
  priority?: "polite" | "assertive";
  id?: string;
}

/**
 * ARIA live region component for screen reader announcements
 * Use this to announce dynamic content changes to screen readers
 */
export function AriaLiveRegion({ 
  message, 
  priority = "polite",
  id = "aria-live-region"
}: AriaLiveRegionProps) {
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message && regionRef.current) {
      // Clear previous message to ensure announcement
      regionRef.current.textContent = "";
      // Use requestAnimationFrame to ensure the clear is processed
      requestAnimationFrame(() => {
        if (regionRef.current) {
          regionRef.current.textContent = message;
        }
      });
    }
  }, [message]);

  return (
    <div
      ref={regionRef}
      id={id}
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    />
  );
}

