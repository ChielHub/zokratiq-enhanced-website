'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface ScenarioData {
  title: string
  narrative: string
  implications: string[]
  riskScore: number
  opportunityScore: number
  color: string
}

const scenarios: ScenarioData[] = [
  {
    title: "Synthetic Sunrise",
    narrative: "Lab-grown proteins dominate, traditional farming transforms into ingredient sourcing",
    implications: [
      "Dairy farms become bioreactor sites",
      "Brand equity shifts to molecular precision",
      "Regulatory capture by synthetic leaders"
    ],
    riskScore: 4,
    opportunityScore: 3,
    color: "from-yellow-600 to-orange-500"
  },
  {
    title: "Back to Soil",
    narrative: "Consumer backlash drives regenerative agriculture premium, authenticity wins",
    implications: [
      "Local sourcing becomes competitive advantage",
      "Carbon sequestration creates new revenue",
      "Supply chains fragment but premiums soar"
    ],
    riskScore: 2,
    opportunityScore: 5,
    color: "from-green-700 to-emerald-600"
  }
]

const ScoreBar = ({ score, label, color }: { score: number; label: string; color: string }) => (
  <div className="flex items-center gap-2">
    <span className="text-xs font-mono text-cloud-gray/70 w-16">{label}</span>
    <div className="flex-1 bg-deep-charcoal rounded-full h-2">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(score / 5) * 100}%` }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
      />
    </div>
    <span className="text-xs font-bold text-soft-white w-8">{score}/5</span>
  </div>
)

export function ForesightDeck() {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <div className="max-w-6xl mx-auto bg-base-black rounded-2xl overflow-hidden border border-primary-teal/20">
      {/* Slide Navigation */}
      <div className="flex bg-deep-charcoal/50 border-b border-primary-teal/20">
        <button
          onClick={() => setActiveSlide(0)}
          className={`flex-1 px-6 py-3 text-sm font-mono transition-all duration-300 ${
            activeSlide === 0 
              ? 'bg-primary-teal/20 text-primary-teal border-b-2 border-primary-teal' 
              : 'text-cloud-gray hover:text-primary-teal'
          }`}
        >
          01 / SITUATION BRIEF
        </button>
        <button
          onClick={() => setActiveSlide(1)}
          className={`flex-1 px-6 py-3 text-sm font-mono transition-all duration-300 ${
            activeSlide === 1 
              ? 'bg-primary-teal/20 text-primary-teal border-b-2 border-primary-teal' 
              : 'text-cloud-gray hover:text-primary-teal'
          }`}
        >
          02 / FUTURE PRESSURE GRID
        </button>
      </div>

      {/* Slide Content */}
      <div className="relative min-h-[600px]">
        {/* Slide 1 - Situation Brief */}
        <motion.div
          initial={{ opacity: 0, x: activeSlide === 0 ? 0 : -20 }}
          animate={{ opacity: activeSlide === 0 ? 1 : 0, x: activeSlide === 0 ? 0 : -20 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 p-12 ${activeSlide === 0 ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-20 w-32 h-32 border border-primary-teal rounded-full" />
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-primary-teal/20 to-transparent rounded-lg rotate-12" />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-primary-teal text-base-black text-xs font-mono font-bold rounded-full">
                  STRATEGIC QUESTION
                </span>
                <span className="text-xs font-mono text-cloud-gray/60">
                  Excerpt from a Zokratiq Lab
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-soft-white mb-6 leading-tight">
                How do we future-proof our{' '}
                <span className="text-primary-teal font-serif italic">protein strategy</span>{' '}
                for the 2030s?
              </h1>
              
              <p className="text-lg text-cloud-gray italic mb-8">
                A large dairy company navigating synthetic biology, climate pressure, and shifting consumer behavior.
              </p>
            </div>

            {/* Context Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Signals of Change */}
              <div>
                <h3 className="text-lg font-bold text-primary-teal mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-teal rounded-full" />
                  Signals of Change
                </h3>
                <ul className="space-y-3">
                  <li className="text-cloud-gray leading-relaxed">
                    <span className="text-soft-white font-semibold">Precision fermentation</span> costs dropped 85% since 2020, approaching dairy parity
                  </li>
                  <li className="text-cloud-gray leading-relaxed">
                    <span className="text-soft-white font-semibold">Carbon pricing</span> legislation targeting agriculture in EU, California, New Zealand
                  </li>
                  <li className="text-cloud-gray leading-relaxed">
                    <span className="text-soft-white font-semibold">Gen Z protein behavior</span> shows 60% reduction in traditional dairy consumption
                  </li>
                </ul>
              </div>

              {/* Risk/Opportunity */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                    Strategic Risks
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="text-cloud-gray">• Stranded dairy infrastructure within 10 years</li>
                    <li className="text-cloud-gray">• Brand equity erosion to synthetic competitors</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    Strategic Opportunities
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="text-cloud-gray">• First-mover advantage in hybrid protein platforms</li>
                    <li className="text-cloud-gray">• Premium positioning in authenticity-driven segments</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Scope Note */}
            <div className="bg-deep-charcoal/50 border border-primary-teal/20 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-xs font-mono text-primary-teal">SCOPE</span>
                <div className="flex-1 h-px bg-primary-teal/20" />
              </div>
              <p className="text-cloud-gray font-mono text-sm">
                10-day Signal Scan → 2 scenarios mapped → strategic options for leadership team
              </p>
            </div>

            {/* CTA Footer */}
            <div className="text-center pt-6 border-t border-primary-teal/20">
              <p className="text-xs text-cloud-gray/60 mb-3">
                Book a Fit-Check Call to see your own Signal Map.
              </p>
              <button 
                className="text-primary-teal hover:text-bright-aqua text-sm font-semibold transition-colors"
                onClick={() => window.location.href = '/zokratiq/labs/fit-check'}
              >
                Start Fit-Check →
              </button>
            </div>
          </div>
        </motion.div>

        {/* Slide 2 - Future Pressure Grid */}
        <motion.div
          initial={{ opacity: 0, x: activeSlide === 1 ? 0 : 20 }}
          animate={{ opacity: activeSlide === 1 ? 1 : 0, x: activeSlide === 1 ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 p-12 ${activeSlide === 1 ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-primary-teal text-base-black text-xs font-mono font-bold rounded-full">
                  FUTURE PRESSURE GRID
                </span>
                <span className="text-xs font-mono text-cloud-gray/60">
                  2030s Protein Landscape
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-soft-white mb-4">
                Two Worlds, One Decision
              </h2>
            </div>

            {/* Scenarios Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {scenarios.map((scenario, index) => (
                <motion.div
                  key={scenario.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-deep-charcoal/30 border border-primary-teal/20 rounded-xl p-6 hover:border-primary-teal/40 transition-all duration-300"
                >
                  {/* Scenario Header */}
                  <div className="mb-6">
                    <div className={`w-full h-2 rounded-full bg-gradient-to-r ${scenario.color} mb-4`} />
                    <h3 className="text-xl font-bold text-soft-white mb-2">
                      {scenario.title}
                    </h3>
                    <p className="text-sm text-primary-teal italic font-serif">
                      {scenario.narrative}
                    </p>
                  </div>

                  {/* Implications */}
                  <div className="mb-6">
                    <h4 className="text-xs font-mono text-cloud-gray/70 mb-3">IMPLICATIONS</h4>
                    <ul className="space-y-2">
                      {scenario.implications.map((implication, idx) => (
                        <li key={idx} className="text-xs text-cloud-gray flex items-start gap-2">
                          <div className="w-1 h-1 bg-primary-teal rounded-full mt-2 flex-shrink-0" />
                          {implication}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Scores */}
                  <div className="space-y-3">
                    <ScoreBar score={scenario.riskScore} label="Risk" color="from-red-500 to-red-600" />
                    <ScoreBar score={scenario.opportunityScore} label="Opportunity" color="from-green-500 to-green-600" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Strategic Options */}
            <div className="bg-deep-charcoal/50 border border-primary-teal/20 rounded-xl p-8 mb-8">
              <h3 className="text-lg font-bold text-primary-teal mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-teal rounded-full" />
                Strategic Options
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-base-black/50 rounded-lg border-l-4 border-primary-teal">
                  <h4 className="font-bold text-soft-white mb-2">Dual-Track Strategy</h4>
                  <p className="text-sm text-cloud-gray">
                    Invest in both synthetic capabilities and regenerative authenticity. Build portfolio approach across protein modalities.
                  </p>
                </div>
                
                <div className="p-4 bg-base-black/50 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-bold text-soft-white mb-2">Premium Pivot</h4>
                  <p className="text-sm text-cloud-gray">
                    Double down on heritage and soil-to-shelf story. Capture high-value segments while synthetic scales.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Footer */}
            <div className="text-center pt-6 border-t border-primary-teal/20">
              <p className="text-xs text-cloud-gray/60 mb-3">
                Book a Fit-Check Call to see your own Signal Map.
              </p>
              <button 
                className="text-primary-teal hover:text-bright-aqua text-sm font-semibold transition-colors"
                onClick={() => window.location.href = '/zokratiq/labs/fit-check'}
              >
                Start Fit-Check →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}