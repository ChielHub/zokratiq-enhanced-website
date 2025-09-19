'use client'

import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'  
import Outcomes from '../components/Outcomes'
import CTA_Band from '../components/CTA_Band'
import Footer from '../components/Footer'

// Import design tokens
import '../styles/tokens.css'

export default function HomePage() {
  // Hero props (contract-compliant)
  const heroProps = {
    headline: "Business Meets Magic when you hire free‑range thinkers.",
    subtitle: "We turn curiosity into operating leverage—designing Playful Businesses where exploration fuels strategy, product, and culture.",
    primaryCTA: "Run a Free Reality Scan",
    secondaryCTA: "See How We Work"
  }

  // HowItWorks props (contract-compliant)  
  const howItWorksProps = {
    steps: [
      {
        num: 1,
        title: "Reality Lenses",
        desc: "Distill noise into navigable maps. See what dashboards miss."
      },
      {
        num: 2, 
        title: "Alternate‑Reality Labs",
        desc: "Rehearse the future. Make fewer 'surprises,' more prepared luck."
      },
      {
        num: 3,
        title: "Free‑Range Culture Kit", 
        desc: "Rituals and constraints that let polymaths ship."
      }
    ]
  }

  // Outcomes props (contract-compliant)
  const outcomesProps = {
    bullets: [
      {
        text: "Inject right-brain imagination into left-brain systems",
        metric: "3x faster adaptation to market shifts"
      },
      {
        text: "Run red-team rituals to break invisible groupthink", 
        metric: "85% reduction in blind spots"
      },
      {
        text: "Offer story-rich thoughtware for narrative-dominant markets",
        metric: "40% increase in customer resonance"
      },
      {
        text: "Build structures that reward perception over performance",
        metric: "2x improvement in team innovation velocity"
      }
    ]
  }

  // CTA_Band props (contract-compliant)
  const ctaBandProps = {
    title: "See your market through the Zokratiq Lens in 5 minutes.",
    primaryCTA: "Run a Free Reality Scan"
  }

  // Footer props (contract-compliant)
  const footerProps = {
    cols: [
      {
        title: "Navigation",
        links: [
          { text: "About", href: "/about" },
          { text: "Labs", href: "/labs" },
          { text: "Work Is Weird", href: "/work-is-weird" },
          { text: "Contact", href: "/contact" }
        ]
      }
    ],
    smallprint: "© 2024 Zokratiq. All rights reserved. Built for the perceptive."
  }

  return (
    <main className="min-h-screen">
      {/* @@BEGIN:HomePage */}
      
      <Hero {...heroProps} />
      
      <HowItWorks {...howItWorksProps} />
      
      <Outcomes {...outcomesProps} />
      
      <CTA_Band {...ctaBandProps} />
      
      <Footer {...footerProps} />
      
      {/* @@END:HomePage */}
    </main>
  )
}