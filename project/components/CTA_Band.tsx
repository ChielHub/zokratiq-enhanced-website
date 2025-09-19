'use client'

import { motion } from 'framer-motion'

interface CTA_BandProps {
  title: string
  subtitle?: string
  primaryCTA: string
}

export default function CTA_Band({ title, subtitle, primaryCTA }: CTA_BandProps) {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-[var(--color-ink)]/80 to-[var(--color-ink)] relative overflow-hidden">
      {/* @@BEGIN:CTA_Band */}
      
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand)]/10 via-transparent to-[var(--color-brand-2)]/10" />
        <div className="grain-overlay opacity-30" />
      </div>

      <div className="container-zk relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Title with gradient text */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-h2 md:text-5xl lg:text-6xl font-bold text-[var(--color-glow)] mb-8 leading-tight"
          >
            See your market through the{' '}
            <span className="text-transparent bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-2)] bg-clip-text">
              Zokratiq Lens
            </span>{' '}
            in 5 minutes.
          </motion.h2>

          {/* Subtitle */}
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-body md:text-xl text-[var(--color-fog)] mb-12 leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Primary CTA with enhanced animations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.button 
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 15px 40px rgba(91, 140, 255, 0.4)` 
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center font-semibold transition-all duration-300 
                         bg-[var(--color-brand)] text-[var(--color-glow)] hover:bg-[var(--color-brand-2)]
                         px-8 py-4 text-lg rounded-[var(--radius-lg)] group relative overflow-hidden"
            >
              <span className="relative z-10">
                <span className="relative z-10 flex items-center">
                  {primaryCTA}
                  <motion.svg 
                    width="20" height="20" viewBox="0 0 20 20" fill="none" 
                    className="ml-3 transition-transform group-hover:translate-x-1"
                    initial={{ x: 0 }}
                    whileHover={{ x: 6 }}
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
                
                {/* Sliding background effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-2)] to-[var(--color-brand)] rounded-[var(--radius-lg)]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </span>
            </motion.button>
          </motion.div>

          {/* Decorative dots */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center space-x-8"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 bg-[var(--color-brand)] rounded-full"
              />
            ))}
          </motion.div>

        </div>
      </div>
      
      {/* @@END:CTA_Band */}
    </section>
  )
}