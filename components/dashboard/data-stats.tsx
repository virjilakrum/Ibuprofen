"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Database, HardDrive, Award, TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useAccountData } from "@/hooks/use-account-data"
import { useEffect, useState } from "react"

export function DataStats() {
  const { solBalance, tokenBalance, isLoading } = useAccountData();
  const [stats, setStats] = useState([
    {
      label: "SOL Balance",
      value: "Loading...",
      icon: Database,
      change: "Updating...",
      chart: true
    },
    {
      label: "SLT Balance",
      value: "Loading...",
      icon: Award,
      change: "Updating..."
    },
    {
      label: "Active Devices",
      value: "3",
      icon: HardDrive,
      change: "2 newly connected"
    },
    {
      label: "Performance Score",
      value: "92%",
      icon: TrendingUp,
      change: "+5% this week"
    }
  ]);

  useEffect(() => {
    if (!isLoading) {
      setStats(prev => [
        {
          ...prev[0],
          value: `${solBalance.toFixed(4)} SOL`,
          change: "+0.05 SOL from last check"
        },
        {
          ...prev[1],
          value: `${tokenBalance.toFixed(2)} SLT`,
          change: "+2.5 SLT this week"
        },
        ...prev.slice(2)
      ]);
    }
  }, [solBalance, tokenBalance, isLoading]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="glass-effect p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-blue-100/70">{stat.label}</p>
                <p className="text-lg font-semibold text-white">{stat.value}</p>
                <p className="text-xs text-blue-400">{stat.change}</p>
              </div>
            </div>
            
            {stat.chart && (
              <div className="h-32 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { time: '1h', value: solBalance * 0.95 },
                    { time: '2h', value: solBalance * 0.97 },
                    { time: '3h', value: solBalance * 0.99 },
                    { time: '4h', value: solBalance },
                  ]}>
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                      labelStyle={{ color: '#94a3b8' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#60a5fa" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
}