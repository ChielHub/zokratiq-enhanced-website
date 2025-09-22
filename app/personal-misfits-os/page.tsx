'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/navigation/Header'
import { Footer } from '@/components/sections/Footer'

// Get It Now Block Component (maintained from original)
function GetItNowBlock() {
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
      className="fixed bottom-0 left-0 right-0 z-50 bg-base-black/95 backdrop-blur-md border-t border-weird-purple py-4"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-cloud-gray font-medium">Ready to stop forcing yourself into the wrong mold?</span>
          <motion.a
            href="#start-misfits-os"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-weird-purple to-bright-aqua text-base-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Misfits OS
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
    ? "inline-flex items-center justify-center px-8 py-4 bg-weird-purple text-base-black font-bold rounded-none hover:bg-bright-aqua transition-all duration-300 relative overflow-hidden group"
    : "inline-flex items-center justify-center px-6 py-3 border-2 border-weird-purple text-weird-purple font-mono text-sm hover:bg-weird-purple hover:text-base-black transition-all duration-300"
  
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

export default function MisfitsOSPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.5

  return (
    <div className="min-h-screen bg-base-black text-soft-white overflow-x-hidden">
      <Header />
      <GetItNowBlock />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-32">
        {/* Background geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-weird-purple rotate-45 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-bright-aqua rotate-12"></div>
          <div className="absolute top-3/4 left-1/6 w-16 h-16 bg-weird-purple/20 skew-x-12"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 tracking-tight">
              The Operating System
              <br />
              <span className="text-weird-purple">for Misfits</span>
            </h1>
            
            <motion.p 
              className="text-2xl lg:text-3xl text-cloud-gray mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              We help outsiders turn their strange edge into a system for leverage and freedom.
            </motion.p>

            <motion.div 
              className="bg-deep-charcoal/50 border border-weird-purple/30 rounded-lg p-6 mb-12 text-left max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-weird-purple text-xl">👉</span>
                <div>
                  <strong className="text-bright-aqua">Clarity Bridge:</strong>
                  <p className="text-cloud-gray mt-1">
                    For those who never fit the corporate mold, but know their difference is their advantage.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <GlitchButton variant="primary">
                Start Your Misfits OS
              </GlitchButton>
              <GlitchButton variant="secondary">
                See How It Works
              </GlitchButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 1 — The Problem */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-deep-charcoal/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-8"
            style={{ transform: `translateY(${parallaxOffset * 0.1}px)` }}
          >
            <div className="text-center mb-16">
              <span className="text-weird-purple font-mono text-sm tracking-wider">SECTION 1</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-8">The Problem</h2>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-2xl leading-relaxed mb-8">
                Most systems are built for <em className="text-cloud-gray not-italic">conformity</em>.
                <br />
                They reward smooth edges, safe choices, and predictable outcomes.
              </p>
              
              <div className="bg-base-black/50 border-l-4 border-weird-purple pl-8 py-6 my-8">
                <p className="text-xl leading-relaxed">
                  But misfits?
                  <br />
                  They see cracks others miss.
                  <br />
                  They can't — and shouldn't — play the same game.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2 — The Shift */}
      <section className="py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-8"
            style={{ transform: `translateY(${parallaxOffset * -0.1}px)` }}
          >
            <div className="text-center mb-16">
              <span className="text-bright-aqua font-mono text-sm tracking-wider">SECTION 2</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-8">The Shift</h2>
            </div>
            
            <div className="prose prose-invert max-w-none text-center">
              <p className="text-2xl leading-relaxed mb-8">
                The world is <span className="text-weird-purple font-semibold">tilting</span>.
                <br />
                Rigid careers are collapsing. Institutions are brittle.
                <br />
                <span className="text-bright-aqua">Strange is the new strategic.</span>
              </p>
              
              <div className="mt-12 p-8 bg-weird-purple/10 border border-weird-purple/30 rounded-lg">
                <p className="text-xl text-weird-purple font-medium">
                  What once got you punished is now your competitive edge.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3 — The OS */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-deep-charcoal/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-weird-purple font-mono text-sm tracking-wider">SECTION 3</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-8">The OS</h2>
          </div>
          
          <div className="mb-8">
            <p className="text-2xl leading-relaxed text-center mb-12">
              Misfits OS gives you:
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-base-black/50 border border-weird-purple/30 p-8 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-bold text-weird-purple mb-4">Clarity</h3>
                <p className="text-cloud-gray">
                  A map of your edge — what makes you weird, and why it matters.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-base-black/50 border border-bright-aqua/30 p-8 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-bold text-bright-aqua mb-4">Systems</h3>
                <p className="text-cloud-gray">
                  Practical tools to turn chaos into leverage.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-base-black/50 border border-soft-white/30 p-8 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-bold text-soft-white mb-4">Freedom</h3>
                <p className="text-cloud-gray">
                  An operating model that works with your nature, not against it.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Why It Works */}
      <section className="py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-bright-aqua font-mono text-sm tracking-wider">SECTION 4</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-8">Why It Works</h2>
          </div>
          
          <div className="prose prose-invert max-w-none text-center">
            <p className="text-2xl leading-relaxed mb-8">
              Because misfits don't need <span className="line-through text-cloud-gray">more hustle</span>.
              <br />
              They need <em className="text-weird-purple not-italic font-semibold">alignment</em>.
            </p>
            
            <p className="text-xl leading-relaxed mb-8 text-cloud-gray">
              They need a structure that amplifies their difference instead of sanding it down.
            </p>
            
            <div className="mt-12 p-8 bg-bright-aqua/10 border border-bright-aqua/30 rounded-lg">
              <p className="text-xl text-bright-aqua font-medium">
                That's what Misfits OS delivers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Call to Action */}
      <section id="start-misfits-os" className="py-24 lg:py-32 px-6 lg:px-8 bg-deep-charcoal/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <span className="text-weird-purple font-mono text-sm tracking-wider">SECTION 5</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-8">Ready?</h2>
          </div>
          
          <p className="text-2xl leading-relaxed mb-12">
            Ready to stop forcing yourself into the wrong mold?
          </p>
          
          <div className="space-y-6">
            <GlitchButton variant="primary">
              Start Your Misfits OS
            </GlitchButton>
            <div className="flex items-center justify-center gap-3 text-cloud-gray">
              <span>→</span>
              <span className="font-mono text-sm">Build your system. Find your leverage.</span>
            </div>
          </div>
        </div>
      </section>

      {/* LinkedIn Optimizer CTA Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-deep-charcoal/40">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="p-8 bg-gradient-to-r from-weird-purple/10 to-bright-aqua/5 border-2 border-weird-purple/40 rounded-2xl relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-weird-purple/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-bright-aqua/10 rounded-full blur-xl transform -translate-x-12 translate-y-12" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-weird-purple/20 border border-weird-purple/30 rounded-full text-weird-purple text-sm font-mono font-semibold mb-4">
                🔗 LINKEDIN TOOL
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-soft-white mb-4 font-playfair">
                Transform Your LinkedIn from Bland to Magnetic
              </h3>
              <p className="text-lg md:text-xl text-cloud-gray leading-relaxed max-w-3xl mx-auto mb-8">
                Turn your professional weirdness into LinkedIn gold with our free optimization tool. Get personalized headlines, bio rewrites, and weird-but-workable tips.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="/linkedin-optimizer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-weird-purple to-bright-aqua text-base-black font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-weird-purple/25 transition-all duration-300"
                >
                  Optimize My LinkedIn Profile →
                </a>
              </motion.div>

              <div className="mt-4 text-xs text-cloud-gray/60">
                🚀 Free tool • No signup required for basic optimization
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}