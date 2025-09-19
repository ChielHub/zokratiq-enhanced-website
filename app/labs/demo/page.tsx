'use client'

import { motion } from 'framer-motion'
import { ForesightDeck } from '@/components/demo/ForesightDeck'
import { Footer } from '@/components/sections/Footer'

export default function LabsDemoPage() {
  return (
    <main className="min-h-screen bg-base-black">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-deep-charcoal to-base-black">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="px-4 py-2 bg-primary-teal text-base-black text-sm font-mono font-bold rounded-full">
                DEMO ARTIFACT
              </span>
              <span className="text-sm font-mono text-cloud-gray/60">
                Zokratiq Labs Output
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-soft-white mb-6">
              Foresight Deck Demo
            </h1>
            
            <p className="text-xl text-cloud-gray leading-relaxed mb-8">
              See how we transform signals into strategic clarity. This is what a Zokratiq Lab delivers — 
              decision-ready intelligence for your leadership team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button 
                className="px-6 py-3 bg-primary-teal text-base-black font-semibold rounded-lg hover:bg-bright-aqua transition-all duration-300"
                onClick={() => window.location.href = '/labs/fit-check'}
              >
                Get Your Own Signal Map
              </button>
              <button 
                className="px-6 py-3 border-2 border-primary-teal text-primary-teal font-semibold rounded-lg hover:bg-primary-teal hover:text-base-black transition-all duration-300"
                onClick={() => window.location.href = '/labs'}
              >
                ← Back to Labs
              </button>
            </div>

            <p className="text-xs text-cloud-gray/60 font-mono">
              Interactive demo • Navigate between slides above • Real client case anonymized
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demo Deck */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ForesightDeck />
          </motion.div>
        </div>
      </section>

      {/* About This Demo */}
      <section className="py-16 bg-deep-charcoal/30">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-soft-white mb-8 text-center">
              What You're Seeing
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-teal font-mono font-bold text-lg">01</span>
                </div>
                <h3 className="font-bold text-soft-white mb-3">Signal Intelligence</h3>
                <p className="text-sm text-cloud-gray">
                  We scan the edges for early indicators of change, then pressure-test them against your context.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-teal font-mono font-bold text-lg">02</span>
                </div>
                <h3 className="font-bold text-soft-white mb-3">Alternate Futures</h3>
                <p className="text-sm text-cloud-gray">
                  Multiple scenarios mapped with risk/opportunity scores, not just best-case thinking.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-teal font-mono font-bold text-lg">03</span>
                </div>
                <h3 className="font-bold text-soft-white mb-3">Strategic Options</h3>
                <p className="text-sm text-cloud-gray">
                  Clear choices with narrative layer — ready for executive decision-making.
                </p>
              </div>
            </div>

            <div className="text-center mt-12 p-6 bg-base-black/50 rounded-xl border border-primary-teal/20">
              <p className="text-cloud-gray mb-4">
                <span className="text-primary-teal font-semibold">Real Impact:</span> This client shifted their 5-year protein strategy after seeing these futures. 
                They're now building dual capabilities in synthetic and regenerative — ahead of industry consensus.
              </p>
              <button 
                className="text-primary-teal hover:text-bright-aqua text-sm font-semibold transition-colors"
                onClick={() => window.location.href = '/labs/fit-check'}
              >
                See your own Signal Map →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}