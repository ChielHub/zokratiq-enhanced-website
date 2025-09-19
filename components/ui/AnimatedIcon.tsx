'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface AnimatedIconProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedIcon({ children, className = '' }: AnimatedIconProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`inline-flex ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <div className="svg-draw-container">
        {children}
      </div>
      
      <style jsx>{`
        .svg-draw-container svg path,
        .svg-draw-container svg line,
        .svg-draw-container svg polyline,
        .svg-draw-container svg circle,
        .svg-draw-container svg rect {
          stroke-dasharray: 1000;
          stroke-dashoffset: ${isHovered ? '0' : '1000'};
          transition: stroke-dashoffset 0.3s ease-in-out;
        }
      `}</style>
    </motion.div>
  )
}

// Specific icon components with line art
export function DiscoveryIcon({ className = '' }: { className?: string }) {
  return (
    <AnimatedIcon className={className}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="14" />
        <circle cx="16" cy="16" r="8" />
        <circle cx="16" cy="16" r="3" />
        <line x1="22" y1="10" x2="24" y2="8" />
        <line x1="22" y1="22" x2="24" y2="24" />
        <line x1="10" y1="22" x2="8" y2="24" />
        <line x1="10" y1="10" x2="8" y2="8" />
      </svg>
    </AnimatedIcon>
  )
}

export function InnovationIcon({ className = '' }: { className?: string }) {
  return (
    <AnimatedIcon className={className}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="12" r="8" />
        <path d="M12 20h8" />
        <path d="M12 24h8" />
        <path d="M14 28h4" />
        <line x1="16" y1="4" x2="16" y2="8" />
        <line x1="8" y1="12" x2="12" y2="12" />
        <line x1="20" y1="12" x2="24" y2="12" />
        <line x1="10.3" y1="6.3" x2="12.7" y2="8.7" />
        <line x1="19.3" y1="8.7" x2="21.7" y2="6.3" />
      </svg>
    </AnimatedIcon>
  )
}

export function ImplementationIcon({ className = '' }: { className?: string }) {
  return (
    <AnimatedIcon className={className}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="24" height="24" rx="2" />
        <polyline points="9,16 14,21 23,11" />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
      </svg>
    </AnimatedIcon>
  )
}

export function GrowthIcon({ className = '' }: { className?: string }) {
  return (
    <AnimatedIcon className={className}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="4,20 8,16 12,18 16,14 20,16 24,12 28,14" />
        <polyline points="22,8 28,14 22,14" />
        <line x1="16" y1="28" x2="16" y2="22" />
        <line x1="8" y1="28" x2="8" y2="20" />
        <line x1="24" y1="28" x2="24" y2="16" />
      </svg>
    </AnimatedIcon>
  )
}