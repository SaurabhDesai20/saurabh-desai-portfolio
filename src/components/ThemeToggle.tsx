"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RippleEffect } from "@/components/RippleEffect";
import { AriaLiveRegion } from "@/components/AriaLiveRegion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="glass rounded-full w-10 h-10">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  const handleToggle = () => {
    setIsToggling(true);
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setAnnouncement(`Theme changed to ${newTheme} mode`);
    setTimeout(() => {
      setIsToggling(false);
      setAnnouncement("");
    }, 400);
  };

  return (
    <>
      <AriaLiveRegion 
        message={announcement} 
        priority="polite"
        id="theme-toggle-announcement"
      />
      <RippleEffect className="inline-block">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className="glass rounded-full w-10 h-10 relative overflow-hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isDark ? "sun" : "moon"}
              initial={{ rotate: -180, scale: 0.8, opacity: 0 }}
              animate={{ 
                rotate: 0, 
                scale: isToggling ? [0.8, 1.2, 1.0] : 1,
                opacity: 1 
              }}
              exit={{ rotate: 180, scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.4,
              }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-cyan-400" />
              ) : (
                <Moon className="h-5 w-5 text-cyan-600" />
              )}
            </motion.div>
          </AnimatePresence>
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{
              boxShadow: isToggling
                ? [
                    isDark
                      ? "0 0 20px rgba(34, 211, 238, 0.4)"
                      : "0 0 15px rgba(8, 145, 178, 0.3)",
                    isDark
                      ? "0 0 40px rgba(34, 211, 238, 0.8)"
                      : "0 0 30px rgba(8, 145, 178, 0.6)",
                    isDark
                      ? "0 0 20px rgba(34, 211, 238, 0.4)"
                      : "0 0 15px rgba(8, 145, 178, 0.3)",
                  ]
                : isDark
                ? "0 0 20px rgba(34, 211, 238, 0.4)"
                : "0 0 15px rgba(8, 145, 178, 0.3)",
            }}
            transition={{ 
              duration: 0.4,
              ease: "easeInOut",
            }}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </motion.div>
    </RippleEffect>
    </>
  );
}
