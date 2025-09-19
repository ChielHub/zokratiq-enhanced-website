'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export function StickyLabsCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [100, 200], [0, 1])

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsVisible(latest > 200)
    })
    return unsubscribe
  }, [scrollY])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-deep-charcoal/95 border-t border-primary-teal/30 backdrop-blur-lg"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-soft-white font-semibold">
              Ready to expand your decision space?
            </p>
            <p className="text-cloud-gray/70 text-sm">
              15‑minute fit‑check · No commitment · Just clarity
            </p>
          </div>
          
          <div className="flex gap-3">
            <button 
              className="inline-flex items-center bg-primary-teal text-base-black font-semibold px-6 py-3 rounded-lg hover:bg-bright-aqua transition-all duration-300 group"
              onClick={() => window.location.href = '/zokratiq/labs/fit-check'}
            >
              <span className="mr-2">Start Fit‑Check</span>
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M3 8h10m-5-5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </button>
            
            <button className="text-primary-teal hover:text-bright-aqua transition-colors duration-300 px-4 py-3 text-sm font-medium">
              Get Primer
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}