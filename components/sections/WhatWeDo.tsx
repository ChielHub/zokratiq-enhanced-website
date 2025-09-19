'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FeatureCard } from '@/components/ui/FeatureCard'
import { DiscoveryIcon, InnovationIcon, ImplementationIcon, GrowthIcon } from '@/components/ui/AnimatedIcon'

const features = [
  {
    title: 'Reality Lenses',
    description: 'Distill noise into navigable maps. See what dashboards miss.',
    icon: <DiscoveryIcon />
  },
  {
    title: 'Alternate‑Reality Labs',
    description: 'Rehearse the future. Make fewer "surprises," more prepared luck.',
    icon: <InnovationIcon />
  },
  {
    title: 'Free‑Range Culture Kit',
    description: 'Rituals and constraints that let polymaths ship.',
    icon: <ImplementationIcon />
  }
]

const bullets = [
  'Inject right-brain imagination into left-brain systems',
  'Run red-team rituals to break invisible groupthink',
  'Offer story-rich thoughtware for narrative-dominant markets',
  'Build structures that reward perception over performance'
]

export function WhatWeDo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="how-we-work" ref={ref} className="py-24 lg:py-32 bg-base-black">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-soft-white">
              Because linear thinking breaks in exponential times.
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {bullets.map((bullet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: 'easeOut' }}
                  className="flex items-start text-left"
                >
                  <div className="w-6 h-6 rounded-full bg-primary-teal/20 border border-primary-teal flex-shrink-0 mt-1 mr-4 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary-teal" />
                  </div>
                  <p className="text-lg text-cloud-gray leading-relaxed">{bullet}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
              className="text-xl font-serif text-bright-aqua italic"
            >
              Our clients don't just survive paradigm shifts. They learn to surf them.
            </motion.p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={0.6 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}