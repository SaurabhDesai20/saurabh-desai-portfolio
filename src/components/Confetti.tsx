"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  delay: number;
}

interface ConfettiProps {
  trigger: boolean;
  particleCount?: number;
  duration?: number;
}

/**
 * Subtle confetti effect for success states
 * Respects reduced motion preferences
 */
export function Confetti({ 
  trigger, 
  particleCount = 30,
  duration = 2000 
}: ConfettiProps) {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!trigger || prefersReducedMotion) {
      setParticles([]);
      return;
    }

    const colors = [
      "rgba(34, 211, 238, 0.8)", // cyan-400
      "rgba(6, 182, 212, 0.8)",   // teal-400
      "rgba(8, 145, 178, 0.8)",   // cyan-600
      "rgba(20, 184, 166, 0.8)",  // teal-500
    ];

    const newParticles: ConfettiParticle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.3,
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
    }, duration);

    return () => clearTimeout(timer);
  }, [trigger, particleCount, duration, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {particles.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                x: `${particle.x}vw`,
                y: `${particle.y}vh`,
                rotate: particle.rotation,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                y: "110vh",
                rotate: particle.rotation + 360,
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2,
                delay: particle.delay,
                ease: "easeOut",
              }}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: particle.color,
                boxShadow: `0 0 6px ${particle.color}`,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

