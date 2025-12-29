"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { Code2, Terminal, Brackets, Database, ArrowRight, Mail } from "lucide-react";
import { CharacterReveal } from "@/components/CharacterReveal";
import { RippleEffect } from "@/components/RippleEffect";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function HeroSection() {
  const illustrationRef = useRef<HTMLDivElement>(null);
  const [showCursor, setShowCursor] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!illustrationRef.current) return;

    anime({
      targets: ".floating-icon",
      translateY: [-10, 10],
      duration: 2000,
      easing: "easeInOutSine",
      loop: true,
      direction: "alternate",
      delay: anime.stagger(200),
    });

    if (!prefersReducedMotion) {
      // Typing effect for code lines
      anime({
        targets: ".code-line",
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 800,
        easing: "easeOutExpo",
        delay: anime.stagger(150),
      });

      // Syntax highlight pulse
      anime({
        targets: ".code-keyword",
        opacity: [0.7, 1],
        duration: 1500,
        easing: "easeInOutSine",
        loop: true,
        direction: "alternate",
        delay: anime.stagger(200),
      });
    } else {
      // Simple fade-in for reduced motion
      anime({
        targets: ".code-line",
        opacity: [0, 1],
        duration: 400,
        delay: anime.stagger(50),
      });
    }
  }, [prefersReducedMotion]);

  // Cursor blink animation
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block glass px-4 py-2 rounded-full mb-6"
            >
              <span className="text-cyan-400 text-sm font-medium">
                Welcome to my portfolio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Hi, I&apos;m
              <br />
              <motion.span 
                className="gradient-text glow-text whitespace-nowrap inline-block"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <CharacterReveal 
                  text="Saurabh Santosh Desai" 
                  delay={0.5}
                  duration={0.03}
                />
              </motion.span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-muted-foreground mb-6"
            >
              Software Developer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted-foreground text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Crafting elegant digital solutions with clean code and modern
              technologies. Passionate about building scalable applications that
              make a difference.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <RippleEffect className="inline-block">
                <motion.a
                  href="#projects"
                  className="glass-card px-8 py-3 rounded-full text-foreground font-medium hover:bg-cyan-500/20 transition-all duration-300 relative overflow-hidden group flex items-center gap-2 justify-center"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  whileFocus={{ 
                    scale: 1.05,
                    boxShadow: "0 0 0 3px rgba(34, 211, 238, 0.2)",
                  }}
                  transition={{ 
                    duration: 0.2, 
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <span className="relative z-10">View Projects</span>
                  <motion.span
                    className="relative z-10"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </motion.a>
              </RippleEffect>
              <RippleEffect className="inline-block">
                <motion.a
                  href="#contact"
                  className="glass px-8 py-3 rounded-full text-cyan-400 font-medium border border-cyan-400/30 hover:border-cyan-400 transition-all duration-300 relative overflow-hidden flex items-center gap-2 justify-center"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(34, 211, 238, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  whileFocus={{ 
                    scale: 1.05,
                    boxShadow: "0 0 0 3px rgba(34, 211, 238, 0.2)",
                  }}
                  transition={{ 
                    duration: 0.2, 
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <span className="relative z-10">Get in Touch</span>
                  <motion.span
                    className="relative z-10"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <Mail className="w-4 h-4" />
                  </motion.span>
                </motion.a>
              </RippleEffect>
            </motion.div>
          </motion.div>

          <motion.div
            ref={illustrationRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <motion.div 
                className="absolute inset-0 glass rounded-3xl overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 40px rgba(34, 211, 238, 0.3)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10" />
                <div className="p-6 space-y-3 relative">
                  <div className="code-line flex items-center gap-3 text-cyan-400">
                    <span className="text-muted-foreground">1</span>
                    <span className="text-purple-400 code-keyword">const</span>{" "}
                    <span className="text-cyan-300">developer</span> ={" "}
                    <span className="text-yellow-400">&quot;Saurabh&quot;</span>;
                  </div>
                  <div className="code-line flex items-center gap-3 text-cyan-400">
                    <span className="text-muted-foreground">2</span>
                    <span className="text-purple-400 code-keyword">const</span>{" "}
                    <span className="text-cyan-300">passion</span> ={" "}
                    <span className="text-yellow-400">&quot;coding&quot;</span>;
                  </div>
                  <div className="code-line flex items-center gap-3 text-cyan-400">
                    <span className="text-muted-foreground">3</span>
                    <span className="text-purple-400 code-keyword">const</span>{" "}
                    <span className="text-cyan-300">skills</span> = [
                  </div>
                  <div className="code-line flex items-center gap-3 text-cyan-400 pl-6">
                    <span className="text-muted-foreground">4</span>
                    <span className="text-yellow-400">&quot;React&quot;</span>,{" "}
                    <span className="text-yellow-400">&quot;Next.js&quot;</span>,
                  </div>
                  <div className="code-line flex items-center gap-3 text-cyan-400 pl-6">
                    <span className="text-muted-foreground">5</span>
                    <span className="text-yellow-400">&quot;TypeScript&quot;</span>,
                  </div>
                  <div className="code-line flex items-center gap-3 text-cyan-400">
                    <span className="text-muted-foreground">6</span>];
                  </div>
                  <div className="code-line flex items-center gap-3 text-cyan-400">
                    <span className="text-muted-foreground">7</span>
                  </div>
                  <div className="code-line flex items-center gap-3 text-cyan-400">
                    <span className="text-muted-foreground">8</span>
                    <span className="text-green-400">// Building the future</span>
                    {!prefersReducedMotion && (
                      <motion.span
                        animate={{ opacity: showCursor ? 1 : 0 }}
                        transition={{ duration: 0.1 }}
                        className="inline-block w-0.5 h-5 bg-cyan-400 ml-1"
                      />
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="floating-icon absolute -top-4 -left-4 glass p-4 rounded-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Code2 className="w-8 h-8 text-cyan-400" />
              </motion.div>

              <motion.div
                className="floating-icon absolute -top-4 -right-4 glass p-4 rounded-2xl"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <Terminal className="w-8 h-8 text-teal-400" />
              </motion.div>

              <motion.div
                className="floating-icon absolute -bottom-4 -left-4 glass p-4 rounded-2xl"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <Brackets className="w-8 h-8 text-purple-400" />
              </motion.div>

              <motion.div
                className="floating-icon absolute -bottom-4 -right-4 glass p-4 rounded-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Database className="w-8 h-8 text-yellow-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
