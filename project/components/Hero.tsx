'use client'

import { motion } from 'framer-motion'

interface HeroProps {
  headline: string
  eyebrow?: string
  subtitle: string
  primaryCTA: string
  secondaryCTA?: string
  background?: string
}

export default function Hero({
  headline,
  eyebrow,
  subtitle,
  primaryCTA,
  secondaryCTA,
  background
}: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* @@BEGIN:Hero */}
      
      {/* Background with Paper Shaders */}
      <div className="absolute inset-0 bg-[var(--color-ink)]">
        <canvas 
          className="shader-canvas w-full h-full opacity-30"
          style={{ mixBlendMode: 'screen' }}
        />
        <div className="grain-overlay opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-zk text-center">
        <div className="max-w-4xl mx-auto">
          
          {/* Eyebrow */}
          {eyebrow && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-label uppercase tracking-wider text-[var(--color-fog)] mb-4"
            >
              {eyebrow}
            </motion.div>
          )}

          {/* Headline with Playfair Display emphasis */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-h1 md:text-6xl lg:text-7xl mb-8 leading-tight text-[var(--color-glow)]"
          >
            Business Meets{' '}
            <span className="text-display text-[var(--color-brand)]">
              Magic
            </span>{' '}
            when you hire free‑range thinkers.
          </motion.h1>

          {/* Subtitle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-body md:text-xl text-[var(--color-fog)] mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            {/* Primary CTA with gooey effect */}
            <motion.button 
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 10px 30px rgba(91, 140, 255, 0.3)` 
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center font-semibold transition-all duration-300 
                         bg-[var(--color-brand)] text-[var(--color-glow)] hover:bg-[var(--color-brand-2)]
                         px-8 py-4 text-lg rounded-[var(--radius-lg)] group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {primaryCTA}
                <motion.svg 
                  width="20" height="20" viewBox="0 0 20 20" fill="none" 
                  className="ml-3 transition-transform group-hover:translate-x-1"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  <path 
                    d="M4 10h12m-6-6l6 6-6 6" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </span>
              
              {/* Gooey background effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-2)] to-[var(--color-brand)] rounded-[var(--radius-lg)]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* Secondary CTA */}
            {secondaryCTA && (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center font-semibold transition-all duration-300
                           border-2 border-[var(--color-brand)] text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-[var(--color-glow)]
                           px-8 py-4 text-lg rounded-[var(--radius-lg)]"
              >
                {secondaryCTA}
              </motion.button>
            )}
          </motion.div>

          {/* Subtitle tagline */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-label font-mono text-[var(--color-fog)] tracking-wider opacity-70"
          >
            Consciousness → Org Design · History → Strategy · Systems → Growth
          </motion.div>

        </div>
      </div>
      
      {/* @@END:Hero */}
    </section>
  )
}