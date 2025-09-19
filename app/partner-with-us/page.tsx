'use client'

import { useState } from 'react'

interface ContactFormData {
  identity: 'organization' | 'independent' | ''
  name: string
  email: string
  location: string
  addressing: string
  nextStep: string
  orgName?: string
  role?: string
  partnershipModes?: string[]
  frontier?: string
  timeline?: string
  scopeHint?: string
  room?: string
  practice?: string
  edge?: string
  collabModes?: string[]
  texture?: string
  availability?: string
  shape?: string
  links?: string[]
  referral?: string
  notes?: string
  consent: boolean
}

export default function PartnerWithUsPage() {
  const [showContactDrawer, setShowContactDrawer] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    identity: '',
    name: '',
    email: '',
    location: '',
    addressing: 'First name only',
    nextStep: '30-min exploration call',
    partnershipModes: [],
    collabModes: [],
    links: [''],
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.identity) newErrors.identity = 'Please select how you\'re reaching out'
    if (!formData.name || formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters'
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email required'
    if (!formData.nextStep) newErrors.nextStep = 'Please select preferred next step'
    if (!formData.consent) newErrors.consent = 'Consent is required to proceed'
    
    if (formData.identity === 'organization') {
      if (!formData.orgName) newErrors.orgName = 'Organization name required'
      if (!formData.role) newErrors.role = 'Your role required'
      if (!formData.frontier) newErrors.frontier = 'Please describe what\'s on your frontier'
      if (!formData.timeline) newErrors.timeline = 'Timeline selection required'
    }
    
    if (formData.identity === 'independent') {
      if (!formData.practice) newErrors.practice = 'Practice/focus required'
      if (!formData.edge) newErrors.edge = 'Please describe your edge'
      if (!formData.texture) newErrors.texture = 'Please share your texture'
      if (!formData.availability) newErrors.availability = 'Availability selection required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Prepare form data for submission
      const submissionData = {
        name: formData.name,
        email: formData.email,
        company: formData.identity === 'organization' ? formData.orgName : 'Independent',
        industry: formData.location || 'Not specified',
        challenge: formData.identity === 'organization' ? formData.frontier : formData.edge,
        message: createPartnershipMessage(formData)
      }
      
      const response = await fetch('/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        setErrors({ submit: result.error || 'Something glitched on transmission. Please try again or email us at hello@zokratiq.com.' })
      }
    } catch (error) {
      console.error('Error submitting partnership form:', error)
      setErrors({ submit: 'Something glitched on transmission. Please try again or email us at hello@zokratiq.com.' })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const createPartnershipMessage = (data: ContactFormData): string => {
    let message = `Partnership Inquiry - ${data.identity === 'organization' ? 'Organization' : 'Independent Ally'}\n\n`
    
    message += `Contact Details:\n`
    message += `Name: ${data.name}\n`
    message += `Email: ${data.email}\n`
    message += `Location: ${data.location || 'Not specified'}\n`
    message += `Preferred addressing: ${data.addressing}\n`
    message += `Preferred next step: ${data.nextStep}\n\n`
    
    if (data.identity === 'organization') {
      message += `Organization Details:\n`
      message += `Organization: ${data.orgName}\n`
      message += `Role: ${data.role}\n`
      message += `Partnership modes: ${data.partnershipModes?.join(', ') || 'None selected'}\n`
      message += `Timeline: ${data.timeline}\n\n`
      message += `What's on their frontier:\n${data.frontier}\n\n`
    } else if (data.identity === 'independent') {
      message += `Independent Ally Details:\n`
      message += `Practice/Focus: ${data.practice}\n`
      message += `Edge: ${data.edge}\n`
      message += `Collaboration modes: ${data.collabModes?.join(', ') || 'None selected'}\n`
      message += `Availability: ${data.availability}\n\n`
      message += `Their texture:\n${data.texture}\n\n`
    }
    
    if (data.referral) {
      message += `Referral: ${data.referral}\n`
    }
    
    if (data.notes) {
      message += `Additional notes:\n${data.notes}\n`
    }
    
    return message
  }

  const handleCheckboxChange = (field: 'partnershipModes' | 'collabModes', value: string) => {
    const currentArray = formData[field] || []
    const updated = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    setFormData({ ...formData, [field]: updated })
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Custom styling for radio buttons and checkboxes to use teal color */
          input[type="radio"]:checked {
            accent-color: #00B3A6 !important;
            background-color: #00B3A6 !important;
            border-color: #00B3A6 !important;
          }
          input[type="checkbox"]:checked {
            accent-color: #00B3A6 !important;
            background-color: #00B3A6 !important;
            border-color: #00B3A6 !important;
          }
          input[type="radio"]:focus {
            outline: 2px solid #00B3A6 !important;
            outline-offset: 2px;
          }
          input[type="checkbox"]:focus {
            outline: 2px solid #00B3A6 !important;
            outline-offset: 2px;
          }
          /* Ensure input text is dark for visibility */
          input[type="text"], input[type="email"], textarea {
            color: #1f2937 !important;
          }
        `
      }} />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-base-black via-deep-charcoal/30 via-primary-teal/10 to-base-black pt-24 pb-16 text-center overflow-hidden">
          {/* Network Background Animation */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary-teal rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-soft-white mb-8 font-playfair">
              Partner With Us
            </h1>
            
            <p className="text-xl md:text-2xl text-cloud-gray mb-12 max-w-4xl mx-auto leading-relaxed">
              Partner with a Reality Exploration Studio for visionary teams and institutions. 
              Zokratiq works with organizations and independent allies to explore alternate futures, 
              pressure-test decisions, and unlock new forms of strategy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => setShowContactDrawer(true)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-deep-charcoal to-primary-teal text-soft-white font-semibold rounded-lg hover:from-primary-teal hover:to-bright-aqua hover:shadow-lg hover:shadow-primary-teal/25 transform hover:-translate-y-1 transition-all duration-300 text-lg"
              >
                Start the Conversation
              </button>
              <button className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-warm-accent text-warm-accent font-semibold rounded-lg hover:bg-warm-accent hover:text-base-black transition-all duration-300 text-lg">
                Join the Network
              </button>
            </div>
          </div>
        </section>

        {/* The Invitation */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-soft-white mb-4 font-playfair">The Invitation</h2>
            </div>
            
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-2xl text-cloud-gray mb-8 leading-relaxed">
                <strong className="text-primary-teal">Zokratiq isn't a vendor. We're a partner in exploration.</strong>
              </p>
              
              <p className="text-xl text-cloud-gray mb-12">
                We co-design lenses, labs, and maps with two groups:
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="bg-deep-charcoal border border-primary-teal/20 rounded-xl p-8 hover:transform hover:-translate-y-1 hover:border-primary-teal/50 hover:shadow-lg hover:shadow-primary-teal/15 transition-all duration-300">
                  <div className="h-1 bg-gradient-to-r from-primary-teal to-bright-aqua mb-6 opacity-60"></div>
                  <h3 className="text-2xl font-semibold text-bright-aqua mb-4">Organizations</h3>
                  <p className="text-cloud-gray leading-relaxed">
                    Who want to upgrade their "reality headset."
                  </p>
                </div>
                
                <div className="bg-deep-charcoal border border-primary-teal/20 rounded-xl p-8 hover:transform hover:-translate-y-1 hover:border-primary-teal/50 hover:shadow-lg hover:shadow-primary-teal/15 transition-all duration-300">
                  <div className="h-1 bg-gradient-to-r from-primary-teal to-bright-aqua mb-6 opacity-60"></div>
                  <h3 className="text-2xl font-semibold text-warm-accent mb-4">Independent Allies</h3>
                  <p className="text-cloud-gray leading-relaxed">
                    Consultants, coaches, and allies who thrive on difference.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center text-primary-teal text-2xl font-mono opacity-60 py-8">⸻</div>

        {/* Why Partner */}
        <section className="py-20 bg-charcoal-light">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-soft-white mb-4 font-playfair">Why Partner</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16">
              {/* For Organizations */}
              <div className="bg-deep-charcoal border-2 border-bright-aqua/30 rounded-xl p-8">
                <h3 className="text-3xl font-bold text-bright-aqua mb-8 text-center">For Organizations</h3>
                
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <span className="text-primary-teal font-bold mr-4 flex-shrink-0">→</span>
                    <div>
                      <span className="text-bright-aqua font-semibold">See around corners</span>
                      <span className="text-cloud-gray ml-2">labs and foresight decks that surface risks and opportunities your dashboards miss.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-teal font-bold mr-4 flex-shrink-0">→</span>
                    <div>
                      <span className="text-bright-aqua font-semibold">Activate polymaths</span>
                      <span className="text-cloud-gray ml-2">give hidden talent a sanctioned place to deploy their outside obsessions.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-teal font-bold mr-4 flex-shrink-0">→</span>
                    <div>
                      <span className="text-bright-aqua font-semibold">Move faster</span>
                      <span className="text-cloud-gray ml-2">frameworks that deliver clarity in weeks, not quarters.</span>
                    </div>
                  </li>
                </ul>
              </div>
              
              {/* For Independent Allies */}
              <div className="bg-deep-charcoal border-2 border-warm-accent/30 rounded-xl p-8">
                <h3 className="text-3xl font-bold text-warm-accent mb-8 text-center">For Independent Allies</h3>
                
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <span className="text-primary-teal font-bold mr-4 flex-shrink-0">→</span>
                    <div>
                      <span className="text-bright-aqua font-semibold">Join a signal network</span>
                      <span className="text-cloud-gray ml-2">collaborate with others who lead with philosophy, foresight, and systems thinking.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-teal font-bold mr-4 flex-shrink-0">→</span>
                    <div>
                      <span className="text-bright-aqua font-semibold">Test your edge</span>
                      <span className="text-cloud-gray ml-2">plug into projects where difference is an asset.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-teal font-bold mr-4 flex-shrink-0">→</span>
                    <div>
                      <span className="text-bright-aqua font-semibold">Expand reach</span>
                      <span className="text-cloud-gray ml-2">co-author tools, decks, and explorations with real-world visibility.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center text-primary-teal text-2xl font-mono opacity-60 py-8">⸻</div>

        {/* What to Expect */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-soft-white mb-4 font-playfair">What to Expect</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: 'Shared table', desc: 'You\'re not a supplier; you\'re a co-architect.' },
                { title: 'Live explorations', desc: 'Immersive sessions that yield usable maps, scenarios, and strategies.' },
                { title: 'Ritualized collaboration', desc: 'Formats designed to surface divergence, not suppress it.' },
                { title: 'Long game', desc: 'Relationships that compound value across projects.' }
              ].map((item, i) => (
                <div key={i} className="bg-deep-charcoal/50 border-l-4 border-primary-teal rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-primary-teal mb-4">{item.title}</h3>
                  <p className="text-cloud-gray leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="text-center text-primary-teal text-2xl font-mono opacity-60 py-8">⸻</div>

        {/* Ways to Partner */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-soft-white mb-4 font-playfair">Ways to Partner</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: '🔬',
                  title: 'Exploration Projects',
                  desc: 'Co-run labs, pilots, or simulations that push the boundaries of strategic thinking.',
                  details: ['• Reality Labs', '• Future Simulations', '• Strategic Pilots']
                },
                {
                  icon: '🌐',
                  title: 'Ecosystem Alliances',
                  desc: 'Exchange knowledge, plug into the signal network, amplify collective intelligence.',
                  details: ['• Signal Network', '• Knowledge Exchange', '• Collaborative Research']
                },
                {
                  icon: '🧭',
                  title: 'Advisory Exchange',
                  desc: 'Bring us in, or contribute your lens to ours in a mutual advisory capacity.',
                  details: ['• Strategic Advisory', '• Lens Contribution', '• Cross-Pollination']
                },
                {
                  icon: '⚡',
                  title: 'Open Experiments',
                  desc: 'Join public prototypes and tool releases that shape the future of strategy.',
                  details: ['• Public Prototypes', '• Tool Co-Creation', '• Open Innovation']
                }
              ].map((way, i) => (
                <div key={i} className="bg-deep-charcoal border border-primary-teal/20 rounded-2xl p-8 text-center hover:transform hover:-translate-y-2 hover:border-primary-teal hover:shadow-xl hover:shadow-primary-teal/20 transition-all duration-400 cursor-pointer group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-5xl mb-6 relative z-10">{way.icon}</div>
                  <h3 className="text-2xl font-bold text-primary-teal mb-4 relative z-10">{way.title}</h3>
                  <p className="text-cloud-gray mb-8 leading-relaxed relative z-10">{way.desc}</p>
                  <div className="space-y-2 relative z-10">
                    {way.details.map((detail, j) => (
                      <div key={j} className="text-bright-aqua text-sm font-medium opacity-80 group-hover:opacity-100">{detail}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="text-center text-primary-teal text-2xl font-mono opacity-60 py-8">⸻</div>

        {/* Final CTA */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="bg-gradient-to-br from-primary-teal/10 to-deep-charcoal/80 border-2 border-primary-teal rounded-2xl p-16 text-center relative overflow-hidden">
              <h2 className="text-4xl font-bold text-soft-white mb-6 font-playfair">Ready to partner?</h2>
              <p className="text-xl text-cloud-gray mb-12 leading-relaxed">
                Whether you're leading a team or working independently, let's explore how we can build together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button
                  onClick={() => setShowContactDrawer(true)}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-deep-charcoal to-primary-teal text-soft-white font-semibold rounded-lg hover:from-primary-teal hover:to-bright-aqua hover:shadow-lg hover:shadow-primary-teal/25 transform hover:-translate-y-1 transition-all duration-300 text-lg"
                >
                  Start the Conversation
                </button>
                <button className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-warm-accent text-warm-accent font-semibold rounded-lg hover:bg-warm-accent hover:text-base-black transition-all duration-300 text-lg">
                  Join the Network
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Contact Drawer */}
      {showContactDrawer && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-base-black/80 backdrop-blur-sm">
          <div className="bg-deep-charcoal border border-primary-teal/30 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-soft-white font-playfair">Start the Conversation</h2>
                  <button
                    type="button"
                    onClick={() => setShowContactDrawer(false)}
                    className="text-cloud-gray hover:text-soft-white text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Identity Toggle */}
                <div className="mb-8">
                  <label className="block text-soft-white font-semibold mb-4">I'm reaching out as…</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, identity: 'organization' })}
                      className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                        formData.identity === 'organization'
                          ? 'border-bright-aqua bg-bright-aqua/10 text-bright-aqua'
                          : 'border-cloud-gray/30 text-cloud-gray hover:border-primary-teal'
                      }`}
                    >
                      A team/institution
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, identity: 'independent' })}
                      className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                        formData.identity === 'independent'
                          ? 'border-warm-accent bg-warm-accent/10 text-warm-accent'
                          : 'border-cloud-gray/30 text-cloud-gray hover:border-primary-teal'
                      }`}
                    >
                      An independent ally/consultant
                    </button>
                  </div>
                  {errors.identity && <p className="text-red-400 text-sm mt-2">{errors.identity}</p>}
                  <p className="text-cloud-gray/70 text-sm mt-2">Pick the lane that fits today. We can always switch later.</p>
                </div>

                {/* Shared Core Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-soft-white font-medium mb-2">Full name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full p-4 bg-charcoal-light border border-cloud-gray/30 rounded-lg text-gray-900 placeholder-cloud-gray/50 focus:border-primary-teal focus:outline-none"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-soft-white font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full p-4 bg-charcoal-light border border-cloud-gray/30 rounded-lg text-gray-900 placeholder-cloud-gray/50 focus:border-primary-teal focus:outline-none"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-soft-white font-medium mb-2">Where are you based?</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="City, Country"
                      className="w-full p-4 bg-charcoal-light border border-cloud-gray/30 rounded-lg text-gray-900 placeholder-cloud-gray/50 focus:border-primary-teal focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-soft-white font-medium mb-2">Preferred next step *</label>
                    <div className="space-y-3">
                      {['30-min exploration call', 'Asynchronous exchange (email)', 'Send materials first'].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="nextStep"
                            value={option}
                            checked={formData.nextStep === option}
                            onChange={(e) => setFormData({ ...formData, nextStep: e.target.value })}
                            className="mr-3 text-primary-teal"
                          />
                          <span className="text-cloud-gray">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Organization-specific fields */}
                {formData.identity === 'organization' && (
                  <div className="mt-8 space-y-6 border-t border-cloud-gray/20 pt-8">
                    <div>
                      <label className="block text-soft-white font-medium mb-2">Organization name *</label>
                      <input
                        type="text"
                        value={formData.orgName || ''}
                        onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                        className="w-full p-4 bg-charcoal-light border border-cloud-gray/30 rounded-lg text-gray-900 focus:border-primary-teal focus:outline-none"
                      />
                      {errors.orgName && <p className="text-red-400 text-sm mt-1">{errors.orgName}</p>}
                    </div>

                    <div>
                      <label className="block text-soft-white font-medium mb-2">Your role *</label>
                      <input
                        type="text"
                        value={formData.role || ''}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="Head of Strategy, Founder, Director, …"
                        className="w-full p-4 bg-charcoal-light border border-cloud-gray/30 rounded-lg text-gray-900 placeholder-cloud-gray/50 focus:border-primary-teal focus:outline-none"
                      />
                      {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
                    </div>

                    <div>
                      <label className="block text-soft-white font-medium mb-4">Which kind of partnership fits? (select all that apply)</label>
                      <div className="space-y-3">
                        {[
                          'Run an Exploration Lab / pilot',
                          'Foresight & narrative strategy mapping',
                          'Culture work (unlock polymaths / curiosity)',
                          'Advisory exchange (sparring with leadership)',
                          'Open experiment (public collaboration)'
                        ].map((option) => (
                          <label key={option} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.partnershipModes?.includes(option)}
                              onChange={() => handleCheckboxChange('partnershipModes', option)}
                              className="mr-3 text-primary-teal"
                            />
                            <span className="text-cloud-gray">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-soft-white font-medium mb-2">What's on your frontier? *</label>
                      <textarea
                        value={formData.frontier || ''}
                        onChange={(e) => setFormData({ ...formData, frontier: e.target.value })}
                        placeholder="A paragraph is perfect. Tell us the decision, risk, or opportunity that feels 'just out of frame.'"
                        rows={4}
                        className="w-full p-4 bg-charcoal-light border border-cloud-gray/30 rounded-lg text-gray-900 placeholder-cloud-gray/50 focus:border-primary-teal focus:outline-none resize-none"
                      />
                      {errors.frontier && <p className="text-red-400 text-sm mt-1">{errors.frontier}</p>}
                      <p className="text-cloud-gray/70 text-sm mt-2">If it makes you say "we can't quite name it yet," you're in the right place.</p>
                    </div>

                    <div>
                      <label className="block text-soft-white font-medium mb-2">Timeline *</label>
                      <div className="space-y-3">
                        {['ASAP (this month)', 'This quarter', 'Exploratory / undecided'].map((option) => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="timeline"
                              value={option}
                              checked={formData.timeline === option}
                              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                              className="mr-3 text-primary-teal"
                            />
                            <span className="text-cloud-gray">{option}</span>
                          </label>
                        ))}
                      </div>
                      {errors.timeline && <p className="text-red-400 text-sm mt-1">{errors.timeline}</p>}
                    </div>
                  </div>
                )}

                {/* Independent-specific fields */}
                {formData.identity === 'independent' && (
                  <div className="mt-8 space-y-6 border-t border-cloud-gray/20 pt-8">
                    <div>
                      <label className="block text-soft-white font-medium mb-2">Your practice / focus *</label>
                      <input
                        type="text"
                        value={formData.practice || ''}
                        onChange={(e) => setFormData({ ...formData, practice: e.target.value })}
                        placeholder="Foresight, systems, org design, narrative, …"
                        className="w-full p-4 bg-charcoal-light border border-cloud-gray/30 rounded-lg text-gray-900 placeholder-cloud-gray/50 focus:border-primary-teal focus:outline-none"
                      />
                      {errors.practice && <p className="text-red-400 text-sm mt-1">{errors.practice}</p>}
                    </div>

                    <div>
                      <label className="block text-soft-white font-medium mb-2">Your edge in one line *</label>
                      <input
                        type="text"
                        value={formData.edge || ''}
                        onChange={(e) => setFormData({ ...formData, edge: e.target.value })}
                        placeholder="Say the sharp, specific thing you bring."
                        className="w-full p-4 bg-charcoal-light border border-cloud-gray/30 rounded-lg text-gray-900 placeholder-cloud-gray/50 focus:border-primary-teal focus:outline-none"
                        maxLength={160}
                      />
                      {errors.edge && <p className="text-red-400 text-sm mt-1">{errors.edge}</p>}
                    </div>

                    <div>
                      <label className="block text-soft-white font-medium mb-4">Ways you'd like to collaborate (select all that apply)</label>
                      <div className="space-y-3">
                        {[
                          'Co-run an exploration lab',
                          'Contribute lens to live projects',
                          'Co-author maps / decks / tools',
                          'Open experiment (public)',
                          'Advisory exchange / sparring'
                        ].map((option) => (
                          <label key={option} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.collabModes?.includes(option)}
                              onChange={() => handleCheckboxChange('collabModes', option)}
                              className="mr-3 text-primary-teal"
                            />
                            <span className="text-cloud-gray">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-soft-white font-medium mb-2">Show us your texture *</label>
                      <textarea
                        value={formData.texture || ''}
                        onChange={(e) => setFormData({ ...formData, texture: e.target.value })}
                        placeholder="Two–five sentences. A recent project, a principle, or a pattern you're obsessed with."
                        rows={4}
                        className="w-full p-4 bg-charcoal-light border border-cloud-gray/30 rounded-lg text-gray-900 placeholder-cloud-gray/50 focus:border-primary-teal focus:outline-none resize-none"
                        maxLength={1200}
                      />
                      {errors.texture && <p className="text-red-400 text-sm mt-1">{errors.texture}</p>}
                      <p className="text-cloud-gray/70 text-sm mt-2">We prefer jagged edges to smooth bios.</p>
                    </div>

                    <div>
                      <label className="block text-soft-white font-medium mb-2">Availability *</label>
                      <div className="space-y-3">
                        {['Open now', 'Next 4–8 weeks', 'Case-by-case'].map((option) => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="availability"
                              value={option}
                              checked={formData.availability === option}
                              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                              className="mr-3 text-primary-teal"
                            />
                            <span className="text-cloud-gray">{option}</span>
                          </label>
                        ))}
                      </div>
                      {errors.availability && <p className="text-red-400 text-sm mt-1">{errors.availability}</p>}
                    </div>
                  </div>
                )}

                {/* Consent & Submit */}
                <div className="mt-8 pt-8 border-t border-cloud-gray/20">
                  <label className="flex items-start mb-6">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mr-3 mt-1 text-primary-teal"
                    />
                    <span className="text-cloud-gray text-sm">
                      I agree to be contacted about this inquiry. We use your info only to respond and coordinate next steps. No spam. No resale. EU-friendly handling.
                    </span>
                  </label>
                  {errors.consent && <p className="text-red-400 text-sm mb-4">{errors.consent}</p>}

                  {errors.submit && <p className="text-red-400 mb-4">{errors.submit}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-deep-charcoal to-primary-teal text-soft-white font-semibold rounded-lg hover:from-primary-teal hover:to-bright-aqua disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isSubmitting ? 'Mapping your thread of interest…' : 'Send & Map Next Step'}
                  </button>
                  
                  {/* Reassurance Items */}
                  <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-cloud-gray/70">
                    <div className="flex items-center gap-2">
                      <span className="text-primary-teal">🛡️</span>
                      <span>No spam</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary-teal">🚫</span>
                      <span>No resale</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary-teal">🇪🇺</span>
                      <span>EU-friendly handling</span>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary-teal rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-soft-white">✓</span>
                  </div>
                  <h2 className="text-3xl font-bold text-soft-white mb-4">Got it — we'll reply within 2 working days.</h2>
                  <p className="text-cloud-gray mb-8">
                    {formData.identity === 'organization'
                      ? "We'll propose a short, focused first step based on what you shared."
                      : "We'll review your work and suggest where it intersects with active explorations."
                    }
                  </p>
                  
                  <div className="space-y-4">
                    <button className="block w-full py-3 bg-transparent border-2 border-primary-teal text-primary-teal font-semibold rounded-lg hover:bg-primary-teal hover:text-base-black transition-all duration-300">
                      Grab a 30-min slot
                    </button>
                    <a
                      href="mailto:hello@zokratiq.com?subject=Supporting docs from partner inquiry"
                      className="block w-full py-3 bg-transparent border-2 border-cloud-gray/30 text-cloud-gray font-semibold rounded-lg hover:border-primary-teal hover:text-primary-teal transition-all duration-300"
                    >
                      Send supporting docs
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => setShowContactDrawer(false)}
                  className="text-cloud-gray hover:text-soft-white"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}