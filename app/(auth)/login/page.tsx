"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Loader2, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const { connected, connecting, disconnecting } = useWallet()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (connecting) {
      toast.loading('Connecting wallet...')
    } else if (disconnecting) {
      toast.loading('Disconnecting wallet...')
    } else if (connected) {
      toast.success('Wallet connected successfully')
      setLoading(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    }
  }, [connected, connecting, disconnecting, router])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-effect p-8 w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Welcome to StreamLens
            </h1>
            <p className="text-blue-100/70 mt-2">Connect your Solana wallet to continue</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <WalletMultiButton className="!bg-gradient-to-r from-blue-600 to-cyan-600 !rounded-xl" />
              {!connected && !loading && (
                <div className="flex items-center text-yellow-400 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span>Please connect your wallet to continue</span>
                </div>
              )}
            </div>

            {loading && (
              <div className="flex items-center justify-center text-blue-400">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                <span>Connecting to dashboard...</span>
              </div>
            )}

            <p className="text-center text-sm text-blue-100/70">
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}