'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function SolutionPreview() {
  const [activeLayer, setActiveLayer] = useState(0)

  const layers = [
    {
      name: "Identification Layer",
      icon: "🎯",
      description: "16 misfit archetypes with specific hiring profiles and identification criteria",
      details: "Learn to spot the philosophy PhDs who become breakthrough strategists, the neurodivergent systems thinkers who identify efficiency gains others miss, and the failed founders who revolutionize innovation processes."
    },
    {
      name: "Integration Layer",
      icon: "⚡",
      description: "Activation rituals that turn potential cultural friction into generative tension",
      details: "90-day onboarding templates designed specifically for unconventional talent, including cultural bridge-building strategies and performance measurement frameworks."
    },
    {
      name: "Architecture Layer",
      icon: "🏗️",
      description: "Cognitive diversity infrastructure that scales with your organization",
      details: "Framework for embedding cognitive diversity into hiring processes, team structures, and decision-making protocols that grows stronger over time."
    },
    {
      name: "Optimization Layer",
      icon: "📈",
      description: "Continuous improvement protocols for maximizing weird talent ROI",
      details: "Success metrics, feedback loops, and adjustment mechanisms to ensure your cognitive diversity investment compounds into sustainable competitive advantage."
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-deep-charcoal to-base-black">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-6">
            Introducing <span className="text-weird-purple font-playfair italic">Misfits OS</span>
          </h2>
          <p className="text-xl text-cloud-gray max-w-3xl mx-auto leading-relaxed mb-8">
            The first comprehensive framework designed specifically for integrating weird talent without cultural chaos.
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-primary-teal/20 border border-primary-teal/30 rounded-full text-primary-teal font-medium text-sm">
            <span className="w-2 h-2 bg-primary-teal rounded-full mr-2"></span>
            200+ Organizations Transformed
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* OS Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-deep-charcoal/50 border border-weird-purple/20 rounded-xl p-8 md:p-12 mb-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-soft-white mb-4">Four-Layer Operating System</h3>
              <p className="text-cloud-gray">Click each layer to explore how Misfits OS transforms your talent strategy</p>
            </div>

            {/* Layer Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {layers.map((layer, index) => (
                <button
                  key={index}
                  onClick={() => setActiveLayer(index)}
                  className={`p-4 rounded-lg text-center transition-all duration-300 ${
                    activeLayer === index
                      ? 'bg-weird-purple text-white border-2 border-weird-purple'
                      : 'bg-base-black/50 border-2 border-weird-purple/20 text-cloud-gray hover:border-weird-purple/40'
                  }`}
                >
                  <div className="text-2xl mb-2">{layer.icon}</div>
                  <div className="font-semibold text-sm">{layer.name}</div>
                </button>
              ))}
            </div>

            {/* Active Layer Details */}
            <motion.div
              key={activeLayer}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-base-black/50 border border-weird-purple/20 rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{layers[activeLayer].icon}</div>
                <div>
                  <h4 className="text-xl font-bold text-weird-purple mb-3">
                    {layers[activeLayer].name}
                  </h4>
                  <p className="text-cloud-gray mb-4 leading-relaxed">
                    {layers[activeLayer].description}
                  </p>
                  <p className="text-sm text-cloud-gray/80 leading-relaxed">
                    {layers[activeLayer].details}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Framework Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "🎯",
                title: "Precision Targeting",
                description: "Stop hoping weird talent will work out. Use systematic identification and integration protocols."
              },
              {
                icon: "⚡",
                title: "Cultural Harmony",
                description: "Preserve culture while introducing cognitive diversity through proven activation rituals."
              },
              {
                icon: "📈",
                title: "Measurable Results",
                description: "Track breakthrough thinking improvement, innovation acceleration, and competitive advantage gains."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-base-black/30 border border-primary-teal/20 rounded-lg hover:border-primary-teal/40 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h4 className="text-lg font-bold text-primary-teal mb-3">{benefit.title}</h4>
                <p className="text-cloud-gray leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Proof Point */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center bg-gradient-to-r from-primary-teal/20 to-weird-purple/20 border border-primary-teal/30 rounded-xl p-8"
          >
            <blockquote className="text-xl md:text-2xl font-serif italic text-soft-white mb-4">
              "We went from hiring safe choices to hiring game-changers. The Misfits OS framework gave us the confidence to integrate weird talent without losing our culture. Our breakthrough thinking increased 60% in six months."
            </blockquote>
            <div className="text-cloud-gray font-medium">
              <strong>Sarah Chen</strong>, VP of Innovation, TechCorp (Series C)
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}