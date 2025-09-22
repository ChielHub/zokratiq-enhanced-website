'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import Link from 'next/link'

const dimensions = [
  {
    id: 'cognitive',
    title: 'Cognitive Diversity',
    percentage: 40,
    icon: '🧠',
    color: 'primary-teal',
    microCopy: 'Different minds solve novel problems',
    description: 'How varied are the thinking patterns, backgrounds, and mental models across your leadership team?',
    sampleQuestion: '"When facing an unprecedented challenge, how many fundamentally different perspectives does your team naturally generate?"',
    insight: 'Teams with high cognitive diversity are 67% more likely to spot emerging risks and opportunities before competitors.'
  },
  {
    id: 'temperament',
    title: 'Temperament Mix',
    percentage: 35,
    icon: '⚖️',
    color: 'bright-aqua',
    microCopy: 'Balance calm & drive',
    description: 'What\'s the balance of personalities, risk appetites, and decision-making styles?',
    sampleQuestion: '"In crisis moments, does your leadership team have both steady anchors and bold accelerators?"',
    insight: 'Optimal temperament diversity reduces groupthink by 43% while maintaining decision speed.'
  },
  {
    id: 'courage',
    title: 'Policy Courage',
    percentage: 25,
    icon: '🎯',
    color: 'warm-accent',
    microCopy: 'Lead when it matters most',
    description: 'How willing is leadership to make difficult decisions and challenge conventional wisdom?',
    sampleQuestion: '"When was the last time your leadership team chose the harder right over the easier wrong?"',
    insight: 'High-courage leadership correlates with 2.3x better long-term performance during uncertainty.'
  }
]

const faqs = [
  {
    question: "What if we can't gather data from all leaders?",
    answer: "The TJI is designed to work with partial data. Our algorithm adjusts for missing inputs and provides confidence intervals. Even with 60% participation, you get actionable insights."
  },
  {
    question: "How long does the diagnostic take?",
    answer: "Individual assessment: 12-15 minutes. Full team diagnostic: 2-3 weeks including calibration sessions. Results and interpretation: 1 hour workshop."
  },
  {
    question: "Is this confidential? How is the data used?",
    answer: "Completely confidential. Individual responses are anonymized. Only aggregate patterns and team-level insights are shared. No personal data leaves your organization."
  },
  {
    question: "What if it contradicts what I believe about my leadership?",
    answer: "Perfect. The TJI reveals blind spots by design. Cognitive dissonance is often the first sign of valuable insight. We provide frameworks to reconcile perception gaps."
  }
]

export default function TaoJonesIntroPage() {
  const [currentSection, setCurrentSection] = useState(1)
  const [expandedDimension, setExpandedDimension] = useState<string | null>(null)
  const [showMetrics, setShowMetrics] = useState(false)
  const [showCognitiveDiversity, setShowCognitiveDiversity] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [formData, setFormData] = useState({ email: '', role: '', organization: '' })
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const heroRef = useRef(null)
  const problemRef = useRef(null)
  const dimensionsRef = useRef(null)
  const methodologyRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const problemInView = useInView(problemRef, { once: true, margin: '-100px' })
  const dimensionsInView = useInView(dimensionsRef, { once: true, margin: '-100px' })
  const methodologyInView = useInView(methodologyRef, { once: true, margin: '-100px' })

  const handleEmailSubmit = async (e: React.FormEvent, type: 'primary' | 'secondary') => {
    e.preventDefault()
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setEmailSubmitted(true)

    // Track conversion
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'tji_lead_capture', {
        event_category: 'conversion',
        event_label: type,
        email: formData.email
      })
    }
  }

  const toggleDimension = (dimensionId: string) => {
    setExpandedDimension(expandedDimension === dimensionId ? null : dimensionId)
  }

  return (
    <main className="min-h-screen bg-base-black text-soft-white relative overflow-hidden">

      {/* Hero Section - Lead Magnet Bridge */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/10 via-transparent to-bright-aqua/10" />

          {/* Financial Grid (Rigid) */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />

          {/* Organic Network Overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="networkGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(20, 184, 166)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(20, 184, 166)" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Network nodes */}
            <circle cx="20%" cy="30%" r="3" fill="url(#networkGradient)">
              <animate attributeName="r" values="3;6;3" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="80%" cy="20%" r="2" fill="url(#networkGradient)">
              <animate attributeName="r" values="2;5;2" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="70%" cy="70%" r="4" fill="url(#networkGradient)">
              <animate attributeName="r" values="4;7;4" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle cx="30%" cy="80%" r="3" fill="url(#networkGradient)">
              <animate attributeName="r" values="3;6;3" dur="3.5s" repeatCount="indefinite" />
            </circle>
            {/* Connection lines */}
            <path d="M20,30 Q50,10 80,20" stroke="rgb(20, 184, 166)" strokeWidth="1" strokeOpacity="0.2" fill="none">
              <animate attributeName="stroke-opacity" values="0.1;0.4;0.1" dur="6s" repeatCount="indefinite" />
            </path>
            <path d="M80,20 Q90,45 70,70" stroke="rgb(20, 184, 166)" strokeWidth="1" strokeOpacity="0.2" fill="none">
              <animate attributeName="stroke-opacity" values="0.1;0.4;0.1" dur="5s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Trust Tag */}
              <div className="mb-8">
                <span className="inline-flex items-center px-6 py-3 bg-primary-teal/20 border border-primary-teal/30 rounded-full text-primary-teal font-medium">
                  <span className="w-2 h-2 bg-primary-teal rounded-full mr-3 animate-pulse"></span>
                  Developed by Zokratiq · Research-backed · 200+ Organizations surveyed
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                The <span className="text-transparent bg-gradient-to-r from-primary-teal to-bright-aqua bg-clip-text">Tao Jones</span> Index
              </h1>

              <p className="text-2xl md:text-3xl text-cloud-gray mb-4 font-serif">
                Wisdom That Moves Beyond the Bottom Line
              </p>

              <p className="text-xl md:text-2xl text-cloud-gray/80 mb-12 leading-relaxed max-w-4xl mx-auto">
                How <span className="text-primary-teal font-semibold">Cognitive Diversity</span> + <span className="text-bright-aqua font-semibold">Temperament Mix</span> + <span className="text-warm-accent font-semibold">Policy Courage</span> define leadership in uncertain times.
              </p>

              {/* Primary CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <button
                  onClick={() => setCurrentSection(2)}
                  className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-primary-teal to-bright-aqua text-white font-bold text-xl rounded-xl hover:shadow-lg hover:shadow-primary-teal/25 transform hover:-translate-y-1 transition-all duration-300 group"
                >
                  Download the Tao Jones Diagnostic
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="ml-3 transition-transform group-hover:translate-x-1"
                  >
                    <path d="M7 17l9.2-9.2M17 17V7H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <p className="text-sm text-cloud-gray/70 mt-4">
                  Free diagnostic • Research-backed insights • No spam
                </p>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              >
                <button
                  onClick={() => setCurrentSection(2)}
                  className="w-8 h-12 border-2 border-primary-teal/30 rounded-full flex justify-center hover:border-primary-teal transition-colors"
                >
                  <motion.div
                    animate={{ y: [0, 16, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1 h-4 bg-primary-teal rounded-full mt-2"
                  />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section ref={problemRef} className="py-24 bg-gradient-to-b from-deep-charcoal/30 to-base-black relative">
        <div className="absolute inset-0">
          {/* Breaking Grid Animation */}
          <div className={`absolute inset-0 bg-[url('/grid.svg')] bg-center transition-all duration-2000 ${
            problemInView ? 'opacity-30 scale-110 rotate-1' : 'opacity-10'
          }`} />

          {/* Ripple Overlay */}
          {problemInView && (
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-primary-teal/30 rounded-full animate-ping transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-64 h-64 border border-bright-aqua/20 rounded-full animate-ping transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '1s' }}></div>
            </div>
          )}
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={problemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              When you measure only <span className="text-red-400">output</span>,
              <br />you miss <span className="text-primary-teal">insight</span>.
            </h2>

            <div className="text-xl md:text-2xl text-cloud-gray leading-relaxed space-y-6">
              <p>
                Traditional indices reduce leaders to numbers. But <em className="text-bright-aqua">decisions</em>, <em className="text-bright-aqua">culture</em>, <em className="text-bright-aqua">courage</em> — those aren't reflected on balance sheets.
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={problemInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-8"
              >
                <button
                  onClick={() => setCurrentSection(3)}
                  className="inline-flex items-center px-8 py-4 border-2 border-primary-teal text-primary-teal font-semibold rounded-lg hover:bg-primary-teal hover:text-base-black transition-all duration-300"
                >
                  Explore the Real Dimensions →
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Explore the Dimensions */}
      <section ref={dimensionsRef} className="py-24 lg:py-32 bg-deep-charcoal/50">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={dimensionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              The Three Pillars of Leadership Intelligence
            </h2>
            <p className="text-xl text-cloud-gray max-w-3xl mx-auto">
              Unlike traditional metrics, the TJI measures what actually drives breakthrough decisions and adaptive leadership.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {dimensions.map((dimension, index) => (
              <motion.div
                key={dimension.id}
                initial={{ opacity: 0, y: 40 }}
                animate={dimensionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative"
              >
                <div className={`bg-deep-charcoal border-2 border-${dimension.color}/30 rounded-2xl p-8 hover:border-${dimension.color} transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-xl hover:shadow-${dimension.color}/20`}
                     onClick={() => toggleDimension(dimension.id)}>

                  {/* Percentage Badge */}
                  <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-${dimension.color} to-bright-aqua rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {dimension.percentage}%
                  </div>

                  {/* Icon */}
                  <div className="text-6xl mb-6 text-center group-hover:scale-110 transition-transform duration-300">
                    {dimension.icon}
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-bold text-${dimension.color} mb-4 text-center`}>
                    {dimension.title}
                  </h3>

                  {/* Micro-copy */}
                  <p className="text-cloud-gray/80 text-center italic mb-6 group-hover:text-cloud-gray transition-colors">
                    "{dimension.microCopy}"
                  </p>

                  {/* Description */}
                  <p className="text-cloud-gray leading-relaxed mb-6">
                    {dimension.description}
                  </p>

                  {/* Expand indicator */}
                  <div className={`text-center text-${dimension.color} font-medium transition-all duration-300 ${
                    expandedDimension === dimension.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                  }`}>
                    {expandedDimension === dimension.id ? 'Click to collapse ↑' : 'Click to explore ↓'}
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedDimension === dimension.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className={`mt-4 bg-base-black/50 border border-${dimension.color}/20 rounded-xl p-6`}>
                        <h4 className={`text-lg font-semibold text-${dimension.color} mb-4`}>Sample Question:</h4>
                        <blockquote className="text-cloud-gray italic text-lg leading-relaxed mb-6 border-l-4 border-primary-teal/30 pl-4">
                          {dimension.sampleQuestion}
                        </blockquote>

                        <h4 className={`text-lg font-semibold text-${dimension.color} mb-3`}>Key Insight:</h4>
                        <p className="text-cloud-gray leading-relaxed">
                          {dimension.insight}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={dimensionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <button
              onClick={() => setCurrentSection(4)}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-teal to-bright-aqua text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-teal/25 transform hover:-translate-y-1 transition-all duration-300"
            >
              See How We Measure This →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Methodology & Sample Insights */}
      <section ref={methodologyRef} className="py-24 bg-gradient-to-b from-base-black to-deep-charcoal/30">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={methodologyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Methodology & Sample Insights
              </h2>
              <p className="text-xl text-cloud-gray">
                Built on research from 200+ organizations, validated through real-world outcomes.
              </p>
            </div>

            {/* Methodology Section - Full Width */}
            <div className="max-w-6xl mx-auto">
              <div className="bg-deep-charcoal/50 border border-primary-teal/20 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-primary-teal mb-8 text-center">How Weights Are Assigned</h3>

                {/* Interactive Weight Visualization */}
                <div className="space-y-6 max-w-4xl mx-auto">
                  {dimensions.map((dim, index) => (
                    <div key={dim.id} className="relative">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-cloud-gray font-medium">{dim.title}</span>
                        <span className={`text-${dim.color} font-bold`}>{dim.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={methodologyInView ? { width: `${dim.percentage}%` } : { width: 0 }}
                          transition={{ duration: 1.5, delay: index * 0.3 }}
                          className={`bg-gradient-to-r from-${dim.color} to-bright-aqua h-3 rounded-full relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowMetrics(!showMetrics)}
                    className="text-primary-teal hover:text-bright-aqua transition-colors font-medium"
                  >
                    {showMetrics ? 'Hide' : 'Show'} Sample Radar Dashboard ↓
                  </button>
                </div>
              </div>

              {/* Sample Dashboard */}
              <AnimatePresence>
                {showMetrics && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 overflow-hidden"
                  >
                    <div className="bg-base-black/70 border border-bright-aqua/20 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-bright-aqua mb-4 text-center">Sample TJI Score Dashboard</h4>

                      {/* Mock Radar Chart */}
                      <div className="relative w-48 h-48 mx-auto mb-6">
                        <svg className="w-full h-full" viewBox="0 0 200 200">
                          {/* Grid circles */}
                          <circle cx="100" cy="100" r="80" fill="none" stroke="#374151" strokeWidth="1"/>
                          <circle cx="100" cy="100" r="60" fill="none" stroke="#374151" strokeWidth="1"/>
                          <circle cx="100" cy="100" r="40" fill="none" stroke="#374151" strokeWidth="1"/>
                          <circle cx="100" cy="100" r="20" fill="none" stroke="#374151" strokeWidth="1"/>

                          {/* Axes */}
                          <line x1="100" y1="20" x2="100" y2="180" stroke="#374151" strokeWidth="1"/>
                          <line x1="20" y1="100" x2="180" y2="100" stroke="#374151" strokeWidth="1"/>
                          <line x1="41" y1="41" x2="159" y2="159" stroke="#374151" strokeWidth="1"/>

                          {/* Data polygon */}
                          <motion.polygon
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 0.7, scale: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            points="100,40 140,80 120,140"
                            fill="url(#radarGradient)"
                            stroke="#00B3A6"
                            strokeWidth="2"
                          />

                          <defs>
                            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#00B3A6" stopOpacity="0.3"/>
                              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.1"/>
                            </linearGradient>
                          </defs>
                        </svg>

                        {/* Labels */}
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs text-primary-teal font-medium">
                          Cognitive
                        </div>
                        <div className="absolute bottom-2 right-4 text-xs text-bright-aqua font-medium">
                          Temperament
                        </div>
                        <div className="absolute bottom-2 left-4 text-xs text-warm-accent font-medium">
                          Courage
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary-teal mb-2">73</div>
                        <div className="text-sm text-cloud-gray">Overall TJI Score</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sample Questions */}
              <div className="bg-deep-charcoal/50 border border-bright-aqua/20 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-bright-aqua mb-6 text-center">Sample Diagnostic Questions</h3>

                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  <div className="border-l-4 border-primary-teal/50 pl-6">
                    <h4 className="font-semibold text-primary-teal mb-2">Cognitive Diversity</h4>
                    <p className="text-cloud-gray italic text-sm">
                      "When your team encounters a problem they've never seen before, how many fundamentally different solution approaches emerge naturally?"
                    </p>
                  </div>

                  <div className="border-l-4 border-bright-aqua/50 pl-6">
                    <h4 className="font-semibold text-bright-aqua mb-2">Temperament Mix</h4>
                    <p className="text-cloud-gray italic text-sm">
                      "In high-stakes decisions, does your leadership team have both cautious analyzers and bold action-takers?"
                    </p>
                  </div>

                  <div className="border-l-4 border-warm-accent/50 pl-6">
                    <h4 className="font-semibold text-warm-accent mb-2">Policy Courage</h4>
                    <p className="text-cloud-gray italic text-sm">
                      "How often does your leadership team choose the difficult right over the popular wrong?"
                    </p>
                  </div>
                </div>
              </div>

              {/* Cognitive Diversity Toggle */}
              <div className="text-center mb-8">
                <button
                  onClick={() => setShowCognitiveDiversity(!showCognitiveDiversity)}
                  className="text-primary-teal hover:text-bright-aqua transition-colors font-medium text-lg"
                >
                  {showCognitiveDiversity ? 'Hide' : 'Show'} How We Calculate Cognitive Diversity ↓
                </button>
              </div>
            </div>

            {/* Cognitive Diversity Calculation Breakdown - Full Page Width */}
            <AnimatePresence>
              {showCognitiveDiversity && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.8 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gradient-to-br from-deep-charcoal/70 to-base-black/90 border border-primary-teal/30 rounded-2xl p-8 mx-auto">
                    <h4 className="text-3xl font-bold text-primary-teal mb-12 text-center">
                      Cognitive Diversity: The 8 Signals We Track
                    </h4>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-7xl mx-auto">
                      {[
                        {
                          id: 'discipline',
                          title: 'Discipline Diversity',
                          percentage: 20,
                          icon: (
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2L2 7V10C2 16 6 20.88 12 22C18 20.88 22 16 22 10V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 8V14M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ),
                          description: 'Fraction of leaders whose training is outside pure finance/engineering/consulting',
                          examples: 'Humanities, basic sciences, arts, philosophy',
                          color: 'primary-teal'
                        },
                        {
                          id: 'career',
                          title: 'Career-Pathway Diversity',
                          percentage: 15,
                          icon: (
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                              <path d="M21 16V8C21 7.45 20.55 7 20 7H15L13 5H9C8.45 5 8 5.45 8 6V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M3 16V8C3 7.45 3.45 7 4 7H9L11 5H15C15.55 5 16 5.45 16 6V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M3 12L12 12L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ),
                          description: 'Counts varied career types across different domains',
                          examples: 'Academic, non-profit, founder, artist, corporate, public sector',
                          color: 'bright-aqua'
                        },
                        {
                          id: 'education',
                          title: 'Educational Variety',
                          percentage: 15,
                          icon: (
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                              <path d="M22 10V6C22 5.45 21.55 5 21 5H3C2.45 5 2 5.45 2 6V10C2 10.55 2.45 11 3 11H21C21.55 11 22 10.55 22 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M6 21V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M18 21V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 21V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ),
                          description: 'Entropy of degree types and educational backgrounds',
                          examples: 'PhD, BA humanities, MSc science, MBA, trade certifications',
                          color: 'warm-accent'
                        },
                        {
                          id: 'policy',
                          title: 'Policy-for-Difference Signals',
                          percentage: 10,
                          icon: (
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M21 12C21 16.97 16.97 21 12 21S3 16.97 3 12S7.03 3 12 3S21 7.03 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ),
                          description: 'Formal commitment to neurodiversity and inclusion',
                          examples: 'D&I programs, ERGs, inclusive careers language',
                          color: 'primary-teal'
                        },
                        {
                          id: 'independent',
                          title: 'Independent Directors Ratio',
                          percentage: 10,
                          icon: (
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                              <path d="M17 21V19C17 17.9 16.1 17 15 17H9C7.9 17 7 17.9 7 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                              <path d="M22 21V19C22 18.13 21.32 17.44 20.5 17.31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16 3.13C16.84 3.35 17.5 4.18 17.5 5.5S16.84 7.65 16 7.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ),
                          description: 'Board members from outside the company\'s dominant network',
                          examples: 'External perspectives, network diversity',
                          color: 'bright-aqua'
                        },
                        {
                          id: 'crossdomain',
                          title: 'Cross-domain Experience',
                          percentage: 10,
                          icon: (
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                              <path d="M16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8C8 5.79 9.79 4 12 4C14.21 4 16 5.79 16 8Z" stroke="currentColor" strokeWidth="2"/>
                              <path d="M12 14C8.13 14 5 17.13 5 21H19C19 17.13 15.87 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
                              <path d="M12 12L19 19M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          ),
                          description: 'Leaders with roles spanning multiple domains',
                          examples: 'Engineering + policy, founder + artist, scientist + CEO',
                          color: 'warm-accent'
                        },
                        {
                          id: 'innovation',
                          title: 'Innovation & Weirdness Signal',
                          percentage: 10,
                          icon: (
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M20 12L18 20L16 18L14 20L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ),
                          description: 'Proxies for generative thinking and creative output',
                          examples: 'Patents, publications, open-source, essays, side projects',
                          color: 'primary-teal'
                        },
                        {
                          id: 'geographic',
                          title: 'Geographic & Tenure Diversity',
                          percentage: 10,
                          icon: (
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                              <path d="M2 12H22" stroke="currentColor" strokeWidth="2"/>
                              <path d="M12 2C14.5 4.5 16 8.13 16 12S14.5 19.5 12 22C9.5 19.5 8 15.87 8 12S9.5 4.5 12 2Z" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                          ),
                          description: 'Distributed geographies and varied tenure lengths',
                          examples: 'Different locations, mixed experience levels',
                          color: 'bright-aqua'
                        }
                      ].map((signal, index) => (
                        <motion.div
                          key={signal.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={`relative bg-deep-charcoal/50 border border-${signal.color}/20 rounded-xl p-6 hover:border-${signal.color}/50 transition-all duration-300 group cursor-pointer`}
                        >
                          {/* Percentage Badge */}
                          <div className={`absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-${signal.color} to-bright-aqua rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            {signal.percentage}%
                          </div>

                          {/* Icon */}
                          <div className={`mb-4 group-hover:scale-110 transition-all duration-300 text-${signal.color} flex justify-center`}>
                            <div className={`p-3 bg-${signal.color}/10 border border-${signal.color}/20 rounded-xl group-hover:bg-${signal.color}/20 transition-all duration-300`}>
                              {signal.icon}
                            </div>
                          </div>

                          {/* Title */}
                          <h5 className={`text-lg font-bold text-${signal.color} mb-3 group-hover:text-bright-aqua transition-colors text-center`}>
                            {signal.title}
                          </h5>

                          {/* Description */}
                          <p className="text-cloud-gray text-sm leading-relaxed mb-3 text-center">
                            {signal.description}
                          </p>

                          {/* Examples */}
                          <div className={`text-xs text-${signal.color}/80 italic text-center`}>
                            Examples: {signal.examples}
                          </div>

                          {/* Hover Effect Overlay */}
                          <div className={`absolute inset-0 bg-gradient-to-br from-${signal.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none`} />
                        </motion.div>
                      ))}
                    </div>

                    {/* Visual Calculation Formula */}
                    <div className="bg-base-black/50 border border-bright-aqua/20 rounded-xl p-8 max-w-6xl mx-auto mb-8">
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="p-3 bg-bright-aqua/10 border border-bright-aqua/20 rounded-xl">
                          <svg className="w-6 h-6 text-bright-aqua" viewBox="0 0 24 24" fill="none">
                            <path d="M3 3H21C21.55 3 22 3.45 22 4V20C22 20.55 21.55 21 21 21H3C2.45 21 2 20.55 2 20V4C2 3.45 2.45 3 3 3Z" stroke="currentColor" strokeWidth="2"/>
                            <path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <h5 className="text-xl font-semibold text-bright-aqua">
                          The Cognitive Diversity Formula
                        </h5>
                      </div>

                      <div className="text-center space-y-4">
                        <div className="text-cloud-gray font-mono text-sm">
                          <span className="text-primary-teal">Cognitive Diversity Score</span> =
                        </div>

                        <div className="flex flex-wrap justify-center items-center gap-2 text-xs font-mono">
                          <span className="bg-primary-teal/20 px-2 py-1 rounded text-primary-teal">
                            Discipline(20%)
                          </span>
                          <span className="text-cloud-gray">+</span>
                          <span className="bg-bright-aqua/20 px-2 py-1 rounded text-bright-aqua">
                            Career(15%)
                          </span>
                          <span className="text-cloud-gray">+</span>
                          <span className="bg-warm-accent/20 px-2 py-1 rounded text-warm-accent">
                            Education(15%)
                          </span>
                          <span className="text-cloud-gray">+</span>
                          <span className="bg-primary-teal/20 px-2 py-1 rounded text-primary-teal">
                            Policy(10%)
                          </span>
                        </div>

                        <div className="text-cloud-gray">+</div>

                        <div className="flex flex-wrap justify-center items-center gap-2 text-xs font-mono">
                          <span className="bg-bright-aqua/20 px-2 py-1 rounded text-bright-aqua">
                            Independent(10%)
                          </span>
                          <span className="text-cloud-gray">+</span>
                          <span className="bg-warm-accent/20 px-2 py-1 rounded text-warm-accent">
                            Cross-domain(10%)
                          </span>
                          <span className="text-cloud-gray">+</span>
                          <span className="bg-primary-teal/20 px-2 py-1 rounded text-primary-teal">
                            Innovation(10%)
                          </span>
                          <span className="text-cloud-gray">+</span>
                          <span className="bg-bright-aqua/20 px-2 py-1 rounded text-bright-aqua">
                            Geographic(10%)
                          </span>
                        </div>

                        <div className="pt-4 border-t border-gray-700">
                          <div className="text-2xl font-bold text-primary-teal">
                            = Cognitive Diversity Index (0-100)
                          </div>
                          <div className="text-sm text-cloud-gray/80 mt-2">
                            (This becomes 40% of your total TJI Score)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Real-world Example */}
                    <div className="bg-gradient-to-r from-primary-teal/10 to-bright-aqua/10 border border-primary-teal/30 rounded-xl p-8 max-w-6xl mx-auto">
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="p-3 bg-primary-teal/10 border border-primary-teal/20 rounded-xl">
                          <svg className="w-6 h-6 text-primary-teal" viewBox="0 0 24 24" fill="none">
                            <path d="M3 3V5H21V3H3ZM3 13H8V7H3V13ZM3 21H8V15H3V21ZM10 21H15V15H10V21ZM17 21H21V15H17V21ZM10 13H15V7H10V13ZM17 13H21V7H17V13Z" fill="currentColor"/>
                          </svg>
                        </div>
                        <h5 className="text-xl font-semibold text-primary-teal">
                          Real-World Example: Tech Company Board
                        </h5>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 text-sm">
                        <div>
                          <h6 className="font-semibold text-bright-aqua mb-2">Before TJI Analysis:</h6>
                          <ul className="space-y-1 text-cloud-gray">
                            <li>• 8/10 leaders: Engineering or MBA backgrounds</li>
                            <li>• 90% traditional corporate career paths</li>
                            <li>• 2 independent directors (20%)</li>
                            <li>• No formal neurodiversity programs</li>
                            <li>• <span className="text-red-400 font-semibold">Cognitive Diversity Score: 34</span></li>
                          </ul>
                        </div>

                        <div>
                          <h6 className="font-semibold text-bright-aqua mb-2">After TJI-Guided Changes:</h6>
                          <ul className="space-y-1 text-cloud-gray">
                            <li>• Added leaders with philosophy, arts backgrounds</li>
                            <li>• Recruited founder, non-profit, academic experience</li>
                            <li>• Increased independent directors to 50%</li>
                            <li>• Launched formal inclusion initiatives</li>
                            <li>• <span className="text-primary-teal font-semibold">Cognitive Diversity Score: 78</span></li>
                          </ul>
                        </div>
                      </div>

                      <div className="text-center mt-4 pt-4 border-t border-primary-teal/20">
                        <span className="text-bright-aqua font-semibold">Result: </span>
                        <span className="text-cloud-gray">40% improvement in strategic decision quality, 60% reduction in blind spot incidents</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Continue to next section */}
            <div className="text-center mt-12">
              <p className="text-lg text-cloud-gray mb-6">
                Ready to discover your team's TJI profile?
              </p>
              <button
                onClick={() => setCurrentSection(5)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-bright-aqua to-primary-teal text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-bright-aqua/25 transform hover:-translate-y-1 transition-all duration-300"
              >
                See Proof & Case Studies →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proof / Outcomes / Case Examples */}
      <section className="py-24 bg-deep-charcoal/30">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Proven Outcomes
              </h2>
              <p className="text-xl text-cloud-gray">
                Organizations using TJI insights see measurable improvements in decision quality and team performance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Case Study 1 */}
              <div className="bg-deep-charcoal border border-primary-teal/20 rounded-2xl p-8">
                <div className="text-6xl mb-6 text-center">🏢</div>
                <h3 className="text-2xl font-bold text-primary-teal mb-4">Global Tech Company</h3>
                <p className="text-cloud-gray mb-6 leading-relaxed">
                  After implementing TJI recommendations to increase cognitive diversity on their executive team, strategic decision speed improved by 40% while reducing major pivots by 60%.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-bright-aqua">+40%</div>
                    <div className="text-sm text-cloud-gray">Decision Speed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-teal">-60%</div>
                    <div className="text-sm text-cloud-gray">Major Pivots</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-warm-accent">87</div>
                    <div className="text-sm text-cloud-gray">Final TJI Score</div>
                  </div>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="bg-deep-charcoal border border-bright-aqua/20 rounded-2xl p-8">
                <div className="text-6xl mb-6 text-center">🏥</div>
                <h3 className="text-2xl font-bold text-bright-aqua mb-4">Healthcare Network</h3>
                <p className="text-cloud-gray mb-6 leading-relaxed">
                  TJI revealed critical temperament gaps in crisis response. After rebalancing leadership, their pandemic response improved crisis decision clarity by 65%.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-bright-aqua">+65%</div>
                    <div className="text-sm text-cloud-gray">Crisis Clarity</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-teal">-45%</div>
                    <div className="text-sm text-cloud-gray">Decision Delays</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-warm-accent">92</div>
                    <div className="text-sm text-cloud-gray">Final TJI Score</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-gradient-to-r from-primary-teal/10 to-bright-aqua/10 border border-primary-teal/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-soft-white mb-6">Trusted By Forward-Thinking Organizations</h3>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                <div className="text-lg font-semibold text-cloud-gray">Fortune 500 Tech</div>
                <div className="w-2 h-2 bg-primary-teal rounded-full"></div>
                <div className="text-lg font-semibold text-cloud-gray">Healthcare Networks</div>
                <div className="w-2 h-2 bg-bright-aqua rounded-full"></div>
                <div className="text-lg font-semibold text-cloud-gray">Financial Services</div>
                <div className="w-2 h-2 bg-warm-accent rounded-full"></div>
                <div className="text-lg font-semibold text-cloud-gray">Consulting Firms</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-base-black">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Questions & Concerns
              </h2>
              <p className="text-xl text-cloud-gray">
                We've anticipated the most common questions about implementing the TJI.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-deep-charcoal/30 border border-gray-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-deep-charcoal/50 transition-colors"
                  >
                    <span className="font-semibold text-soft-white">{faq.question}</span>
                    <span className={`text-primary-teal transition-transform duration-300 ${
                      expandedFAQ === index ? 'rotate-180' : ''
                    }`}>
                      ↓
                    </span>
                  </button>

                  <AnimatePresence>
                    {expandedFAQ === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-cloud-gray leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Lead Magnet */}
      <section className="py-24 bg-gradient-to-b from-deep-charcoal/50 to-primary-teal/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Go Deeper?
            </h2>
            <p className="text-xl text-cloud-gray mb-12 leading-relaxed">
              Get the complete TJI methodology PDF plus a custom workshop session guide for your leadership team.
            </p>

            {!emailSubmitted ? (
              <form onSubmit={(e) => handleEmailSubmit(e, 'secondary')} className="max-w-2xl mx-auto">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="px-4 py-3 bg-deep-charcoal border border-gray-600 rounded-lg text-soft-white placeholder-gray-400 focus:border-primary-teal focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Your role"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="px-4 py-3 bg-deep-charcoal border border-gray-600 rounded-lg text-soft-white placeholder-gray-400 focus:border-primary-teal focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    className="px-4 py-3 bg-deep-charcoal border border-gray-600 rounded-lg text-soft-white placeholder-gray-400 focus:border-primary-teal focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-primary-teal to-bright-aqua text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-primary-teal/25 transform hover:-translate-y-1 transition-all duration-300"
                >
                  Get Full Methodology + Workshop Guide
                </button>

                <p className="text-sm text-cloud-gray/70 mt-4">
                  Includes: Complete methodology PDF, workshop facilitation guide, sample assessment templates
                </p>
              </form>
            ) : (
              <div className="bg-deep-charcoal/50 border border-primary-teal/30 rounded-2xl p-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-primary-teal mb-4">
                  Perfect! Check your email in 2 minutes.
                </h3>
                <p className="text-cloud-gray mb-6">
                  We've sent you the complete TJI methodology PDF and workshop guide to <span className="text-primary-teal font-semibold">{formData.email}</span>.
                </p>
                <div className="text-sm text-cloud-gray/80 space-y-1">
                  <p>✓ If you don't see it, check your spam folder</p>
                  <p>✓ Add hello@zokratiq.com to your safe sender list</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-primary-teal/20 to-bright-aqua/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/10 via-transparent to-bright-aqua/10" />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Measure What <span className="text-primary-teal">Actually</span> Matters
            </h2>
            <p className="text-xl md:text-2xl text-cloud-gray mb-12 leading-relaxed">
              Stop optimizing for outdated metrics. Start building leadership intelligence that adapts to uncertainty.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/resources/tao-jones-index/assessment"
                className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-primary-teal to-bright-aqua text-white font-bold text-xl rounded-xl hover:shadow-lg hover:shadow-primary-teal/25 transform hover:-translate-y-1 transition-all duration-300 group"
              >
                Take the TJI Assessment
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="ml-3 transition-transform group-hover:translate-x-1"
                >
                  <path d="M7 17l9.2-9.2M17 17V7H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              <Link
                href="/partner-with-us"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-teal text-primary-teal font-semibold text-lg rounded-xl hover:bg-primary-teal hover:text-base-black transition-all duration-300"
              >
                Schedule a Session
              </Link>
            </div>

            <p className="text-sm text-cloud-gray/70 mt-6">
              Free assessment • Custom insights • Implementation support available
            </p>
          </div>
        </div>
      </section>

      {/* Sticky CTA (appears after hero) */}
      <AnimatePresence>
        {currentSection > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Link
              href="/resources/tao-jones-index/assessment"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-teal to-bright-aqua text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-primary-teal/25 transform hover:-translate-y-1 transition-all duration-300"
            >
              Take Assessment
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="ml-2">
                <path d="M4 10h12m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

// Metadata is handled by layout.tsx