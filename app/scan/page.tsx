'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { scanUrl, shareUrls } from '@/lib/site'

interface Question {
  id: string
  prompt: string
  options: {
    id: string
    label: string
    points: number
  }[]
}

interface Archetype {
  slug: string
  label: string
  range: { min: number; max: number }
  blurb: string
}

const questions: Question[] = [
  {
    id: "q1",
    prompt: "How does your org approach the future?",
    options: [
      { id: "q1a", label: "We mostly ignore it", points: 0 },
      { id: "q1b", label: "We react to trends when forced", points: 5 },
      { id: "q1c", label: "We experiment cautiously with new ideas", points: 10 },
      { id: "q1d", label: "We actively explore and prototype new futures", points: 20 }
    ]
  },
  {
    id: "q2",
    prompt: "How is \"weirdness\" treated in your culture?",
    options: [
      { id: "q2a", label: "Not welcome; conformity rules", points: 0 },
      { id: "q2b", label: "Tolerated at the margins", points: 5 },
      { id: "q2c", label: "Sometimes encouraged, but limited", points: 10 },
      { id: "q2d", label: "Weirdness is fuel; it sparks breakthroughs", points: 20 }
    ]
  },
  {
    id: "q3",
    prompt: "How do you relate to purpose?",
    options: [
      { id: "q3a", label: "We don't really talk about it", points: 0 },
      { id: "q3b", label: "We have a purpose statement, rarely used", points: 5 },
      { id: "q3c", label: "Purpose guides some projects and leaders", points: 10 },
      { id: "q3d", label: "Purpose is our north star, deeply embodied", points: 20 }
    ]
  },
  {
    id: "q4",
    prompt: "How do you navigate uncertainty?",
    options: [
      { id: "q4a", label: "We avoid it; stick to the plan", points: 0 },
      { id: "q4b", label: "We treat it as risk; try to minimize", points: 5 },
      { id: "q4c", label: "We see uncertainty as challenge; run scenarios", points: 10 },
      { id: "q4d", label: "We embrace uncertainty as a creative field", points: 20 }
    ]
  },
  {
    id: "q5",
    prompt: "How do you explore new paradigms?",
    options: [
      { id: "q5a", label: "We don't; we optimize the old ones", points: 0 },
      { id: "q5b", label: "We copy competitors when they try", points: 5 },
      { id: "q5c", label: "We explore selectively, with caution", points: 10 },
      { id: "q5d", label: "We actively scan, sense, and stretch paradigms", points: 20 }
    ]
  }
]

const archetypes: Archetype[] = [
  {
    slug: "default-org",
    label: "🏢 Default Org",
    range: { min: 0, max: 20 },
    blurb: "Rooted in convention. Safe, predictable, but blind to new paradigms."
  },
  {
    slug: "tinkerer-org",
    label: "🧰 Tinkerer Org",
    range: { min: 21, max: 40 },
    blurb: "Experiments occasionally. Innovation seen as side project, not core."
  },
  {
    slug: "explorer-org",
    label: "🔮 Explorer Org",
    range: { min: 41, max: 60 },
    blurb: "Actively scanning horizons. Weirdness allowed, but not yet strategic."
  },
  {
    slug: "proto-wizard-org",
    label: "🧙 Proto-Wizard Org",
    range: { min: 61, max: 80 },
    blurb: "Explores new paradigms. Weirdness tolerated, purpose present, but not fully activated."
  },
  {
    slug: "reality-wizard-org",
    label: "🌀 Reality-Wizard Org",
    range: { min: 81, max: 100 },
    blurb: "Fully activated. Weirdness harnessed, purpose embodied, uncertainty embraced as creative advantage."
  }
]

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  color: string
  size: number
  velocityX: number
  velocityY: number
  gravity: number
}

export default function ScanPage() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'calculating' | 'results'>('intro')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [totalScore, setTotalScore] = useState(0)
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null)
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [showConfetti, setShowConfetti] = useState(false)

  const handleStartScan = () => {
    setCurrentStep('quiz')
    setCurrentQuestionIndex(0)
    setAnswers({})
  }

  const handleAnswerSelect = (questionId: string, points: number) => {
    const newAnswers = { ...answers, [questionId]: points }
    setAnswers(newAnswers)

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        calculateResults(newAnswers)
      }
    }, 500)
  }

  const calculateResults = (finalAnswers: Record<string, number>) => {
    setCurrentStep('calculating')
    
    setTimeout(() => {
      const score = Object.values(finalAnswers).reduce((sum, points) => sum + points, 0)
      const archetype = archetypes.find(arch => 
        score >= arch.range.min && score <= arch.range.max
      ) || archetypes[0]
      
      setTotalScore(score)
      setSelectedArchetype(archetype)
      
      if (score >= 81) {
        createConfetti()
        setShowConfetti(true)
      }
      
      setCurrentStep('results')
    }, 3000)
  }

  const createConfetti = () => {
    const colors = ['#14b8a6', '#06d6a0', '#7c3aed', '#f59e0b', '#ef4444']
    const newConfetti: ConfettiPiece[] = []
    
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        velocityX: (Math.random() - 0.5) * 4,
        velocityY: Math.random() * 3 + 2,
        gravity: 0.1
      })
    }
    
    setConfetti(newConfetti)
  }

  useEffect(() => {
    if (!showConfetti) return

    const animateConfetti = () => {
      setConfetti(prev => prev.map(piece => ({
        ...piece,
        x: piece.x + piece.velocityX,
        y: piece.y + piece.velocityY,
        rotation: piece.rotation + 5,
        velocityY: piece.velocityY + piece.gravity
      })).filter(piece => piece.y < window.innerHeight + 50))
    }

    const interval = setInterval(animateConfetti, 16)
    const timeout = setTimeout(() => {
      setShowConfetti(false)
      setConfetti([])
    }, 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [showConfetti])

  const handleRestart = () => {
    setCurrentStep('intro')
    setCurrentQuestionIndex(0)
    setAnswers({})
    setTotalScore(0)
    setSelectedArchetype(null)
    setShowConfetti(false)
    setConfetti([])
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = (currentQuestionIndex / questions.length) * 100

  return (
    <main className="min-h-screen bg-base-black flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {confetti.map(piece => (
            <div
              key={piece.id}
              className="absolute"
              style={{
                left: piece.x,
                top: piece.y,
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                transform: `rotate(${piece.rotation}deg)`,
                borderRadius: '2px'
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        {/* Intro */}
        {currentStep === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-soft-white mb-4">
              Your Organization's Reality Maturity
            </h1>
            <p className="text-xl text-cloud-gray mb-12 leading-relaxed">
              A 2-minute diagnostic of how your org handles uncertainty, purpose, and paradigm shifts
            </p>
            
            <div className="space-y-6">
              <Button size="lg" variant="primary" onClick={handleStartScan}>
                Start Scan
              </Button>
              
              <div className="space-y-4">
                <Button size="md" variant="secondary" asChild href="/">
                  ← Back to Home
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quiz */}
        {currentStep === 'quiz' && currentQuestion && (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="max-w-2xl mx-auto"
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-cloud-gray mb-2">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="w-full bg-deep-charcoal rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-primary-teal to-bright-aqua h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="bg-deep-charcoal/50 backdrop-blur-md rounded-2xl p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-soft-white mb-8 text-center">
                {currentQuestion.prompt}
              </h2>
              
              <div className="space-y-4">
                {currentQuestion.options.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleAnswerSelect(currentQuestion.id, option.points)}
                    className="w-full text-left p-6 bg-base-black/40 hover:bg-primary-teal/20 border border-cloud-gray/20 hover:border-primary-teal/50 rounded-xl transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-cloud-gray group-hover:text-primary-teal font-medium text-lg">
                      {option.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Calculating */}
        {currentStep === 'calculating' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center max-w-md mx-auto"
          >
            <div className="bg-deep-charcoal/50 backdrop-blur-md rounded-2xl p-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 border-4 border-primary-teal border-t-transparent rounded-full mx-auto mb-6"
              />
              <h2 className="text-2xl font-bold text-soft-white mb-4">
                Calculating your Reality Maturity Score...
              </h2>
              <p className="text-cloud-gray">
                Analyzing your organization's reality exploration patterns
              </p>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {currentStep === 'results' && selectedArchetype && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="bg-deep-charcoal/50 backdrop-blur-md rounded-2xl p-12 mb-8">
              {/* Score */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="mb-8"
              >
                <div className="text-6xl md:text-8xl font-bold text-primary-teal mb-2">
                  {totalScore}
                </div>
                <div className="text-xl text-cloud-gray">
                  out of 100
                </div>
              </motion.div>

              {/* Archetype */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                className="mb-8"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-4">
                  {selectedArchetype.label}
                </h2>
                <p className="text-xl text-cloud-gray leading-relaxed">
                  {selectedArchetype.blurb}
                </p>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
              className="space-y-4"
            >
              <div className="space-x-4">
                <Button 
                  size="lg" 
                  variant="primary" 
                  asChild 
                  href="https://zokratiq.com/#contact"
                >
                  Schedule Reality Consultation
                </Button>
              </div>
              
              <div className="space-y-4">
                <Button size="md" variant="ghost" onClick={handleRestart}>
                  Run Again
                </Button>
                
                {/* Share Buttons */}
                <div className="pt-4 border-t border-cloud-gray/20">
                  <p className="text-sm text-cloud-gray mb-3">Share your results:</p>
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => {
                        const shareText = `I just scored ${totalScore}/100 on Zokratiq's Reality Maturity diagnostic! My organization is classified as: ${selectedArchetype?.label}. Calculate your org's Reality Maturity score: ${scanUrl()}`;
                        const linkedinUrl = shareUrls.linkedin(scanUrl(), 'Reality Maturity Score', shareText);
                        window.open(linkedinUrl, '_blank');
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#005885] transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                      </svg>
                      <span className="text-sm">LinkedIn</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        const shareText = `I just scored ${totalScore}/100 on Zokratiq's Reality Maturity diagnostic! My organization is classified as: ${selectedArchetype?.label}. Calculate your org's Reality Maturity score: ${scanUrl()}`;
                        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
                        window.open(twitterUrl, '_blank');
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <span className="text-sm">X</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        const shareText = `I just scored ${totalScore}/100 on Zokratiq's Reality Maturity diagnostic! My organization is classified as: ${selectedArchetype?.label}. Calculate your org's Reality Maturity score: ${scanUrl()}`;
                        const mailtoUrl = `mailto:?subject=${encodeURIComponent('My Reality Maturity Score')}&body=${encodeURIComponent(shareText)}`;
                        window.location.href = mailtoUrl;
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-cloud-gray text-base-black rounded-lg hover:bg-cloud-gray/80 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      <span className="text-sm">Email</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  )
}