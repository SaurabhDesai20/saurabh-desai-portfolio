"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { User, Mail, Phone, MessageSquare, CheckCircle2 } from "lucide-react";

interface FormFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  error?: string;
}

export function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  className,
  error,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setHasValue(value.length > 0);
  }, [value]);

  const isActive = isFocused || hasValue;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const baseInputClasses = "glass border-white/10 focus:border-cyan-400 bg-transparent transition-all duration-200";
  const errorInputClasses = error ? "border-red-400 focus:border-red-400" : "";

  const getIcon = () => {
    switch (id) {
      case "name":
        return <User className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      case "phone":
        return <Phone className="w-4 h-4" />;
      case "message":
        return <MessageSquare className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className={cn("relative", className)}
      animate={error ? {
        x: [0, -8, 8, -8, 8, 0],
      } : {}}
      transition={error ? {
        duration: 0.4,
        ease: "easeInOut",
      } : {}}
    >
      <motion.label
        htmlFor={id}
        className="block text-sm font-medium text-foreground mb-2"
        animate={{
          y: isActive ? -8 : 0,
          scale: isActive ? 0.85 : 1,
          color: isActive ? "rgb(34, 211, 238)" : "currentColor",
        }}
        transition={{
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          originX: 0,
        }}
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </motion.label>

      <div className="relative">
        <AnimatePresence>
          {isFocused && getIcon() && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className={`absolute left-3 text-cyan-400 z-10 pointer-events-none ${
                type === "textarea" ? "top-3" : "top-1/2 -translate-y-1/2"
              }`}
            >
              {getIcon()}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!error && hasValue && !isFocused && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className={`absolute right-3 text-green-400 z-10 pointer-events-none ${
                type === "textarea" ? "top-3" : "top-1/2 -translate-y-1/2"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
        {type === "textarea" ? (
          <Textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            id={id}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isActive ? undefined : placeholder}
            required={required}
            className={cn(baseInputClasses, errorInputClasses, "min-h-[120px] resize-none", isFocused && getIcon() ? "pl-10" : "")}
          />
        ) : (
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isActive ? undefined : placeholder}
            required={required}
            className={cn(baseInputClasses, errorInputClasses, isFocused && getIcon() ? "pl-10" : "")}
          />
        )}

        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 origin-left"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="absolute -bottom-5 left-0 text-xs text-red-400"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

