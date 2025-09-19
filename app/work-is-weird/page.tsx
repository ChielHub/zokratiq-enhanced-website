'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import MisfitsTypingAnimation from '@/components/animations/MisfitsTypingAnimation'

export default function WorkIsWeirdPage() {
  return (
    <main className="min-h-screen bg-base-black pt-20">
      <div className="container mx-auto px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-soft-white mb-4">
            Work is Weird
            <span className="text-sm bg-warm-accent text-base-black px-3 py-1 rounded font-mono ml-4">Beta</span>
          </h1>
          
          <p className="text-xl font-serif text-warm-accent mb-12 italic">
            For philosophers in exile and companies tired of hiring clones
          </p>
          
          <div className="text-lg text-cloud-gray space-y-6 leading-relaxed mb-16">
            <p className="text-xl">
              "Work is Weird" is our daimonically-aligned placement studio for post-normal times.
            </p>
            
            <p>
              We connect high-signal <MisfitsTypingAnimation className="text-primary-teal" />—philosophers, system thinkers, lateral polymaths—with 
              organizations ready to build with soul.
            </p>
            
            <p className="text-primary-teal font-bold text-xl">
              This isn't HR. This is High Resonance.
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 my-16 text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-deep-charcoal border border-gray-800 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold text-soft-white mb-6">For Individuals</h3>
                <ul className="space-y-3 text-cloud-gray">
                  <li className="flex items-start">
                    <span className="text-primary-teal mr-3">•</span>
                    You have a strange CV
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-teal mr-3">•</span>
                    You ask big questions
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-teal mr-3">•</span>
                    You want to matter
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-deep-charcoal border border-gray-800 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold text-soft-white mb-6">For Organizations</h3>
                <ul className="space-y-3 text-cloud-gray">
                  <li className="flex items-start">
                    <span className="text-warm-accent mr-3">•</span>
                    You don't want another resume
                  </li>
                  <li className="flex items-start">
                    <span className="text-warm-accent mr-3">•</span>
                    You want a mind at the edge
                  </li>
                  <li className="flex items-start">
                    <span className="text-warm-accent mr-3">•</span>
                    You're building something that doesn't exist yet
                  </li>
                </ul>
              </motion.div>
            </div>
            
            <p className="text-bright-aqua italic text-xl">
              Now placing myth-minded thinkers. Inquire within.
            </p>
            
            <p className="text-center text-cloud-gray/60 mt-8">
              Beta program launching soon. Join the waitlist for early access.
            </p>
          </div>

          {/* Featured Manifesto Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-br from-weird-purple/20 to-heritage-red/20 border-2 border-weird-purple/30 rounded-xl p-8 mb-16"
          >
            <div className="text-center mb-6">
              <span className="text-weird-purple font-mono text-sm uppercase tracking-wider">Featured Reading</span>
            </div>
            <h3 className="text-3xl font-bold text-soft-white mb-4 font-serif">
              Manifesto for the Misfits
            </h3>
            <p className="text-lg text-cloud-gray mb-6 leading-relaxed">
              Work was never meant to be this small. A rallying cry for polymaths, divergent thinkers, 
              and those who refuse to sand down their strangeness.
            </p>
            <Button asChild variant="secondary" className="bg-weird-purple text-white border-weird-purple hover:bg-weird-purple/80">
              <a href="/manifesto-for-misfits">Read the Manifesto →</a>
            </Button>
          </motion.div>
          
          <div className="space-y-4">
            <Button size="lg">
              Join Beta Waitlist
            </Button>
            
            <div>
              <Button size="lg" variant="secondary" asChild href="/">
                ← Back to Home
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}