"use client";

import { useState, useRef, useEffect } from "react";
import { useReducedMotion } from "./use-reduced-motion";

interface Use3DTiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
}

export function use3DTilt(options: Use3DTiltOptions = {}) {
  const { maxTilt = 5, perspective = 1000, scale = 1.02 } = options;
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const elementRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;

  useEffect(() => {
    if (prefersReducedMotion || isTouchDevice || !elementRef.current) {
      return;
    }

    const element = elementRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (mouseY / (rect.height / 2)) * -maxTilt;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

      setTilt({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
      setTilt({ rotateX: 0, rotateY: 0 });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxTilt, prefersReducedMotion, isTouchDevice]);

  const transformStyle = prefersReducedMotion
    ? {}
    : {
        transform: `perspective(${perspective}px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${scale})`,
        transformStyle: "preserve-3d" as const,
      };

  return {
    ref: elementRef,
    style: transformStyle,
  };
}

