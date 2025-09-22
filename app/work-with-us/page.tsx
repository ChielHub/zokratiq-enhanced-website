'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ContactFormData {
  identity: 'organization' | 'independent' | ''
  name: string
  email: string
  company: string
  role: string
  urgency: string
  problem: string
  sameness: string
  careers: string
  consent: boolean
}

export default function WorkWithUsPage() {
  const [showContactModal, setShowContactModal] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    identity: '',
    name: '',
    email: '',
    company: '',
    role: '',
    urgency: '',
    problem: '',
    sameness: '',
    careers: '',
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const selectIdentity = (identity: 'organization' | 'independent') => {
    setFormData({ ...formData, identity })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'work-with-us',
          type: 'partnership-inquiry'
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          identity: '',
          name: '',
          email: '',
          company: '',
          role: '',
          urgency: '',
          problem: '',
          sameness: '',
          careers: '',
          consent: false
        })
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => {
    setShowContactModal(false)
    setIsSubmitted(false)
  }

  return (
    <div className="min-h-screen bg-base-black text-soft-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Network Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-base-black via-deep-charcoal/30 to-primary-teal/10"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            {/* Urgency Badge */}
            <motion.div
              className="inline-block bg-gradient-to-r from-heritage-red to-red-400 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔥 LIMITED PARTNERSHIP SPOTS • Q4 2024
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-playfair">
              Upgrade Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-teal to-bright-aqua">
                Reality Headset
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-bright-aqua mb-8 font-semibold max-w-4xl mx-auto">
              Join visionary teams who see around corners, activate hidden talent, and move faster with reality exploration.
            </p>

            <p className="text-lg md:text-xl text-cloud-gray leading-relaxed mb-12 max-w-3xl mx-auto">
              We don't provide consulting. We co-design exploration. Because the future belongs to organizations brave enough to question their assumptions.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => setShowContactModal(true)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-teal to-bright-aqua text-base-black font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-primary-teal/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                Book Reality Alignment Session →
              </button>

              <div className="text-sm text-cloud-gray/80 font-mono">
                ⚡ Response within 24 hours
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Clarity Crisis Section */}
      <section className="py-24 bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-soft-white mb-8 font-playfair">
              The Clarity Crisis
            </h2>
            <p className="text-xl text-cloud-gray leading-relaxed">
              Most organizations operate with outdated reality headsets—seeing the world through 2019 lenses in a post-everything world.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-base-black/50 border border-heritage-red/30 rounded-xl p-8 text-center"
            >
              <div className="text-4xl mb-6">🔥</div>
              <h3 className="text-xl font-bold text-heritage-red mb-4">The Problem</h3>
              <p className="text-cloud-gray leading-relaxed">
                Decision paralysis, groupthink, and cognitive sameness are killing competitive advantage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-base-black/50 border border-warm-accent/30 rounded-xl p-8 text-center"
            >
              <div className="text-4xl mb-6">⚡</div>
              <h3 className="text-xl font-bold text-warm-accent mb-4">The Cost</h3>
              <p className="text-cloud-gray leading-relaxed">
                Missed opportunities, stale strategies, and talent that can't breathe in conventional structures.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-base-black/50 border border-primary-teal/30 rounded-xl p-8 text-center"
            >
              <div className="text-4xl mb-6">🎯</div>
              <h3 className="text-xl font-bold text-primary-teal mb-4">The Solution</h3>
              <p className="text-cloud-gray leading-relaxed">
                Reality exploration that upgrades your organizational perception and unlocks breakthrough strategy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Partner Section */}
      <section className="py-24 bg-deep-charcoal">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-soft-white mb-8 font-playfair">
              How We Partner
            </h2>
            <p className="text-xl text-cloud-gray leading-relaxed">
              We don't do traditional consulting. We co-design explorations that upgrade your reality headset.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="border-l-4 border-primary-teal pl-6">
                <h3 className="text-2xl font-bold text-primary-teal mb-4">Reality Audits</h3>
                <p className="text-cloud-gray leading-relaxed">
                  Map your cognitive blind spots, sameness patterns, and perception gaps that limit strategic options.
                </p>
              </div>

              <div className="border-l-4 border-bright-aqua pl-6">
                <h3 className="text-2xl font-bold text-bright-aqua mb-4">Exploration Design</h3>
                <p className="text-cloud-gray leading-relaxed">
                  Co-create custom investigation protocols that expand your organization's reality headset.
                </p>
              </div>

              <div className="border-l-4 border-weird-purple pl-6">
                <h3 className="text-2xl font-bold text-weird-purple mb-4">Strategy Activation</h3>
                <p className="text-cloud-gray leading-relaxed">
                  Transform insights into operational leverage with implementation frameworks built for your context.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-teal/10 to-bright-aqua/5 border border-primary-teal/30 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-soft-white mb-6">What Makes Us Different</h3>
              <ul className="space-y-4 text-cloud-gray">
                <li className="flex items-start">
                  <span className="text-primary-teal font-bold mr-3">✓</span>
                  No pre-built frameworks—every exploration is custom-designed
                </li>
                <li className="flex items-start">
                  <span className="text-primary-teal font-bold mr-3">✓</span>
                  Philosophy meets strategy in every engagement
                </li>
                <li className="flex items-start">
                  <span className="text-primary-teal font-bold mr-3">✓</span>
                  Built for organizations ready to question everything
                </li>
                <li className="flex items-start">
                  <span className="text-primary-teal font-bold mr-3">✓</span>
                  Reality exploration, not reality confirmation
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="py-16 bg-base-black border-y border-primary-teal/20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-primary-teal mb-2">127</div>
              <div className="text-sm text-cloud-gray font-mono">Strategic explorations delivered</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-bright-aqua mb-2">89%</div>
              <div className="text-sm text-cloud-gray font-mono">Report breakthrough insights</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-weird-purple mb-2">73%</div>
              <div className="text-sm text-cloud-gray font-mono">Faster decision velocity</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-warm-accent mb-2">156</div>
              <div className="text-sm text-cloud-gray font-mono">Hidden talents activated</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Qualification Criteria */}
      <section className="py-24 bg-charcoal-light">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-soft-white mb-8 font-playfair">
              Partnership Criteria
            </h2>
            <p className="text-xl text-cloud-gray leading-relaxed">
              We work with organizations ready to upgrade their reality headset. Not everyone qualifies.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-teal/10 to-bright-aqua/5 border border-primary-teal/30 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-primary-teal mb-6">✓ Perfect Fit If You:</h3>
              <ul className="space-y-4 text-cloud-gray">
                <li className="flex items-start">
                  <span className="text-primary-teal font-bold mr-3">•</span>
                  Question conventional wisdom as a competitive advantage
                </li>
                <li className="flex items-start">
                  <span className="text-primary-teal font-bold mr-3">•</span>
                  Need breakthrough strategy, not incremental improvements
                </li>
                <li className="flex items-start">
                  <span className="text-primary-teal font-bold mr-3">•</span>
                  Value exploration over execution (we handle both)
                </li>
                <li className="flex items-start">
                  <span className="text-primary-teal font-bold mr-3">•</span>
                  Ready to upgrade your organizational reality headset
                </li>
                <li className="flex items-start">
                  <span className="text-primary-teal font-bold mr-3">•</span>
                  Understand that sameness is the biggest business risk
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-heritage-red/10 to-red-400/5 border border-heritage-red/30 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-heritage-red mb-6">✗ Not Right If You:</h3>
              <ul className="space-y-4 text-cloud-gray">
                <li className="flex items-start">
                  <span className="text-heritage-red font-bold mr-3">•</span>
                  Want confirmation of existing strategies
                </li>
                <li className="flex items-start">
                  <span className="text-heritage-red font-bold mr-3">•</span>
                  Need traditional consulting or implementation-only work
                </li>
                <li className="flex items-start">
                  <span className="text-heritage-red font-bold mr-3">•</span>
                  Prefer safe, conventional approaches to growth
                </li>
                <li className="flex items-start">
                  <span className="text-heritage-red font-bold mr-3">•</span>
                  Don't have budget for strategic exploration
                </li>
                <li className="flex items-start">
                  <span className="text-heritage-red font-bold mr-3">•</span>
                  Can't handle intellectual discomfort or paradigm shifts
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Risk Reversal & Guarantees */}
      <section className="py-24 bg-deep-charcoal">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-soft-white mb-12 font-playfair">
              Risk Reversal Guarantee
            </h2>

            <div className="bg-gradient-to-br from-primary-teal/10 to-bright-aqua/5 border-2 border-primary-teal/30 rounded-xl p-12 mb-12">
              <div className="text-6xl mb-6">🛡️</div>
              <h3 className="text-2xl font-bold text-primary-teal mb-6">The Reality Headset Promise</h3>
              <p className="text-lg text-cloud-gray leading-relaxed mb-8">
                If our exploration doesn't upgrade your reality headset with at least 3 breakthrough insights
                within 30 days, we'll refund 100% of your investment. No questions asked.
              </p>
              <div className="text-primary-teal font-bold text-xl">
                Zero Risk • Maximum Upside • Full Transparency
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h4 className="text-lg font-bold text-soft-white mb-2">Fast Results</h4>
                <p className="text-cloud-gray text-sm">Breakthrough insights within 30 days or full refund</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h4 className="text-lg font-bold text-soft-white mb-2">Guaranteed Outcomes</h4>
                <p className="text-cloud-gray text-sm">Minimum 3 actionable strategic insights or we pay you back</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h4 className="text-lg font-bold text-soft-white mb-2">Partnership Commitment</h4>
                <p className="text-cloud-gray text-sm">We succeed only when you upgrade your reality headset</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-base-black to-deep-charcoal">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-8">
              <span className="inline-block bg-gradient-to-r from-heritage-red to-red-400 text-white px-6 py-3 rounded-full text-sm font-semibold">
                ⏰ LIMITED Q4 SPOTS REMAINING
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-soft-white mb-8 font-playfair">
              Ready to Upgrade Your Reality Headset?
            </h2>

            <p className="text-xl text-cloud-gray leading-relaxed mb-12">
              Join the organizations who refuse to see the world through yesterday's lenses.
            </p>

            <button
              onClick={() => setShowContactModal(true)}
              className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-primary-teal to-bright-aqua text-base-black font-bold text-xl rounded-xl hover:shadow-lg hover:shadow-primary-teal/25 transition-all duration-300 transform hover:-translate-y-2 mb-8"
            >
              Book Reality Alignment Session →
            </button>

            <div className="flex justify-center gap-8 flex-wrap text-sm text-cloud-gray/80 font-mono">
              <span>✓ No-risk consultation</span>
              <span>•</span>
              <span>✓ 24-hour response</span>
              <span>•</span>
              <span>✓ Reality headset audit included</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-deep-charcoal border border-primary-teal/30 rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            {!isSubmitted ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-soft-white">Reality Alignment Session</h3>
                  <button
                    onClick={closeModal}
                    className="text-cloud-gray hover:text-soft-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Identity Selection */}
                  <div>
                    <label className="block text-soft-white font-semibold mb-4">I'm reaching out as…</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => selectIdentity('organization')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.identity === 'organization'
                            ? 'border-primary-teal bg-primary-teal/10 text-primary-teal'
                            : 'border-cloud-gray/30 text-cloud-gray hover:border-primary-teal/50'
                        }`}
                      >
                        🏢 A team/institution
                      </button>
                      <button
                        type="button"
                        onClick={() => selectIdentity('independent')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.identity === 'independent'
                            ? 'border-primary-teal bg-primary-teal/10 text-primary-teal'
                            : 'border-cloud-gray/30 text-cloud-gray hover:border-primary-teal/50'
                        }`}
                      >
                        🚀 An independent ally/consultant
                      </button>
                    </div>
                  </div>

                  {/* Basic Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-soft-white font-semibold mb-2">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 bg-base-black border border-cloud-gray/30 rounded-lg text-soft-white focus:border-primary-teal focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-soft-white font-semibold mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 bg-base-black border border-cloud-gray/30 rounded-lg text-soft-white focus:border-primary-teal focus:outline-none"
                      />
                    </div>
                  </div>

                  {formData.identity === 'organization' && (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-soft-white font-semibold mb-2">Company/Organization *</label>
                          <input
                            type="text"
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full p-3 bg-base-black border border-cloud-gray/30 rounded-lg text-soft-white focus:border-primary-teal focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-soft-white font-semibold mb-2">Your Role *</label>
                          <input
                            type="text"
                            required
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full p-3 bg-base-black border border-cloud-gray/30 rounded-lg text-soft-white focus:border-primary-teal focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-soft-white font-semibold mb-2">What problem should reality exploration solve here? *</label>
                        <textarea
                          required
                          rows={3}
                          value={formData.problem}
                          onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                          className="w-full p-3 bg-base-black border border-cloud-gray/30 rounded-lg text-soft-white focus:border-primary-teal focus:outline-none"
                          placeholder="Short answer..."
                        />
                      </div>

                      <div>
                        <label className="block text-soft-white font-semibold mb-2">Where is sameness hurting you most? *</label>
                        <select
                          required
                          value={formData.sameness}
                          onChange={(e) => setFormData({ ...formData, sameness: e.target.value })}
                          className="w-full p-3 bg-base-black border border-cloud-gray/30 rounded-lg text-soft-white focus:border-primary-teal focus:outline-none"
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
                        <label className="block text-soft-white font-semibold mb-2">Urgency *</label>
                        <select
                          required
                          value={formData.urgency}
                          onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                          className="w-full p-3 bg-base-black border border-cloud-gray/30 rounded-lg text-soft-white focus:border-primary-teal focus:outline-none"
                        >
                          <option value="">Select...</option>
                          <option value="this-quarter">This quarter</option>
                          <option value="this-month">This month</option>
                          <option value="yesterday">Yesterday</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-soft-white font-semibold mb-2">Optional: Link to your careers or "About" page</label>
                        <input
                          type="url"
                          value={formData.careers}
                          onChange={(e) => setFormData({ ...formData, careers: e.target.value })}
                          className="w-full p-3 bg-base-black border border-cloud-gray/30 rounded-lg text-soft-white focus:border-primary-teal focus:outline-none"
                          placeholder="https://"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1"
                    />
                    <label htmlFor="consent" className="text-sm text-cloud-gray">
                      I consent to being contacted about reality exploration partnerships. We don't share your info or pitch without context.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.consent}
                    className="w-full py-4 bg-gradient-to-r from-primary-teal to-bright-aqua text-base-black font-bold text-lg rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Book Reality Alignment Session →'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-6">🎉</div>
                <h3 className="text-2xl font-bold text-soft-white mb-4">Reality Alignment Booked!</h3>
                <p className="text-cloud-gray mb-6">
                  We'll be in touch within 24 hours to schedule your reality headset upgrade session.
                </p>
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-primary-teal text-base-black font-semibold rounded-lg hover:bg-bright-aqua transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}