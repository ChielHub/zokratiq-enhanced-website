'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function LabsHowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    {
      number: '1',
      title: 'Discover',
      description: 'We frame the real question and collect your signals.'
    },
    {
      number: '2', 
      title: 'Map',
      description: 'We build immersive maps and speculative canvases to reveal the terrain.'
    },
    {
      number: '3',
      title: 'Simulate',
      description: 'We run paradigm stress‑tests and future‑pressure scenarios.'
    },
    {
      number: '4',
      title: 'Decide',
      description: 'We converge on options, kill‑criteria, and next experiments.'
    }
  ]

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-deep-charcoal/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-teal mb-8 tracking-wider">
              HOW IT WORKS
            </h2>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                className="text-center relative"
              >
                {/* Step Number */}
                <div className="w-16 h-16 bg-primary-teal/20 border-2 border-primary-teal rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary-teal">{step.number}</span>
                </div>
                
                {/* Step Content */}
                <h3 className="text-xl font-semibold text-soft-white mb-4">{step.title}</h3>
                <p className="text-cloud-gray leading-relaxed">{step.description}</p>
                
                {/* Connector Line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary-teal/50 to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Cadence Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            className="text-center"
          >
            <div className="bg-base-black/50 border border-primary-teal/20 rounded-xl p-8 inline-block">
              <h4 className="text-lg font-semibold text-primary-teal mb-4">Cadence</h4>
              <p className="text-cloud-gray font-mono">
                10‑day Signal Scan → 4–6 week Core Lab → optional Summit build.
              </p>
            </div>
            
            {/* Micro CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
              className="mt-8"
            >
              <button className="text-primary-teal hover:text-bright-aqua transition-colors duration-300 font-medium text-sm group">
                See an example deck 
                <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}