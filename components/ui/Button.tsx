'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  asChild?: boolean
  href?: string
  className?: string
  onClick?: () => void
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, asChild = false, href, onClick }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus-ring disabled:opacity-50 disabled:pointer-events-none'
    
    const variants = {
      primary: 'bg-primary-teal text-white hover:bg-bright-aqua hover:shadow-lg hover:shadow-primary-teal/25',
      secondary: 'border-2 border-primary-teal text-primary-teal hover:bg-primary-teal hover:text-white',
      ghost: 'text-primary-teal hover:text-bright-aqua hover:bg-primary-teal/10'
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm rounded-md',
      md: 'px-6 py-3 text-base rounded-lg',
      lg: 'px-8 py-4 text-base rounded-xl'
    }

    if (asChild && href) {
      return (
        <motion.a
          href={href}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <span className="relative z-10">{children}</span>
          {variant === 'primary' && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-teal to-bright-aqua rounded-lg opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.a>
      )
    }

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        onClick={onClick}
      >
        <span className="relative z-10">{children}</span>
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-teal to-bright-aqua rounded-lg opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }