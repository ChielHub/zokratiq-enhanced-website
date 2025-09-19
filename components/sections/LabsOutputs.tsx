'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function LabsOutputs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const outputs = [
    {
      title: 'Immersive Maps & Speculative Canvases',
      description: 'the landscape made visible.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    },
    {
      title: 'Foresight Decks & Future‑Pressure Tests',
      description: 'decision‑ready artifacts you can drop into the LT deck.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      )
    },
    {
      title: 'Collaboration Rituals',
      description: 'meeting formats that produce signal, not theater.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      title: 'Narrative Radar',
      description: 'a running read on memes, momentum, and meaning.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="2"></circle>
          <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
        </svg>
      )
    },
    {
      title: 'Decision Log',
      description: 'bets, assumptions, trip‑wires, and review rhythm.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10,9 9,9 8,9"></polyline>
        </svg>
      )
    }
  ]

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-base-black">
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
              WHAT YOU GET (OUTPUTS)
            </h2>
          </motion.div>

          {/* Outputs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {outputs.map((output, index) => (
              <motion.div
                key={output.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                className="bg-deep-charcoal/50 border border-primary-teal/20 rounded-xl p-6 hover:border-primary-teal/40 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-primary-teal/10 border border-primary-teal/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-teal/20 transition-colors duration-300">
                  <div className="text-primary-teal">
                    {output.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-soft-white mb-3 group-hover:text-bright-aqua transition-colors duration-300">
                  {output.title}
                </h3>
                <p className="text-cloud-gray leading-relaxed">{output.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Download CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            <button className="inline-flex items-center bg-primary-teal text-base-black font-semibold px-8 py-4 rounded-xl hover:bg-bright-aqua transition-all duration-300 group">
              <span className="mr-2">Download the Labs Primer</span>
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="transition-transform group-hover:translate-y-0.5"
              >
                <path
                  d="M12 2v12m-4-4l4 4 4-4M2 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </button>
            
            {/* Micro CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
              className="mt-6"
            >
              <button 
                className="text-primary-teal hover:text-bright-aqua transition-colors duration-300 font-medium text-sm group"
                onClick={() => window.location.href = '/zokratiq/labs/demo'}
              >
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