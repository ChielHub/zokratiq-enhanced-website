'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/navigation/Header'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

// Try It Now Block Component
function TryItNowBlock() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-base-black/95 backdrop-blur-md border-t border-primary-teal py-4"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-cloud-gray font-medium">Ready to upgrade your decision-making process?</span>
          <motion.a
            href="/decision-partner"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-teal to-bright-aqua text-base-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Launch Decision Partner →
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

// Glitch effect for CTAs
function GlitchButton({ children, onClick, variant = 'primary' }: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}) {
  const baseClass = variant === 'primary'
    ? "inline-flex items-center justify-center px-8 py-4 bg-primary-teal text-base-black font-bold rounded-none hover:bg-bright-aqua transition-all duration-300 relative overflow-hidden group"
    : "inline-flex items-center justify-center px-6 py-3 border-2 border-primary-teal text-primary-teal font-mono text-sm hover:bg-primary-teal hover:text-base-black transition-all duration-300"

  return (
    <motion.button
      className={baseClass}
      whileHover={{ scale: variant === 'primary' ? 1.02 : 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-bright-aqua transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

export default function DecisionPartnerPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.5

  const algorithms = [
    { name: 'Bias Radar', glyph: '🔍', description: 'Spots the invisible traps that derail decisions' },
    { name: 'Incentive Scan', glyph: '⚖️', description: 'Follows the money, status, and hidden motives' },
    { name: 'Evidence Stress-Test', glyph: '🧪', description: 'Makes you prove yourself wrong before the market does' },
    { name: 'Risk Map & Pre-Mortem', glyph: '🌊', description: 'Maps tail risks and failure modes before they hit' },
    { name: 'Daimonic Advisors', glyph: '🔥', description: 'Channels Future Self, Younger Self, and inner Daimon' },
    { name: 'Second-Order Effects', glyph: '🔗', description: 'Maps ripple effects and unintended consequences' },
    { name: 'Optionality Analysis', glyph: '🗂️', description: 'Evaluates paths while preserving flexibility' },
    { name: 'Time Horizon Scan', glyph: '⏳', description: 'Tests decisions across different time scales' },
    { name: 'Resource Reality Check', glyph: '⚡', description: 'Brutally honest assessment of capabilities' },
    { name: 'Stakeholder Chess', glyph: '♟️', description: 'Maps political dynamics and alliance structures' },
    { name: 'Market Reality Test', glyph: '📊', description: 'Stress-tests assumptions against market dynamics' },
    { name: 'Identity Coherence Check', glyph: '🎭', description: 'Tests alignment with core identity and values' }
  ]

  return (
    <div className="min-h-screen bg-base-black text-soft-white overflow-x-hidden">
      <Header />
      <TryItNowBlock />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-32">
        {/* Background geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-primary-teal rotate-45 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-bright-aqua rotate-12"></div>
          <div className="absolute top-3/4 left-1/6 w-16 h-16 bg-primary-teal/20 skew-x-12"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-teal/20 border border-primary-teal/30 rounded-full text-primary-teal text-sm font-mono font-semibold mb-8">
              🧭 AI-POWERED TOOL • INTERACTIVE
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="font-mono text-primary-teal">Decision</span><br />
              <span className="font-playfair">Partner</span>
            </h1>

            <p className="text-xl md:text-2xl text-bright-aqua mb-8 font-semibold">
              AI Thought Algorithms for when the stakes are real.
            </p>

            <div className="text-lg md:text-xl text-cloud-gray leading-relaxed mb-12 max-w-3xl mx-auto space-y-6">
              <p>
                Stop making decisions in the dark. Our interactive AI tool guides you through
                Zokratiq's 12 Algorithms of Thought—battle-tested frameworks that expose bias,
                map risks, and unlock clarity when everything feels uncertain.
              </p>
              <p className="font-semibold text-soft-white">
                Because the biggest risk isn't making the wrong decision.
                <br />It's making it for the wrong reasons.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <GlitchButton onClick={() => window.location.href = '/decision-partner'}>
                🚀 Launch Decision Partner
              </GlitchButton>

              <div className="text-sm text-cloud-gray/80 font-mono">
                ⚡ Interactive AI guidance • No signup required
              </div>
            </div>

            <div className="border-t border-primary-teal/20 pt-8">
              <p className="text-lg text-primary-teal italic mb-4">
                "The quality of your decisions determines the quality of your life."
              </p>
              <div className="flex justify-center gap-8 flex-wrap text-sm text-warm-accent font-mono">
                <span>12 Thought Algorithms</span>
                <span>•</span>
                <span>Bias Detection</span>
                <span>•</span>
                <span>Risk Mapping</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The 12 Algorithms Section */}
      <section className="py-24 bg-deep-charcoal">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-soft-white mb-8 font-playfair">
              The 12 Algorithms of Thought
            </h2>
            <p className="text-xl text-cloud-gray leading-relaxed">
              Each algorithm attacks decision-making from a different angle, exposing blind spots
              and revealing insights you'd never find on your own.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {algorithms.map((algorithm, index) => (
              <motion.div
                key={algorithm.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-base-black/50 border border-primary-teal/20 rounded-xl p-6 hover:border-primary-teal/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4 text-center">{algorithm.glyph}</div>
                <h3 className="text-lg font-bold text-primary-teal mb-3 text-center">{algorithm.name}</h3>
                <p className="text-cloud-gray text-sm leading-relaxed text-center">
                  {algorithm.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-base-black">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-soft-white mb-8 font-playfair">
              How Decision Partner Works
            </h2>
            <p className="text-xl text-cloud-gray leading-relaxed">
              An iterative AI conversation that guides you through the decision maze.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-primary-teal to-bright-aqua rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-base-black">
                1
              </div>
              <h3 className="text-2xl font-bold text-soft-white mb-4">Frame Your Challenge</h3>
              <p className="text-cloud-gray leading-relaxed">
                Describe your decision in plain language. The AI helps you clarify what you're
                really trying to decide and why it matters.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-bright-aqua to-weird-purple rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-base-black">
                2
              </div>
              <h3 className="text-2xl font-bold text-soft-white mb-4">Select Your Algorithms</h3>
              <p className="text-cloud-gray leading-relaxed">
                Choose which of the 12 thought algorithms to apply, or let the AI recommend
                the most relevant ones for your specific situation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-weird-purple to-heritage-red rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-base-black">
                3
              </div>
              <h3 className="text-2xl font-bold text-soft-white mb-4">Navigate to Clarity</h3>
              <p className="text-cloud-gray leading-relaxed">
                Engage in an iterative conversation as the AI guides you through each algorithm,
                surfacing insights and building toward your decision.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-24 bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-soft-white mb-8 font-playfair">
              What You Get
            </h2>
            <p className="text-xl text-cloud-gray leading-relaxed">
              More than a decision tool—a thinking upgrade.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="border-l-4 border-primary-teal pl-6">
                <h3 className="text-2xl font-bold text-primary-teal mb-4">🎯 Bias Detection</h3>
                <p className="text-cloud-gray leading-relaxed">
                  Expose the cognitive traps and emotional blind spots that sabotage even smart people.
                </p>
              </div>

              <div className="border-l-4 border-bright-aqua pl-6">
                <h3 className="text-2xl font-bold text-bright-aqua mb-4">🗺️ Risk Mapping</h3>
                <p className="text-cloud-gray leading-relaxed">
                  Surface hidden risks, tail events, and second-order effects before they surface on their own.
                </p>
              </div>

              <div className="border-l-4 border-weird-purple pl-6">
                <h3 className="text-2xl font-bold text-weird-purple mb-4">🧠 Perspective Shift</h3>
                <p className="text-cloud-gray leading-relaxed">
                  See your decision through multiple lenses—future self, key stakeholders, market reality.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-teal/10 to-bright-aqua/5 border border-primary-teal/30 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-soft-white mb-6">The Difference</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="text-primary-teal font-bold mr-3 text-xl">✓</span>
                  <div>
                    <div className="font-semibold text-soft-white mb-1">Interactive, not static</div>
                    <div className="text-cloud-gray text-sm">Adapts to your responses and digs deeper where needed</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-teal font-bold mr-3 text-xl">✓</span>
                  <div>
                    <div className="font-semibold text-soft-white mb-1">Battle-tested frameworks</div>
                    <div className="text-cloud-gray text-sm">Based on 12 proven decision-making algorithms</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-teal font-bold mr-3 text-xl">✓</span>
                  <div>
                    <div className="font-semibold text-soft-white mb-1">No fluff, all signal</div>
                    <div className="text-cloud-gray text-sm">Cuts through noise to surface what actually matters</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* When to Use Section */}
      <section className="py-24 bg-deep-charcoal">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-soft-white mb-8 font-playfair">
              When to Use Decision Partner
            </h2>
            <p className="text-xl text-cloud-gray leading-relaxed">
              Perfect for high-stakes decisions where the cost of being wrong is significant.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-teal/10 to-bright-aqua/5 border border-primary-teal/30 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-primary-teal mb-6">✓ Perfect For:</h3>
              <ul className="space-y-4 text-cloud-gray">
                <li className="flex items-start">
                  <span className="text-primary-teal font-bold mr-3">•</span>
                  Strategic business decisions with multiple variables
                </li>
                <li className="flex items-start">
                  <span className="text-primary-teal font-bold mr-3">•</span>
                  Career moves that could reshape your trajectory
                </li>
                <li className="flex items-start">
                  <span className="text-primary-teal font-bold mr-3">•</span>
                  Investment decisions with unclear risk/reward profiles
                </li>
                <li className="flex items-start">
                  <span className="text-primary-teal font-bold mr-3">•</span>
                  Complex negotiations where multiple stakeholders are involved
                </li>
                <li className="flex items-start">
                  <span className="text-primary-teal font-bold mr-3">•</span>
                  Life transitions that feel overwhelming or uncertain
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-heritage-red/10 to-red-400/5 border border-heritage-red/30 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-heritage-red mb-6">✗ Skip If:</h3>
              <ul className="space-y-4 text-cloud-gray">
                <li className="flex items-start">
                  <span className="text-heritage-red font-bold mr-3">•</span>
                  You're looking for simple yes/no answers
                </li>
                <li className="flex items-start">
                  <span className="text-heritage-red font-bold mr-3">•</span>
                  The decision is purely emotional or values-based
                </li>
                <li className="flex items-start">
                  <span className="text-heritage-red font-bold mr-3">•</span>
                  You need someone else to make the decision for you
                </li>
                <li className="flex items-start">
                  <span className="text-heritage-red font-bold mr-3">•</span>
                  Time pressure requires immediate action
                </li>
                <li className="flex items-start">
                  <span className="text-heritage-red font-bold mr-3">•</span>
                  The stakes are low and mistakes are easily reversible
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="start-decision-partner" className="py-24 bg-gradient-to-br from-base-black to-deep-charcoal">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-8">
              <span className="inline-block bg-gradient-to-r from-primary-teal to-bright-aqua text-base-black px-6 py-3 rounded-full text-sm font-semibold">
                🧭 AI-POWERED DECISION SUPPORT
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-soft-white mb-8 font-playfair">
              Ready to Make Better Decisions?
            </h2>

            <p className="text-xl text-cloud-gray leading-relaxed mb-12">
              Stop second-guessing yourself. Let the 12 Algorithms of Thought guide you to clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <GlitchButton onClick={() => window.location.href = '/decision-partner'}>
                🚀 Launch Decision Partner
              </GlitchButton>

              <div className="text-sm text-cloud-gray/80 font-mono">
                Free to use • No signup required • Start immediately
              </div>
            </div>

            <div className="flex justify-center gap-8 flex-wrap text-sm text-cloud-gray/80 font-mono">
              <span>✓ 12 Thought Algorithms</span>
              <span>•</span>
              <span>✓ Interactive AI guidance</span>
              <span>•</span>
              <span>✓ Bias detection & risk mapping</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  )
}