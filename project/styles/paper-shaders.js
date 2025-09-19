/**
 * Paper Shaders - Subtle animated background for Hero section
 * Creates ink-like wave patterns with minimal performance impact
 */

class PaperShaders {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.time = 0
    this.particles = []
    
    this.init()
    this.animate()
  }

  init() {
    this.resize()
    this.createParticles()
    
    // Handle resize
    window.addEventListener('resize', () => this.resize())
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect()
    this.canvas.width = rect.width * window.devicePixelRatio
    this.canvas.height = rect.height * window.devicePixelRatio
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    
    this.width = rect.width
    this.height = rect.height
  }

  createParticles() {
    this.particles = []
    const density = Math.min(this.width * this.height / 50000, 40) // Adaptive density
    
    for (let i = 0; i < density; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        baseX: Math.random() * this.width,
        baseY: Math.random() * this.height,
        speed: 0.2 + Math.random() * 0.5,
        angle: Math.random() * Math.PI * 2,
        radius: 0.5 + Math.random() * 1.5,
        opacity: 0.1 + Math.random() * 0.2
      })
    }
  }

  drawWaves() {
    const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height)
    gradient.addColorStop(0, 'rgba(91, 140, 255, 0.03)')
    gradient.addColorStop(0.5, 'rgba(169, 193, 255, 0.05)')  
    gradient.addColorStop(1, 'rgba(91, 140, 255, 0.02)')
    
    this.ctx.fillStyle = gradient
    
    // Draw flowing waves
    this.ctx.beginPath()
    this.ctx.moveTo(0, this.height / 2)
    
    for (let x = 0; x <= this.width; x += 10) {
      const y = this.height / 2 + 
                Math.sin((x * 0.01) + (this.time * 0.002)) * 30 +
                Math.sin((x * 0.02) + (this.time * 0.003)) * 15 +
                Math.sin((x * 0.005) + (this.time * 0.001)) * 50
      
      this.ctx.lineTo(x, y)
    }
    
    this.ctx.lineTo(this.width, this.height)
    this.ctx.lineTo(0, this.height)
    this.ctx.closePath()
    this.ctx.fill()
  }

  drawParticles() {
    this.particles.forEach(particle => {
      // Update particle position with wave motion
      const waveInfluence = Math.sin(particle.baseX * 0.01 + this.time * 0.002) * 20
      particle.x = particle.baseX + Math.cos(particle.angle + this.time * particle.speed) * 30
      particle.y = particle.baseY + Math.sin(particle.angle + this.time * particle.speed) * 20 + waveInfluence
      
      // Draw particle with gradient
      const particleGradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.radius * 3
      )
      
      particleGradient.addColorStop(0, `rgba(91, 140, 255, ${particle.opacity})`)
      particleGradient.addColorStop(0.7, `rgba(169, 193, 255, ${particle.opacity * 0.5})`)
      particleGradient.addColorStop(1, 'rgba(91, 140, 255, 0)')
      
      this.ctx.fillStyle = particleGradient
      this.ctx.beginPath()
      this.ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2)
      this.ctx.fill()
      
      // Wrap particles around screen
      if (particle.x < -50) particle.baseX = this.width + 50
      if (particle.x > this.width + 50) particle.baseX = -50
      if (particle.y < -50) particle.baseY = this.height + 50  
      if (particle.y > this.height + 50) particle.baseY = -50
    })
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    
    this.drawWaves()
    this.drawParticles()
    
    this.time += 1
    requestAnimationFrame(() => this.animate())
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('.shader-canvas')
  if (canvas) {
    new PaperShaders(canvas)
  }
})