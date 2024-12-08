"use client"

import { Card } from "@/components/ui/card"
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { motion } from "framer-motion"
import { Wallet, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export function WalletInfo() {
  const { publicKey, connecting, connected, disconnecting } = useWallet()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (connecting) {
      setIsLoading(true)
      toast.loading('Connecting wallet...')
    } else if (disconnecting) {
      setIsLoading(true)
      toast.loading('Disconnecting wallet...')
    } else {
      setIsLoading(false)
      if (connected) {
        toast.success('Wallet connected successfully')
      }
    }
  }, [connecting, disconnecting, connected])

  return (
    <Card className="glass-effect p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-100/70">Connected Wallet</h3>
            <p className="text-xs text-blue-400">
              {publicKey ? `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}` : 'Not connected'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {!connected && !isLoading && (
            <div className="flex items-center text-yellow-400 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span>Wallet not connected</span>
            </div>
          )}
          <WalletMultiButton className="!bg-gradient-to-r from-blue-600 to-cyan-600 !rounded-xl" />
        </div>
      </div>
    </Card>
  )
}