'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Hero() {
  const [headlineVariant] = useState(0) // Can be used for A/B testing

  const headlines = [
    {
      main: "The biggest risk isn't hiring someone who doesn't fit in—it's hiring someone who fits in too well",
      sub: "Transform your talent strategy from cognitive sameness to competitive advantage with the Misfits OS Blueprint"
    },
    {
      main: "While you optimize for 'cultural fit,' your competitors are hiring for cognitive edge",
      sub: "Get the framework 200+ organizations use to turn weird talent into breakthrough thinking"
    },
    {
      main: "Add one weird hire, increase breakthrough concepts by 40%",
      sub: "The Misfits OS Blueprint shows you exactly how to find, hire, and integrate unconventional talent that drives innovation"
    }
  ]

  const currentHeadline = headlines[headlineVariant]

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-weird-purple via-transparent to-primary-teal"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Eyebrow */}
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-weird-purple/20 border border-weird-purple/30 rounded-full text-weird-purple font-medium text-sm">
                <span className="w-2 h-2 bg-weird-purple rounded-full mr-2 animate-pulse"></span>
                Misfits OS Framework
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-soft-white mb-8 leading-tight">
              {currentHeadline.main.split('—').map((part, index) => (
                <span key={index}>
                  {index === 1 && (
                    <span className="text-weird-purple font-playfair italic">—{part}</span>
                  )}
                  {index === 0 && part}
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-cloud-gray mb-12 leading-relaxed max-w-4xl mx-auto">
              {currentHeadline.sub}
            </p>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-16"
            >
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-weird-purple to-primary-teal text-white font-semibold text-lg rounded-xl hover:shadow-lg hover:shadow-weird-purple/25 transform hover:-translate-y-0.5 transition-all duration-300 group"
              >
                Download Your Misfits OS Blueprint
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="ml-2 transition-transform group-hover:translate-x-1"
                >
                  <path d="M4 10h12m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <p className="text-sm text-cloud-gray/80 mt-4">
                Free download • No spam • Unsubscribe anytime
              </p>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-cloud-gray/60"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-teal rounded-full mr-2"></div>
                200+ organizations transformed
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-teal rounded-full mr-2"></div>
                Research-backed framework
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-teal rounded-full mr-2"></div>
                Zokratiq-developed
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-weird-purple/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-weird-purple rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}