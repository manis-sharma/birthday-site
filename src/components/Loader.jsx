import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, Star } from "lucide-react"

function Loader() {
  const [randomPositions, setRandomPositions] = useState([]);

  // Only run the random position generation after the component mounts
  useEffect(() => {
    const positions = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setRandomPositions(positions);
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-rose-100 to-purple-100 overflow-hidden">
      {/* Floating background hearts */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {randomPositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, Math.random() * 10 - 5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            {i % 5 === 0 ? (
              <Star
                className={`w-${4 + (i % 4)} h-${4 + (i % 4)} text-yellow-300 fill-yellow-100 opacity-70`}
              />
            ) : i % 5 === 1 ? (
              <Sparkles
                className={`w-${4 + (i % 4)} h-${4 + (i % 4)} text-purple-300 opacity-70`}
              />
            ) : (
              <Heart
                className={`w-${4 + (i % 4)} h-${4 + (i % 4)} ${i % 3 === 0
                    ? "text-pink-300"
                    : i % 3 === 1
                      ? "text-pink-400"
                      : "text-purple-300"
                  } ${i % 2 === 0 ? "fill-pink-100" : "fill-pink-200"} opacity-70`}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Main loading card */}
      <motion.div
        className="relative z-10 bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-lg shadow-rose-100 p-8 border-4 border-pink-200 flex flex-col items-center max-w-xs mx-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Bouncing hearts */}
        <div className="flex justify-center space-x-3 mb-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            >
              <Heart
                className={`w-8 h-8 ${i === 0
                  ? "text-pink-400 fill-pink-200"
                  : i === 1
                    ? "text-pink-500 fill-pink-300"
                    : "text-purple-400 fill-purple-200"
                  }`}
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-xl font-bold text-center text-pink-600 mb-3"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          Loading something special...
        </motion.p>

        {/* Cute emojis */}
        <div className="flex justify-center space-x-4 mt-5">
          {["🎂", "✨", "🎁", "💖", "🎈"].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-xl"
              animate={{
                rotate: [-10, 10, -10],
                scale: [1, 1.2, 1],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Loader