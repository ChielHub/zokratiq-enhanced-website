'use client'

import { useState } from 'react'
import Hero from '@/components/misfits-os/Hero'
import ProofStrip from '@/components/misfits-os/ProofStrip'
import ProblemAgitation from '@/components/misfits-os/ProblemAgitation'
import SolutionPreview from '@/components/misfits-os/SolutionPreview'
import ValueStack from '@/components/misfits-os/ValueStack'
import LeadForm from '@/components/misfits-os/LeadForm'
import CaseStudyTeaser from '@/components/misfits-os/CaseStudyTeaser'
import FAQ from '@/components/misfits-os/FAQ'
import InteractiveBackground from '@/components/misfits-os/InteractiveBackground'

export default function MisfitsOSLanding() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  return (
    <main className="min-h-screen bg-base-black text-soft-white relative overflow-hidden">
      <InteractiveBackground />

      {/* Hero Section */}
      <Hero />

      {/* Social Proof Strip */}
      <ProofStrip />

      {/* Problem Agitation */}
      <ProblemAgitation />

      {/* Solution Preview */}
      <SolutionPreview />

      {/* Value Stack & Lead Form */}
      <section className="py-24 bg-gradient-to-b from-deep-charcoal to-base-black relative z-10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto items-center">
            <ValueStack />
            <LeadForm onSubmit={setFormSubmitted} />
          </div>
        </div>
      </section>

      {/* Case Study Teaser */}
      <CaseStudyTeaser />

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-weird-purple/20 to-primary-teal/20 relative z-10">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-6">
              Ready to Transform Cognitive Sameness into Competitive Advantage?
            </h2>
            <p className="text-xl text-cloud-gray mb-8 leading-relaxed">
              Get your complete Misfits OS Blueprint and start building the cognitive diversity your future depends on.
            </p>
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-weird-purple to-primary-teal text-white font-semibold text-lg rounded-xl hover:shadow-lg hover:shadow-weird-purple/25 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Download Your Misfits OS Blueprint
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}