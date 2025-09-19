'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'

const rotatingSubtitles = [
  'A placement studio for the daimonic edge.',
  'Not a job board. A resonance engine.',
  'Hire minds that don\'t match the mold.',
  'Find your org\'s missing archetype.',
  'Where talent finds its true timeline.'
]

const labsRotatingSubtitles = [
  'You don\'t need better data. You need better perception.',
  'Your business isn\'t stuck. Your model of reality is.',
  'Your future isn\'t on the map yet.',
  'Test reality like it\'s clay.'
]

export function CoreServices() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Progressive disclosure states
  const [labsExpanded, setLabsExpanded] = useState(false)
  const [misfitsExpanded, setMisfitsExpanded] = useState(false)

  // Dynamic subtitle rotation for mis/fits card
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0)
  const [subtitleOpacity, setSubtitleOpacity] = useState(1)

  // Dynamic subtitle rotation for labs card
  const [currentLabsSubtitleIndex, setCurrentLabsSubtitleIndex] = useState(0)
  const [labsSubtitleOpacity, setLabsSubtitleOpacity] = useState(1)

  useEffect(() => {
    // mis/fits rotation
    const misfitsInterval = setInterval(() => {
      setSubtitleOpacity(0)

      setTimeout(() => {
        setCurrentSubtitleIndex((prev) =>
          (prev + 1) % rotatingSubtitles.length
        )
        setSubtitleOpacity(1)
      }, 300)
    }, 3000)

    // Labs rotation (offset by 1.5 seconds to avoid simultaneous transitions)
    const labsInterval = setInterval(() => {
      setLabsSubtitleOpacity(0)

      setTimeout(() => {
        setCurrentLabsSubtitleIndex((prev) =>
          (prev + 1) % labsRotatingSubtitles.length
        )
        setLabsSubtitleOpacity(1)
      }, 300)
    }, 3500)

    return () => {
      clearInterval(misfitsInterval)
      clearInterval(labsInterval)
    }
  }, [])

  return (
    <section ref={ref} className="py-40 lg:py-48 bg-deep-charcoal/30 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-soft-white mb-8 leading-tight tracking-wide">
              Our Zokratiq Services
            </h2>
            <p className="text-xl md:text-2xl text-cloud-gray/80 font-serif leading-relaxed max-w-3xl mx-auto">
              Two distinct realities. Two forms of transformation.
            </p>
          </motion.div>

          <div className="space-y-32">

          {/* Zokratiq Labs - Enhanced with Ripple System */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-4xl md:text-5xl font-bold text-soft-white mb-6 leading-tight">
                  Zokratiq Labs
                </h3>
                <p className="text-2xl md:text-3xl font-serif text-primary-teal mb-8 italic leading-relaxed">
                  A portal for alternate futures and signal intelligence.
                </p>
              </div>

              <div className="space-y-6 text-lg text-cloud-gray leading-relaxed">
                <p>
                  Zokratiq Labs is where we experiment in public. We run live explorations, prototype speculative tools, and share philosophical briefings on:
                </p>

                <ul className="space-y-3 ml-6 text-primary-teal/90">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-teal rounded-full mr-4 animate-pulse"></span>
                    Frontier tech (quantum, neuro-AI, synthetic biology)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-bright-aqua rounded-full mr-4 animate-pulse" style={{animationDelay: '0.5s'}}></span>
                    Narrative dynamics and memetic markets
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-teal rounded-full mr-4 animate-pulse" style={{animationDelay: '1s'}}></span>
                    Paradigm stress-testing simulations
                  </li>
                </ul>
              </div>

              {/* Progressive Disclosure */}
              <div className="space-y-4">
                <button
                  onClick={() => setLabsExpanded(!labsExpanded)}
                  className="flex items-center gap-3 text-primary-teal hover:text-bright-aqua transition-colors duration-300 group"
                >
                  <span className="font-semibold text-lg">Explore deeper</span>
                  <motion.svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    animate={{ rotate: labsExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="group-hover:scale-110 transition-transform"
                  >
                    <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: labsExpanded ? 'auto' : 0,
                    opacity: labsExpanded ? 1 : 0
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="space-y-6 pt-4 border-l-2 border-primary-teal/30 pl-6 ml-3">
                    <div className="bg-gradient-to-br from-primary-teal/5 to-bright-aqua/5 p-6 rounded-xl border border-primary-teal/20">
                      <h4 className="font-bold text-soft-white mb-4 text-xl">Labs Output Includes:</h4>
                      <ul className="space-y-3 text-cloud-gray">
                        <li className="flex items-start">
                          <span className="text-primary-teal mr-3 mt-1">🌊</span>
                          Immersive maps & speculative canvases
                        </li>
                        <li className="flex items-start">
                          <span className="text-bright-aqua mr-3 mt-1">⚡</span>
                          Foresight decks & future-pressure tests
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary-teal mr-3 mt-1">🔄</span>
                          Collaboration rituals for high-signal teams
                        </li>
                      </ul>
                    </div>

                    <p className="italic text-primary-teal/90 text-lg">
                      For teams ready to navigate from first principles, not trend reports.
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="pt-4">
                <Button
                  variant="secondary"
                  asChild
                  href="/labs"
                  className="bg-gradient-to-r from-primary-teal to-bright-aqua text-white border-none hover:shadow-lg hover:shadow-primary-teal/25 hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
                >
                  Explore Zokratiq Labs →
                </Button>
              </div>
            </div>

            {/* Enhanced Labs Visual with Ripple System */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary-teal/20 to-bright-aqua/20 rounded-3xl flex items-center justify-center relative overflow-hidden border border-primary-teal/30 hover:border-primary-teal/60 transition-all duration-500 group">

                {/* 3-Layer Ripple System */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute border border-primary-teal/20 rounded-full"
                      animate={{
                        scale: [1, 2.5, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 1.2,
                        ease: 'easeInOut'
                      }}
                      style={{
                        width: `${60 + i * 40}px`,
                        height: `${60 + i * 40}px`,
                      }}
                    />
                  ))}
                </div>

                {/* Scan Lines */}
                <div className="absolute inset-0 opacity-40">
                  <motion.div
                    className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-bright-aqua to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-teal to-transparent"
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 1.5 }}
                  />
                  <motion.div
                    className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-primary-teal to-transparent"
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 0.8 }}
                  />
                  <motion.div
                    className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-bright-aqua to-transparent"
                    animate={{ y: ['100%', '-100%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 2.3 }}
                  />
                </div>

                {/* Orbital Elements */}
                <div className="absolute inset-0">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-primary-teal/60 rounded-full"
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 10 + i * 3,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                      style={{
                        top: '50%',
                        left: '50%',
                        transformOrigin: `${80 + i * 20}px 0px`,
                      }}
                    />
                  ))}
                </div>

                <div className="text-center p-8 relative z-10">
                  {/* Dual Rotating Icons */}
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-primary-teal to-bright-aqua rounded-full flex items-center justify-center"
                    >
                      <svg width="40" height="40" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="2">
                        <circle cx="16" cy="16" r="6" />
                        <path d="M16 2v4M16 26v4M6.93 6.93l2.83 2.83M22.24 22.24l2.83 2.83M2 16h4M26 16h4M6.93 25.07l2.83-2.83M22.24 9.76l2.83-2.83" />
                      </svg>
                    </motion.div>

                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-2 w-16 h-16 border-2 border-bright-aqua/50 rounded-full"
                    />
                  </div>

                  <h4 className="text-xl font-bold text-soft-white mb-3">Zokratiq Labs</h4>
                  <motion.p
                    className="text-cloud-gray text-sm min-h-[3rem] flex items-center justify-center px-4 leading-relaxed"
                    style={{ opacity: labsSubtitleOpacity }}
                    transition={{ duration: 0.3 }}
                  >
                    {labsRotatingSubtitles[currentLabsSubtitleIndex]}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* mis/fits - Enhanced with Fault Line System */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Enhanced mis/fits Visual with Crack Pattern Network */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
              className="relative lg:order-first order-last"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-primary-teal/20 rounded-3xl flex items-center justify-center relative overflow-hidden border border-purple-400/30 hover:border-purple-400/60 transition-all duration-500 group">

                {/* Complex Crack Pattern Network */}
                <div className="absolute inset-0 opacity-30">
                  <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                    {/* Main fault lines */}
                    <motion.path
                      d="M50 100 L150 200 L250 150 L350 250"
                      stroke="rgb(168, 85, 247)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.path
                      d="M100 50 L200 150 L300 100 L350 180"
                      stroke="rgb(20, 184, 166)"
                      strokeWidth="1.5"
                      strokeDasharray="3,3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    />
                    <motion.path
                      d="M80 300 L180 200 L280 250 L320 150"
                      stroke="rgb(168, 85, 247)"
                      strokeWidth="1"
                      strokeDasharray="2,4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    />
                  </svg>
                </div>

                {/* Multiple Expanding Disruption Zones */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute border border-purple-400/30 rounded-full"
                      animate={{
                        scale: [0.5, 2, 0.5],
                        opacity: [0.8, 0, 0.8],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: i * 1.5,
                        ease: 'easeInOut'
                      }}
                      style={{
                        width: `${80 + i * 30}px`,
                        height: `${80 + i * 30}px`,
                      }}
                    />
                  ))}
                </div>

                <div className="text-center p-8 relative z-10">
                  {/* Scaling Misfit Icon with Pulsing Energy */}
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <motion.div
                      animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                      }}
                      className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-primary-teal rounded-full flex items-center justify-center shadow-lg shadow-purple-500/25"
                    >
                      <svg width="40" height="40" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="2">
                        <path d="M16 3c7.18 0 13 5.82 13 13 0 7.18-5.82 13-13 13S3 23.18 3 16 8.82 3 16 3z" strokeDasharray="3,3" />
                        <circle cx="16" cy="16" r="5" />
                        <path d="M12 10l-3-3M20 10l3-3M12 22l-3 3M20 22l3 3" strokeDasharray="2,2" />
                      </svg>
                    </motion.div>

                    {/* Energy Field */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 border border-purple-400/20 rounded-full"
                        animate={{
                          scale: [1, 1.8 + i * 0.3],
                          opacity: [0.6, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.8,
                          ease: 'easeOut'
                        }}
                      />
                    ))}
                  </div>

                  <h4 className="text-xl font-bold text-soft-white mb-3">mis/fits placement studio</h4>
                  <motion.p
                    className="text-cloud-gray text-sm min-h-[3rem] flex items-center justify-center px-4 leading-relaxed"
                    style={{ opacity: subtitleOpacity }}
                    transition={{ duration: 0.3 }}
                  >
                    {rotatingSubtitles[currentSubtitleIndex]}
                  </motion.p>
                </div>
              </div>
            </motion.div>

            <div className="space-y-8">
              <div>
                <h3 className="text-4xl md:text-5xl font-bold text-soft-white mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-purple-400 to-primary-teal bg-clip-text text-transparent">mis/fits</span>
                </h3>

                <p className="text-2xl md:text-3xl font-serif text-purple-400 mb-8 italic leading-relaxed">
                  Placement studio for post-normal times.
                </p>
              </div>

              <div className="space-y-6 text-lg text-cloud-gray leading-relaxed">
                <p>
                  mis/fits is Zokratiq's placement studio for stranged-out brilliance. We match philosophers, poetic technologists, pattern obsessives, and meta-operatives with reality-shifting organizations.
                </p>
              </div>

              {/* Progressive Disclosure */}
              <div className="space-y-4">
                <button
                  onClick={() => setMisfitsExpanded(!misfitsExpanded)}
                  className="flex items-center gap-3 text-purple-400 hover:text-purple-300 transition-colors duration-300 group"
                >
                  <span className="font-semibold text-lg">Discover more</span>
                  <motion.svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    animate={{ rotate: misfitsExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="group-hover:scale-110 transition-transform"
                  >
                    <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: misfitsExpanded ? 'auto' : 0,
                    opacity: misfitsExpanded ? 1 : 0
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="space-y-6 pt-4 border-l-2 border-purple-400/30 pl-6 ml-3">
                    <div className="bg-gradient-to-br from-purple-500/5 to-primary-teal/5 p-6 rounded-xl border border-purple-400/20">
                      <h4 className="font-bold text-soft-white mb-4 text-xl">We Connect:</h4>
                      <ul className="space-y-3 text-cloud-gray">
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-3 mt-1">💥</span>
                          Reality architects & systems poets
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary-teal mr-3 mt-1">🌪️</span>
                          Pattern obsessives & meta-operatives
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-3 mt-1">🎭</span>
                          Philosophical technologists & meaning makers
                        </li>
                      </ul>
                    </div>

                    <p className="italic text-purple-400/90 text-lg">
                      For organizations ready to hire outside the algorithm.
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="pt-4">
                <Button
                  variant="secondary"
                  className="bg-gradient-to-r from-purple-500 to-primary-teal text-white border-none hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
                  asChild
                  href="/misfits"
                >
                  Enter mis/fits →
                </Button>
              </div>
            </div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}