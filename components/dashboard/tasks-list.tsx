"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { CheckCircle, Clock, AlertTriangle } from "lucide-react"

const tasks = [
  {
    title: "Label Image Dataset",
    reward: "50 SLT",
    status: "available",
    timeEstimate: "30 mins",
    difficulty: "Easy",
    progress: 0,
    deadline: "2024-03-15",
    priority: "High"
  },
  {
    title: "Validate Text Data",
    reward: "35 SLT",
    status: "available",
    timeEstimate: "20 mins",
    difficulty: "Medium",
    progress: 0,
    deadline: "2024-03-16",
    priority: "Medium"
  },
  {
    title: "Audio Transcription",
    reward: "60 SLT",
    status: "in_progress",
    timeEstimate: "45 mins",
    difficulty: "Hard",
    progress: 65,
    deadline: "2024-03-14",
    priority: "High"
  }
]

export function TasksList() {
  return (
    <Card className="glass-effect p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
          Active Tasks
        </h2>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-blue-100/70">Total Available:</span>
          <span className="text-blue-400 font-semibold">145 SLT</span>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg bg-blue-500/5 hover:bg-blue-500/10 transition-colors space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white flex items-center">
                  {task.title}
                  {task.priority === "High" && (
                    <AlertTriangle className="w-4 h-4 text-yellow-400 ml-2" />
                  )}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                    {task.difficulty}
                  </span>
                  <span className="text-xs text-blue-100/70">
                    Due: {task.deadline}
                  </span>
                </div>
              </div>
              <span className="text-sm font-semibold text-blue-400">{task.reward}</span>
            </div>

            {task.status === "in_progress" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-100/70">Progress</span>
                  <span className="text-blue-400">{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-1" />
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-blue-100/70">
                <Clock className="w-4 h-4" />
                <span>{task.timeEstimate}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={`hover:bg-blue-500/20 ${
                  task.status === "in_progress" ? "text-yellow-400" : "text-blue-400"
                }`}
                disabled={task.status === "in_progress"}
              >
                {task.status === "available" ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Start Task
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4 mr-1" />
                    In Progress
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}