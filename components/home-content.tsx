"use client"

import { GradientButton } from "@/components/ui/gradient-button"
import { FeatureCard } from "@/components/feature-card"
import { Database, Camera, Upload, Coins, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const features = [
  {
    icon: Database,
    title: "Data Collection",
    description: "Contribute your unused computing resources to help train AI models with our advanced collection system."
  },
  {
    icon: Camera,
    title: "Hardware Integration",
    description: "Seamlessly connect your devices to gather environmental and spatial data for AI training."
  },
  {
    icon: Upload,
    title: "Data Labeling",
    description: "Participate in our intuitive data labeling tasks and earn rewards for quality contributions."
  },
  {
    icon: Coins,
    title: "Token Rewards",
    description: "Earn valuable tokens for your contributions to AI development through our fair reward system."
  }
]

export default function HomeContent() {
  const router = useRouter()

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-16">
        <motion.header 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
            StreamLens
          </h1>
          <p className="text-xl md:text-2xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            Revolutionizing AI data collection through incentivized participation
          </p>
        </motion.header>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GradientButton 
            variant="primary"
            onClick={() => router.push("/login")}
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5 inline-block" />
          </GradientButton>
          <GradientButton 
            variant="secondary"
            onClick={() => router.push("/about")}
          >
            Learn More
          </GradientButton>
        </motion.div>
      </div>
    </main>
  )
}