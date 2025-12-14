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
  });

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

  return (
    <section id="experience" ref={ref} className="py-20 px-4">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              variants={itemVariants}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold text-cyan-400">
                  {exp.role}
                </h3>
                <div className="flex items-center gap-2 text-foreground">
                  <Building2 className="w-4 h-4" />
                  <span className="font-medium">{exp.company}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {exp.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {exp.location}
                </span>
              </div>

              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {exp.tech.map((tech) => (
                  <span
                    key={tech}
                    className="glass px-3 py-1 rounded-full text-xs text-cyan-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}