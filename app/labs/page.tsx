'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Footer } from '@/components/sections/Footer'
import { LabsPlanningTrap } from '@/components/sections/LabsPlanningTrap'
import { LabsWhatItIs } from '@/components/sections/LabsWhatItIs'
import { LabsHowItWorks } from '@/components/sections/LabsHowItWorks'
import { LabsOutputs } from '@/components/sections/LabsOutputs'
import { LabsFAQ } from '@/components/sections/LabsFAQ'
import { LabsCTA } from '@/components/sections/LabsCTA'
import { LabsSignalSignup } from '@/components/sections/LabsSignalSignup'
import { StickyLabsCTA } from '@/components/sections/StickyLabsCTA'

function LabsHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base-black">
      {/* Content */}
      <div className="relative z-40 container mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-5xl mx-auto"
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            Zokratiq{' '}
            <span className="font-playfair text-primary-teal">
              Labs
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="text-xl md:text-2xl font-serif text-primary-teal mb-12 italic"
          >
            A portal for alternate futures and signal intelligence.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="text-xl md:text-2xl text-cloud-gray mb-16 leading-relaxed max-w-4xl mx-auto"
          >
            When trend decks blur, Labs sharpens the edge. We map what's coming, simulate what matters, and help your team decide with conviction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                size="lg" 
                className="bg-primary-teal text-base-black hover:bg-bright-aqua px-8 py-4 text-lg rounded-xl font-semibold"
                onClick={() => window.location.href = '/labs/fit-check'}
              >
                Book a 15-min Fit-Check
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  className="ml-2"
                >
                  <path 
                    d="M4 10h12m-6-6l6 6-6 6" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button variant="secondary" size="lg" className="border-2 border-primary-teal text-primary-teal hover:bg-primary-teal hover:text-base-black px-8 py-4 text-lg rounded-xl">
                Download the Labs Primer
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  className="ml-2"
                >
                  <path 
                    d="M12 2v12m-4-4l4 4 4-4M2 18h16" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </motion.div>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            className="text-center mb-8"
          >
            <p className="text-lg font-serif text-primary-teal italic mb-2">
              "Clarity you can steer by." — Strategy Lead, Global Brand
            </p>
          </motion.div>

          {/* Industry Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
            className="flex flex-wrap justify-center gap-4 text-sm font-mono text-cloud-gray/70"
          >
            <span>Deep Tech</span>
            <span>•</span>
            <span>Consumer</span>
            <span>•</span>
            <span>Finance</span>
            <span>•</span>
            <span>Public Sector</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function FeaturedSprint() {
  return (
    <section className="py-24 bg-deep-charcoal">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          {/* Featured Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <span className="inline-block bg-primary-teal text-base-black px-6 py-2 rounded-full text-sm font-semibold font-mono mb-6">
              FEATURED SPRINT
            </span>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-soft-white mb-6">
              Reality Exploration Sprint
            </h2>
            <p className="text-xl md:text-2xl font-serif text-primary-teal italic mb-8">
              Map New Growth Routes & Category Bets
            </p>
            <p className="text-lg text-cloud-gray leading-relaxed mb-8">
              When dashboards show stagnation but reality signals opportunity. A 7-day cross-functional sprint to see your industry from fresh angles and discover non-obvious growth routes.
            </p>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {['belief capital', 'hidden-truth extraction', 'reality design', 'antifragility'].map((tag, index) => (
              <span
                key={tag}
                className="bg-primary-teal/20 text-primary-teal px-4 py-2 rounded-full text-sm font-semibold"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Key Points Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-base-black/50 border border-primary-teal/20 rounded-lg p-6">
              <h4 className="font-bold text-primary-teal mb-3">Situation</h4>
              <p className="text-cloud-gray text-sm">When dashboards show stagnation but reality signals opportunity</p>
            </div>
            <div className="bg-base-black/50 border border-primary-teal/20 rounded-lg p-6">
              <h4 className="font-bold text-primary-teal mb-3">Lens</h4>
              <p className="text-cloud-gray text-sm">Reality Exploration Sprint — see industry from fresh angles</p>
            </div>
            <div className="bg-base-black/50 border border-primary-teal/20 rounded-lg p-6">
              <h4 className="font-bold text-primary-teal mb-3">Move</h4>
              <p className="text-cloud-gray text-sm">7-day cross-functional sprint to map 3 non-obvious growth routes</p>
            </div>
          </motion.div>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-12"
          >
            <p className="font-mono text-cloud-gray/70 text-sm mb-8">
              For: CEO + LT · Strategy · Product · Brand/GTM · Innovation · (Board optional)
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                size="lg" 
                className="bg-primary-teal text-base-black hover:bg-bright-aqua px-8 py-4 text-lg rounded-xl font-semibold"
                onClick={() => window.open('mailto:chiel@zokratiq.com?subject=SPRINT - Reality Exploration Kit Request', '_blank')}
              >
                Get Sprint Kit
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  className="ml-2"
                >
                  <path 
                    d="M4 10h12m-6-6l6 6-6 6" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </motion.div>
            <p className="text-xs text-cloud-gray/60 mt-4 font-mono">
              Free to download • We won't spam you • Already downloaded 33 times
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default function LabsPage() {
  return (
    <main className="min-h-screen">
      <LabsHero />
      <LabsPlanningTrap />
      <LabsWhatItIs />
      <LabsHowItWorks />
      <LabsOutputs />
      <FeaturedSprint />
      <LabsFAQ />
      <LabsCTA />
      <LabsSignalSignup />
      <Footer />
      <StickyLabsCTA />
    </main>
  )
}