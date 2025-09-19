'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'

export function CracksNewsletter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate subscription process
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubscribed(true)
    setIsSubmitting(false)
    setEmail('')
  }

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-gradient-to-b from-base-black via-deep-charcoal/40 to-base-black relative overflow-hidden">
      {/* Background crack pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
          <motion.path
            d="M100 150 L200 250 L350 200 L500 300 L600 250 L750 350"
            stroke="rgb(20, 184, 166)"
            strokeWidth="1"
            strokeDasharray="4,4"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
          <motion.path
            d="M50 300 L180 200 L320 280 L480 180 L650 270"
            stroke="rgb(168, 85, 247)"
            strokeWidth="1"
            strokeDasharray="3,6"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 4, delay: 1, ease: 'easeInOut' }}
          />
          <motion.path
            d="M200 100 L300 180 L450 140 L580 220 L700 180"
            stroke="rgb(20, 184, 166)"
            strokeWidth="0.5"
            strokeDasharray="2,8"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 5, delay: 2, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated crack icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-8"
          >
            <div className="relative w-16 h-16 mx-auto">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="w-16 h-16 bg-gradient-to-br from-primary-teal to-purple-400 rounded-lg flex items-center justify-center"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="2">
                  <path d="M16 3l-3 6h6l-3-6z" fill="white" />
                  <path d="M8 12l8-9 8 9-8 17-8-17z" strokeDasharray="2,2" />
                  <path d="M12 18l8-6" />
                  <path d="M20 18l-8-6" />
                </svg>
              </motion.div>

              {/* Pulsing rings */}
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border border-primary-teal/30 rounded-lg"
                  animate={{
                    scale: [1, 2 + i * 0.5],
                    opacity: [0.6, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 1.5,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-soft-white mb-6 leading-tight"
          >
            The <span className="bg-gradient-to-r from-primary-teal to-purple-400 bg-clip-text text-transparent">6 Cracks</span> Newsletter
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="text-xl md:text-2xl text-cloud-gray font-serif leading-relaxed mb-8 max-w-3xl mx-auto"
          >
            Six fault lines that are reshaping reality.
            <br />
            <span className="text-primary-teal italic">Get the signals before they become obvious.</span>
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary-teal/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-primary-teal text-xl">⚡</span>
              </div>
              <h3 className="font-semibold text-soft-white text-lg">Weekly Signals</h3>
              <p className="text-cloud-gray text-sm">Deep pattern recognition from the edges</p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-purple-400/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-purple-400 text-xl">🔮</span>
              </div>
              <h3 className="font-semibold text-soft-white text-lg">Reality Briefings</h3>
              <p className="text-cloud-gray text-sm">What's shifting beneath the surface</p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-bright-aqua/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-bright-aqua text-xl">🌊</span>
              </div>
              <h3 className="font-semibold text-soft-white text-lg">Exclusive Access</h3>
              <p className="text-cloud-gray text-sm">First look at Labs experiments</p>
            </div>
          </motion.div>

          {/* Subscription form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
            className="max-w-md mx-auto"
          >
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-6 py-4 bg-deep-charcoal/50 border border-primary-teal/30 rounded-xl text-soft-white placeholder-cloud-gray/60 focus:outline-none focus:border-primary-teal focus:bg-deep-charcoal/70 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-teal/5 to-purple-400/5 rounded-xl -z-10"></div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-teal to-purple-400 text-white border-none hover:shadow-lg hover:shadow-primary-teal/25 hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-xl disabled:opacity-50 disabled:pointer-events-none"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    'Join the 6 Cracks →'
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="bg-gradient-to-br from-primary-teal/10 to-purple-400/10 border border-primary-teal/30 rounded-xl p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-teal to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-soft-white mb-2">You're in!</h3>
                <p className="text-cloud-gray">Welcome to the 6 Cracks. Check your email for your first signal briefing.</p>
              </motion.div>
            )}

            <p className="text-xs text-cloud-gray/60 mt-4 leading-relaxed">
              No spam, ever. Unsubscribe with one click.
              <br />
              <a href="/cracks" className="text-primary-teal hover:text-bright-aqua transition-colors underline">
                Learn more about the 6 Cracks →
              </a>
            </p>
          </motion.div>

          {/* Preview of what's inside */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
            className="mt-16 p-6 bg-gradient-to-br from-deep-charcoal/40 to-base-black/40 border border-primary-teal/20 rounded-2xl max-w-2xl mx-auto"
          >
            <h4 className="text-lg font-semibold text-soft-white mb-4">This week's crack preview:</h4>
            <blockquote className="text-cloud-gray italic text-left">
              "The collapse of expertise isn't chaos—it's a phase transition. When everyone's an expert,
              no one is. But that's not the end of knowledge; it's the beginning of something entirely new..."
            </blockquote>
            <p className="text-primary-teal text-sm mt-3 text-right">— Crack #3: The Expert Paradox</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}