'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function LabsPlanningTrap() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-deep-charcoal/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-3xl md:text-4xl font-bold text-primary-teal mb-8 tracking-wider"
          >
            THE PLANNING TRAP
          </motion.h2>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="space-y-8 mb-12"
          >
            <p className="text-xl md:text-2xl text-cloud-gray leading-relaxed">
              Most teams plan inside yesterday's frame. The result: slide theater, safe consensus, and missed optionality.
            </p>
            
            <p className="text-lg text-cloud-gray leading-relaxed">
              Labs is where we experiment in public—live explorations, speculative tools, and philosophical briefings that expand your decision space before you commit capital.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="mb-16"
          >
            <button className="inline-flex items-center bg-primary-teal/10 border border-primary-teal/30 rounded-xl px-8 py-4 text-primary-teal font-semibold hover:bg-primary-teal/20 hover:border-primary-teal/50 transition-all duration-300 group">
              <span className="mr-2">Open an Example Foresight Deck</span>
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M3 8h10m-5-5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}