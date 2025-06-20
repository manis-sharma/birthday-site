"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Countdown from "@/components/countdown"
import BirthdayCelebration from "@/components/birthday-celebration"
import Confetti from "@/components/confetti"
import FloatingHearts from "@/components/floating-hearts"
import Loader from "@/components/Loader"
import { MoveRight, PartyPopper } from "lucide-react"

export default function Home() {
  const [isBirthday, setIsBirthday] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [bubbles, setBubbles] = useState([])
  const [showForYouBtn, setShowForYouBtn] = useState(false)
  const birthdayDate = new Date("April 28, 2025") // Change this date accordingly
  const audioRef = useRef(null)

  // For testing
  // const birthdayDate = new Date("2025-04-23T22:03:00+05:30")

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500);
  }, [])

  const startCelebration = () => {
    setShowForYouBtn(false)
    setIsBirthday(true)
    // Play the song
    if (audioRef.current) {
      audioRef.current.volume = 0.8;
      audioRef.current.play().catch((e) => {
        console.log("Autoplay prevented, user interaction needed", e)
      })
    }
  }

  useEffect(() => {
    const generated = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: ["bg-pink-300", "bg-purple-300", "bg-yellow-300", "bg-violet-300", "bg-rose-300"][Math.floor(Math.random() * 3)],
      size: 16 + Math.floor(Math.random() * 8),
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 5
    }))
    setBubbles(generated)
  }, [])

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-100 to-purple-100 flex flex-col items-center justify-center p-4 overflow-hidden">
      {isBirthday && <Confetti />}
      <FloatingHearts />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-3xl mx-auto"
      >
        <motion.div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-xl shadow-rose-100 p-8 border-2 border-rose-200"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}>
          <AnimatePresence mode="wait">
            {isBirthday ? (
              <BirthdayCelebration key="celebration" />
            ) : (
              <Countdown key="countdown" targetDate={birthdayDate} onCountdownEnd={() => setShowForYouBtn(true)} />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {showForYouBtn && <motion.div
        key="start-button"
        className="flex flex-col items-center justify-center mt-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <motion.button
          onClick={startCelebration}
          className="bg-gradient-to-r z-10 from-pink-500 to-purple-500 shadow-lg hover:shadow-xl transition-all rounded-full font-medium text-white py-4 px-8 cursor-pointer border-2 border-white flex items-center gap-3"
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -5, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <PartyPopper className="w-6 h-6" />
          <span className="text-xl">For you</span>
          <MoveRight className="w-5 stroke-3 h-6" />
        </motion.button>
      </motion.div>}

      {/* You can change the background song if you want */}
      <audio ref={audioRef} src="/birthday.mp3" preload="auto" loop />

      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: bubble.left, top: bubble.top }}
            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
            }}
          >
            <div
              className={`rounded-full ${bubble.color} opacity-60`}
              style={{ width: `${bubble.size}px`, height: `${bubble.size}px` }}
            />
          </motion.div>
        ))}
      </div>
    </main>
  )
}
