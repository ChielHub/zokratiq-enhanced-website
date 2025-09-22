'use client'

import { motion } from 'framer-motion'

export default function ValueStack() {
  const coreAsset = {
    title: "The Misfits OS Blueprint",
    format: "18-page premium PDF guide",
    description: "Complete framework for transforming your talent strategy from cognitive sameness to competitive advantage"
  }

  const bonuses = [
    {
      title: "Cognitive Sameness Diagnostic",
      description: "15-question organizational assessment with automated scoring and custom recommendations",
      value: "$197"
    },
    {
      title: "Weird Talent Interview Vault",
      description: "47 unconventional interview questions with scenario-based evaluation frameworks",
      value: "$97"
    },
    {
      title: "Misfit Integration Playbook",
      description: "30/60/90-day onboarding templates with cultural translation strategies",
      value: "$147"
    },
    {
      title: "Case Study Collection",
      description: "5 detailed transformation stories with before/after organizational changes",
      value: "$77"
    }
  ]

  const totalValue = 518

  return (
    <div className="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-6">
          Get Your Complete <span className="text-weird-purple font-playfair italic">Misfits OS</span> Toolkit
        </h2>
        <p className="text-lg text-cloud-gray mb-8 leading-relaxed">
          Everything you need to transform your talent strategy from cognitive sameness to competitive advantage.
        </p>

        {/* Core Asset */}
        <div className="bg-weird-purple/10 border-2 border-weird-purple/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-3xl">📋</div>
            <div>
              <h3 className="text-xl font-bold text-weird-purple mb-2">{coreAsset.title}</h3>
              <div className="text-sm text-weird-purple/80 font-medium mb-2">{coreAsset.format}</div>
              <p className="text-cloud-gray leading-relaxed">{coreAsset.description}</p>
            </div>
          </div>
        </div>

        {/* Bonus Assets */}
        <div className="space-y-4 mb-8">
          <h4 className="text-lg font-bold text-soft-white mb-4">Plus These Bonus Assets:</h4>
          {bonuses.map((bonus, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-base-black/30 border border-primary-teal/20 rounded-lg p-4 hover:border-primary-teal/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-primary-teal font-semibold">✓</span>
                    <span className="font-semibold text-primary-teal">{bonus.title}</span>
                    <span className="text-xs bg-primary-teal/20 text-primary-teal px-2 py-1 rounded">
                      Value: {bonus.value}
                    </span>
                  </div>
                  <p className="text-sm text-cloud-gray leading-relaxed">{bonus.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-primary-teal/20 to-weird-purple/20 border border-primary-teal/30 rounded-xl p-6 text-center"
        >
          <div className="text-sm text-cloud-gray mb-2">Total Value:</div>
          <div className="text-3xl font-bold text-primary-teal mb-2">${totalValue}</div>
          <div className="text-sm text-cloud-gray mb-4">Complete cognitive diversity transformation toolkit</div>

          <div className="border-t border-primary-teal/20 pt-4">
            <div className="text-2xl font-bold text-soft-white mb-2">Your Investment: Free</div>
            <div className="text-sm text-cloud-gray">Just your email to receive the complete package</div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 space-y-4"
        >
          <div className="flex items-center gap-4 text-sm text-cloud-gray/80">
            <div className="flex items-center">
              <span className="text-primary-teal mr-2">✓</span>
              No spam, ever
            </div>
            <div className="flex items-center">
              <span className="text-primary-teal mr-2">✓</span>
              Unsubscribe anytime
            </div>
            <div className="flex items-center">
              <span className="text-primary-teal mr-2">✓</span>
              Instant download
            </div>
          </div>

          <div className="text-xs text-cloud-gray/60">
            Developed by Zokratiq's Reality Exploration Studio • Based on 200+ misfit talent placements
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}