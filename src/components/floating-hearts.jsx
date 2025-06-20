"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    // Generate floating hearts
    const colors = [
      "text-pink-500",
      "text-pink-400",
      "text-pink-300",
      "text-red-400",
      "text-purple-400",
      "text-purple-300",
    ]

    const fills = ["fill-pink-200", "fill-pink-100", "fill-red-100", "fill-purple-100"]

    const newHearts = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 16 + Math.random() * 24,
      color: colors[Math.floor(Math.random() * colors.length)],
      fill: fills[Math.floor(Math.random() * fills.length)],
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 5,
    }))

    setHearts(newHearts)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Heart className={`w-${heart.size} h-${heart.size} ${heart.color} ${heart.fill} opacity-70`} />
        </motion.div>
      ))}
    </div>
  )
}
