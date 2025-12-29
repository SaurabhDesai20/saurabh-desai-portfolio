"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Github,
  Linkedin,
  Download,
  GraduationCap,
  MapPin,
  Loader2,
  Check,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Confetti } from "@/components/Confetti";

export function AboutSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: "0px 0px -50px 0px",
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadState, setDownloadState] = useState<"idle" | "loading" | "success">("idle");
  const [showConfetti, setShowConfetti] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const handleDownloadResume = () => {
    setIsDownloading(true);
    setDownloadState("loading");

    const link = document.createElement("a");
    link.href = "/Saurabh_Desai_Resume.pdf";
    link.download = "Saurabh_Desai_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Simulate download progress
    setTimeout(() => {
      setDownloadState("success");
      setShowConfetti(true);
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadState("idle");
        setShowConfetti(false);
      }, 1500);
    }, 800);
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 px-4 min-h-screen flex items-center"
    >
      <motion.div
        className="max-w-7xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            initial={{ 
              letterSpacing: "-0.05em",
              opacity: 0,
              y: 20,
            }}
            animate={inView ? {
              letterSpacing: "0em",
              opacity: 1,
              y: 0,
            } : {
              letterSpacing: "-0.05em",
              opacity: 0,
              y: 20,
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.span
              className="inline-block"
              animate={inView ? {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: "linear-gradient(90deg, #22d3ee, #06b6d4, #22d3ee)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              About Me
            </motion.span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ originX: 0.5 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center"
          >
            <div className="relative">
              <div className="w-72 h-72 md:w-80 md:h-80 glass rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10" />
                <Image
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80"
                  alt="Developer Workspace"
                  fill
                  className="object-cover"
                />
              </div>

              <motion.div
                className="absolute -top-6 -right-6 glass p-4 rounded-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <GraduationCap className="w-6 h-6 text-cyan-400" />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              >
                <MapPin className="w-6 h-6 text-teal-400" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Highest Education
              </h3>
              <p className="text-foreground font-medium">
                Bachelor Of Engineering in Information Technology
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Vasantdada Patil Prathisthan College of Engineering & Visual
                Arts, Sion
              </p>
              <p className="text-muted-foreground text-sm">2021 – 2025</p>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location
              </h3>
              <p className="text-foreground">Sion, Mumbai</p>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <p className="text-muted-foreground leading-relaxed">
                Motivated and enthusiastic IT student with a strong foundation
                in programming languages. Quick learner with excellent
                problem-solving abilities and a passion for technology and
                software development. Eager to apply technical skills in a
                practical setting and contribute to innovative projects.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="https://github.com/SaurabhDesai20"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card px-6 py-3 rounded-full flex items-center gap-2 text-foreground hover:text-cyan-400 transition-colors"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(34, 211, 238, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                whileFocus={{ 
                  scale: 1.02,
                  boxShadow: "0 0 0 3px rgba(34, 211, 238, 0.2)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.span
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Github className="w-5 h-5" />
                </motion.span>
                GitHub
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/saurabh-desai-97925321b/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card px-6 py-3 rounded-full flex items-center gap-2 text-foreground hover:text-cyan-400 transition-colors"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(34, 211, 238, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                whileFocus={{ 
                  scale: 1.02,
                  boxShadow: "0 0 0 3px rgba(34, 211, 238, 0.2)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.span
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.span>
                LinkedIn
              </motion.a>

              <motion.button
                onClick={handleDownloadResume}
                disabled={isDownloading}
                className="glass px-6 py-3 rounded-full flex items-center gap-2 border border-cyan-400/30 text-cyan-400
             hover:bg-cyan-400/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                whileHover={downloadState === "idle" ? {
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(34, 211, 238, 0.3)",
                } : {}}
                whileTap={{ scale: 0.95 }}
                whileFocus={{ 
                  scale: 1.02,
                  boxShadow: "0 0 0 3px rgba(34, 211, 238, 0.2)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <AnimatePresence mode="wait">
                  {downloadState === "loading" && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="w-5 h-5" />
                      </motion.div>
                      Downloading...
                    </motion.div>
                  )}
                  {downloadState === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                          duration: 0.4,
                        }}
                      >
                        <Check className="w-5 h-5 text-green-400" />
                      </motion.div>
                      Downloaded!
                    </motion.div>
                  )}
                  {downloadState === "idle" && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="flex items-center gap-2"
                    >
                      <motion.span
                        whileHover={{ y: [0, -2, 0] }}
                        transition={{ duration: 0.3 }}
                      >
                        <Download className="w-5 h-5" />
                      </motion.span>
                      Download Resume
                    </motion.div>
                  )}
                </AnimatePresence>
                {showConfetti && <Confetti />}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
