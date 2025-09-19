'use client'

import { motion } from 'framer-motion'

interface Step {
  num: number
  title: string
  desc: string
}

interface HowItWorksProps {
  steps: Step[]
}

export default function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <section className="py-24 lg:py-32 bg-[var(--color-ink)]/50">
      {/* @@BEGIN:HowItWorks */}
      
      <div className="container-zk">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-h2 md:text-4xl text-[var(--color-brand)] mb-8">
              We help you:
            </h2>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="group relative bg-[var(--color-ink)]/80 border border-gray-800 
                           rounded-[var(--radius-lg)] p-8 transition-all duration-300 
                           hover:border-[var(--color-brand)]/30 hover:shadow-[var(--shadow-card)]"
              >
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-glow)]/5 to-transparent 
                               rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  
                  {/* Step number */}
                  <div className="mb-6 text-[var(--color-brand)] transition-colors duration-300 group-hover:text-[var(--color-brand-2)]">
                    <div className="inline-flex items-center justify-center w-12 h-12 
                                    bg-[var(--color-brand)]/20 border border-[var(--color-brand)] 
                                    rounded-full text-h3 font-bold">
                      {step.num}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-h3 text-[var(--color-glow)] mb-4 group-hover:text-[var(--color-brand-2)] 
                                 transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-body text-[var(--color-fog)] leading-relaxed">
                    {step.desc}
                  </p>
                  
                </div>

                {/* Border glow effect on hover */}
                <div className="absolute inset-0 border border-[var(--color-brand)] rounded-[var(--radius-lg)] opacity-0 
                               group-hover:opacity-30 transition-opacity duration-300" />
                
              </motion.div>
            ))}
          </div>

          {/* Section Footer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-body md:text-xl text-[var(--color-brand-2)] italic">
              Our clients don't just survive paradigm shifts. They learn to surf them.
            </p>
          </motion.div>

        </div>
      </div>
      
      {/* @@END:HowItWorks */}
    </section>
  )
}