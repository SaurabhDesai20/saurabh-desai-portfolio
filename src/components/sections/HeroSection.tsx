"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import anime from "animejs";
import { Code2, Terminal, Brackets, Database } from "lucide-react";

export function HeroSection() {
  const illustrationRef = useRef<HTMLDivElement>(null);

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

    anime({
      targets: ".code-line",
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 800,
      easing: "easeOutExpo",
      delay: anime.stagger(100),
    });
  }, []);

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
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text glow-text">
                Saurabh Santosh Desai
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground mb-6"
            >
              Software Developer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-muted-foreground text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Crafting elegant digital solutions with clean code and modern
              technologies. Passionate about building scalable applications that
              make a difference.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                className="glass-card px-8 py-3 rounded-full text-foreground font-medium hover:bg-cyan-500/20 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                className="glass px-8 py-3 rounded-full text-cyan-400 font-medium border border-cyan-400/30 hover:border-cyan-400 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
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
              <div className="absolute inset-0 glass rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10" />
                <div className="p-6 space-y-3">
                  <div className="code-line flex items-center gap-3 text-cyan-400">
                    <span className="text-muted-foreground">1</span>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-cyan-300">developer</span> ={" "}
                    <span className="text-yellow-400">&quot;Saurabh&quot;</span>;
                  </div>
                  <div className="code-line flex items-center gap-3 text-cyan-400">
                    <span className="text-muted-foreground">2</span>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-cyan-300">passion</span> ={" "}
                    <span className="text-yellow-400">&quot;coding&quot;</span>;
                  </div>
                  <div className="code-line flex items-center gap-3 text-cyan-400">
                    <span className="text-muted-foreground">3</span>
                    <span className="text-purple-400">const</span>{" "}
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
                  </div>
                </div>
              </div>

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
