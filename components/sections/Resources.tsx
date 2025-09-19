'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const strategicArtifacts = [
  {
    title: 'The Tao Jones Index — Measuring Cognitive Diversity in Boardrooms',
    cta: 'Explore Index',
    href: '/resources/tao-jones-index'
  },
  {
    title: '🧭 Decision Partner - AI Thought Algorithms',
    cta: 'Try Tool',
    href: '/decision-partner'
  },
  {
    title: '📖 Reality Explorers Guide',
    cta: 'Download Guide',
    href: '/resources/reality-explorers-guide/'
  }
]

const thoughtware = [
  {
    title: 'Belief Capital Diagnostic',
    cta: 'Take Assessment',
    href: '/belief-capital-diagnostic'
  },
  {
    title: '🌿 BIDARA Innovation Canvas',
    cta: 'Download Canvas',
    href: '/resources/bidara-canvas'
  },
  {
    title: 'Work is Weird (Beta)',
    cta: 'Explore Beta',
    href: '/work-is-weird'
  }
]

function ResourceCard({ title, cta, href, delay = 0 }: { title: string; cta: string; href: string; delay?: number }) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="group block bg-deep-charcoal border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:border-primary-teal/50 hover:shadow-lg hover:shadow-primary-teal/10 relative z-auto"
    >
      <div className="relative">
        <h3 className="text-lg font-semibold text-soft-white mb-4 group-hover:text-bright-aqua transition-colors duration-300">
          {title}
        </h3>
        
        <div className="flex items-center text-primary-teal group-hover:text-bright-aqua transition-colors duration-300">
          <span className="font-medium mr-2">{cta}</span>
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform group-hover:translate-x-1"
          >
            <path
              d="M3 8h10m-5-5l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>
      </div>
      
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.a>
  )
}

export function Resources() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-deep-charcoal/20 z-auto">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-soft-white mb-8">
            Resources & Downloads
          </h2>
          <p className="text-xl text-cloud-gray max-w-3xl mx-auto">
            Tools, frameworks, and experiments to help you navigate post-normal times.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* Strategic Artifacts */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="text-2xl font-bold text-primary-teal mb-8"
            >
              Strategic Artifacts
            </motion.h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strategicArtifacts.map((item, index) => (
                <ResourceCard
                  key={item.title}
                  title={item.title}
                  cta={item.cta}
                  href={item.href}
                  delay={0.3 + index * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Thoughtware & Experiments */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
              className="text-2xl font-bold text-primary-teal mb-8"
            >
              Thoughtware & Experiments
            </motion.h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {thoughtware.map((item, index) => (
                <ResourceCard
                  key={item.title}
                  title={item.title}
                  cta={item.cta}
                  href={item.href}
                  delay={0.7 + index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>

        {/* View All Resources Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
          className="text-center mt-12"
        >
          <motion.a
            href="/resources/"
            className="inline-flex items-center bg-primary-teal/10 border border-primary-teal/30 rounded-xl px-8 py-4 text-primary-teal font-semibold hover:bg-primary-teal/20 hover:border-primary-teal/50 transition-all duration-300 group"
            whileHover={{ y: -2 }}
          >
            <span className="mr-2">View All Resources</span>
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform group-hover:translate-x-1"
            >
              <path
                d="M3 8h10m-5-5l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}