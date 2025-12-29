"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/FormField";
import { Confetti } from "@/components/Confetti";
import { AriaLiveRegion } from "@/components/AriaLiveRegion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ContactSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: "0px 0px -50px 0px",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [announcement, setAnnouncement] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitState("loading");
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitState("success");
        setAnnouncement("Form submitted successfully. Thank you for your message!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => {
          setShowDialog(true);
          setSubmitState("idle");
          setAnnouncement("");
        }, 1500);
      } else {
        setSubmitState("error");
        setAnnouncement("Error submitting form. Please try again.");
        setTimeout(() => {
          setSubmitState("idle");
          setAnnouncement("");
        }, 2000);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitState("error");
      setAnnouncement("Error submitting form. Please try again.");
      setTimeout(() => {
        setSubmitState("idle");
        setAnnouncement("");
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <section id="contact" ref={ref} className="py-20 px-4">
      <AriaLiveRegion 
        message={announcement} 
        priority={submitState === "error" ? "assertive" : "polite"}
        id="contact-form-announcement"
      />
      <motion.div
        className="max-w-5xl mx-auto"
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
              Contact Me
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

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6 h-full flex flex-col">
              <FormField
                id="name"
                label="Name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
              />

              <FormField
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                required
              />

              <FormField
                id="phone"
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
              />

              <div className="flex-1">
                <FormField
                  id="message"
                  label="Message"
                  type="textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message..."
                  required
                />
              </div>

              <motion.div className="mt-auto">
                <motion.div
                  whileHover={submitState === "idle" ? { scale: 1.02 } : {}}
                  whileTap={submitState === "idle" ? { scale: 0.98 } : {}}
                  whileFocus={submitState === "idle" ? { scale: 1.01 } : {}}
                  animate={
                    submitState === "error"
                      ? {
                          x: [0, -10, 10, -10, 10, 0],
                        }
                      : {}
                  }
                  transition={
                    submitState === "error"
                      ? {
                          duration: 0.5,
                          ease: "easeInOut",
                        }
                      : { type: "spring", stiffness: 400, damping: 17 }
                  }
                >
                  <motion.div
                    animate={{
                      width: submitState === "loading" ? "102%" : "100%",
                    }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="w-full"
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full glass border text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 relative overflow-hidden ${
                        submitState === "error"
                          ? "border-red-400 hover:border-red-400"
                          : "border-cyan-400/30"
                      } ${
                        submitState === "success"
                          ? "border-green-400 hover:border-green-400"
                          : ""
                      }`}
                    >
                      {submitState === "loading" && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-teal-400"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                        />
                      )}
                      {submitState === "error" && (
                        <motion.div
                          className="absolute inset-0 border-2 border-red-400 rounded-md pointer-events-none"
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0"
                      animate={{
                        x: submitState === "loading" ? ["-100%", "200%"] : "-100%",
                      }}
                      transition={{
                        duration: 2,
                        repeat: submitState === "loading" ? Infinity : 0,
                        ease: "linear",
                      }}
                    />
                    <AnimatePresence mode="wait">
                      {submitState === "loading" && (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 relative z-10"
                        >
                          <motion.div
                            className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Sending...
                        </motion.span>
                      )}
                      {submitState === "success" && (
                        <motion.span
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2 relative z-10"
                        >
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          >
                            <Check className="w-4 h-4 text-green-400" />
                          </motion.div>
                          Sent!
                        </motion.span>
                      )}
                      {submitState === "error" && (
                        <motion.span
                          key="error"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 relative z-10"
                        >
                          <X className="w-4 h-4 text-red-400" />
                          Error - Try Again
                        </motion.span>
                      )}
                      {submitState === "idle" && (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 relative z-10"
                        >
                          <motion.span
                            animate={{ x: [0, 2, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Send className="w-4 h-4" />
                          </motion.span>
                          Send Message
                        </motion.span>
                      )}
                    </AnimatePresence>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </form>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <div className="glass p-8 rounded-2xl h-full flex flex-col">
              <h3 className="text-xl font-semibold text-cyan-400 mb-6">
                Get in Touch
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Feel free to reach out if you have any questions or would like to work together. 
                I&apos;m always open to discussing new projects and opportunities.
              </p>

              <div className="space-y-4 mt-auto">
                <motion.div
                  className="flex items-center gap-4 p-4 glass rounded-xl group cursor-pointer"
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)",
                    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                  }}
                >
                  <motion.div 
                    className="p-3 glass rounded-full"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <Phone className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-muted-foreground group-hover:text-cyan-400 transition-colors duration-250">Phone</p>
                    <p className="text-foreground font-medium group-hover:text-cyan-400 transition-colors duration-250">9082801644</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 p-4 glass rounded-xl group cursor-pointer"
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)",
                    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                  }}
                >
                  <motion.div 
                    className="p-3 glass rounded-full"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-muted-foreground group-hover:text-cyan-400 transition-colors duration-250">Email</p>
                    <p className="text-foreground font-medium break-all group-hover:text-cyan-400 transition-colors duration-250">saurabhdesai2006@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 p-4 glass rounded-xl group cursor-pointer"
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)",
                    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                  }}
                >
                  <motion.div 
                    className="p-3 glass rounded-full"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <MapPin className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-muted-foreground group-hover:text-cyan-400 transition-colors duration-250">Location</p>
                    <p className="text-foreground font-medium group-hover:text-cyan-400 transition-colors duration-250">Bandra, Mumbai</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Confetti trigger={submitState === "success"} />

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="backdrop-blur-3xl bg-background/60 border-cyan-400/50 sm:max-w-md shadow-[0_0_30px_rgba(34,211,238,0.3)]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-cyan-400 text-center">Thank you for contacting me.</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center text-muted-foreground space-y-2 py-4">
            <span className="block">Your message has been received, and I will get back to you shortly.</span>
            <span className="block pt-4 font-medium text-foreground">— Saurabh Santosh Desai</span>
          </DialogDescription>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => setShowDialog(false)}
              className="glass border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 px-8"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}