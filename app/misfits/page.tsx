'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

// Sticky CTA Bar Component
function StickyCTABar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-base-black/95 backdrop-blur-md border-t border-weird-purple py-4"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-cloud-gray font-medium">Weird beats safe. Ready?</span>
          <motion.a
            href="#weird-journey"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-weird-purple to-bright-aqua text-base-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Weird Journey
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

// Typing animation hook
function useTypingAnimation() {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  
  useEffect(() => {
    const phases = {
      TYPING: 'typing',
      MOVING_BACK: 'moving-back',
      INSERTING_SLASH: 'inserting-slash',
      MOVING_FORWARD: 'moving-forward',
      MOVING_TO_END: 'moving-to-end',
      COMPLETE: 'complete',
      FINAL_BLINKS: 'final-blinks',
      ADDING_DOT: 'adding-dot',
      FINISHED: 'finished'
    }

    let currentPhase = phases.TYPING
    let text = ''
    let cursorVisible = true
    let typeIndex = 0
    let cursorPosition = 0
    const fullText = 'misfits'

    const updateDisplay = () => {
      const cursor = cursorVisible ? '|' : ''
      
      switch(currentPhase) {
        case phases.TYPING:
          setDisplayText(text + cursor)
          break
        case phases.MOVING_BACK:
          const beforeCursor = text.slice(0, cursorPosition)
          const afterCursor = text.slice(cursorPosition)
          setDisplayText(beforeCursor + cursor + afterCursor)
          break
        case phases.INSERTING_SLASH:
          setDisplayText('mis' + cursor + 'fits')
          break
        case phases.MOVING_FORWARD:
          setDisplayText('mis/' + cursor + 'fits')
          break
        case phases.MOVING_TO_END:
          setDisplayText('mis/fits' + cursor)
          break
        case phases.COMPLETE:
          setDisplayText('mis/fits' + cursor)
          break
        case phases.FINISHED:
          setDisplayText('mis/fits.')
          setIsComplete(true)
          break
      }
    }

    const blinkInterval = setInterval(() => {
      if (currentPhase !== phases.FINAL_BLINKS) {
        cursorVisible = !cursorVisible
        updateDisplay()
      }
    }, 530)

    const typeNextCharacter = () => {
      if (currentPhase === phases.TYPING && typeIndex < fullText.length) {
        text = fullText.slice(0, typeIndex + 1)
        typeIndex++
        updateDisplay()
        setTimeout(typeNextCharacter, 300)
      } else if (currentPhase === phases.TYPING) {
        setTimeout(() => {
          currentPhase = phases.MOVING_BACK
          cursorPosition = fullText.length
          moveBack()
        }, 800)
      }
    }

    const moveBack = () => {
      if (cursorPosition > 3) {
        cursorPosition--
        updateDisplay()
        setTimeout(moveBack, 200)
      } else {
        setTimeout(() => {
          currentPhase = phases.INSERTING_SLASH
          updateDisplay()
          setTimeout(() => {
            currentPhase = phases.MOVING_FORWARD
            updateDisplay()
            setTimeout(() => {
              currentPhase = phases.MOVING_TO_END
              updateDisplay()
              setTimeout(() => {
                currentPhase = phases.COMPLETE
                updateDisplay()
                setTimeout(() => {
                  clearInterval(blinkInterval)
                  currentPhase = phases.FINISHED
                  updateDisplay()
                }, 800)
              }, 400)
            }, 400)
          }, 400)
        }, 400)
      }
    }

    typeNextCharacter()

    return () => clearInterval(blinkInterval)
  }, [])

  return { displayText, isComplete }
}

function MisfitsHero() {
  const { displayText, isComplete } = useTypingAnimation()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base-black">
      <div className="relative z-40 container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="font-mono text-weird-purple">
                {displayText.includes('/') ? (
                  <>
                    <span className="text-soft-white">mis</span>
                    <span className="text-weird-purple">/fits</span>
                    {displayText.includes('.') && <span className="text-weird-purple">.</span>}
                  </>
                ) : (
                  displayText
                )}
              </span>
            </h1>

            <p className="text-xl md:text-2xl font-serif text-weird-purple mb-8 italic">
              A talent studio for the Age of Wizardry.
            </p>

            <div className="text-lg md:text-xl text-cloud-gray leading-relaxed mb-12 max-w-2xl mx-auto">
              <p className="mb-4">Most companies hire for sameness.</p>
              <p className="font-semibold text-soft-white">We help you hire for strangeness.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <a 
                  href="#fit-assessment" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-weird-purple to-bright-aqua text-base-black font-semibold text-lg rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  🏢 Start a Fit Assessment
                </a>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <a 
                  href="#the-collective" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-weird-purple text-weird-purple font-semibold text-lg rounded-xl hover:bg-weird-purple hover:text-base-black transition-all duration-300"
                >
                  🚀 Apply to The Collective
                </a>
              </motion.div>
            </div>

            <div className="border-t border-weird-purple/20 pt-8">
              <p className="text-lg font-serif text-weird-purple italic mb-4">
                "Cognitive sameness is the real risk. Add one generative outlier and watch the frame tilt."
              </p>
              
              <div className="flex justify-center gap-8 flex-wrap text-sm text-warm-accent font-mono">
                <span>No spray-and-pray recruiting</span>
                <span>•</span>
                <span>Context-first matching</span>
                <span>•</span>
                <span>Zokratiq-backed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function EssenceSection() {
  return (
    <section className="py-24 bg-deep-charcoal">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-12">
            Essence & Mission
          </h2>
          
          <div className="text-lg md:text-xl text-cloud-gray leading-relaxed mb-8 space-y-6">
            <p>Mis/Fits is Zokratiq's talent studio for unconventional talent.</p>
            <p>We scout polymaths, philosophers, neurodivergent tinkerers, and outsiders who see the world sideways. People who tilt frames and open new futures.</p>
          </div>
          
          <p className="text-xl md:text-2xl font-serif italic text-weird-purple font-semibold">
            We don't force square pegs into round holes.<br />
            We find the mis/fits who remind you your peg was round all along.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function WhatWeDoSection() {
  const services = [
    {
      icon: "🎯",
      title: "Weird Talent Placement",
      description: "We're not recruiters. We're translators — matching edge talent to contexts where their oddness creates leverage.",
      color: "text-weird-purple"
    },
    {
      icon: "🔍", 
      title: "Cognitive Diversity Audits",
      description: "We measure sameness in your leadership pipeline, then stress-test for where generative outsiders can unlock resilience.",
      color: "text-primary-teal"
    },
    {
      icon: "⚡",
      title: "Activation Rituals", 
      description: "Onboarding is dead. We design immersion rituals so hires don't just \"fit in,\" they tilt the frame.",
      color: "text-warm-accent"
    },
    {
      icon: "🌐",
      title: "Beta Collective",
      description: "Our global network of unconventional thinkers, makers, and solvers — from meme-scientists to systems poets.",
      color: "text-heritage-red"
    }
  ]

  return (
    <section className="py-24 bg-deep-charcoal">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-16 text-center">
            What We Do
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-base-black/50 border border-weird-purple/20 rounded-lg p-8 hover:border-weird-purple/40 transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-weird-purple to-bright-aqua rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    {service.icon}
                  </div>
                  <h3 className={`text-xl font-bold ${service.color} mb-4`}>
                    {service.title}
                  </h3>
                </div>
                <p className="text-cloud-gray leading-relaxed text-center">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center p-8 bg-weird-purple/10 border border-weird-purple/30 rounded-lg"
          >
            <p className="text-xl text-soft-white mb-6">
              👉 <strong>Hire a Weirdo. Save your Boardroom.</strong>
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="#fit-assessment" 
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-weird-purple to-bright-aqua text-base-black font-semibold text-lg rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Start Your Fit Journey →
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function WhoAndWhySection() {
  return (
    <section className="py-24 bg-base-black">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-soft-white mb-8">
              Who It's For
            </h2>
            <ul className="space-y-6 text-lg text-cloud-gray">
              <li className="flex items-start">
                <span className="text-weird-purple font-bold mr-4 flex-shrink-0">•</span>
                Organizations ready to break the cycle of sameness and embrace lateral thinkers.
              </li>
              <li className="flex items-start">
                <span className="text-weird-purple font-bold mr-4 flex-shrink-0">•</span>
                Individuals too weird for LinkedIn's filters but vital to forward-leaning teams.
              </li>
              <li className="flex items-start">
                <span className="text-weird-purple font-bold mr-4 flex-shrink-0">•</span>
                Leaders who know the next decade won't be solved by people who all look and think alike.
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-soft-white mb-8">
              Why It Matters
            </h2>
            <ul className="space-y-6 text-lg text-cloud-gray">
              <li className="flex items-start">
                <span className="text-primary-teal font-bold mr-4 flex-shrink-0">•</span>
                The biggest organizational risk isn't lack of resources — it's sameness.
              </li>
              <li className="flex items-start">
                <span className="text-primary-teal font-bold mr-4 flex-shrink-0">•</span>
                Teams that survive disruption have outliers, polymaths, and pattern-breakers in their DNA.
              </li>
              <li className="flex items-start">
                <span className="text-primary-teal font-bold mr-4 flex-shrink-0">•</span>
                Mis/Fits is the first talent studio built for cognitive resilience, not résumé polish.
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className="text-center p-8 bg-primary-teal/10 border border-primary-teal/30 rounded-lg mb-16">
            <p className="text-xl text-soft-white mb-6">
              🚪 <strong>Ready to break the cycle of sameness?</strong>
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="#the-collective" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-teal text-primary-teal font-semibold text-lg rounded-xl hover:bg-primary-teal hover:text-base-black transition-all duration-300"
              >
                Apply Now →
              </a>
            </motion.div>
          </div>

          <div className="p-12 bg-gradient-to-r from-weird-purple/20 to-heritage-red/10 border-2 border-weird-purple/30 rounded-2xl text-center">
            <div className="mb-6">
              <span className="text-weird-purple font-mono text-sm uppercase tracking-wider font-semibold">Featured Reading</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-soft-white mb-6 font-playfair">
              Manifesto for the Misfits
            </h3>
            <p className="text-lg md:text-xl text-cloud-gray mb-8 leading-relaxed max-w-2xl mx-auto">
              Work was never meant to be this small. A rallying cry for polymaths, divergent thinkers, and those who refuse to sand down their strangeness.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="/manifesto-for-misfits.html" 
                className="inline-flex items-center justify-center px-8 py-4 bg-weird-purple text-base-black font-semibold text-lg rounded-xl hover:shadow-lg transition-all duration-300 border-2 border-weird-purple"
              >
                Read the Manifesto →
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function DualFormsSection() {
  const [orgFormData, setOrgFormData] = useState({
    company: '',
    role: '',
    email: '',
    problem: '',
    sameness: '',
    urgency: '',
    careers: ''
  })

  const [individualFormData, setIndividualFormData] = useState({
    name: '',
    email: '',
    weirdness: '',
    links: '',
    context: '',
    constraints: ''
  })

  const handleOrgSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thanks — we're mapping your Fit Assessment and will reply with a short Diversity Pulse (gaps + 1–3 candidate profiles).")
    setOrgFormData({
      company: '',
      role: '',
      email: '',
      problem: '',
      sameness: '',
      urgency: '',
      careers: ''
    })
  }

  const handleIndividualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("You're in the review queue. If there's a high-fit context, we'll reach out with a Fit Portfolio template and next steps.")
    setIndividualFormData({
      name: '',
      email: '',
      weirdness: '',
      links: '',
      context: '',
      constraints: ''
    })
  }

  return (
    <section className="py-24 bg-base-black" id="weird-journey">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-8">
            Next Steps
          </h2>
          <p className="text-lg text-cloud-gray leading-relaxed">
            Organizations: Schedule a Weirdness Intake. We'll map your sameness blind spots and scout a talent pulse.<br />
            Individuals: Apply to the Beta Collective. If you're a square peg, let's find your fractal hole.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Fit Assessment Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="bg-deep-charcoal border-2 border-weird-purple rounded-lg p-8"
            id="fit-assessment"
          >
            <h3 className="text-2xl font-bold text-weird-purple mb-2 text-center">
              Weirdness Intake
            </h3>
            <p className="text-cloud-gray text-center mb-8 text-sm">
              (5 minutes)
            </p>

            <form onSubmit={handleOrgSubmit} className="space-y-6">
              <div>
                <label htmlFor="org-company" className="block text-soft-white font-semibold mb-2">
                  Company / Org Name
                </label>
                <input
                  type="text"
                  id="org-company"
                  value={orgFormData.company}
                  onChange={(e) => setOrgFormData({...orgFormData, company: e.target.value})}
                  className="w-full p-4 border border-cloud-gray/30 rounded-lg bg-deep-charcoal text-white focus:border-weird-purple focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="org-role" className="block text-soft-white font-semibold mb-2">
                  Your Role
                </label>
                <input
                  type="text"
                  id="org-role"
                  value={orgFormData.role}
                  onChange={(e) => setOrgFormData({...orgFormData, role: e.target.value})}
                  className="w-full p-4 border border-cloud-gray/30 rounded-lg bg-deep-charcoal text-white focus:border-weird-purple focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="org-email" className="block text-soft-white font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="org-email"
                  value={orgFormData.email}
                  onChange={(e) => setOrgFormData({...orgFormData, email: e.target.value})}
                  className="w-full p-4 border border-cloud-gray/30 rounded-lg bg-deep-charcoal text-white focus:border-weird-purple focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="org-problem" className="block text-soft-white font-semibold mb-2">
                  What problem should weirdness solve here?
                </label>
                <textarea
                  id="org-problem"
                  value={orgFormData.problem}
                  onChange={(e) => setOrgFormData({...orgFormData, problem: e.target.value})}
                  className="w-full p-4 border border-cloud-gray/30 rounded-lg bg-deep-charcoal text-white focus:border-bright-aqua focus:outline-none transition-colors h-24 resize-vertical"
                  placeholder="Short answer..."
                  required
                />
              </div>

              <div>
                <label htmlFor="org-sameness" className="block text-soft-white font-semibold mb-2">
                  Where is sameness hurting you most?
                </label>
                <select
                  id="org-sameness"
                  value={orgFormData.sameness}
                  onChange={(e) => setOrgFormData({...orgFormData, sameness: e.target.value})}
                  className="w-full p-4 border border-cloud-gray/30 rounded-lg bg-deep-charcoal text-white focus:border-weird-purple focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select...</option>
                  <option value="strategy">Strategy</option>
                  <option value="product">Product</option>
                  <option value="research">Research</option>
                  <option value="growth">Growth</option>
                  <option value="culture">Culture</option>
                  <option value="leadership">Leadership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="org-urgency" className="block text-soft-white font-semibold mb-2">
                  Urgency
                </label>
                <select
                  id="org-urgency"
                  value={orgFormData.urgency}
                  onChange={(e) => setOrgFormData({...orgFormData, urgency: e.target.value})}
                  className="w-full p-4 border border-cloud-gray/30 rounded-lg bg-deep-charcoal text-white focus:border-weird-purple focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select...</option>
                  <option value="this-quarter">This quarter</option>
                  <option value="this-month">This month</option>
                  <option value="yesterday">Yesterday</option>
                </select>
              </div>

              <div>
                <label htmlFor="org-careers" className="block text-soft-white font-semibold mb-2">
                  Optional: Link to your careers or "About" page
                </label>
                <input
                  type="url"
                  id="org-careers"
                  value={orgFormData.careers}
                  onChange={(e) => setOrgFormData({...orgFormData, careers: e.target.value})}
                  className="w-full p-4 border border-cloud-gray/30 rounded-lg bg-deep-charcoal text-white focus:border-weird-purple focus:outline-none transition-colors"
                  placeholder="https://"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-weird-purple to-bright-aqua text-base-black font-semibold text-lg rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Map My Sameness Blind Spots →
              </button>

              <p className="text-sm text-cloud-gray/80 text-center">
                We don't share your info or pitch candidates without consent.
              </p>
            </form>
          </motion.div>

          {/* Beta Collective Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="bg-deep-charcoal border-2 border-primary-teal rounded-lg p-8"
            id="the-collective"
          >
            <h3 className="text-2xl font-bold text-primary-teal mb-2 text-center">
              Beta Collective
            </h3>
            <p className="text-cloud-gray text-center mb-8 text-sm">
              (Individuals)
            </p>

            <form onSubmit={handleIndividualSubmit} className="space-y-6">
              <div>
                <label htmlFor="ind-name" className="block text-soft-white font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="ind-name"
                  value={individualFormData.name}
                  onChange={(e) => setIndividualFormData({...individualFormData, name: e.target.value})}
                  className="w-full p-4 border border-cloud-gray/30 rounded-lg bg-deep-charcoal text-white focus:border-primary-teal focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="ind-email" className="block text-soft-white font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="ind-email"
                  value={individualFormData.email}
                  onChange={(e) => setIndividualFormData({...individualFormData, email: e.target.value})}
                  className="w-full p-4 border border-cloud-gray/30 rounded-lg bg-deep-charcoal text-white focus:border-primary-teal focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="ind-weirdness" className="block text-soft-white font-semibold mb-2">
                  Weirdness in one sentence
                </label>
                <textarea
                  id="ind-weirdness"
                  value={individualFormData.weirdness}
                  onChange={(e) => setIndividualFormData({...individualFormData, weirdness: e.target.value})}
                  className="w-full p-4 border border-cloud-gray/30 rounded-lg bg-deep-charcoal text-white focus:border-primary-teal focus:outline-none transition-colors h-24 resize-vertical"
                  placeholder="What makes you wonderfully strange?"
                  required
                />
              </div>

              <div>
                <label htmlFor="ind-links" className="block text-soft-white font-semibold mb-2">
                  Links that show your edge
                </label>
                <input
                  type="url"
                  id="ind-links"
                  value={individualFormData.links}
                  onChange={(e) => setIndividualFormData({...individualFormData, links: e.target.value})}
                  className="w-full p-4 border border-cloud-gray/30 rounded-lg bg-deep-charcoal text-white focus:border-primary-teal focus:outline-none transition-colors"
                  placeholder="Portfolio, GitHub, essays, experiments..."
                />
              </div>

              <div>
                <label htmlFor="ind-context" className="block text-soft-white font-semibold mb-2">
                  What context unlocks you?
                </label>
                <select
                  id="ind-context"
                  value={individualFormData.context}
                  onChange={(e) => setIndividualFormData({...individualFormData, context: e.target.value})}
                  className="w-full p-4 border border-cloud-gray/30 rounded-lg bg-deep-charcoal text-white focus:border-primary-teal focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select...</option>
                  <option value="0-to-1-build">0→1 Build</option>
                  <option value="r-and-d">R&D</option>
                  <option value="narrative">Narrative</option>
                  <option value="systems">Systems</option>
                  <option value="design">Design</option>
                  <option value="ops">Ops</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="ind-constraints" className="block text-soft-white font-semibold mb-2">
                  Light constraints
                </label>
                <input
                  type="text"
                  id="ind-constraints"
                  value={individualFormData.constraints}
                  onChange={(e) => setIndividualFormData({...individualFormData, constraints: e.target.value})}
                  className="w-full p-4 border border-cloud-gray/30 rounded-lg bg-deep-charcoal text-white focus:border-primary-teal focus:outline-none transition-colors"
                  placeholder="Location, time, compensation..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-weird-purple text-base-black font-semibold text-lg rounded-xl hover:bg-bright-aqua transition-all duration-300"
              >
                Join the Beta Collective →
              </button>

              <p className="text-sm text-cloud-gray/80 text-center">
                We never share your materials publicly without explicit permission.
              </p>
            </form>
          </motion.div>
        </div>

        {/* Book a Call Option */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto mt-16 text-center p-8 bg-weird-purple/5 border border-weird-purple/20 rounded-lg"
        >
          <h4 className="text-weird-purple mb-4 text-xl font-semibold">Prefer to talk?</h4>
          <p className="text-cloud-gray mb-8">15 minutes to define the problem weirdness should solve. No recruiters, no fluff.</p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a 
                href="#book-call" 
                className="inline-flex items-center justify-center px-6 py-3 border border-cloud-gray/30 text-cloud-gray rounded-lg hover:bg-cloud-gray/10 transition-all duration-300"
              >
                Book a 15-min Fit Call →
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a 
                href="mailto:hello@zokratiq.com" 
                className="inline-flex items-center justify-center px-6 py-3 border border-cloud-gray/30 text-cloud-gray rounded-lg hover:bg-cloud-gray/10 transition-all duration-300"
              >
                Email hello@zokratiq.com
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "Is this recruiting?",
      answer: "No. We're translators. We map your context and introduce high-fit outliers."
    },
    {
      question: "How fast can we meet candidates?",
      answer: "Usually within 1–3 weeks after the Intake."
    },
    {
      question: "What if we don't know what role to hire?",
      answer: "Start with the Intake — we'll identify the leverage point before naming the role."
    }
  ]

  return (
    <section className="py-24 bg-deep-charcoal">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-16 text-center">
            Tiny FAQ
          </h2>

          <div className="space-y-1">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-cloud-gray/20">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full py-8 text-left flex justify-between items-center focus:outline-none"
                >
                  <h3 className="text-xl font-bold text-soft-white">
                    {faq.question}
                  </h3>
                  <span className="text-2xl text-cloud-gray transition-transform duration-300" style={{ transform: openFaq === index ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    +
                  </span>
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pb-8 pl-4"
                  >
                    <p className="text-cloud-gray leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FinalCTASection() {
  return (
    <section className="py-24 bg-gradient-to-b from-deep-charcoal to-charcoal-light text-center">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="mb-12">
            <h4 className="text-weird-purple mb-4 text-sm uppercase tracking-wider font-mono font-semibold">
              Why teams use Mis/Fits
            </h4>
            <div className="flex justify-center gap-8 flex-wrap text-sm text-cloud-gray">
              <span>Context scans {'>'} keyword filters</span>
              <span>•</span>
              <span>Shortlists with narrative framing</span>
              <span>•</span>
              <span>Activation rituals to avoid "culture rejection"</span>
              <span>•</span>
              <span>Weeks, not months</span>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="#weird-journey" 
              className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-weird-purple to-bright-aqua text-base-black font-semibold text-xl rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Start Your Weird Journey →
            </a>
          </motion.div>

          <div className="mt-16 pt-8 border-t border-weird-purple/20 text-sm text-cloud-gray">
            <p className="mb-4">Compliance & Fine Print</p>
            <div className="flex justify-center gap-8 flex-wrap">
              <span>GDPR-friendly. You can delete your data any time.</span>
              <span>•</span>
              <span>We only present candidates with mutual context fit. No spam intros.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function MisfitsPage() {
  return (
    <main className="min-h-screen">
      <StickyCTABar />
      <MisfitsHero />
      <EssenceSection />
      <WhatWeDoSection />
      <WhoAndWhySection />
      <DualFormsSection />
      <FAQSection />
      <FinalCTASection />
      <Contact />
      <Footer />
    </main>
  )
}