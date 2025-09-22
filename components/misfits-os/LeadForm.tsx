'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'

interface LeadFormProps {
  onSubmit: (submitted: boolean) => void
}

export default function LeadForm({ onSubmit }: LeadFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    role: '',
    challenge: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const roleOptions = [
    { value: '', label: 'Select your role' },
    { value: 'founder-ceo', label: 'Founder/CEO' },
    { value: 'vp-people', label: 'VP/Director of People/HR' },
    { value: 'vp-product', label: 'VP/Director of Product' },
    { value: 'vp-strategy', label: 'VP/Director of Strategy' },
    { value: 'innovation-lead', label: 'Innovation/R&D Leader' },
    { value: 'other', label: 'Other' }
  ]

  const challengeOptions = [
    { value: '', label: 'Select biggest challenge (optional)' },
    { value: 'finding-innovators', label: 'Finding truly innovative thinkers' },
    { value: 'cultural-sameness', label: 'Breaking out of cultural sameness' },
    { value: 'integrating-misfits', label: 'Integrating unconventional talent' },
    { value: 'justifying-risky-hires', label: 'Justifying "risky" hires to leadership' },
    { value: 'onboarding-success', label: 'Onboarding misfits successfully' },
    { value: 'other', label: 'Other' }
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'We need your email to send the Blueprint'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.company) {
      newErrors.company = 'Company name helps us customize your content'
    }

    if (!formData.role) {
      newErrors.role = 'Please select your role'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Submit to form handler
      const response = await fetch('/api/misfits-os-form.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Form submission failed')
      }

      // Track conversion event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_complete', {
          event_category: 'engagement',
          event_label: 'misfits_os_blueprint',
          lead_source: 'misfits-os',
          company: formData.company,
          role: formData.role,
          challenge: formData.challenge,
          lead_score: result.lead_score
        })
      }

      // Store email in localStorage for thank you page
      localStorage.setItem('misfits-os-email', formData.email)

      // Redirect to thank you page
      window.location.href = result.redirect_url || `/misfits-os-for-business/thanks?email=${encodeURIComponent(formData.email)}`

    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({ general: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="max-w-lg mx-auto lg:mx-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        id="lead-form"
      >
        <div className="bg-deep-charcoal/50 border-2 border-weird-purple/20 rounded-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-weird-purple mb-2">
              Download Your Blueprint
            </h3>
            <p className="text-cloud-gray text-sm">
              Get instant access to the complete Misfits OS framework
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-soft-white font-semibold mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Where should we send your Blueprint?"
                className={`w-full p-4 border rounded-lg bg-base-black text-white placeholder-cloud-gray/50 focus:outline-none transition-colors ${
                  errors.email
                    ? 'border-heritage-red focus:border-heritage-red'
                    : 'border-cloud-gray/30 focus:border-weird-purple'
                }`}
                required
              />
              {errors.email && (
                <p className="text-heritage-red text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Company Field */}
            <div>
              <label htmlFor="company" className="block text-soft-white font-semibold mb-2">
                Company *
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Help us customize your recommendations"
                className={`w-full p-4 border rounded-lg bg-base-black text-white placeholder-cloud-gray/50 focus:outline-none transition-colors ${
                  errors.company
                    ? 'border-heritage-red focus:border-heritage-red'
                    : 'border-cloud-gray/30 focus:border-weird-purple'
                }`}
                required
              />
              {errors.company && (
                <p className="text-heritage-red text-sm mt-1">{errors.company}</p>
              )}
            </div>

            {/* Role Field */}
            <div>
              <label htmlFor="role" className="block text-soft-white font-semibold mb-2">
                Your Role *
              </label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className={`w-full p-4 border rounded-lg bg-base-black text-white focus:outline-none transition-colors appearance-none ${
                  errors.role
                    ? 'border-heritage-red focus:border-heritage-red'
                    : 'border-cloud-gray/30 focus:border-weird-purple'
                }`}
                required
              >
                {roleOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-heritage-red text-sm mt-1">{errors.role}</p>
              )}
            </div>

            {/* Challenge Field */}
            <div>
              <label htmlFor="challenge" className="block text-soft-white font-semibold mb-2">
                Biggest Hiring Challenge
              </label>
              <select
                id="challenge"
                value={formData.challenge}
                onChange={(e) => handleInputChange('challenge', e.target.value)}
                className="w-full p-4 border border-cloud-gray/30 rounded-lg bg-base-black text-white focus:border-weird-purple focus:outline-none transition-colors appearance-none"
              >
                {challengeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-weird-purple to-primary-teal text-white font-semibold text-lg rounded-xl hover:shadow-lg hover:shadow-weird-purple/25 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Sending Blueprint...
                </div>
              ) : (
                'Download Your Misfits OS Blueprint'
              )}
            </button>

            {/* Error Message */}
            {errors.general && (
              <p className="text-heritage-red text-sm text-center">{errors.general}</p>
            )}

            {/* Privacy Notice */}
            <p className="text-xs text-cloud-gray/60 text-center leading-relaxed">
              We never spam or share your information. Unsubscribe anytime.
              <br />
              By downloading, you agree to receive emails about cognitive diversity and talent strategy.
            </p>
          </form>
        </div>

        {/* Additional Trust Signals */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-6 text-xs text-cloud-gray/60">
            <div className="flex items-center">
              <span className="text-primary-teal mr-1">🔒</span>
              Secure & Private
            </div>
            <div className="flex items-center">
              <span className="text-primary-teal mr-1">⚡</span>
              Instant Download
            </div>
            <div className="flex items-center">
              <span className="text-primary-teal mr-1">📧</span>
              No Spam
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}