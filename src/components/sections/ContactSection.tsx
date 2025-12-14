"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", phone: "", message: "" });
        setShowDialog(true);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <section id="contact" ref={ref} className="py-20 px-4">
      <motion.div
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Contact Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6 h-full flex flex-col">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="glass border-white/10 focus:border-cyan-400 bg-transparent"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="glass border-white/10 focus:border-cyan-400 bg-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="glass border-white/10 focus:border-cyan-400 bg-transparent"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="glass border-white/10 focus:border-cyan-400 bg-transparent min-h-[120px] resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-auto">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full glass border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </Button>
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
                  className="flex items-center gap-4 p-4 glass rounded-xl"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34, 211, 238, 0.1)" }}
                >
                  <div className="p-3 glass rounded-full">
                    <Phone className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-foreground font-medium">9082801644</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 p-4 glass rounded-xl"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34, 211, 238, 0.1)" }}
                >
                  <div className="p-3 glass rounded-full">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground font-medium break-all">saurabhdesai2006@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 p-4 glass rounded-xl"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34, 211, 238, 0.1)" }}
                >
                  <div className="p-3 glass rounded-full">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground font-medium">Bandra, Mumbai</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

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