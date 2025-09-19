'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
  delay?: number
}

export function FeatureCard({ title, description, icon, className, delay = 0 }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeInOut' }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'group relative bg-deep-charcoal border border-gray-800 rounded-xl p-6 transition-all duration-300',
        'hover:border-primary-teal/30 hover:shadow-lg hover:shadow-primary-teal/10',
        className
      )}
    >
      {/* Subtle inner highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-soft-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="mb-4 text-primary-teal transition-colors duration-300 group-hover:text-bright-aqua">
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold text-soft-white mb-3 group-hover:text-bright-aqua transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-cloud-gray leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 border border-primary-teal rounded-xl opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}