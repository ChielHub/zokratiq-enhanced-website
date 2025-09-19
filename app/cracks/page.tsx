'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'

const cracks = [
  {
    id: 1,
    title: "The Great Resignation",
    subtitle: "When work loses its story",
    description: "50% say their job is meaningless. This isn't laziness—it's a hunger for meaning that traditional employment can't satisfy.",
    color: "from-red-400 to-orange-500",
    icon: "🪓"
  },
  {
    id: 2,
    title: "The Great Stagnation",
    subtitle: "Innovation's invisible ceiling",
    description: "Despite infinite compute and capital, breakthrough innovation feels stuck. The low-hanging fruit is gone, but we're still optimizing for picking.",
    color: "from-blue-400 to-cyan-500",
    icon: "🛌"
  },
  {
    id: 3,
    title: "The Expert Paradox",
    subtitle: "When everyone's an expert, no one is",
    description: "The democratization of knowledge has created a crisis of authority. In a world of infinite voices, how do we separate signal from noise?",
    color: "from-purple-400 to-pink-500",
    icon: "🎯"
  },
  {
    id: 4,
    title: "The Reality Recession",
    subtitle: "Truth becomes tribal",
    description: "Shared reality is fragmenting. We don't just disagree on solutions—we can't even agree on what the problems are.",
    color: "from-green-400 to-teal-500",
    icon: "🌐"
  },
  {
    id: 5,
    title: "The Attention Apocalypse",
    subtitle: "Focus as the new scarce resource",
    description: "In an economy built on capturing attention, sustained focus becomes revolutionary. The ability to think deeply is the new luxury.",
    color: "from-yellow-400 to-orange-500",
    icon: "👁️"
  },
  {
    id: 6,
    title: "The Meaning Crisis",
    subtitle: "Purpose in a post-religious world",
    description: "Traditional sources of meaning—religion, nation, family—are weakening. What fills the void? And what happens to societies that can't answer this question?",
    color: "from-indigo-400 to-purple-500",
    icon: "🕳️"
  }
]

export default function CracksPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const heroRef = useRef(null)
  const cracksRef = useRef(null)
  const subscribeRef = useRef(null)

  const isHeroInView = useInView(heroRef, { once: true })
  const isCracksInView = useInView(cracksRef, { once: true, margin: '-100px' })
  const isSubscribeInView = useInView(subscribeRef, { once: true, margin: '-100px' })

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
    <main className="min-h-screen bg-base-black text-soft-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background crack pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            {cracks.map((crack, index) => (
              <motion.path
                key={crack.id}
                d={`M${100 + index * 180} 100 L${200 + index * 180} 300 L${150 + index * 180} 500 L${250 + index * 180} 700`}
                stroke="rgb(20, 184, 166)"
                strokeWidth="1"
                strokeDasharray="3,6"
                initial={{ pathLength: 0 }}
                animate={isHeroInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 3 + index * 0.5, delay: index * 0.3, ease: 'easeInOut' }}
              />
            ))}
          </svg>
        </div>

        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl mx-auto"
          >
            {/* Animated crack icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={isHeroInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -180 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              className="mb-8"
            >
              <div className="relative w-24 h-24 mx-auto">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 3, -3, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="w-24 h-24 bg-gradient-to-br from-primary-teal via-purple-400 to-bright-aqua rounded-2xl flex items-center justify-center shadow-lg shadow-primary-teal/25"
                >
                  <svg width="48" height="48" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M16 3l-4 8h8l-4-8z" fill="white" stroke="none" />
                    <path d="M6 14l10-11 10 11-10 21-10-21z" strokeDasharray="2,2" />
                    <path d="M10 20l12-8" />
                    <path d="M22 20l-12-8" />
                    <path d="M16 25l-6-15M16 25l6-15" strokeDasharray="1,3" />
                  </svg>
                </motion.div>

                {/* Expanding rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 border border-primary-teal/20 rounded-2xl"
                    animate={{
                      scale: [1, 2.5 + i * 0.5],
                      opacity: [0.6, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 1.3,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            >
              The <span className="bg-gradient-to-r from-primary-teal via-purple-400 to-bright-aqua bg-clip-text text-transparent">6 Cracks</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="text-xl md:text-2xl text-cloud-gray font-serif leading-relaxed mb-12 max-w-3xl mx-auto"
            >
              Six fault lines that are reshaping reality as we know it.
              <br />
              <span className="text-primary-teal italic">Get the signals before they become obvious.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                asChild
                href="#subscribe"
                className="bg-gradient-to-r from-primary-teal to-purple-400 text-white border-none hover:shadow-lg hover:shadow-primary-teal/25 hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
              >
                Join the Newsletter →
              </Button>

              <Button
                variant="secondary"
                asChild
                href="#cracks"
                className="border-primary-teal text-primary-teal hover:bg-primary-teal hover:text-white transition-all duration-300 px-8 py-4 text-lg"
              >
                Explore the Cracks ↓
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The 6 Cracks Section */}
      <section ref={cracksRef} id="cracks" className="py-24 lg:py-32 bg-gradient-to-b from-deep-charcoal/50 to-base-black">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCracksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-soft-white mb-6">
              The Fault Lines of Reality
            </h2>
            <p className="text-xl text-cloud-gray font-serif max-w-3xl mx-auto leading-relaxed">
              These aren't trends. They're structural shifts in how we work, think, and exist.
              Each one demands new eyes, new frameworks, new ways of being.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {cracks.map((crack, index) => (
              <motion.div
                key={crack.id}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isCracksInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                className="group"
              >
                <div className="bg-gradient-to-br from-deep-charcoal/60 to-base-black/40 border border-primary-teal/20 rounded-2xl p-8 h-full hover:border-primary-teal/40 transition-all duration-500 hover:transform hover:scale-105 relative overflow-hidden">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${crack.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{crack.icon}</div>

                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-soft-white mb-2">
                        Crack #{crack.id}
                      </h3>
                      <h4 className="text-2xl font-bold text-soft-white mb-3">
                        {crack.title}
                      </h4>
                      <p className="text-lg text-primary-teal italic font-serif mb-4">
                        {crack.subtitle}
                      </p>
                    </div>

                    <p className="text-cloud-gray leading-relaxed">
                      {crack.description}
                    </p>

                    {/* Crack animation */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-teal/30 to-transparent group-hover:via-primary-teal/60 transition-all duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section ref={subscribeRef} id="subscribe" className="py-24 lg:py-32 bg-gradient-to-b from-base-black via-deep-charcoal/40 to-base-black relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
            <motion.path
              d="M100 150 L200 250 L350 200 L500 300 L600 250 L750 350"
              stroke="rgb(20, 184, 166)"
              strokeWidth="1"
              strokeDasharray="4,4"
              initial={{ pathLength: 0 }}
              animate={isSubscribeInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 3, ease: 'easeInOut' }}
            />
            <motion.path
              d="M50 300 L180 200 L320 280 L480 180 L650 270"
              stroke="rgb(168, 85, 247)"
              strokeWidth="1"
              strokeDasharray="3,6"
              initial={{ pathLength: 0 }}
              animate={isSubscribeInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 4, delay: 1, ease: 'easeInOut' }}
            />
          </svg>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isSubscribeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-soft-white mb-6">
                Get the Signals First
              </h2>
              <p className="text-xl text-cloud-gray font-serif leading-relaxed mb-12 max-w-3xl mx-auto">
                Join thousands of reality explorers who receive weekly intelligence briefings on the fault lines reshaping our world.
              </p>

              {/* What you get */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary-teal/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary-teal text-2xl">⚡</span>
                  </div>
                  <h3 className="font-bold text-soft-white text-lg">Weekly Signal Intelligence</h3>
                  <p className="text-cloud-gray">Deep pattern recognition from the edges of each crack</p>
                </div>

                <div className="space-y-4">
                  <div className="w-16 h-16 bg-purple-400/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-purple-400 text-2xl">🔮</span>
                  </div>
                  <h3 className="font-bold text-soft-white text-lg">Reality Briefings</h3>
                  <p className="text-cloud-gray">What's shifting beneath the surface of consensus reality</p>
                </div>

                <div className="space-y-4">
                  <div className="w-16 h-16 bg-bright-aqua/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-bright-aqua text-2xl">🌊</span>
                  </div>
                  <h3 className="font-bold text-soft-white text-lg">Exclusive Access</h3>
                  <p className="text-cloud-gray">First look at Zokratiq Labs experiments and tools</p>
                </div>
              </div>

              {/* Subscription form */}
              <div className="max-w-md mx-auto">
                {!isSubscribed ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full px-6 py-4 bg-deep-charcoal/50 border border-primary-teal/30 rounded-xl text-soft-white placeholder-cloud-gray/60 focus:outline-none focus:border-primary-teal focus:bg-deep-charcoal/70 transition-all duration-300 text-lg"
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
                          className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full mx-auto"
                        />
                      ) : (
                        'Join the 6 Cracks Newsletter →'
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
                    <h3 className="text-xl font-bold text-soft-white mb-2">Welcome to the Reality Underground!</h3>
                    <p className="text-cloud-gray">Check your email for your first 6 Cracks intelligence briefing.</p>
                  </motion.div>
                )}

                <p className="text-xs text-cloud-gray/60 mt-6 leading-relaxed">
                  No spam, ever. Unsubscribe with one click.
                  <br />
                  Join 12,000+ reality explorers who never miss a signal.
                </p>
              </div>

              {/* Preview */}
              <div className="mt-16 p-8 bg-gradient-to-br from-deep-charcoal/40 to-base-black/40 border border-primary-teal/20 rounded-2xl max-w-2xl mx-auto">
                <h4 className="text-lg font-semibold text-soft-white mb-4">This week's crack preview:</h4>
                <blockquote className="text-cloud-gray italic text-left text-lg leading-relaxed">
                  "The collapse of expertise isn't chaos—it's a phase transition. When everyone's an expert,
                  no one is. But that's not the end of knowledge; it's the beginning of something entirely new.
                  <br/><br/>
                  The question isn't how to restore the old gatekeepers. It's how to develop better filters
                  for signal detection in a world of infinite noise..."
                </blockquote>
                <p className="text-primary-teal text-sm mt-4 text-right font-medium">— Crack #3: The Expert Paradox</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}