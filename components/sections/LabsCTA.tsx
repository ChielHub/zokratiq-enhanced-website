'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function LabsCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-gradient-to-br from-deep-charcoal to-base-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-teal/10 via-transparent to-bright-aqua/10"></div>
        <div className="grain-overlay opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-soft-white mb-8 leading-tight">
              Ready to see around corners?
            </h2>
            <p className="text-xl text-cloud-gray mb-12 max-w-3xl mx-auto leading-relaxed">
              Most teams plan inside yesterday's frame. Labs expands your decision space before you commit capital.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button 
                className="inline-flex items-center bg-primary-teal text-base-black font-semibold px-8 py-4 rounded-xl hover:bg-bright-aqua transition-all duration-300 group"
                onClick={() => window.location.href = '/zokratiq/labs/fit-check'}
              >
                <span className="mr-2">Start a 15‑min Fit‑Check</span>
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M4 10h12m-6-6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </button>
              
              <button className="inline-flex items-center border-2 border-primary-teal text-primary-teal font-semibold px-8 py-4 rounded-xl hover:bg-primary-teal hover:text-base-black transition-all duration-300">
                Download Labs Primer
              </button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}