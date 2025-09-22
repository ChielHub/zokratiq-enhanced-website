'use client'

import { motion } from 'framer-motion'

export default function ProofStrip() {
  const stats = [
    {
      number: "73%",
      description: "of teams think alike despite knowing diversity drives innovation"
    },
    {
      number: "40%",
      description: "increase in breakthrough concepts when weird talent is integrated properly"
    },
    {
      number: "87%",
      description: "performance advantage for cognitively diverse teams vs. homogeneous teams"
    }
  ]

  return (
    <section className="py-16 bg-deep-charcoal/50 backdrop-blur-sm border-y border-weird-purple/20">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-soft-white mb-4">
            The Cognitive Sameness Crisis
          </h2>
          <p className="text-lg text-cloud-gray max-w-3xl mx-auto">
            Most organizations know cognitive diversity drives innovation. Yet the data reveals a troubling reality.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 bg-base-black/50 rounded-lg border border-weird-purple/20 hover:border-weird-purple/40 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold text-weird-purple mb-4">
                {stat.number}
              </div>
              <div className="text-cloud-gray leading-relaxed">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Supporting quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 max-w-4xl mx-auto"
        >
          <blockquote className="text-xl md:text-2xl font-serif italic text-weird-purple mb-4">
            "Every 'culture fit' hire deepens your cognitive sameness. Every safe choice narrows your solution space."
          </blockquote>
          <div className="text-cloud-gray/80 font-medium">
            — Zokratiq Cognitive Diversity Research
          </div>
        </motion.div>
      </div>
    </section>
  )
}