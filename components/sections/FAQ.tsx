'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: 'What is a Reality Exploration Studio?',
    answer: "It's a space for rethinking how you see, not just what you do. We fuse philosophy, foresight, and pattern recognition to reshape strategic perception."
  },
  {
    question: 'Who is Zokratiq for?',
    answer: 'Visionary leaders, post-corporate thinkers, and companies tired of hiring clones. If you sense reality shifting, we\'re your advance scouts.'
  },
  {
    question: 'How do I work with you?',
    answer: 'Start with a signal scan, a lab session, or our placement studio. Custom projects begin with a 30-minute resonance call.'
  },
  {
    question: 'Is Work is Weird a job board?',
    answer: "No. It's a placement studio for people who don't fit job boards. We match curiosity-aligned humans with daimon-compatible companies."
  },
  {
    question: 'Can Zokratiq work with large orgs?',
    answer: "Yes—if they're ready to think weird, act real, and dissolve outdated operating systems. We've run sessions with teams of all sizes."
  }
]

export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-base-black">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-soft-white mb-8">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: 'easeOut' }}
            >
              <Disclosure as="div" className="mb-4">
                {({ open }) => (
                  <div className="bg-deep-charcoal/50 border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary-teal/30">
                    <Disclosure.Button className="flex justify-between items-center w-full px-6 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2 focus-visible:ring-offset-base-black">
                      <span className="text-lg font-semibold text-soft-white pr-4">
                        {faq.question}
                      </span>
                      <ChevronDownIcon
                        className={`${
                          open ? 'rotate-180 text-bright-aqua' : 'text-primary-teal'
                        } h-6 w-6 transition-all duration-300 flex-shrink-0`}
                      />
                    </Disclosure.Button>
                    
                    <Disclosure.Panel className="px-6 pb-6">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-cloud-gray leading-relaxed"
                      >
                        {faq.answer}
                      </motion.div>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}