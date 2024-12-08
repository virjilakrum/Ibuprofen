"use client"

import { Button } from "./button"
import { cn } from "@/lib/utils"
import { ButtonProps } from "@radix-ui/react-button"
import { motion } from "framer-motion"

interface GradientButtonProps extends ButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary"
}

export function GradientButton({
  children,
  className,
  variant = "primary",
  ...props
}: GradientButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        className={cn(
          "rounded-full px-8 py-6 text-lg font-medium transition-all duration-200",
          variant === "primary" 
            ? "bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white" 
            : "bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-blue-100 border border-blue-500/20",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  )
}