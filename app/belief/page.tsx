'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { beliefDiagnosticUrl, shareUrls } from '@/lib/site'

interface Question {
  id: string
  prompt: string
  options: {
    id: string
    label: string
    points: number
  }[]
  weight: number
}

interface BeliefArchetype {
  slug: string
  label: string
  range: { min: number; max: number }
  blurb: string
  description: string
}

const questions: Question[] = [
  {
    id: "q1",
    prompt: "Do your prospects clearly understand what you stand for beyond your product?",
    weight: 20,
    options: [
      { id: "q1a", label: "Never - they only see features", points: 1 },
      { id: "q1b", label: "Rarely - occasional glimpses", points: 2 },
      { id: "q1c", label: "Sometimes - it's inconsistent", points: 3 },
      { id: "q1d", label: "Often - fairly clear", points: 4 },
      { id: "q1e", label: "Always - crystal clear", points: 5 }
    ]
  },
  {
    id: "q2",
    prompt: "Can your team articulate your company's core beliefs in 30 seconds?",
    weight: 18,
    options: [
      { id: "q2a", label: "Never - no one can", points: 1 },
      { id: "q2b", label: "Rarely - maybe leadership", points: 2 },
      { id: "q2c", label: "Sometimes - some can", points: 3 },
      { id: "q2d", label: "Often - most can", points: 4 },
      { id: "q2e", label: "Always - everyone can", points: 5 }
    ]
  },
  {
    id: "q3",
    prompt: "Do your marketing materials lead with values before features?",
    weight: 16,
    options: [
      { id: "q3a", label: "Never - features first", points: 1 },
      { id: "q3b", label: "Rarely - mostly features", points: 2 },
      { id: "q3c", label: "Sometimes - mixed approach", points: 3 },
      { id: "q3d", label: "Often - values prominent", points: 4 },
      { id: "q3e", label: "Always - values lead", points: 5 }
    ]
  },
  {
    id: "q4",
    prompt: "Would your ideal customers choose you even at a premium price?",
    weight: 17,
    options: [
      { id: "q4a", label: "Never - price is everything", points: 1 },
      { id: "q4b", label: "Rarely - mostly price-driven", points: 2 },
      { id: "q4c", label: "Sometimes - depends", points: 3 },
      { id: "q4d", label: "Often - value matters", points: 4 },
      { id: "q4e", label: "Always - beliefs drive choice", points: 5 }
    ]
  },
  {
    id: "q5",
    prompt: "Do you attract talent who share your worldview, not just skills?",
    weight: 15,
    options: [
      { id: "q5a", label: "Never - skills only", points: 1 },
      { id: "q5b", label: "Rarely - mostly skills", points: 2 },
      { id: "q5c", label: "Sometimes - cultural fit matters", points: 3 },
      { id: "q5d", label: "Often - worldview important", points: 4 },
      { id: "q5e", label: "Always - beliefs attract", points: 5 }
    ]
  },
  {
    id: "q6",
    prompt: "Are your business decisions guided by consistent principles?",
    weight: 14,
    options: [
      { id: "q6a", label: "Never - ad hoc decisions", points: 1 },
      { id: "q6b", label: "Rarely - inconsistent", points: 2 },
      { id: "q6c", label: "Sometimes - some consistency", points: 3 },
      { id: "q6d", label: "Often - mostly consistent", points: 4 },
      { id: "q6e", label: "Always - principles guide all", points: 5 }
    ]
  }
]

const archetypes: BeliefArchetype[] = [
  {
    slug: "latent-capital",
    label: "💎 Latent Capital",
    range: { min: 0, max: 39 },
    blurb: "Huge opportunity. Your beliefs are your hidden competitive advantage.",
    description: "Your organization has untapped potential in belief capital. Strong foundations exist but need clarity and activation."
  },
  {
    slug: "untapped-potential",
    label: "🌱 Untapped Potential", 
    range: { min: 40, max: 59 },
    blurb: "Your beliefs exist but aren't clear to buyers. Time to clarify.",
    description: "You're on the right track with emerging belief systems, but they need more definition and strategic deployment."
  },
  {
    slug: "building-momentum",
    label: "🚀 Building Momentum",
    range: { min: 60, max: 79 },
    blurb: "Good foundation. 2-3 moves will amplify your belief capital.",
    description: "You have solid belief capital foundations. A few strategic moves will unlock significant competitive advantage."
  },
  {
    slug: "gold-standard",
    label: "👑 Gold Standard",
    range: { min: 80, max: 100 },
    blurb: "Your belief capital is strong. You're winning on values.",
    description: "Exceptional belief capital integration. You're setting the standard for values-driven business success."
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

export default function BeliefCapitalDiagnostic() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'calculating' | 'results' | 'email-capture'>('intro')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [totalScore, setTotalScore] = useState(0)
  const [selectedArchetype, setSelectedArchetype] = useState<BeliefArchetype | null>(null)
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [emailData, setEmailData] = useState({ firstName: '', email: '' })

  const handleStartScan = () => {
    setCurrentStep('quiz')
    setCurrentQuestionIndex(0)
    setAnswers({})
  }

  const handleAnswerSelect = (questionId: string, points: number, weight: number) => {
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
      // Calculate weighted score
      let totalScore = 0
      questions.forEach(q => {
        const answer = finalAnswers[q.id] || 0
        totalScore += (answer * q.weight) / 100
      })
      const finalScore = Math.round(totalScore)
      
      const archetype = archetypes.find(arch => 
        finalScore >= arch.range.min && finalScore <= arch.range.max
      ) || archetypes[0]
      
      setTotalScore(finalScore)
      setSelectedArchetype(archetype)
      
      if (finalScore >= 80) {
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
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
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
      })).filter(piece => piece.y < (typeof window !== 'undefined' ? window.innerHeight + 50 : 800)))
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

  const handleShareResults = () => {
    setCurrentStep('email-capture')
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Submit to webhook or email service
      const webhookUrl = 'https://hook.eu1.make.com/your-webhook-id'
      
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({
          firstName: emailData.firstName,
          email: emailData.email,
          answers: answers,
          score: totalScore,
          archetype: selectedArchetype?.slug,
          timestamp: new Date().toISOString(),
          source: 'belief-capital-diagnostic'
        })
      })
    } catch (error) {
      console.log('Form submission completed locally')
    }

    alert('Thank you! Your Belief Capital Report will be sent to your email shortly.')
    handleRestart()
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const generateShareUrl = () => {
    const url = '{beliefDiagnosticUrl()}'
    const text = `I scored ${totalScore}/100 on the Belief Capital Diagnostic - ${selectedArchetype?.label}! ${selectedArchetype?.blurb} Calculate your org's Reality Maturity score:`
    return { url, text }
  }

  const shareData = generateShareUrl()

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
              Belief Capital Diagnostic
            </h1>
            <p className="text-xl text-cloud-gray mb-12 leading-relaxed">
              Score what they buy: your story. A 6-question diagnostic of organizational belief capital.
            </p>
            
            {/* Proof bullets */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-deep-charcoal/50 backdrop-blur-lg rounded-xl p-6 border border-primary-teal/20">
                <div className="text-3xl font-bold text-primary-teal">68%</div>
                <div className="text-sm text-cloud-gray">of B2B founders default to feature-pitch decks</div>
              </div>
              <div className="bg-deep-charcoal/50 backdrop-blur-lg rounded-xl p-6 border border-primary-teal/20">
                <div className="text-3xl font-bold text-primary-teal">72%</div>
                <div className="text-sm text-cloud-gray">of buyers cite "shared values" as decision driver</div>
              </div>
              <div className="bg-deep-charcoal/50 backdrop-blur-lg rounded-xl p-6 border border-primary-teal/20">
                <div className="text-3xl font-bold text-primary-teal">2% → 7%</div>
                <div className="text-sm text-cloud-gray">conversion when beliefs are explicit</div>
              </div>
            </div>
            
            <div className="space-y-6">
              <Button size="lg" variant="primary" onClick={handleStartScan}>
                Start Diagnostic
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
            className="max-w-3xl mx-auto"
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-cloud-gray mb-2">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="w-full bg-deep-charcoal rounded-full h-2">
                <motion.div
                  className="bg-primary-teal h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="bg-deep-charcoal/50 backdrop-blur-lg rounded-2xl p-8 border border-primary-teal/20 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-soft-white mb-8 leading-relaxed">
                {currentQuestion.prompt}
              </h2>

              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1, ease: 'easeOut' }}
                    onClick={() => handleAnswerSelect(currentQuestion.id, option.points, currentQuestion.weight)}
                    className="w-full text-left bg-deep-charcoal border border-gray-700 hover:border-primary-teal hover:bg-primary-teal/10 rounded-xl p-4 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full border-2 border-gray-600 group-hover:border-primary-teal flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-transparent group-hover:bg-primary-teal transition-colors" />
                      </div>
                      <span className="text-cloud-gray group-hover:text-soft-white transition-colors text-lg">
                        {option.label}
                      </span>
                    </div>
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
            className="text-center"
          >
            <div className="bg-deep-charcoal/50 backdrop-blur-lg rounded-2xl p-12 border border-primary-teal/20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 mx-auto mb-8 border-4 border-primary-teal border-t-transparent rounded-full"
              />
              <h2 className="text-3xl font-bold text-soft-white mb-4">
                Analyzing Your Belief Capital...
              </h2>
              <p className="text-cloud-gray">
                Calculating your organizational belief strength across 6 key dimensions
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
            className="max-w-3xl mx-auto text-center"
          >
            <div className="bg-deep-charcoal/50 backdrop-blur-lg rounded-2xl p-8 border border-primary-teal/20 mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="text-8xl font-bold text-primary-teal mb-4"
              >
                {totalScore}
              </motion.div>
              
              <h2 className="text-4xl font-bold text-soft-white mb-4">
                {selectedArchetype.label}
              </h2>
              
              <p className="text-xl text-cloud-gray mb-6 leading-relaxed">
                {selectedArchetype.blurb}
              </p>
              
              <p className="text-cloud-gray mb-8">
                {selectedArchetype.description}
              </p>

              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <button
                    onClick={() => {
                      const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`
                      window.open(linkedin, '_blank')
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Share on LinkedIn
                  </button>
                  
                  <button
                    onClick={() => {
                      const twitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`
                      window.open(twitter, '_blank')
                    }}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Share on X
                  </button>
                  
                  <button
                    onClick={() => {
                      const subject = 'My Belief Capital Diagnostic Results'
                      const body = `${shareData.text}\n\n${shareData.url}`
                      const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                      window.open(mailto)
                    }}
                    className="bg-primary-teal text-white px-4 py-2 rounded-lg font-semibold hover:bg-bright-aqua transition-colors"
                  >
                    Share via Email
                  </button>
                </div>

                <Button size="lg" variant="primary" onClick={handleShareResults}>
                  Get Full Report via Email
                </Button>

                <div className="flex justify-center space-x-4">
                  <Button size="md" variant="ghost" onClick={handleRestart}>
                    Take Again
                  </Button>
                  <Button size="md" variant="secondary" asChild href="https://zokratiq.com/#contact">
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Email Capture */}
        {currentStep === 'email-capture' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-deep-charcoal/50 backdrop-blur-lg rounded-2xl p-8 border border-primary-teal/20">
              <h2 className="text-3xl font-bold text-soft-white mb-4 text-center">
                Get Your Full Belief Capital Report
              </h2>
              <p className="text-cloud-gray mb-8 text-center">
                Enter your details to receive your comprehensive analysis including gap maps, specific moves, and the Belief Capital Canvas.
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label className="block text-soft-white font-medium mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={emailData.firstName}
                    onChange={(e) => setEmailData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-base-black border border-gray-600 text-soft-white placeholder-cloud-gray focus:border-primary-teal focus:outline-none"
                    placeholder="Your first name"
                  />
                </div>

                <div>
                  <label className="block text-soft-white font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={emailData.email}
                    onChange={(e) => setEmailData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-base-black border border-gray-600 text-soft-white placeholder-cloud-gray focus:border-primary-teal focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center font-semibold transition-all duration-200 bg-primary-teal text-white hover:bg-bright-aqua hover:shadow-lg hover:shadow-primary-teal/25 px-8 py-4 text-base rounded-xl"
                  >
                    Send My Report
                  </button>
                  <Button size="lg" variant="ghost" onClick={() => setCurrentStep('results')} className="flex-1">
                    Back to Results
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}