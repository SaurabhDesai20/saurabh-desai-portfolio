"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { use3DTilt } from "@/hooks/use-3d-tilt";
import { useParallax } from "@/hooks/use-parallax";
import { RippleEffect } from "@/components/RippleEffect";

const skills = [
  { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invertInDark: true },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Core Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Java Swing", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Java AWT", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "JDBC", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", invertInDark: true },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invertInDark: true },
  { name: "REST API", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Prisma ORM", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg", invertInDark: true },
  { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Git & GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

const tools = [
  { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "PyCharm", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg" },
  { name: "IntelliJ IDEA", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg" },
  { name: "Eclipse IDE", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eclipse/eclipse-original.svg" },
  { name: "Cursor", logo: "https://cursor.com/marketing-static/_next/image?url=%2Fmarketing-static%2Fdownload%2Fapp-icon-25d-light.png&w=3840&q=70" },
];

export function SkillsSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: "0px 0px -50px 0px",
  });
  const parallaxY = useParallax({ speed: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.8,
      rotate: -2,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.4,
      },
    },
  };

  const skillCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.8,
      rotate: -2,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.4,
        delay: index * 0.05,
      },
    }),
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 px-4"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div 
          variants={itemVariants} 
          className="text-center mb-16"
          style={{ y: parallaxY * 0.5 }}
        >
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
              Skills & Technologies
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

        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-xl font-semibold text-cyan-400 mb-6 text-center">
            Technologies
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {skills.map((skill, index) => {
              const tilt = use3DTilt({ maxTilt: 5, scale: 1.05 });
              return (
                <RippleEffect key={skill.name} className="w-full">
                  <motion.div
                    ref={tilt.ref as React.RefObject<HTMLDivElement>}
                    variants={skillCardVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    custom={index}
                    className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center gap-3 group cursor-pointer relative overflow-hidden"
                    style={tilt.style as React.CSSProperties}
                    whileHover={{
                      boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <motion.div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(6, 182, 212, 0.2))",
                        borderRadius: "inherit",
                      }}
                    />
                    <motion.div 
                      className="relative w-10 h-10 z-10"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <Image
                        src={skill.logo}
                        alt={skill.name}
                        fill
                        className={`object-contain ${skill.invertInDark ? 'dark:invert' : ''}`}
                        unoptimized
                      />
                    </motion.div>
                    <span className="text-xs text-center text-muted-foreground group-hover:text-cyan-400 transition-colors relative z-10">
                      {skill.name}
                    </span>
                  </motion.div>
                </RippleEffect>
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-semibold text-cyan-400 mb-6 text-center">
            Tools & IDEs
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 max-w-3xl mx-auto">
            {tools.map((tool, index) => {
              const tilt = use3DTilt({ maxTilt: 5, scale: 1.05 });
              const toolIndex = skills.length + index;
              return (
                <RippleEffect key={tool.name} className="w-full">
                  <motion.div
                    ref={tilt.ref as React.RefObject<HTMLDivElement>}
                    variants={skillCardVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    custom={toolIndex}
                    className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center gap-3 group cursor-pointer relative overflow-hidden"
                    style={tilt.style as React.CSSProperties}
                    whileHover={{
                      boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <motion.div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(6, 182, 212, 0.2))",
                        borderRadius: "inherit",
                      }}
                    />
                    <motion.div 
                      className="relative w-10 h-10 z-10"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <Image
                        src={tool.logo}
                        alt={tool.name}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </motion.div>
                    <span className="text-xs text-center text-muted-foreground group-hover:text-cyan-400 transition-colors relative z-10">
                      {tool.name}
                    </span>
                  </motion.div>
                </RippleEffect>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}