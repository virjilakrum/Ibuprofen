"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { DataStats } from "@/components/dashboard/data-stats"
import { RewardHistory } from "@/components/dashboard/reward-history"
import { TasksList } from "@/components/dashboard/tasks-list"
import { WalletInfo } from "@/components/dashboard/wallet-info"
import { useWallet } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { connected } = useWallet()
  const router = useRouter()

  useEffect(() => {
    if (!connected) {
      router.push('/login')
    }
  }, [connected, router])

  if (!connected) {
    return null
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            Dashboard
          </h1>
          <p className="text-blue-100/70 mt-2">
            Monitor your contributions and rewards
          </p>
        </motion.div>

        <WalletInfo />
        <DataStats />

        <div className="grid gap-6 lg:grid-cols-2">
          <RewardHistory />
          <TasksList />
        </div>
      </div>
    </div>
  )
}