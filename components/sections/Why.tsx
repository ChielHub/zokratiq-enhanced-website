'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const methodCards = [
  {
    emoji: '🔮',
    title: 'Reality-Scanning Protocols',
    description: 'What reality are you missing?',
    detail: 'Philosophy + neuroscience + art to see hidden patterns',
    demo: 'scanning'
  },
  {
    emoji: '🎭',
    title: 'Speculative Design Sessions',
    description: 'Design your alternate future',
    detail: 'Alternate timeline simulations and scenario planning',
    demo: 'timelines'
  },
  {
    emoji: '🧠',
    title: 'Augmented Intelligence Labs',
    description: 'AI that challenges, not confirms',
    detail: 'Transformation via contact and immersive coaching',
    demo: 'intelligence'
  }
]

const perceptualText = 'perceptual'
const quoteText = 'The next competitive advantage is'

export function Why() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentLayer, setCurrentLayer] = useState(1)
  const [showPerceptual, setShowPerceptual] = useState(false)
  const [perceptualIndex, setPerceptualIndex] = useState(0)
  const [brainBridgeActive, setBrainBridgeActive] = useState(false)
  const [pressureAnimation, setPressureAnimation] = useState(false)

  // Typewriter effect for "perceptual"
  useEffect(() => {
    if (showPerceptual && perceptualIndex < perceptualText.length) {
      const timer = setTimeout(() => {
        setPerceptualIndex(prev => prev + 1)
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [showPerceptual, perceptualIndex])

  const triggerPressureAnimation = () => {
    setPressureAnimation(true)
    setTimeout(() => setPressureAnimation(false), 3000)
  }

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-base-black relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/10 via-transparent to-bright-aqua/10" />
        <div className="grain-overlay opacity-30" />

        {/* Linear vs Exponential Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid pattern for linear thinking */}
          <div className={`absolute inset-0 bg-[url('/grid.svg')] bg-center transition-all duration-1000 ${
            pressureAnimation ? 'opacity-30 scale-110' : 'opacity-5'
          }`} />

          {/* Organic flow patterns for exponential thinking */}
          <div className={`absolute inset-0 transition-all duration-1000 ${
            pressureAnimation ? 'opacity-20' : 'opacity-0'
          }`}>
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(20, 184, 166)" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="rgb(34, 211, 238)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(20, 184, 166)" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path d="M0,300 Q200,100 400,300 T800,300 Q1000,200 1200,300"
                    stroke="url(#flowGradient)" strokeWidth="2" fill="none" opacity="0.6">
                <animate attributeName="d"
                         values="M0,300 Q200,100 400,300 T800,300 Q1000,200 1200,300;
                                 M0,250 Q250,150 500,250 T1000,250 Q1200,150 1400,250;
                                 M0,300 Q200,100 400,300 T800,300 Q1000,200 1200,300"
                         dur="4s" repeatCount="indefinite" />
              </path>
            </svg>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* Layer 1: Core Problem Statement */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-3xl md:text-5xl font-bold mb-8 text-soft-white"
            >
              Because linear thinking breaks under exponential pressure.
            </motion.h2>

            {/* Progressive Disclosure Triggers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button
                onClick={() => {
                  setCurrentLayer(2)
                  triggerPressureAnimation()
                }}
                className="px-6 py-3 border-2 border-primary-teal/60 text-primary-teal hover:border-primary-teal hover:bg-primary-teal/10 rounded-lg transition-all duration-300 font-medium"
              >
                Explore the challenge →
              </button>

              {currentLayer >= 2 && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => setCurrentLayer(3)}
                  className="px-6 py-3 border-2 border-bright-aqua/60 text-bright-aqua hover:border-bright-aqua hover:bg-bright-aqua/10 rounded-lg transition-all duration-300 font-medium"
                >
                  Discover our approach →
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Layer 2: Exponential Pressure Visualization */}
          <AnimatePresence>
            {currentLayer >= 2 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="mb-16 overflow-hidden"
              >
                <div className="bg-deep-charcoal/40 border border-primary-teal/20 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-soft-white mb-6 text-center">
                    The Breaking Point Visualization
                  </h3>

                  {/* Linear vs Exponential Demo */}
                  <div className="relative bg-base-black/50 rounded-lg p-6 mb-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Linear Thinking Side */}
                      <div className="text-center">
                        <h4 className="text-lg font-semibold text-cloud-gray mb-4">Linear Thinking</h4>
                        <div className="relative h-32 bg-gray-800 rounded-lg overflow-hidden">
                          <div className={`absolute bottom-0 left-0 w-full bg-red-500/60 transition-all duration-2000 ${
                            pressureAnimation ? 'h-full animate-pulse' : 'h-8'
                          }`} />
                          <div className={`absolute inset-0 flex items-center justify-center text-sm font-mono text-white transition-all duration-1000 ${
                            pressureAnimation ? 'opacity-100' : 'opacity-70'
                          }`}>
                            {pressureAnimation ? 'BREAKING...' : 'Steady Progress'}
                          </div>
                          {pressureAnimation && (
                            <div className="absolute inset-0 bg-red-600/20 animate-ping" />
                          )}
                        </div>
                      </div>

                      {/* Exponential Thinking Side */}
                      <div className="text-center">
                        <h4 className="text-lg font-semibold text-primary-teal mb-4">Exponential Thinking</h4>
                        <div className="relative h-32 bg-gray-800 rounded-lg overflow-hidden">
                          <div className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary-teal to-bright-aqua transition-all duration-2000 ${
                            pressureAnimation ? 'h-full' : 'h-8'
                          }`} />
                          <div className={`absolute inset-0 flex items-center justify-center text-sm font-mono text-white transition-all duration-1000 ${
                            pressureAnimation ? 'opacity-100' : 'opacity-70'
                          }`}>
                            {pressureAnimation ? 'ADAPTING...' : 'Steady Growth'}
                          </div>
                          {pressureAnimation && (
                            <div className="absolute inset-0 bg-primary-teal/20 animate-pulse" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-6">
                      <p className="text-cloud-gray italic">
                        Linear systems break. Adaptive systems bend and grow stronger.
                      </p>
                    </div>
                  </div>

                  {/* Perceptual Advantage Reveal */}
                  <div className="text-center">
                    <p className="text-xl md:text-2xl text-cloud-gray mb-4">
                      {quoteText}
                      <button
                        onClick={() => setShowPerceptual(true)}
                        className="inline-block border-b-2 border-dashed border-primary-teal/50 hover:border-primary-teal transition-colors duration-300"
                      >
                        <span className="text-primary-teal font-bold">
                          {showPerceptual ? perceptualText.slice(0, perceptualIndex) : '___________'}
                          {showPerceptual && perceptualIndex < perceptualText.length && (
                            <span className="animate-ping text-bright-aqua">|</span>
                          )}
                        </span>
                      </button>
                    </p>

                    {showPerceptual && perceptualIndex >= perceptualText.length && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-lg text-bright-aqua italic"
                      >
                        See what others miss. Navigate by signal, not noise.
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Layer 3: Whole-Brain Operating Model */}
          <AnimatePresence>
            {currentLayer >= 3 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="mb-16 overflow-hidden"
              >
                {/* Interactive Brain Hemisphere Bridge */}
                <div className="bg-deep-charcoal/40 border border-bright-aqua/20 rounded-xl p-8 mb-8">
                  <h3 className="text-2xl font-bold text-soft-white mb-8 text-center">
                    Whole-Brain Operating Model
                  </h3>

                  <div
                    className="relative cursor-pointer group"
                    onMouseEnter={() => setBrainBridgeActive(true)}
                    onMouseLeave={() => setBrainBridgeActive(false)}
                  >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      {/* Left Brain */}
                      <div className={`text-center p-6 rounded-lg border-2 transition-all duration-500 ${
                        brainBridgeActive
                          ? 'border-primary-teal bg-primary-teal/10 transform -translate-x-2'
                          : 'border-gray-600 bg-gray-800/30'
                      }`}>
                        <h4 className="text-lg font-semibold text-cloud-gray mb-4">Left Brain Analysis</h4>
                        <div className="space-y-2 text-sm">
                          <div className="bg-gray-700 h-3 rounded animate-pulse" />
                          <div className="bg-gray-700 h-3 rounded w-3/4 animate-pulse" />
                          <div className="bg-gray-700 h-3 rounded w-1/2 animate-pulse" />
                        </div>
                        <p className="text-xs text-gray-400 mt-3">Metrics • Logic • Process</p>
                      </div>

                      {/* Right Brain */}
                      <div className={`text-center p-6 rounded-lg border-2 transition-all duration-500 ${
                        brainBridgeActive
                          ? 'border-bright-aqua bg-bright-aqua/10 transform translate-x-2'
                          : 'border-gray-600 bg-gray-800/30'
                      }`}>
                        <h4 className="text-lg font-semibold text-cloud-gray mb-4">Right Brain Imagination</h4>
                        <div className="space-y-2 text-sm">
                          <div className="bg-primary-teal/40 h-4 rounded-full animate-pulse" />
                          <div className="bg-bright-aqua/40 h-2 rounded-full w-5/6 animate-pulse" />
                          <div className="bg-primary-teal/40 h-3 rounded-full w-2/3 animate-pulse" />
                        </div>
                        <p className="text-xs text-gray-400 mt-3">Intuition • Pattern • Story</p>
                      </div>
                    </div>

                    {/* Bridge Animation */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={brainBridgeActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gradient-to-r from-primary-teal to-bright-aqua text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                      >
                        🌉 Connected
                      </motion.div>
                    </div>

                    <div className="text-center mt-6">
                      <p className="text-cloud-gray italic">
                        {brainBridgeActive
                          ? "When both hemispheres work together, breakthrough happens."
                          : "Hover to inject right-brain imagination into left-brain systems"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Method Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  {methodCards.map((card, index) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="group relative bg-deep-charcoal/60 border border-gray-700 rounded-xl p-6 hover:border-primary-teal/50 transition-all duration-300 cursor-pointer"
                    >
                      {/* Hover Demo Animation */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {card.demo === 'scanning' && (
                          <div className="absolute inset-0 bg-gradient-conic from-primary-teal/20 to-transparent animate-spin rounded-xl" />
                        )}
                        {card.demo === 'timelines' && (
                          <div className="absolute inset-0">
                            <div className="absolute top-4 left-4 w-2 h-2 bg-primary-teal rounded-full animate-ping" />
                            <div className="absolute top-8 right-6 w-2 h-2 bg-bright-aqua rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                            <div className="absolute bottom-6 left-8 w-2 h-2 bg-primary-teal rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                          </div>
                        )}
                        {card.demo === 'intelligence' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 border-2 border-primary-teal/30 rounded-full animate-pulse" />
                            <div className="absolute w-8 h-8 border-2 border-bright-aqua/50 rounded-full animate-ping" />
                          </div>
                        )}
                      </div>

                      <div className="relative z-10">
                        <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                          {card.emoji}
                        </div>
                        <h4 className="text-lg font-semibold text-soft-white mb-2 group-hover:text-primary-teal transition-colors duration-300">
                          {card.title}
                        </h4>
                        <p className="text-primary-teal font-medium mb-3">
                          {card.description}
                        </p>
                        <p className="text-cloud-gray text-sm leading-relaxed">
                          {card.detail}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Final Call to Action */}
          {currentLayer >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center"
            >
              <div className="bg-deep-charcoal/50 border border-primary-teal/30 rounded-xl p-8 backdrop-blur-sm">
                <p className="text-2xl md:text-3xl font-serif text-primary-teal italic leading-relaxed mb-6">
                  Zokratiq exists for those who sense:<br />
                  <span className="text-bright-aqua">The future belongs to the perceptive.</span>
                </p>
                <button
                  onClick={() => setCurrentLayer(4)}
                  className="px-8 py-4 bg-gradient-to-r from-primary-teal to-bright-aqua text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-teal/25 transform hover:-translate-y-1 transition-all duration-300"
                >
                  See it in action →
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}