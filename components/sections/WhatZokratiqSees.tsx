'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface FaultLineProps {
  icon: string
  title: string
  subtitle: string
  description: string
  quote: string
  cta: string
  ctaLink: string
  delay?: number
}

function FaultLineModule({ icon, title, subtitle, description, quote, cta, ctaLink, delay = 0 }: FaultLineProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className="relative group"
    >
      <div className="relative bg-gradient-to-br from-deep-charcoal via-base-black to-deep-charcoal border border-primary-teal/10 rounded-lg p-8 hover:border-primary-teal/40 transition-all duration-500 overflow-hidden">
        
        {/* Animated background pulse */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { 
            opacity: [0, 0.3, 0], 
            scale: [0.8, 1.2, 0.8] 
          } : { opacity: 0, scale: 0.8 }}
          transition={{ 
            duration: 3, 
            delay: delay + 0.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 bg-gradient-to-br from-primary-teal/20 via-transparent to-bright-aqua/20 rounded-lg"
        />

        {/* Shimmer overlay */}
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={isInView ? { 
            x: ['−100%', '100%', '−100%'], 
            opacity: [0, 0.4, 0] 
          } : { x: '-100%', opacity: 0 }}
          transition={{ 
            duration: 2.5, 
            delay: delay + 1,
            repeat: Infinity,
            repeatDelay: 4,
            ease: 'linear'
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-teal/30 to-transparent skew-x-12 rounded-lg"
        />

        {/* Pulsing border effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { 
            opacity: [0, 0.6, 0] 
          } : { opacity: 0 }}
          transition={{ 
            duration: 2, 
            delay: delay + 0.8,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 border-2 border-primary-teal/40 rounded-lg"
        />

        {/* Content - positioned above animated layers */}
        <div className="relative z-10">
          <div className="flex items-start space-x-4 mb-6">
            <motion.span 
              className="text-4xl"
              initial={{ opacity: 0.8 }}
              animate={isInView ? { 
                opacity: [0.8, 1, 0.8],
                scale: [1, 1.05, 1]
              } : { opacity: 0.8 }}
              transition={{ 
                duration: 2.5, 
                delay: delay + 1.2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut'
              }}
            >
              {icon}
            </motion.span>
            <div>
              <h3 className="text-2xl font-bold text-soft-white mb-2">{title}</h3>
              <h4 className="text-lg font-medium text-primary-teal mb-4">{subtitle}</h4>
            </div>
          </div>
          
          <div className="text-cloud-gray leading-relaxed mb-6 space-y-2">
            {description.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          
          <div className="relative border-l-4 border-bright-aqua/50 pl-4 mb-6">
            {/* Animated quote border */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={isInView ? { 
                scaleY: [0, 1, 0],
                opacity: [0, 0.8, 0]
              } : { scaleY: 0, opacity: 0 }}
              transition={{ 
                duration: 1.8, 
                delay: delay + 1.5,
                repeat: Infinity,
                repeatDelay: 4,
                ease: 'easeInOut'
              }}
              className="absolute left-0 top-0 w-1 h-full bg-bright-aqua origin-top"
            />
            <p className="text-lg font-serif italic text-bright-aqua">"{quote}"</p>
          </div>
          
          <motion.a 
            href={ctaLink}
            className="inline-flex items-center text-primary-teal hover:text-bright-aqua transition-colors font-semibold group-hover:underline"
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {cta} →
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

export function WhatZokratiqSees() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const faultLines = [
    {
      icon: '🪓',
      title: 'The Great Resignation',
      subtitle: 'Why employees ghost their work',
      description: `50% say their job is meaningless. But this isn't laziness — it's a hunger for meaning.

People aren't quitting because they're weak.
They're quitting because the story broke.
In a world drained of myth, sense-making becomes the new salary.`,
      quote: 'I want to matter, not just clock in.',
      cta: 'Rebuild meaning with Curiosity Tribes',
      ctaLink: '/zokratiq/labs/'
    },
    {
      icon: '💤',
      title: 'The Great Stagnation',
      subtitle: 'Why innovation feels stale',
      description: `Despite our tech, most organizations feel like they're sleepwalking.

Speed without synthesis creates static.
Insight needs friction, cross-pollination, myth.
The future isn't faster — it's stranger.`,
      quote: 'Progress without perception is just prettier entropy.',
      cta: 'Explore Frontier-Idea Briefings',
      ctaLink: '/zokratiq/resources/'
    },
    {
      icon: '🧬',
      title: 'Hyperspecialization',
      subtitle: 'Why brilliance is bored',
      description: `We've over-optimized ourselves into irrelevance.

Your team doesn't need another specialist.
It needs a neo-generalist — someone weird enough to connect the forgotten dots.
New ideas live at the intersection, not the silo.`,
      quote: 'Your T-shaped hire might need a circle brain.',
      cta: 'Meet the mis/fits',
      ctaLink: '/zokratiq/work-is-weird/'
    },
    {
      icon: '🧠',
      title: 'Cognitive Uniformity',
      subtitle: 'Why teams keep missing the obvious',
      description: `Left-brain monoculture is a design flaw.

We filter for sameness and call it intelligence.
But divergent minds see what consensus can't.
Inject right-brain imagination into your decision stack.`,
      quote: 'Diversity without divergence is decoration.',
      cta: 'Run a Whole-Brain Audit',
      ctaLink: '/zokratiq/scan/'
    },
    {
      icon: '🧨',
      title: 'The Meta-Crisis',
      subtitle: 'Why systems fail and everyone freezes',
      description: `We sense collapse. But we think too small.

Doom is addictive. Zero-sum is a trance.
The real challenge is perception — not panic.
To break the trance, break the lens.`,
      quote: 'Fear is a system. We rewire it.',
      cta: 'Try a Reality Lens Scan',
      ctaLink: '/zokratiq/scan/'
    },
    {
      icon: '🎨',
      title: 'The Great Reconfiguration',
      subtitle: 'Why the Creator Era is already here',
      description: `We're shifting from Consumers to Co-Creators.

The industrial model is dead.
The brand-as-pipeline is over.
The next advantage is co-agency, myth, resonance.`,
      quote: 'You\'re not selling products. You\'re narrating futures.',
      cta: 'Join Zokratiq Labs',
      ctaLink: '/zokratiq/labs/'
    }
  ]

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-gradient-to-b from-base-black via-deep-charcoal/30 to-base-black">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-soft-white mb-8">
              🌀 What Zokratiq Sees
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-6 text-xl text-cloud-gray leading-relaxed">
              <p>
                Zokratiq is not just a studio — it's a strategic observatory at the edges of understanding.
              </p>
              
              <p>
                We combine signals from philosophy, physics, neuroscience, theology, and the arts to upgrade your business's reality headset. This isn't about adding more dashboards. It's about recalibrating your lens on what's real, what's changing, and what's possible.
              </p>
              
              <p>
                We live in extraordinary times. The stories that once powered business no longer explain the world. Growth has stagnated. Teams feel aimless. Work feels like a parody of itself. What's needed now isn't better optimization.
              </p>
              
              <p className="text-primary-teal font-bold text-2xl">
                It's perceptual reinvention.
              </p>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full h-px bg-gradient-to-r from-transparent via-primary-teal to-transparent mb-16"
          />

          {/* Fault Lines Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-soft-white mb-4">
              🌋 The Fault Lines We Track
            </h3>
          </motion.div>

          {/* Fault Line Modules */}
          <div className="space-y-8">
            {faultLines.map((faultLine, index) => (
              <div key={faultLine.title}>
                <FaultLineModule 
                  {...faultLine} 
                  delay={0.9 + (index * 0.2)}
                />
                {index < faultLines.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + (index * 0.2) }}
                    className="flex justify-center py-8"
                  >
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-cloud-gray/30 to-transparent" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Why Zokratiq Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 2 }}
            className="mt-20 pt-16 border-t border-primary-teal/20"
          >
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-soft-white mb-8">
                🔍 Why Zokratiq
              </h3>
              
              <div className="max-w-4xl mx-auto space-y-6 text-xl text-cloud-gray leading-relaxed mb-12">
                <p>
                  Because linear thinking breaks under exponential pressure.
                </p>
                <p>
                  And most strategy today is still built on broken maps.
                </p>
                
                <p className="text-soft-white font-semibold">
                  Zokratiq helps teams recalibrate their perception before they redesign their plans.
                </p>
                
                <p>
                  We build whole-brain operating models for organizations navigating complexity, dissonance, and nonlinear change.
                </p>
                
                {/* Perceptual Advantage Card */}
                <div className="max-w-2xl mx-auto mt-12 mb-12 p-6 bg-gradient-to-br from-deep-charcoal via-base-black to-deep-charcoal border border-primary-teal/20 rounded-lg">
                  <p className="text-cloud-gray mb-4">
                    Zokratiq is for those who suspect:
                  </p>
                  <p className="text-2xl text-primary-teal font-bold mb-2">
                    "The next competitive advantage is perceptual."
                  </p>
                  <p className="text-sm text-cloud-gray/70 font-mono">
                    — Zokratiq Ethos
                  </p>
                </div>
              </div>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-teal to-transparent mb-16" />
              
              {/* What We Help You Do */}
              <h4 className="text-2xl md:text-3xl font-bold text-soft-white mb-8">
                🧠 What We Help You Do
              </h4>
              
              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4 mb-16 text-left">
                {[
                  'Inject right-brain imagination into left-brain systems',
                  'Break groupthink through red-team rituals and lens-switching',
                  'Replace metrics-first thinking with story-rich sensemaking',
                  'Design structures that reward perception, not just performance',
                  'Detect paradigm shifts before they hit the mainstream',
                  'Surface hidden truths within your business, culture, and market',
                  'Build curiosity-driven teams that don\'t fear the unknown',
                  'Design futures that are not just possible — but desirable'
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    transition={{ duration: 0.6, delay: 2.2 + (index * 0.1) }}
                    className="flex items-start space-x-3"
                  >
                    <span className="text-bright-aqua text-xl mt-1 flex-shrink-0">•</span>
                    <span className="text-cloud-gray">{item}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-teal to-transparent mb-16" />
              
              {/* How We Work - 3 Tiles */}
              <h4 className="text-2xl md:text-3xl font-bold text-soft-white mb-8">
                🧪 How We Work
              </h4>
              
              <p className="text-xl text-cloud-gray mb-12">Our approach blends:</p>
              
              <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 2.8 }}
                  className="bg-gradient-to-br from-deep-charcoal via-base-black to-deep-charcoal border border-primary-teal/20 rounded-lg p-6 hover:border-primary-teal/40 transition-all duration-500"
                >
                  <h5 className="text-xl font-bold text-soft-white mb-4">
                    Reality-Scanning Protocols
                  </h5>
                  <div className="text-primary-teal mb-4">→</div>
                  <p className="text-cloud-gray">
                    Drawing from philosophy, neuroscience, metaphysics, and the arts
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 3.0 }}
                  className="bg-gradient-to-br from-deep-charcoal via-base-black to-deep-charcoal border border-primary-teal/20 rounded-lg p-6 hover:border-primary-teal/40 transition-all duration-500"
                >
                  <h5 className="text-xl font-bold text-soft-white mb-4">
                    Speculative Design Sessions
                  </h5>
                  <div className="text-primary-teal mb-4">→</div>
                  <p className="text-cloud-gray">
                    To simulate alternate timelines and stress-test assumptions
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 3.2 }}
                  className="bg-gradient-to-br from-deep-charcoal via-base-black to-deep-charcoal border border-primary-teal/20 rounded-lg p-6 hover:border-primary-teal/40 transition-all duration-500"
                >
                  <h5 className="text-xl font-bold text-soft-white mb-4">
                    Immersive Coaching & Rituals
                  </h5>
                  <div className="text-primary-teal mb-4">→</div>
                  <p className="text-cloud-gray">
                    High-contact experiences that shift how teams perceive, not just perform
                  </p>
                </motion.div>
              </div>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-teal to-transparent mb-8" />
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}