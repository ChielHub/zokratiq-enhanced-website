'use client'

import { motion } from 'framer-motion'

export default function NextSteps() {
  const timeline = [
    {
      day: "Today",
      action: "Read Your Blueprint",
      description: "Review the complete framework and take the Cognitive Sameness Diagnostic",
      icon: "📋",
      time: "20 minutes"
    },
    {
      day: "Day 1",
      action: "Implementation Quick-Win",
      description: "Get a tactical implementation tip you can use in your next hiring conversation",
      icon: "⚡",
      time: "5 minutes"
    },
    {
      day: "Day 3",
      action: "Case Study Deep-Dive",
      description: "See exactly how one company transformed their cognitive diversity in 6 months",
      icon: "📈",
      time: "10 minutes"
    },
    {
      day: "Day 5",
      action: "Strategy Session Invitation",
      description: "Optional: Book a free 15-minute conversation to customize your approach",
      icon: "🎯",
      time: "Optional"
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-6">
          What Happens Next
        </h2>
        <p className="text-lg text-cloud-gray leading-relaxed">
          We've designed a step-by-step sequence to help you implement the Misfits OS framework successfully
        </p>
      </motion.div>

      <div className="space-y-8">
        {timeline.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative"
          >
            {/* Connector Line */}
            {index < timeline.length - 1 && (
              <div className="absolute left-8 top-20 w-0.5 h-16 bg-weird-purple/30"></div>
            )}

            <div className="flex items-start gap-6">
              {/* Icon & Day */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-r from-weird-purple to-primary-teal rounded-full flex items-center justify-center text-2xl">
                  {step.icon}
                </div>
                <div className="text-center mt-2">
                  <div className="text-weird-purple font-bold text-sm">{step.day}</div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 bg-base-black/30 border border-weird-purple/20 rounded-lg p-6 hover:border-weird-purple/40 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-soft-white">{step.action}</h3>
                  <span className="text-xs bg-primary-teal/20 text-primary-teal px-2 py-1 rounded">
                    {step.time}
                  </span>
                </div>
                <p className="text-cloud-gray leading-relaxed">{step.description}</p>

                {/* Special call-out for strategy session */}
                {index === 3 && (
                  <div className="mt-4 p-4 bg-weird-purple/10 border border-weird-purple/20 rounded-lg">
                    <div className="text-sm text-cloud-gray">
                      <strong className="text-weird-purple">Strategy Session Includes:</strong>
                      <ul className="mt-2 space-y-1">
                        <li>• Custom diagnostic of your cognitive sameness blind spots</li>
                        <li>• Identification of your highest-impact weird talent opportunities</li>
                        <li>• 90-day implementation roadmap for your specific context</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Email Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12 text-center bg-deep-charcoal/50 border border-primary-teal/20 rounded-xl p-8"
      >
        <h3 className="text-lg font-bold text-primary-teal mb-4">
          Email Preferences
        </h3>
        <p className="text-cloud-gray mb-6 leading-relaxed">
          We'll send you valuable insights about cognitive diversity and talent strategy. No spam, no sales pressure—just practical implementation guidance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center text-sm text-cloud-gray/80">
            <span className="text-primary-teal mr-2">✓</span>
            4 implementation emails over 5 days
          </div>
          <div className="flex items-center text-sm text-cloud-gray/80">
            <span className="text-primary-teal mr-2">✓</span>
            Monthly insights and case studies
          </div>
          <div className="flex items-center text-sm text-cloud-gray/80">
            <span className="text-primary-teal mr-2">✓</span>
            Unsubscribe anytime
          </div>
        </div>

        <div className="mt-6 text-xs text-cloud-gray/60">
          Powered by Zokratiq's Reality Exploration Studio • Privacy-first approach
        </div>
      </motion.div>
    </div>
  )
}