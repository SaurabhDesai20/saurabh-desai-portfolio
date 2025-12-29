"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";
import { BlurImage } from "@/components/BlurImage";
import { RippleEffect } from "@/components/RippleEffect";

const projects = [
  {
    name: "Socially – Social Media Platform",
    description:
      "Full-stack social media app with authentication, post creation, likes, comments, follows, and real-time notifications.",
    techStack: ["Next.js", "TailwindCSS", "PostgreSQL", "Prisma", "Clerk"],
    link: "https://github.com/SaurabhDesai20/socially-social-media.git",
    liveLink: "https://socially-social-media-rho.vercel.app",
    isGithub: true,
    image: "https://www.quanthub.com/wp-content/uploads/AdobeStock_226367431-1.jpeg",
  },
  {
    name: "Signalist – Stock Market App",
    description:
      "Stock tracking platform with real-time monitoring and personalized email insights.",
    techStack: ["Next.js", "TailwindCSS", "MongoDB", "Inngest", "Better-Auth"],
    liveLink: "https://signalist-stock-tracker-app-ten-kappa.vercel.app/",
    githubLink: "https://github.com/SaurabhDesai20/signalist_stock-tracker-app.git",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60",
  },
  {
    name: "Electricity Billing System",
    description:
      "Java-based system automating billing, meter reading, and reports.",
    techStack: ["Java Swing", "AWT", "JDBC", "SQL"],
    link: "https://github.com/SaurabhDesai20/Electricity-Billing-System.git",
    isGithub: true,
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=60",
  },
];

export function ProjectsSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: "0px 0px -50px 0px",
  });

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
        stiffness: 150,
        damping: 25,
        duration: 0.5,
      },
    },
  };

  return (
    <section id="projects" ref={ref} className="py-20 px-4">
      <motion.div
        className="max-w-7xl mx-auto"
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
              Projects
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <RippleEffect key={project.name} className="w-full h-full">
              <motion.div
                variants={itemVariants}
                className="glass-card rounded-2xl overflow-hidden group cursor-pointer relative h-full flex flex-col"
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 60px rgba(34, 211, 238, 0.4)",
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ willChange: "transform" }}
                onAnimationComplete={() => {
                  // Remove will-change after animation completes
                  if (typeof document !== "undefined") {
                    const element = document.querySelector(`[data-project="${project.name}"]`);
                    if (element instanceof HTMLElement) {
                      element.style.willChange = "auto";
                    }
                  }
                }}
                data-project={project.name}
              >
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{ willChange: "transform" }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ opacity: 0.7 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{ willChange: "opacity" }}
                    >
                      <BlurImage
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.name}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 min-h-[3.75rem]">
                  {project.description}
                </p>

                <motion.div 
                  className="flex flex-wrap gap-2 mb-6 min-h-[2rem]"
                >
                  {project.techStack.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      className="glass px-3 py-1 rounded-full text-xs text-cyan-400"
                      initial={{ y: 0 }}
                      whileHover={{
                        y: -4,
                        transition: { delay: techIndex * 0.03, duration: 0.2, ease: "easeOut" },
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                <div className="flex gap-3 mt-auto">
                  {"liveLink" in project && (
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-foreground hover:text-cyan-400 hover:border-cyan-400 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live
                    </motion.a>
                  )}
                  
                  {"githubLink" in project ? (
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-foreground hover:text-cyan-400 hover:border-cyan-400 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
                    </motion.a>
                  ) : (
                    "link" in project && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-foreground hover:text-cyan-400 hover:border-cyan-400 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {project.isGithub ? (
                          <>
                            <Github className="w-4 h-4" />
                            View on GitHub
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-4 h-4" />
                            View Live
                          </>
                        )}
                      </motion.a>
                    )
                  )}
                </div>
              </div>
            </motion.div>
            </RippleEffect>
          ))}
        </div>
      </motion.div>
    </section>
  );
}