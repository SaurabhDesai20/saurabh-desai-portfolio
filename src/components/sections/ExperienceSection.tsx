"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Building2, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    company: "Ant Systemz",
    role: "Software Developer",
    date: "12/2025 – Present",
    location: "Andheri, Mumbai",
    tech: ["React", "Next.js", "Flask", "ML", "MySQL", "PostgreSQL", "AWS"],
    description:
      "Working on full-stack applications using modern technologies. Building scalable solutions with React, Next.js, and Flask. Implementing machine learning models and managing databases with MySQL and PostgreSQL on AWS infrastructure.",
  },
  {
    company: "CodSoft",
    role: "Web Developer Intern",
    date: "01/2025 – 02/2025",
    location: "Virtual Internship (Mumbai)",
    tech: ["ReactJS", "Tailwind CSS", "Firebase"],
    description:
      "Developed responsive web applications using React.js and Tailwind CSS. Integrated Firebase for backend services including authentication and database management.",
  },
  {
    company: "Diabotics INDIA",
    role: "Java Developer Intern",
    date: "07/2024 – 08/2024",
    location: "Virtual Internship (Mumbai)",
    tech: ["Core Java", "Swing", "AWT", "JDBC", "MySQL"],
    description:
      "Developed desktop applications using Java Swing and AWT. Implemented database connectivity using JDBC and MySQL for data persistence and management.",
  },
];

export function ExperienceSection() {
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
        stiffness: 100,
        damping: 15,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="experience" ref={ref} className="py-20 px-4">
      <motion.div
        className="max-w-4xl mx-auto"
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
              Experience
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

        <div className="relative space-y-8 md:pl-8">
          {/* Timeline connector */}
          <motion.div
            className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-teal-400 to-cyan-400 opacity-30 hidden md:block"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            style={{ originY: 0 }}
          />
          
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={exp.company}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    x: isEven ? -50 : 50,
                    y: 30,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: { 
                      duration: 0.6, 
                      ease: [0.4, 0, 0.2, 1],
                      delay: index * 0.15,
                    },
                  },
                }}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="glass-card p-6 rounded-2xl relative group"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 40px rgba(34, 211, 238, 0.3)",
                  transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-250 rounded-2xl pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(6, 182, 212, 0.15))",
                    border: "1px solid rgba(34, 211, 238, 0.3)",
                  }}
                />
                {/* Timeline dot */}
                <motion.div
                  className="absolute -left-12 top-8 w-4 h-4 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full border-4 border-background hidden md:block z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.5 + index * 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                />
              <div className="flex flex-col gap-1 relative z-10">
                <h3 className="text-xl font-semibold text-cyan-400">
                  {exp.role}
                </h3>
                <div className="flex items-center gap-2 text-foreground">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Building2 className="w-4 h-4" />
                  </motion.div>
                  <span className="font-medium">{exp.company}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground relative z-10">
                <motion.span 
                  className="flex items-center gap-1 glass px-3 py-1 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ 
                    duration: 0.4,
                    delay: 0.7 + index * 0.15,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  {exp.date}
                </motion.span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {exp.location}
                </span>
              </div>

              <p className="text-muted-foreground mt-4 text-sm leading-relaxed relative z-10">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4 relative z-10">
                {exp.tech.map((tech, techIndex) => (
                  <motion.span
                    key={tech}
                    className="glass px-3 py-1 rounded-full text-xs text-cyan-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ 
                      duration: 0.3,
                      delay: 0.8 + index * 0.15 + techIndex * 0.05,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}