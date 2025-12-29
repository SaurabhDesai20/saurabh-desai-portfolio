"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface CharacterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

/**
 * Subtle character-by-character reveal animation for text
 * Respects reduced motion preferences
 */
export function CharacterReveal({ 
  text, 
  className = "", 
  delay = 0,
  duration = 0.05 
}: CharacterRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  // If reduced motion, just show the text without animation
  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const characters = text.split("");

  return (
    <span className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: delay + index * duration,
            ease: "easeOut",
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

