'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export function LabsFAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How is this different from traditional strategy consulting?",
      answer: "Traditional consulting optimizes within existing frameworks. Labs challenges the framework itself. We use speculative design, narrative analysis, and futures thinking—not just data and benchmarks—to reveal non-obvious possibilities."
    },
    {
      question: "Do you work with early-stage companies or just enterprises?",
      answer: "We work across stages, but Labs is most valuable when there's meaningful capital to deploy and strategic optionality to explore. Series B+ startups and established companies typically get the most value."
    },
    {
      question: "What if our industry is 'boring' or traditional?",
      answer: "Perfect. Boring industries often harbor the most interesting disruption potential because everyone's using the same playbook. We specialize in finding the weird angles that others miss."
    },
    {
      question: "How do you measure success?",
      answer: "Quality of decisions, not just outcomes. Did we expand your option space? Surface blind spots? Create conviction around bold moves? We track decision quality and strategic courage, not just ROI."
    },
    {
      question: "What's the time commitment from our team?",
      answer: "Signal Scan: 2-3 hours of interviews. Core Lab: 8-12 hours across 4-6 weeks (mostly async with 2-3 collaborative sessions). We design around your calendar constraints."
    },
    {
      question: "Do you replace our existing strategy process?",
      answer: "No, we complement it. Think of Labs as your 'strategic R&D'—exploring edges and possibilities before you commit to a formal planning cycle. We feed insights into your existing process."
    },
    {
      question: "What if the insights are too 'out there' for our culture?",
      answer: "We translate edge insights into executive-ready language. Our job is expanding your decision space, not breaking your culture. We meet you where you are and stretch from there."
    },
    {
      question: "Can you guarantee specific outcomes?",
      answer: "We guarantee expanded perspective and decision-ready artifacts. The value comes from seeing possibilities you'd otherwise miss, not from predicting specific futures. Clarity has its own ROI."
    },
    {
      question: "How do you handle confidentiality?",
      answer: "Full NDAs, compartmentalized teams, and secure collaboration tools. Many clients are public companies or handling sensitive M&A discussions. Confidentiality is table stakes."
    },
    {
      question: "What's the investment range?",
      answer: "Signal Scan: $15-25K. Core Lab: $75-150K depending on scope and timeline. Summit builds are custom. We're transparent about pricing after a brief discovery conversation."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-deep-charcoal/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-teal mb-8 tracking-wider">
              FAQs
            </h2>
            <p className="text-lg text-cloud-gray">8–10 objections handled.</p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 * index, ease: 'easeOut' }}
                className="bg-base-black/50 border border-primary-teal/20 rounded-xl overflow-hidden hover:border-primary-teal/40 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full px-6 py-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-semibold text-soft-white pr-4">
                    {faq.question}
                  </span>
                  <motion.svg
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary-teal flex-shrink-0"
                  >
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </motion.svg>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === index ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-cloud-gray leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Micro CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
            className="text-center mt-12"
          >
            <button className="text-primary-teal hover:text-bright-aqua transition-colors duration-300 font-medium text-sm group">
              See an example deck 
              <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}