'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function Intro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="section-strategy-intro" className="py-24 lg:py-32 bg-deep-charcoal/50 relative overflow-hidden">
      {/* Background pulse effect */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1.2, opacity: 0.1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute inset-0 bg-gradient-radial from-primary-teal/20 via-transparent to-transparent"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-3xl md:text-5xl font-bold mb-12 text-soft-white flex items-center justify-center gap-3"
          >
            🧭 A New Kind of Strategy Studio
          </motion.h2>

          <div className="text-xl md:text-2xl font-serif text-cloud-gray space-y-8 leading-relaxed">
            {/* First block - line by line reveal */}
            <div className="space-y-2">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
              >
                Some studios sell trends.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
              >
                Others sell frameworks.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0, 
                  filter: 'blur(0px)',
                  textShadow: '0 0 20px rgba(20, 184, 166, 0.3)'
                } : { opacity: 0, y: 20, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
                className="text-primary-teal font-semibold relative"
              >
                We sell new ways of seeing.
                <motion.span
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-teal to-bright-aqua"
                />
              </motion.p>
            </div>
            
            {/* Second paragraph - slide from left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              className="space-y-4"
            >
              <p>
                Zokratiq is a Reality Exploration Studio for the Post-Knowledge Work Era — a strategic observatory at the edges of understanding.
              </p>
            </motion.div>
            
            {/* Third paragraph - poetic float */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ 
                duration: 1.0, 
                delay: 1.2, 
                ease: [0.25, 0.1, 0.25, 1.0] // Custom easing for poetic float
              }}
              className="space-y-4"
            >
              <p>
                We draw from philosophy, physics, neuroscience, theology, and the arts to upgrade the reality headset your business is wearing.<br />
                Not with more dashboards — but with new perception.
              </p>
            </motion.div>
            
            {/* Fourth paragraph - awakening effect */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0.8 }}
              animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0.8 }}
              transition={{ duration: 0.6, delay: 1.5, ease: 'easeOut' }}
              className="space-y-2"
            >
              <p>We don't chase noise. We tune your signal.</p>
              <p>We don't optimize what's outdated. We recalibrate your lens on what's real, what's changing, and what's possible.</p>
            </motion.div>
            
            {/* Final line - lock-in with shimmer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.8, ease: 'easeOut' }}
              className="pt-4"
            >
              <motion.p
                initial={{ fontWeight: 600 }}
                animate={isInView ? { fontWeight: 700 } : { fontWeight: 600 }}
                transition={{ duration: 0.4, delay: 2.0, ease: 'easeOut' }}
                className="text-primary-teal relative"
              >
                This isn't strategy-as-usual.
                <br />
                <span className="relative inline-block">
                  It's business as if{' '}
                  <motion.span
                    initial={{ fontWeight: 700 }}
                    animate={isInView ? { 
                      fontWeight: 800,
                      textShadow: '0 0 30px rgba(20, 184, 166, 0.5)'
                    } : { fontWeight: 700 }}
                    transition={{ duration: 0.4, delay: 2.2, ease: 'easeOut' }}
                    className="text-bright-aqua"
                  >
                    reality actually mattered
                  </motion.span>
                  .
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 1.0, delay: 2.4, ease: 'easeOut' }}
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-teal via-bright-aqua to-primary-teal origin-left"
                    style={{
                      background: 'linear-gradient(90deg, rgba(20, 184, 166, 0.8) 0%, rgba(34, 211, 238, 1) 50%, rgba(20, 184, 166, 0.8) 100%)',
                      boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)'
                    }}
                  />
                </span>
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}