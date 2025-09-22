'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Is this just another diversity initiative?",
      answer: "No. Traditional diversity focuses on demographics. Misfits OS focuses on cognitive contribution. We're not interested in checking boxes—we're interested in breaking frames and unlocking breakthrough thinking. This is about competitive advantage through cognitive diversity, not compliance."
    },
    {
      question: "What if weird hires don't work out?",
      answer: "The framework includes specific integration protocols and 90-day onboarding templates designed for unconventional talent. Our data shows 78% of Misfits OS placements exceed performance expectations vs. 45% for traditional hires. The key is systematic integration, not hoping for the best."
    },
    {
      question: "How do I sell this to conservative leadership?",
      answer: "The Blueprint includes stakeholder alignment templates and ROI frameworks specifically designed for risk-averse organizations. We show you how to position cognitive diversity as competitive insurance, not cultural experiment. Frame it as 'cognitive resilience' rather than 'weird hiring.'"
    },
    {
      question: "What if we can't find weird talent?",
      answer: "The framework includes sourcing strategies and 16 misfit archetypes with specific identification criteria. Most organizations discover they've been filtering out exactly the talent they need. The problem isn't scarcity—it's recognition and integration."
    },
    {
      question: "Will this disrupt our culture?",
      answer: "Properly integrated weird talent enhances culture by introducing generative tension and breakthrough thinking. The key is integration, not assimilation—which is exactly what the Activation Rituals Toolkit teaches. Culture becomes stronger, not weaker."
    },
    {
      question: "How long does implementation take?",
      answer: "The framework is designed for 90-day phased implementation. You can start seeing results with the first 'weird' hire if you follow the integration protocols. Full cognitive diversity transformation typically takes 6-12 months depending on organization size and hiring velocity."
    },
    {
      question: "What size organizations does this work for?",
      answer: "The framework scales from 10-person startups to Fortune 500 enterprises. Smaller organizations can implement faster, while larger ones need more structured change management. The core principles work at any scale where hiring decisions impact innovation capacity."
    },
    {
      question: "Do you guarantee results?",
      answer: "We guarantee you'll identify cognitive sameness blind spots in your current process. Implementation success depends on leadership commitment and following the framework protocols. Organizations that implement systematically see measurable improvement in breakthrough thinking within 90 days."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 bg-deep-charcoal">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-cloud-gray max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about implementing Misfits OS in your organization
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-base-black/30 border border-weird-purple/20 rounded-lg overflow-hidden hover:border-weird-purple/40 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-6 px-8 text-left flex justify-between items-center focus:outline-none"
                >
                  <h3 className="text-lg font-semibold text-soft-white pr-4">
                    {faq.question}
                  </h3>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl text-weird-purple font-light flex-shrink-0"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <div className="border-t border-weird-purple/20 pt-4">
                          <p className="text-cloud-gray leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Still Have Questions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16 p-8 bg-gradient-to-r from-weird-purple/20 to-primary-teal/20 border border-weird-purple/30 rounded-xl"
          >
            <h3 className="text-xl font-bold text-soft-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-cloud-gray mb-6 leading-relaxed">
              Download the Blueprint and get additional implementation guidance in our follow-up email sequence.
              Or book a free 15-minute strategy session to discuss your specific cognitive diversity challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center px-6 py-3 bg-weird-purple text-white font-semibold rounded-lg hover:bg-weird-purple/80 transition-all duration-300"
              >
                Get the Blueprint →
              </a>
              <a
                href="mailto:hello@zokratiq.com"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary-teal text-primary-teal rounded-lg hover:bg-primary-teal hover:text-white transition-all duration-300"
              >
                Email Questions
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}