"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { AriaLiveRegion } from "@/components/AriaLiveRegion";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About Me", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact Me", href: "#contact" },
];

export function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectionAnnouncement, setSectionAnnouncement] = useState("");

  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);

          const sections = navItems.map((item) => item.href.slice(1));
          for (const section of sections.reverse()) {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= 150) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      // Close mobile menu first
      setMobileMenuOpen(false);
      
      // Use requestAnimationFrame to ensure menu closes before scrolling
      requestAnimationFrame(() => {
        // Calculate offset for fixed header (header height + some padding)
        const headerHeight = 80; // Approximate header height
        const offset = headerHeight + 20; // Additional padding
        
        // Get element position relative to viewport
        const elementPosition = element.getBoundingClientRect().top;
        // Get current scroll position
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        // Calculate target scroll position with offset
        const targetPosition = currentScroll + elementPosition - offset;
        
        // Custom smooth scroll with easing curve (cubic-bezier(0.4, 0, 0.2, 1))
        const startPosition = currentScroll;
        const distance = targetPosition - startPosition;
        const duration = 800; // 800ms as specified
        let startTime: number | null = null;
        
        const easeInOutCubic = (t: number): number => {
          return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
        
        const animateScroll = (currentTime: number) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          
          const easedProgress = easeInOutCubic(progress);
          const currentPosition = startPosition + distance * easedProgress;
          
          window.scrollTo(0, currentPosition);
          
          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        };
        
        requestAnimationFrame(animateScroll);
      });
    }
  };

  return (
    <>
      <AriaLiveRegion 
        message={sectionAnnouncement} 
        priority="polite"
        id="section-navigation-announcement"
      />
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 py-3"
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          backdropFilter: isScrolled ? "blur(24px)" : "blur(16px)",
        }}
        transition={{ 
          duration: 0.2, 
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{ 
          WebkitBackdropFilter: isScrolled ? "blur(24px)" : "blur(16px)",
          backgroundColor: isScrolled 
            ? "hsl(var(--background) / 0.6)" 
            : "hsl(var(--background) / 0.3)",
          boxShadow: isScrolled 
            ? "0 10px 40px rgba(0, 0, 0, 0.1)" 
            : "none",
          borderBottom: isScrolled 
            ? "1px solid rgba(34, 211, 238, 0.15)" 
            : "1px solid transparent",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="text-2xl font-bold gradient-text cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            SD
          </motion.a>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="relative px-4 py-2 text-sm font-medium rounded-full"
                animate={{
                  scale: activeSection === item.href.slice(1) ? 1.05 : 1.0,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                whileFocus={{ scale: 1.02 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 17,
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <motion.span
                  animate={{
                    color: activeSection === item.href.slice(1) 
                      ? "rgb(34, 211, 238)" 
                      : "rgb(148, 163, 184)",
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="relative z-10"
                >
                  {item.name}
                </motion.span>
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden glass rounded-full p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5 text-cyan-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5 text-cyan-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                height: "auto",
              }}
              exit={{ 
                opacity: 0, 
                y: -20, 
                height: 0,
              }}
              transition={{ 
                duration: 0.25, 
                ease: "easeOut",
                exit: { duration: 0.2, ease: "easeIn" },
              }}
              className="md:hidden glass mt-3 rounded-2xl p-4 overflow-hidden backdrop-blur-[30px]"
              style={{ 
                WebkitBackdropFilter: "blur(30px)",
                backdropFilter: "blur(30px)",
              }}
            >
              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    className={`px-4 py-3 text-left rounded-xl transition-all duration-300 ${
                      activeSection === item.href.slice(1)
                        ? "glass text-cyan-400"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
    </>
  );
}