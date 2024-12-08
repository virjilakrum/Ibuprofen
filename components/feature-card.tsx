"use client"

import { Card } from "./ui/card"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="glass-effect p-6 space-y-4 rounded-2xl border border-blue-500/10 hover:border-blue-500/20 transition-all duration-200">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
          {title}
        </h3>
        <p className="text-sm text-blue-100/70 leading-relaxed">
          {description}
        </p>
      </Card>
    </motion.div>
  )
}