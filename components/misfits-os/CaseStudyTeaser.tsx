'use client'

import { motion } from 'framer-motion'

export default function CaseStudyTeaser() {
  const caseStudy = {
    company: "TechCorp",
    stage: "Series C SaaS Company",
    challenge: "85% leadership similarity, stagnant innovation pipeline, predictable product roadmap",
    solution: "Integrated three 'weird' thinkers using Misfits OS framework",
    timeline: "6 months",
    results: [
      { metric: "40%", description: "increase in breakthrough product concepts" },
      { metric: "25%", description: "faster time-to-market for new features" },
      { metric: "60%", description: "improvement in team breakthrough thinking" },
      { metric: "First", description: "industry-disrupting product launch in 5 years" }
    ]
  }

  const hires = [
    {
      background: "Philosophy PhD",
      role: "Senior Product Strategist",
      impact: "Developed new user research methodology that revealed unmet needs competitors missed",
      insight: "Applied philosophical frameworks to product-market fit analysis"
    },
    {
      background: "Failed Startup Founder",
      role: "Innovation Process Lead",
      impact: "Revolutionized how teams approach problem-solving with rapid experimentation protocols",
      insight: "Brought hard-won lessons about what doesn't work to accelerate innovation"
    },
    {
      background: "Neurodivergent Systems Thinker",
      role: "Operations Efficiency Specialist",
      impact: "Identified process inefficiencies that traditional consultants completely missed",
      insight: "Pattern recognition abilities revealed systemic bottlenecks in product development"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-base-black to-deep-charcoal">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-6">
            Case Study: From Cognitive Sameness to <span className="text-weird-purple font-playfair italic">Competitive Edge</span>
          </h2>
          <p className="text-xl text-cloud-gray max-w-3xl mx-auto leading-relaxed">
            How one Series C company broke the cycle of safe hiring and transformed their innovation capacity
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Company Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-deep-charcoal/50 border border-weird-purple/20 rounded-xl p-8 mb-12"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-weird-purple mb-4">
                  {caseStudy.company}
                </h3>
                <p className="text-cloud-gray mb-4">{caseStudy.stage}</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-soft-white mb-2">The Challenge:</h4>
                    <p className="text-cloud-gray text-sm leading-relaxed">
                      {caseStudy.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-soft-white mb-2">The Approach:</h4>
                    <p className="text-cloud-gray text-sm leading-relaxed">
                      {caseStudy.solution}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {caseStudy.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="text-center p-4 bg-base-black/50 border border-primary-teal/20 rounded-lg"
                  >
                    <div className="text-2xl font-bold text-primary-teal mb-2">
                      {result.metric}
                    </div>
                    <div className="text-xs text-cloud-gray leading-tight">
                      {result.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* The Three Hires */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {hires.map((hire, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-base-black/30 border border-weird-purple/20 rounded-lg p-6 hover:border-weird-purple/40 transition-all duration-300"
              >
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-weird-purple to-primary-teal rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                    {index === 0 ? '🧠' : index === 1 ? '⚡' : '🔍'}
                  </div>
                  <h4 className="font-bold text-weird-purple mb-1">{hire.background}</h4>
                  <p className="text-sm text-cloud-gray/80">{hire.role}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-primary-teal font-semibold mb-1">IMPACT:</div>
                    <p className="text-sm text-cloud-gray leading-relaxed">{hire.impact}</p>
                  </div>

                  <div>
                    <div className="text-xs text-weird-purple font-semibold mb-1">KEY INSIGHT:</div>
                    <p className="text-sm text-cloud-gray/80 leading-relaxed">{hire.insight}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Lessons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-primary-teal/20 to-weird-purple/20 border border-primary-teal/30 rounded-xl p-8"
          >
            <h3 className="text-xl font-bold text-soft-white mb-6 text-center">
              Key Success Factors from the Misfits OS Implementation
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-primary-teal">What Made It Work:</h4>
                <ul className="space-y-2 text-sm text-cloud-gray">
                  <li className="flex items-start">
                    <span className="text-primary-teal mr-2">✓</span>
                    Systematic identification using the 16 misfit archetypes
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-teal mr-2">✓</span>
                    Structured integration with 90-day activation rituals
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-teal mr-2">✓</span>
                    Leadership commitment to cognitive diversity goals
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-teal mr-2">✓</span>
                    Cultural bridge-building to prevent rejection
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-weird-purple">Critical Measurements:</h4>
                <ul className="space-y-2 text-sm text-cloud-gray">
                  <li className="flex items-start">
                    <span className="text-weird-purple mr-2">📊</span>
                    Breakthrough thinking frequency (before/after)
                  </li>
                  <li className="flex items-start">
                    <span className="text-weird-purple mr-2">📊</span>
                    Innovation pipeline quality and diversity
                  </li>
                  <li className="flex items-start">
                    <span className="text-weird-purple mr-2">📊</span>
                    Team cognitive diversity index scores
                  </li>
                  <li className="flex items-start">
                    <span className="text-weird-purple mr-2">📊</span>
                    Time-to-market for breakthrough concepts
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-8 pt-6 border-t border-primary-teal/20">
              <p className="text-lg text-soft-white mb-4">
                <strong>Timeline:</strong> Full transformation achieved in {caseStudy.timeline}
              </p>
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center px-6 py-3 bg-weird-purple text-white font-semibold rounded-lg hover:bg-weird-purple/80 transition-all duration-300"
              >
                Get the Complete Framework →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}