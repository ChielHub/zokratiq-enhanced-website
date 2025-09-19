'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Footer } from '@/components/sections/Footer'

interface Question {
  id: string
  text: string
  placeholder: string
  type: 'input' | 'textarea' | 'select'
  options?: string[]
  required: boolean
}

const questions: Question[] = [
  {
    id: 'company',
    text: 'Company name',
    placeholder: 'Your company name',
    type: 'input',
    required: true
  },
  {
    id: 'role',
    text: 'Your role',
    placeholder: 'e.g., CEO, Strategy Director, Head of Innovation',
    type: 'input',
    required: true
  },
  {
    id: 'challenge',
    text: 'What strategic challenge keeps you up at night?',
    placeholder: 'The specific challenge or uncertainty you\'re facing...',
    type: 'textarea',
    required: true
  },
  {
    id: 'timeline',
    text: 'Timeline for decision',
    placeholder: 'When do you need clarity on this?',
    type: 'select',
    options: ['Next 30 days', 'Next 3 months', 'Next 6 months', 'Next 12 months', 'No specific timeline'],
    required: true
  },
  {
    id: 'stakeholders',
    text: 'Who else would be involved in this conversation?',
    placeholder: 'e.g., Leadership team, Board members, Key department heads...',
    type: 'textarea',
    required: true
  },
  {
    id: 'tried',
    text: 'What have you already tried to address this?',
    placeholder: 'Previous approaches, consultants, internal initiatives...',
    type: 'textarea',
    required: true
  },
  {
    id: 'success',
    text: 'What would success look like 6 months from now?',
    placeholder: 'How would you know this challenge has been resolved?',
    type: 'textarea',
    required: true
  }
]

export default function FitCheckPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (questionId: string, value: string) => {
    setFormData(prev => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setIsSubmitted(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const currentQuestion = questions[currentStep]
  const isCurrentAnswered = formData[currentQuestion.id]?.trim()

  return (
    <main className="min-h-screen bg-base-black">
      {isSubmitted ? (
        <section ref={ref} className="py-24 lg:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="w-20 h-20 bg-primary-teal rounded-full flex items-center justify-center mx-auto mb-8">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-base-black">
                  <path d="M16 20l4 4 8-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-soft-white mb-6">
                Thanks — we'll bring a draft map of your terrain to the Fit-Check call.
              </h1>
              <p className="text-lg text-cloud-gray mb-8">
                Check your email for calendar details and next steps.
              </p>
              <div className="bg-deep-charcoal/50 border border-primary-teal/20 rounded-xl p-6">
                <div className="w-16 h-16 bg-primary-teal/10 border-2 border-primary-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-teal">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-soft-white mb-2">
                  15‑Minute Fit‑Check Scheduled
                </h2>
                <p className="text-cloud-gray text-sm">
                  We'll use your answers to prepare a preliminary terrain map for your challenge.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      ) : (
        <section ref={ref} className="py-24 lg:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-center mb-12"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-soft-white mb-6">
                  Help us prepare your map
                </h1>
                <p className="text-lg text-cloud-gray mb-8">
                  A few questions to understand your terrain before we meet.
                </p>
                
                {/* Progress Bar */}
                <div className="w-full bg-deep-charcoal rounded-full h-2 mb-2">
                  <div 
                    className="bg-primary-teal h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-cloud-gray/60 font-mono">
                  {currentStep + 1} of {questions.length}
                </p>
              </motion.div>

              {/* Question Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="bg-deep-charcoal/50 border border-primary-teal/20 rounded-xl p-8 backdrop-blur-sm mb-8"
              >
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-xl font-semibold text-soft-white mb-6">
                    {currentQuestion.text}
                  </h2>

                  {currentQuestion.type === 'input' && (
                    <input
                      type="text"
                      placeholder={currentQuestion.placeholder}
                      value={formData[currentQuestion.id] || ''}
                      onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                      className="w-full px-4 py-4 bg-base-black/50 border border-gray-700 rounded-lg text-soft-white placeholder-cloud-gray/50 focus:border-primary-teal focus:outline-none focus:ring-2 focus:ring-primary-teal/20 transition-all duration-200 text-lg"
                      autoFocus
                    />
                  )}

                  {currentQuestion.type === 'textarea' && (
                    <textarea
                      placeholder={currentQuestion.placeholder}
                      value={formData[currentQuestion.id] || ''}
                      onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                      rows={4}
                      className="w-full px-4 py-4 bg-base-black/50 border border-gray-700 rounded-lg text-soft-white placeholder-cloud-gray/50 focus:border-primary-teal focus:outline-none focus:ring-2 focus:ring-primary-teal/20 transition-all duration-200 text-lg resize-none"
                      autoFocus
                    />
                  )}

                  {currentQuestion.type === 'select' && currentQuestion.options && (
                    <select
                      value={formData[currentQuestion.id] || ''}
                      onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                      className="w-full px-4 py-4 bg-base-black/50 border border-gray-700 rounded-lg text-soft-white focus:border-primary-teal focus:outline-none focus:ring-2 focus:ring-primary-teal/20 transition-all duration-200 text-lg"
                      autoFocus
                    >
                      <option value="">{currentQuestion.placeholder}</option>
                      {currentQuestion.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}
                </motion.div>
              </motion.div>

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                className="flex justify-between items-center"
              >
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    currentStep === 0 
                      ? 'text-cloud-gray/40 cursor-not-allowed' 
                      : 'text-primary-teal hover:bg-primary-teal/10'
                  }`}
                >
                  ← Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentQuestion.required && !isCurrentAnswered}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    currentQuestion.required && !isCurrentAnswered
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-primary-teal text-base-black hover:bg-bright-aqua'
                  }`}
                >
                  {currentStep === questions.length - 1 ? 'Submit & Schedule' : 'Next →'}
                </button>
              </motion.div>

              {/* Help Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                className="text-center mt-8"
              >
                <p className="text-xs text-cloud-gray/60">
                  We'll use these insights to prepare a preliminary terrain map for your Fit-Check call.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </main>
  )
}