"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react"

function MeditationTimer() {
  const [duration, setDuration] = useState(5) // Default 5 minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60) // Convert to seconds
  const [isRunning, setIsRunning] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [selectedAmbience, setSelectedAmbience] = useState("forest")

  const audioRef = useRef(null)
  const intervalRef = useRef(null)

  // Available ambient sounds
  const ambienceSounds = [
    { id: "forest", name: "Forest Sounds", icon: "🌳" },
    { id: "rain", name: "Gentle Rain", icon: "🌧️" },
    { id: "waves", name: "Ocean Waves", icon: "🌊" },
    { id: "birds", name: "Bird Songs", icon: "🐦" },
    { id: "stream", name: "Flowing Stream", icon: "💧" },
    { id: "white-noise", name: "White Noise", icon: "🔊" },
  ]

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Calculate progress percentage
  const calculateProgress = () => {
    return ((duration * 60 - timeLeft) / (duration * 60)) * 100
  }

  // Start or pause the timer
  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current)
    } else {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current)
            setIsRunning(false)
            playCompletionSound()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }
    setIsRunning(!isRunning)
  }

  // Reset the timer
  const resetTimer = () => {
    clearInterval(intervalRef.current)
    setTimeLeft(duration * 60)
    setIsRunning(false)
  }

  // Change the duration
  const handleDurationChange = (mins) => {
    setDuration(mins)
    setTimeLeft(mins * 60)
    if (isRunning) {
      clearInterval(intervalRef.current)
      setIsRunning(false)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Change ambient sound
  const changeAmbience = (soundId) => {
    setSelectedAmbience(soundId)
    // In a real app, you would change the audio source here
    if (audioRef.current) {
      // audioRef.current.src = `/sounds/${soundId}.mp3`;
      if (isRunning && !isMuted) {
        audioRef.current.play()
      }
    }
  }

  // Play completion sound
  const playCompletionSound = () => {
    // In a real app, you would play a gentle bell or chime sound
    console.log("Meditation complete")
  }

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-indigo-900 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Mindfulness Meditation</h2>
          <p className="text-indigo-200 max-w-2xl mx-auto">
            Take a moment to breathe, center yourself, and practice mindfulness with our guided meditation timer.
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-indigo-500/20">
          {/* Timer display */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />

              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * calculateProgress()) / 100}
                transform="rotate(-90 50 50)"
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Time display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold">{formatTime(timeLeft)}</span>
              <span className="text-indigo-300 mt-2">{isRunning ? "Breathe..." : "Ready"}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={toggleTimer}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-300 transform hover:scale-105"
            >
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>

            <button
              onClick={resetTimer}
              className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center shadow-lg hover:bg-slate-600 transition-all duration-300"
            >
              <RotateCcw className="w-6 h-6" />
            </button>

            <button
              onClick={toggleMute}
              className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center shadow-lg hover:bg-slate-600 transition-all duration-300"
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>

          {/* Duration selector */}
          <div className="mb-8">
            <h3 className="text-center text-indigo-300 mb-4">Select Duration</h3>
            <div className="flex justify-center gap-3">
              {[1, 3, 5, 10, 15, 20].map((mins) => (
                <button
                  key={mins}
                  onClick={() => handleDurationChange(mins)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${duration === mins ? "bg-indigo-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          {/* Ambient sound selector */}
          <div>
            <h3 className="text-center text-indigo-300 mb-4">Ambient Sounds</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ambienceSounds.map((sound) => (
                <button
                  key={sound.id}
                  onClick={() => changeAmbience(sound.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${selectedAmbience === sound.id
                      ? "bg-indigo-600/50 border border-indigo-500"
                      : "bg-slate-700/50 border border-slate-600 hover:bg-slate-600/50"
                    }`}
                >
                  <span className="text-2xl">{sound.icon}</span>
                  <span className="text-sm font-medium">{sound.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Audio element (hidden) */}
          <audio ref={audioRef} loop muted={isMuted} />

          {/* Meditation guidance */}
          <div className="mt-12 p-6 bg-indigo-900/30 rounded-xl border border-indigo-500/20">
            <h3 className="text-xl font-semibold mb-4">Simple Breathing Technique</h3>
            <ol className="space-y-3 text-indigo-200">
              <li className="flex items-start gap-2">
                <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                  1
                </span>
                <p>Find a comfortable seated position with your back straight.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <p>Close your eyes or maintain a soft gaze.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                  3
                </span>
                <p>Breathe in slowly through your nose for 4 counts.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                  4
                </span>
                <p>Hold your breath gently for 2 counts.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                  5
                </span>
                <p>Exhale slowly through your mouth for 6 counts.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                  6
                </span>
                <p>Repeat this cycle, focusing on your breath and letting thoughts pass by without judgment.</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MeditationTimer
