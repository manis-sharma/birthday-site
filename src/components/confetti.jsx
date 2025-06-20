"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Confetti() {
  const [confetti, setConfetti] = useState([])

  useEffect(() => {
    // Generate confetti pieces
    const colors = [
      "bg-rose-500",
      "bg-purple-500",
      "bg-yellow-400",
      "bg-blue-400",
      "bg-green-400",
      "bg-red-400",
      "bg-pink-300",
      "bg-purple-300",
    ]

    const shapes = ["rounded-full", "rounded", "rounded-sm", "heart-shape"]

    const newConfetti = Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 10,
      size: 5 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 5,
    }))

    setConfetti(newConfetti)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className={`absolute ${piece.color} ${piece.shape === "heart-shape" ? "heart" : piece.shape}`}
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: piece.size,
            height: piece.size,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [
              `${piece.x}%`,
              `${piece.x + (Math.random() * 20 - 10)}%`,
              `${piece.x + (Math.random() * 20 - 10)}%`,
              `${piece.x + (Math.random() * 20 - 10)}%`,
            ],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
