"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles: HTMLDivElement[] = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full";
      const size = Math.random() * 4 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = `rgba(34, 211, 238, ${Math.random() * 0.3 + 0.1})`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      containerRef.current.appendChild(particle);
      particles.push(particle);
    }

    anime({
      targets: particles,
      translateX: () => anime.random(-50, 50),
      translateY: () => anime.random(-50, 50),
      scale: () => [1, anime.random(1.5, 2), 1],
      opacity: () => [
        { value: anime.random(0.1, 0.3), duration: anime.random(2000, 3000) },
        { value: 0.05, duration: anime.random(2000, 3000) }
      ],
      duration: () => anime.random(8000, 12000),
      easing: "easeInOutQuad",
      loop: true,
      direction: "alternate",
      delay: () => anime.random(0, 3000),
    });

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        ref={containerRef}
        className="absolute inset-0"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-[100px]" 
           style={{ animation: "float 20s ease-in-out infinite" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-400/5 rounded-full blur-[100px]" 
           style={{ animation: "float 25s ease-in-out infinite reverse" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-cyan-500/3 to-transparent rounded-full" />
      
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" 
             style={{ animation: "slideDown 15s ease-in-out infinite" }} />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent" 
             style={{ animation: "slideUp 18s ease-in-out infinite" }} />
        <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" 
             style={{ animation: "slideRight 20s ease-in-out infinite" }} />
        <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-teal-400/20 to-transparent" 
             style={{ animation: "slideLeft 22s ease-in-out infinite" }} />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes slideDown {
          0%, 100% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes slideUp {
          0%, 100% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes slideRight {
          0%, 100% { transform: translateX(0); opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes slideLeft {
          0%, 100% { transform: translateX(0); opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}