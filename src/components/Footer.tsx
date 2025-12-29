"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, Linkedin, Heart, Code2 } from "lucide-react";

export function Footer() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="py-12 px-4 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-center md:text-left"
          >
            <a
              href="#home"
              className="text-3xl font-bold gradient-text"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              SD
            </a>
            <p className="text-muted-foreground text-sm mt-2">
              Software Developer
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-4"
          >
            <motion.a
              href="https://github.com/SaurabhDesai20"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-3 rounded-full hover:border-cyan-400 transition-all relative group"
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                style={{
                  boxShadow: "0 0 20px rgba(34, 211, 238, 0.6)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(34, 211, 238, 0.6)",
                    "0 0 30px rgba(34, 211, 238, 0.8)",
                    "0 0 20px rgba(34, 211, 238, 0.6)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <Github className="w-5 h-5 text-muted-foreground group-hover:text-cyan-400 transition-colors duration-250 relative z-10" />
              </motion.div>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/saurabh-desai-97925321b/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-3 rounded-full hover:border-cyan-400 transition-all relative group"
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                style={{
                  boxShadow: "0 0 20px rgba(34, 211, 238, 0.6)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(34, 211, 238, 0.6)",
                    "0 0 30px rgba(34, 211, 238, 0.8)",
                    "0 0 20px rgba(34, 211, 238, 0.6)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-cyan-400 transition-colors duration-250 relative z-10" />
              </motion.div>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-center md:text-right"
          >
            <div className="text-muted-foreground text-sm flex items-center justify-center md:justify-end gap-1">
              <Code2 className="w-4 h-4 text-cyan-400" />
              Built with
              <Heart className="w-4 h-4 text-red-400 fill-red-400" />
              by Saurabh
            </div>
            <div className="text-muted-foreground text-xs mt-1">
              © {new Date().getFullYear()} All rights reserved.
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-8 border-t border-white/5"
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map(
              (item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative inline-block hover:text-cyan-400 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  {item}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  />
                </motion.a>
              )
            )}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}