'use client'

import { motion } from 'framer-motion'

interface OutcomeBullet {
  text: string
  metric?: string
}

interface OutcomesProps {
  bullets: OutcomeBullet[]
}

export default function Outcomes({ bullets }: OutcomesProps) {
  return (
    <section className="py-24 lg:py-32 bg-[var(--color-ink)] relative overflow-hidden">
      {/* @@BEGIN:Outcomes */}
      
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand)] via-transparent to-[var(--color-brand-2)]" />
        <div className="grain-overlay opacity-50" />
      </div>

      <div className="container-zk relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Section Header */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-h2 md:text-5xl font-bold mb-16 text-[var(--color-glow)]"
          >
            Because linear thinking breaks in exponential times.
          </motion.h2>

          {/* Outcomes Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {bullets.map((bullet, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start text-left"
              >
                {/* Bullet point */}
                <div className="w-6 h-6 rounded-full bg-[var(--color-brand)]/20 border border-[var(--color-brand)] 
                               flex-shrink-0 mt-1 mr-6 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-brand)]" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <p className="text-body md:text-lg text-[var(--color-fog)] leading-relaxed">
                    {bullet.text}
                  </p>
                  {bullet.metric && (
                    <div className="mt-2 text-label font-bold text-[var(--color-brand-2)]">
                      {bullet.metric}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Highlighted outcome section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-[var(--color-ink)]/50 border border-[var(--color-brand)]/30 
                       rounded-[var(--radius-xl)] p-8 backdrop-blur-sm"
          >
            <p className="text-h3 md:text-3xl text-display text-[var(--color-brand)] leading-relaxed">
              Zokratiq exists for those who sense:<br />
              <span className="text-[var(--color-brand-2)]">
                The future belongs to the perceptive.
              </span>
            </p>
          </motion.div>

        </div>
      </div>
      
      {/* @@END:Outcomes */}
    </section>
  )
}