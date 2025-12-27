"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Particles from "@/components/ui/particles";

export function AnimatedBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [colorComponents, setColorComponents] = useState<string[]>(["#ffffff"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      // Bright white/cyan mix for dark mode
      setColorComponents(["#ffffff", "#ffffff", "#A3D8F4"]);
    } else {
      // Professional Cool & Soft palette for light mode (Sky 400, Indigo 400, Teal 400)
      setColorComponents(["#38bdf8", "#818cf8", "#2dd4bf"]);
    }
  }, [theme]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <Particles
        className="absolute inset-0"
        particleColors={colorComponents}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        particleHoverFactor={1}
        alphaParticles={false}
        disableRotation={false}
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