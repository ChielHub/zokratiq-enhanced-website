'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import DownloadCard from '@/components/misfits-os/DownloadCard'
import NextSteps from '@/components/misfits-os/NextSteps'
// import SocialShare from '@/components/misfits-os/SocialShare'

export default function ThanksPage() {
  const [downloadStarted, setDownloadStarted] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Get email from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search)
    const emailParam = urlParams.get('email') || localStorage.getItem('misfits-os-email') || ''
    setEmail(emailParam)

    // Auto-start download after 2 seconds
    const downloadTimer = setTimeout(() => {
      triggerDownload()
    }, 2000)

    // Track page view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Misfits OS Thank You',
        page_location: window.location.href,
        event_category: 'conversion'
      })
    }

    return () => clearTimeout(downloadTimer)
  }, [])

  const triggerDownload = () => {
    setDownloadStarted(true)

    // Track download event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'blueprint_download', {
        event_category: 'engagement',
        event_label: 'misfits_os_blueprint',
        method: 'auto'
      })
    }

    // Create and trigger download
    const link = document.createElement('a')
    link.href = '/assets/misfits-os-blueprint.pdf' // This would be the actual PDF
    link.download = 'misfits-os-blueprint.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <main className="min-h-screen bg-base-black text-soft-white pt-20">
      {/* Success Header */}
      <section className="py-16 bg-gradient-to-b from-weird-purple/20 to-base-black">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-r from-weird-purple to-primary-teal rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-soft-white mb-6">
              Your Misfits OS Blueprint is on the way!
            </h1>

            <div className="bg-deep-charcoal/50 border border-weird-purple/20 rounded-xl p-8 mb-8">
              <p className="text-xl text-cloud-gray mb-6 leading-relaxed">
                Perfect! We've sent your complete Misfits OS Blueprint to{' '}
                <span className="text-weird-purple font-semibold">{email || 'your email'}</span>.
              </p>

              <div className="text-sm text-cloud-gray/80 space-y-2">
                <p>✓ The email should arrive within 2 minutes</p>
                <p>✓ If you don't see it, check your spam folder</p>
                <p>✓ Add hello@zokratiq.com to your safe sender list</p>
              </div>
            </div>

            {/* What's Included Preview */}
            <div className="bg-base-black/30 border border-primary-teal/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-primary-teal mb-4">Your Blueprint Includes:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-cloud-gray">
                <div className="space-y-2">
                  <p>📋 Complete 18-page Misfits OS Framework</p>
                  <p>🎯 Cognitive Sameness Diagnostic (automated scoring)</p>
                </div>
                <div className="space-y-2">
                  <p>💬 Weird Talent Interview Vault (47 questions)</p>
                  <p>⚡ Integration Playbook (90-day templates)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Download Card */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <DownloadCard
            downloadStarted={downloadStarted}
            onDownload={triggerDownload}
          />
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16 bg-deep-charcoal">
        <div className="container mx-auto px-6 lg:px-8">
          <NextSteps />
        </div>
      </section>

      {/* Social Sharing */}
      {/* <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <SocialShare />
        </div>
      </section> */}

      {/* Fast Track CTA */}
      <section className="py-24 bg-gradient-to-r from-weird-purple/20 to-primary-teal/20">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-6">
              Want to Fast-Track Your Implementation?
            </h2>
            <p className="text-xl text-cloud-gray mb-8 leading-relaxed">
              Book a free 15-minute Cognitive Diversity Strategy Session to get a custom diagnostic of your cognitive sameness blind spots and create a 90-day implementation roadmap.
            </p>

            <div className="space-y-4">
              <a
                href="#book-strategy-session"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-weird-purple to-primary-teal text-white font-semibold text-lg rounded-xl hover:shadow-lg hover:shadow-weird-purple/25 transform hover:-translate-y-0.5 transition-all duration-300 group"
              >
                Book Your Strategy Session
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="ml-2 transition-transform group-hover:translate-x-1"
                >
                  <path d="M4 10h12m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <p className="text-sm text-cloud-gray/80">
                Free • No sales pressure • Custom insights for your organization
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}