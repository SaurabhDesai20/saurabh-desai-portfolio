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
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function AboutSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [isDownloading, setIsDownloading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const handleDownloadResume = () => {
    setIsDownloading(true);

    const link = document.createElement("a");
    link.href = "/Saurabh_Desai_Resume.pdf";
    link.download = "Saurabh_Desai_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Spinner visible briefly (UX purpose)
    setTimeout(() => {
      setIsDownloading(false);
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
          <h2
            className="text-3xl md:text-4xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto rounded-full" />
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
              >
                <Github className="w-5 h-5" />
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
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </motion.a>

              <motion.button
                onClick={handleDownloadResume}
                disabled={isDownloading}
                className="glass px-6 py-3 rounded-full flex items-center gap-2 border border-cyan-400/30 text-cyan-400
             hover:bg-cyan-400/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(34, 211, 238, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download Resume
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
