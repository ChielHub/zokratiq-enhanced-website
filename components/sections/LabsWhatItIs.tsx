'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function LabsWhatItIs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const pillars = [
    {
      title: 'Frontier Tech',
      description: 'quantum, neuro‑AI, synthetic biology translated into business relevance.'
    },
    {
      title: 'Narrative Dynamics',
      description: 'how stories move markets, talent, and policy; memetic radar.'
    },
    {
      title: 'Paradigm Stress‑Testing',
      description: 'simulations that pressure decisions under alternate futures.'
    }
  ]

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-base-black">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            {/* Left Column */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-3xl md:text-4xl font-bold text-primary-teal mb-8 tracking-wider"
              >
                WHAT ZOKRATIQ LABS IS
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="text-lg md:text-xl text-cloud-gray leading-relaxed"
              >
                Zokratiq Labs blends foresight, systems mapping, and narrative design to help leaders see around corners. We work at the edges—then translate the edges into executive‑ready choices.
              </motion.p>
            </div>

            {/* Right Column - Placeholder for visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary-teal/20 to-bright-aqua/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/10 to-bright-aqua/5 rounded-2xl"></div>
                
                {/* Abstract visual elements */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-bright-aqua to-transparent animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-teal to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-primary-teal to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-bright-aqua to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                </div>
                
                <div className="text-center p-8 relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary-teal/20 border-2 border-primary-teal rounded-full flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-teal">
                      <circle cx="16" cy="16" r="6"></circle>
                      <circle cx="16" cy="16" r="10"></circle>
                      <circle cx="16" cy="16" r="14"></circle>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="16" y1="26" x2="16" y2="30"></line>
                      <line x1="6" y1="16" x2="10" y2="16"></line>
                      <line x1="22" y1="16" x2="26" y2="16"></line>
                    </svg>
                  </div>
                  <div className="text-xs text-primary-teal/70 font-mono uppercase tracking-wider">
                    Signal Intelligence
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Three Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-soft-white mb-12 text-center">Three Pillars</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                  className="bg-deep-charcoal/50 border border-primary-teal/20 rounded-xl p-6 hover:border-primary-teal/40 transition-all duration-300"
                >
                  <h4 className="text-lg font-semibold text-primary-teal mb-4">{pillar.title}</h4>
                  <p className="text-cloud-gray leading-relaxed">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}