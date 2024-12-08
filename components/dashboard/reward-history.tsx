"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Coins, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { useAccountData } from "@/hooks/use-account-data"
import { format } from 'date-fns'

export function RewardHistory() {
  const { transactions, isLoading } = useAccountData();

  const rewardDistribution = [
    { name: 'Data Collection', value: 450 },
    { name: 'Data Labeling', value: 300 },
    { name: 'Hardware', value: 250 }
  ];

  const COLORS = ['#60a5fa', '#34d399', '#f472b6'];

  return (
    <Card className="glass-effect p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
          Transaction History
        </h2>
        <Coins className="w-5 h-5 text-blue-400" />
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={rewardDistribution}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {rewardDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => <span className="text-sm text-blue-100/70">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center text-blue-100/70">Loading transactions...</div>
        ) : transactions.map((tx, index) => (
          <motion.div
            key={tx.signature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-blue-500/5 hover:bg-blue-500/10 transition-colors"
          >
            <div className="flex items-center space-x-3">
              {tx.status === "finalized" ? (
                <ArrowUpRight className="w-4 h-4 text-green-400" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-yellow-400" />
              )}
              <div>
                <p className="text-sm font-medium text-white">
                  {tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}
                </p>
                <p className="text-xs text-blue-100/70">
                  {tx.timestamp ? format(new Date(tx.timestamp), 'MMM dd, yyyy HH:mm') : 'Processing...'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-100/70">{tx.status}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}