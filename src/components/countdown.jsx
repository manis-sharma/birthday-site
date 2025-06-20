"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, Gift, Cake, Star } from "lucide-react"

function calculateTimeLeft(targetDate) {
  const difference = targetDate - new Date()
  let timeLeft = {}

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  return timeLeft
}

export default function Countdown({ targetDate, onCountdownEnd }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate))

  useEffect(() => {
    const timer = setTimeout(() => {
      const updated = calculateTimeLeft(targetDate)

      setTimeLeft(updated)
      if (!updated || Object.keys(updated).length <= 0) {
        onCountdownEnd()
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, targetDate])

  const icons = [
    <Heart key="heart" className="text-pink-500 fill-pink-200" />,
    <Gift key="gift" className="text-purple-500" />,
    <Cake key="cake" className="text-pink-500" />,
    <Star key="star" className="text-yellow-400 fill-yellow-200" />,
  ]

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-pink-600 min-h-20 sm:min-h-11 mb-6"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        Your Special Day is Almost Here💕
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.keys(timeLeft).length > 0 ? (
          Object.entries(timeLeft).map(([unit, value], index) => (
            <motion.div
              key={unit}
              className="bg-white rounded-3xl shadow-lg p-4 w-28 h-28 flex flex-col items-center justify-center border-2 border-pink-200"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
            >
              <div className="text-3xl font-bold text-purple-600">{value}</div>
              <div className="text-sm text-pink-500 capitalize">{unit}</div>
              <div className="mt-1">{icons[index % icons.length]}</div>
            </motion.div>
          ))
        ) : (
          <p className="text-2xl text-pink-600 font-bold">It's time!</p>
        )}
      </div>

      <motion.div
        className="text-center max-w-md mx-auto bg-pink-50 p-4 rounded-3xl border-2 border-pink-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-lg text-purple-700 mb-4">
          Just a little more... A small gift for my favorite person❤️
        </p>

        <div className="flex justify-center space-x-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-pink-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
