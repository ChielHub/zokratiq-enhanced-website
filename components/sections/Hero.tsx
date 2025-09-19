'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isShaderSupported, setIsShaderSupported] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let animationId: number
    let time = 0

    const initShader = () => {
      try {
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          setIsShaderSupported(false)
          return
        }

        const resizeCanvas = () => {
          const dpr = window.devicePixelRatio || 1
          const rect = canvas.getBoundingClientRect()
          canvas.width = rect.width * dpr
          canvas.height = rect.height * dpr
          ctx.scale(dpr, dpr)
          canvas.style.width = rect.width + 'px'
          canvas.style.height = rect.height + 'px'
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        const animate = () => {
          if (document.hidden) {
            animationId = requestAnimationFrame(animate)
            return
          }

          time += 0.008
          const width = canvas.width / (window.devicePixelRatio || 1)
          const height = canvas.height / (window.devicePixelRatio || 1)

          // Clear canvas
          ctx.fillStyle = '#0C0C0C'
          ctx.fillRect(0, 0, width, height)

          // Create subtle wave patterns
          const gradient = ctx.createLinearGradient(0, 0, width, height)
          gradient.addColorStop(0, 'rgba(0, 179, 166, 0.05)')
          gradient.addColorStop(0.5, 'rgba(74, 223, 214, 0.08)')
          gradient.addColorStop(1, 'rgba(0, 179, 166, 0.03)')

          ctx.fillStyle = gradient
          
          // Draw multiple wave layers
          for (let i = 0; i < 3; i++) {
            ctx.beginPath()
            const amplitude = 40 + i * 15
            const frequency = 0.005 + i * 0.002
            const phase = time + i * Math.PI / 3

            for (let x = 0; x <= width; x += 2) {
              const y = height / 2 + 
                Math.sin(x * frequency + phase) * amplitude * Math.sin(time * 0.5) +
                Math.sin(x * frequency * 2 + phase * 1.5) * amplitude * 0.5
              
              if (x === 0) {
                ctx.moveTo(x, y)
              } else {
                ctx.lineTo(x, y)
              }
            }

            ctx.lineTo(width, height)
            ctx.lineTo(0, height)
            ctx.closePath()
            ctx.globalAlpha = 0.3 - i * 0.1
            ctx.fill()
          }

          ctx.globalAlpha = 1
          animationId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
          window.removeEventListener('resize', resizeCanvas)
          if (animationId) cancelAnimationFrame(animationId)
        }
      } catch (error) {
        console.warn('Shader initialization failed, using fallback')
        setIsShaderSupported(false)
      }
    }

    const cleanup = initShader()
    return cleanup
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10 reality-crack paper-texture">
      {/* Background */}
      <div className="absolute inset-0 bg-base-black z-0">
        {/* Background gradient only */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-gradient-to-br from-primary-teal/10 to-base-black/40 transition-all duration-700" />
        </div>
        
        {/* Animated Canvas Overlay */}
        {isShaderSupported && (
          <canvas
            ref={canvasRef}
            className="shader-canvas w-full h-full opacity-20 z-20"
            style={{ mixBlendMode: 'overlay' }}
          />
        )}
        <div className="grain-overlay z-30" />
      </div>

      {/* Content */}
      <div className="relative z-50 container mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            whileHover={{ scale: 1.02 }}
          >
            Business Meets{' '}
            <motion.span 
              className="font-playfair text-primary-teal"
              whileHover={{ 
                textShadow: "0 0 20px rgba(74, 223, 214, 0.6)",
                scale: 1.05
              }}
              transition={{ duration: 0.3 }}
            >
              Magic
            </motion.span>{' '}
            when you hire free‑range thinkers.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-xl md:text-2xl font-serif text-cloud-gray mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            We turn curiosity into operating leverage—designing Playful Businesses where exploration fuels strategy, product, and culture.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button size="lg" className="gooey-arrow group px-8 whitespace-nowrap" asChild href="/scan">
                <span className="flex items-center">
                  Run a Free Reality Scan
                  <motion.svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="ml-2 transition-transform group-hover:translate-x-1 flex-shrink-0"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      d="M4 10h12m-6-6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <a 
                href="#fault-lines" 
                className="code-button glitch-button border-2 border-primary-teal/60 text-primary-teal hover:border-primary-teal hover:bg-primary-teal/10 px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center"
                data-text="reality.shift()"
              >
                reality.shift()
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            className="text-sm font-mono text-cloud-gray/70 tracking-wider"
          >
            Consciousness → Org Design · History → Strategy · Systems → Growth
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}