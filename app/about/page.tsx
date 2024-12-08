"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { GradientButton } from "@/components/ui/gradient-button"
import { useRouter } from "next/navigation"
import { ArrowLeft, Brain, Globe, Shield } from "lucide-react"

export default function AboutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <GradientButton
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </GradientButton>

          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            About StreamLens
          </h1>
          <p className="text-lg text-blue-100/80 leading-relaxed">
            StreamLens is revolutionizing the way AI models are trained by creating a decentralized network of data contributors and labelers. Our platform bridges the gap between AI developers and data providers through a transparent, reward-based system.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Brain,
              title: "AI Innovation",
              description: "Supporting the development of next-generation AI models through quality data collection."
            },
            {
              icon: Globe,
              title: "Global Network",
              description: "Building a worldwide community of contributors and creating opportunities for everyone."
            },
            {
              icon: Shield,
              title: "Data Privacy",
              description: "Ensuring the highest standards of data privacy and security through advanced encryption."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-effect p-6 space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-blue-100/70">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-6"
        >
          <h2 className="text-2xl font-semibold text-white">Ready to Join?</h2>
          <GradientButton
            variant="primary"
            onClick={() => router.push("/login")}
          >
            Get Started Now
          </GradientButton>
        </motion.div>
      </div>
    </div>
  )
}