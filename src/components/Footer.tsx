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
              className="glass p-3 rounded-full hover:border-cyan-400 transition-all"
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5 text-muted-foreground hover:text-cyan-400 transition-colors" />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/saurabh-desai-97925321b/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-3 rounded-full hover:border-cyan-400 transition-all"
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-cyan-400 transition-colors" />
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
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}