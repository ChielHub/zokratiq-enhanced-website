'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function WhyZokratiq() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const helpItems = [
    'Inject right-brain imagination into left-brain systems',
    'Break groupthink through red-team rituals and lens-switching',
    'Replace metrics-first strategy with story-first sensemaking',
    'Design structures that reward perception, not performance'
  ]

  const methodItems = [
    {
      title: 'Reality-Scanning Protocols',
      subtitle: 'Philosophy × neuroscience × metaphysics',
      icon: '🔮'
    },
    {
      title: 'Speculative Design Sessions',
      subtitle: 'Alternate timeline simulations',
      icon: '🎭'
    },
    {
      title: 'Augmented Intelligence Labs',
      subtitle: 'Use AI to challenge perception, not just scale process',
      icon: '🧠'
    }
  ]

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-base-black relative overflow-hidden reality-crack paper-texture">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-teal via-transparent to-bright-aqua"></div>
        <div className="grain-overlay opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column */}
            <div className="space-y-12">
              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="space-y-4"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-soft-white">
                  Why Zokratiq
                </h2>
                <div className="w-16 h-px bg-gradient-to-r from-primary-teal to-transparent"></div>
              </motion.div>

              {/* Intro */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                className="space-y-6"
              >
                <div className="text-lg text-cloud-gray leading-relaxed space-y-4">
                  <p>
                    Because linear thinking breaks under exponential pressure.
                  </p>
                  <p>
                    Zokratiq helps teams recalibrate perception before they redesign strategy.
                  </p>
                  <p>
                    We build <em className="text-bright-aqua">whole-brain operating models</em> for organizations facing nonlinear futures.
                  </p>
                </div>
              </motion.div>

              {/* We help you */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-soft-white">We help you:</h3>
                <ul className="space-y-4">
                  {helpItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                      className="flex items-start"
                    >
                      <span className="text-primary-teal mr-3 mt-1 flex-shrink-0">•</span>
                      <span className="text-cloud-gray leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Methodology blocks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {methodItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1, ease: 'easeOut' }}
                      className="bg-deep-charcoal/30 border-2 border-primary-teal/30 rounded-xl p-6 hover:border-primary-teal/50 hover:bg-deep-charcoal/40 transition-all duration-300 group"
                    >
                      <div className="text-center space-y-4">
                        <div className="text-4xl text-primary-teal group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-soft-white text-lg mb-2">{item.title}</h4>
                          <p className="text-cloud-gray/70 text-sm italic">{item.subtitle}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Callout Quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="lg:sticky lg:top-32"
            >
              <div className="relative">
                {/* Main quote card */}
                <div className="bg-deep-charcoal/50 border border-primary-teal/30 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/10 to-bright-aqua/5 rounded-2xl"></div>
                  
                  <div className="relative z-10 text-center space-y-6">
                    <div className="text-sm font-mono text-primary-teal/70 uppercase tracking-wider">
                      Zokratiq is for those who suspect:
                    </div>
                    
                    <blockquote className="text-2xl md:text-3xl font-serif text-soft-white leading-relaxed">
                      "The next competitive advantage is <span className="text-transparent bg-gradient-to-r from-primary-teal to-bright-aqua bg-clip-text">perceptual</span>."
                    </blockquote>

                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary-teal to-transparent mx-auto"></div>
                    
                    <div className="text-sm text-cloud-gray/60 font-mono">
                      — Zokratiq Ethos
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary-teal/30 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-bright-aqua/30 rounded-full"></div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}