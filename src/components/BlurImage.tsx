"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface BlurImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  unoptimized?: boolean;
}

export function BlurImage({
  src,
  alt,
  fill = false,
  className,
  priority = false,
  sizes,
  unoptimized = false,
}: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  if (fill) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          {isLoading && !hasError && (
            <>
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10"
                style={{
                  filter: "blur(20px)",
                  transform: "scale(1.1)",
                }}
              />
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    width: "50%",
                    height: "100%",
                  }}
                />
              )}
            </>
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isLoading ? 0 : 1,
            filter: isLoading ? "blur(20px)" : "blur(0px)",
          }}
          transition={{ 
            duration: prefersReducedMotion ? 0 : 0.4,
            ease: "easeOut",
          }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt={alt}
            fill
            className={cn("object-cover", className)}
            priority={priority}
            sizes={sizes}
            unoptimized={unoptimized}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <AnimatePresence>
        {isLoading && !hasError && (
          <>
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10"
              style={{
                filter: "blur(20px)",
                transform: "scale(1.1)",
              }}
            />
            {!prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  width: "50%",
                  height: "100%",
                }}
              />
            )}
          </>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isLoading ? 0 : 1,
          filter: isLoading ? "blur(20px)" : "blur(0px)",
        }}
        transition={{ 
          duration: prefersReducedMotion ? 0 : 0.4,
          ease: "easeOut",
        }}
        className="relative"
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          className={cn("object-cover", className)}
          priority={priority}
          sizes={sizes}
          unoptimized={unoptimized}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      </motion.div>
    </div>
  );
}

