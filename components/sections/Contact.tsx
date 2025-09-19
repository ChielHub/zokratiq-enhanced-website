'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const challenges = [
  'Navigating Uncertainty',
  'Breaking Groupthink', 
  'Unlocking Innovation',
  'Rethinking Work',
  'Strategic Thinking',
  'Building Culture',
  'Future Planning'
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    challenge: '',
    industry: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setStatusMessage('')
    
    try {
      const response = await fetch('/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          company: '',
          challenge: '',
          industry: '',
          message: ''
        })
        setSubmitStatus('success')
        setStatusMessage(result.message || 'Message sent successfully! We\'ll get back to you soon.')
      } else {
        setSubmitStatus('error')
        setStatusMessage(result.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setStatusMessage('Failed to send message. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-gradient-to-br from-deep-charcoal to-base-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-teal via-transparent to-bright-aqua" />
        <div className="grain-overlay opacity-50" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-soft-white mb-6 leading-tight">
              Ready to Explore Reality Together?
            </h2>
            <p className="text-xl text-cloud-gray leading-relaxed max-w-2xl mx-auto">
              Drop us a line. Tell us about your challenge, your curiosity, or that nagging sense that there's more to see.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Name and Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-soft-white text-sm font-medium mb-3">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-deep-charcoal/50 border border-gray-700 rounded-lg text-soft-white placeholder-cloud-gray/50 focus:border-primary-teal focus:outline-none focus:ring-2 focus:ring-primary-teal/20 transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-soft-white text-sm font-medium mb-3">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-deep-charcoal/50 border border-gray-700 rounded-lg text-soft-white placeholder-cloud-gray/50 focus:border-primary-teal focus:outline-none focus:ring-2 focus:ring-primary-teal/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-soft-white text-sm font-medium mb-3">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-deep-charcoal/50 border border-gray-700 rounded-lg text-soft-white placeholder-cloud-gray/50 focus:border-primary-teal focus:outline-none focus:ring-2 focus:ring-primary-teal/20 transition-all duration-200"
              />
            </div>

            {/* Primary Challenge and Industry Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="challenge" className="block text-soft-white text-sm font-medium mb-3">
                  Primary Challenge
                </label>
                <select
                  id="challenge"
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-deep-charcoal/50 border border-gray-700 rounded-lg text-soft-white focus:border-primary-teal focus:outline-none focus:ring-2 focus:ring-primary-teal/20 transition-all duration-200 appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1rem'
                  }}
                >
                  <option value="">Select a challenge</option>
                  {challenges.map((challenge) => (
                    <option key={challenge} value={challenge}>
                      {challenge}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="industry" className="block text-soft-white text-sm font-medium mb-3">
                  Industry
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  placeholder="e.g., Tech, Finance, Healthcare"
                  className="w-full px-4 py-3 bg-deep-charcoal/50 border border-gray-700 rounded-lg text-soft-white placeholder-cloud-gray/50 focus:border-primary-teal focus:outline-none focus:ring-2 focus:ring-primary-teal/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-soft-white text-sm font-medium mb-3">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your challenge, your curiosity, or what's got you thinking..."
                className="w-full px-4 py-3 bg-deep-charcoal/50 border border-gray-700 rounded-lg text-soft-white placeholder-cloud-gray/50 focus:border-primary-teal focus:outline-none focus:ring-2 focus:ring-primary-teal/20 transition-all duration-200 resize-vertical"
              />
            </div>

            {/* Status Message */}
            {submitStatus !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border text-center ${
                  submitStatus === 'success' 
                    ? 'bg-primary-teal/10 border-primary-teal/30 text-primary-teal' 
                    : 'bg-heritage-red/10 border-heritage-red/30 text-heritage-red'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  {submitStatus === 'success' ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="font-medium">{statusMessage}</span>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="text-center pt-6">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center font-semibold transition-all duration-200 bg-primary-teal text-white hover:bg-bright-aqua hover:shadow-lg hover:shadow-primary-teal/25 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 text-lg rounded-xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="ml-2 transition-transform group-hover:translate-x-1">
                      <path d="M4 10h12m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}