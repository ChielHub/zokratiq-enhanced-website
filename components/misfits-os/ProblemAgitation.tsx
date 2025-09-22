'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ProblemAgitation() {
  const [activeScenario, setActiveScenario] = useState(0)

  const scenarios = [
    {
      title: "The Innovation Theater",
      problem: "You have innovation initiatives, R&D budgets, and transformation mandates. But your team keeps producing the same types of solutions because they all think alike.",
      cost: "Missed opportunities, competitive vulnerability, predictable thinking"
    },
    {
      title: "The Culture Fit Trap",
      problem: "Every hire 'fits the culture perfectly.' They're smart, experienced, and safe. They're also creating an echo chamber that's slowly killing your competitive edge.",
      cost: "Groupthink, blind spots, resistance to new perspectives"
    },
    {
      title: "The Weird Talent Waste",
      problem: "You encounter brilliant unconventional thinkers but can't figure out how to hire them without disrupting harmony. So you hire the safe choice instead.",
      cost: "Lost breakthrough potential, competitive disadvantage, innovation stagnation"
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
            The Hidden Cost of <span className="text-weird-purple font-playfair italic">Sameness</span>
          </h2>
          <p className="text-xl text-cloud-gray max-w-3xl mx-auto leading-relaxed">
            Most organizations are trapped in cognitive sameness without realizing it. Here's how it shows up:
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Scenario Tabs */}
          <div className="flex flex-col sm:flex-row justify-center mb-12 gap-4">
            {scenarios.map((scenario, index) => (
              <button
                key={index}
                onClick={() => setActiveScenario(index)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeScenario === index
                    ? 'bg-weird-purple text-white'
                    : 'bg-deep-charcoal text-cloud-gray hover:bg-weird-purple/20'
                }`}
              >
                {scenario.title}
              </button>
            ))}
          </div>

          {/* Active Scenario */}
          <motion.div
            key={activeScenario}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-deep-charcoal/50 border border-weird-purple/20 rounded-xl p-8 md:p-12"
          >
            <h3 className="text-2xl font-bold text-weird-purple mb-6">
              {scenarios[activeScenario].title}
            </h3>
            <p className="text-lg text-cloud-gray leading-relaxed mb-8">
              {scenarios[activeScenario].problem}
            </p>
            <div className="border-t border-weird-purple/20 pt-6">
              <div className="text-sm text-weird-purple font-semibold mb-2">THE REAL COST:</div>
              <div className="text-cloud-gray">
                {scenarios[activeScenario].cost}
              </div>
            </div>
          </motion.div>

          {/* Pain Points Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-8 mt-16"
          >
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-soft-white mb-4">Signs You're Stuck in Cognitive Sameness:</h4>
              <div className="space-y-4">
                {[
                  "Team meetings feel like echo chambers",
                  "Solutions are predictable and incremental",
                  "You're hiring the same types of people repeatedly",
                  "Innovation initiatives produce safe, conventional results",
                  "Breakthrough thinking happens by accident, not design"
                ].map((sign, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-heritage-red rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div className="text-cloud-gray">{sign}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-bold text-soft-white mb-4">While Your Competitors Are:</h4>
              <div className="space-y-4">
                {[
                  "Hiring weird talent for cognitive advantage",
                  "Breaking frames while you optimize for fit",
                  "Building cognitive diversity as infrastructure",
                  "Turning unconventional thinking into competitive edge",
                  "Solving problems you haven't even identified yet"
                ].map((advantage, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary-teal rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div className="text-cloud-gray">{advantage}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Call-to-action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16 p-8 bg-gradient-to-r from-weird-purple/20 to-heritage-red/10 border border-weird-purple/30 rounded-xl"
          >
            <h3 className="text-2xl font-bold text-soft-white mb-4">
              Ready to Break the Cycle?
            </h3>
            <p className="text-lg text-cloud-gray mb-6">
              The Misfits OS Blueprint shows you exactly how to transform cognitive sameness into competitive advantage.
            </p>
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center px-6 py-3 bg-weird-purple text-white font-semibold rounded-lg hover:bg-weird-purple/80 transition-all duration-300"
            >
              Get the Framework →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}