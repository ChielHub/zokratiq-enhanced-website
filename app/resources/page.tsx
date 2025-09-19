'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Footer } from '@/components/sections/Footer'

// Resource interface
interface Resource {
  id: number
  title: string
  description: string
  type: string
  challenge: string
  typeLabel: string
  challengeLabel: string
  link: string
  comingSoon?: boolean
}

// Resource data based on zokratiq-duplicate content
const resources: Resource[] = [
  {
    id: 1,
    title: "🧭 Decision Partner - AI Thought Algorithms",
    description: "Interactive AI tool that iteratively breaks down complex decisions using Zokratiq's Top 12 Algorithms of Thought. Run strategic moves through bias radar, pre-mortems, and daimonic advisors.",
    type: "tools",
    challenge: "strategy",
    typeLabel: "AI Tool",
    challengeLabel: "Strategic Decision Making",
    link: "/decision-partner"
  },
  {
    id: 2,
    title: "The Grail Offering Canvas",
    description: "A canvas to help teams surface their hidden beliefs and test what they're really optimizing for.",
    type: "tools",
    challenge: "innovation",
    typeLabel: "Tool & Framework",
    challengeLabel: "Unlocking Innovation",
    link: "/resources/grail-offering-canvas"
  },
  {
    id: 3,
    title: "📖 Reality Explorers Guide",
    description: "A provocative field guide for future-minded misfits and strategic outliers. Unlock hidden truths about your industry with this free PDF download.",
    type: "canvases",
    challenge: "uncertainty",
    typeLabel: "Guide & Download",
    challengeLabel: "Navigating Uncertainty",
    link: "/resources/reality-explorers-guide/"
  },
  {
    id: 4,
    title: "Building the Tao of Business for the Age of Wizardry",
    description: "Why business needs a new reality model. Moving beyond left-brain logic loops to embrace the Middle Way - a synthesis of reason and revelation.",
    type: "articles",
    challenge: "strategy",
    typeLabel: "Article",
    challengeLabel: "Strategic Thinking",
    link: "/resources/tao-of-business"
  },
  {
    id: 5,
    title: "Work is Weird (Beta)",
    description: "A beta-stage experiment in talent placement where weirdness is treated as signal, not noise.",
    type: "briefings",
    challenge: "work",
    typeLabel: "Briefing",
    challengeLabel: "Rethinking Work",
    link: "/work-is-weird"
  },
  {
    id: 7,
    title: "Reality Exploration Sprint",
    description: "7-day sprint to map new growth routes & category bets. For when dashboards show stagnation but reality signals opportunity.",
    type: "tools",
    challenge: "strategy",
    typeLabel: "Tool & Framework",
    challengeLabel: "Strategic Thinking",
    link: "/resources/reality-exploration-sprint"
  },
  {
    id: 8,
    title: "🌿 BIDARA Innovation Canvas",
    description: "5-block biomimicry framework for post-template innovation. Define → Biologize → Discover → Abstract → Re-Align like nature's 3.8 billion years of R&D.",
    type: "canvases",
    challenge: "innovation",
    typeLabel: "Canvases & Downloads",
    challengeLabel: "Unlocking Innovation",
    link: "/resources/bidara-canvas"
  },
  {
    id: 10,
    title: "Weird LinkedIn Optimizer",
    description: "Interactive tool for unconventional professionals to optimize their LinkedIn with weird-but-workable improvements.",
    type: "tools",
    challenge: "work",
    typeLabel: "Tool & Framework",
    challengeLabel: "Rethinking Work",
    link: "/linkedin-optimizer"
  },
  {
    id: 11,
    title: "Misfits OS - The Operating System for Misfits",
    description: "Help outsiders turn their strange edge into a system for leverage and freedom. A comprehensive OS for those who never fit the corporate mold but know their difference is their advantage.",
    type: "tools",
    challenge: "strategy",
    typeLabel: "Operating System",
    challengeLabel: "Strategic Leverage",
    link: "/resources/misfits-os"
  },
  {
    id: 12,
    title: "Belief Capital Diagnostic",
    description: "Interactive assessment to map your organization's belief systems and identify hidden leverage points for transformation.",
    type: "tools",
    challenge: "strategy",
    typeLabel: "Interactive Tool",
    challengeLabel: "Strategic Thinking",
    link: "/belief-capital-diagnostic"
  },
  {
    id: 13,
    title: "The Mythology of Product-Market Fit",
    description: "Why chasing fit might be the wrong metaphor entirely.",
    type: "articles",
    challenge: "innovation",
    typeLabel: "Article",
    challengeLabel: "Unlocking Innovation",
    link: "#",
    comingSoon: true
  },
  {
    id: 14,
    title: "The Tao Jones Index — Measuring Cognitive Diversity in Boardrooms",
    description: "Financial indexes compress capital. Ours compresses temperament. This is how you measure the soul of a boardroom.",
    type: "tools",
    challenge: "strategy",
    typeLabel: "Assessment Tool",
    challengeLabel: "Strategic Thinking",
    link: "/resources/tao-jones-index"
  },
]

const contentTypes = [
  { id: 'all', label: 'All' },
  { id: 'articles', label: 'Articles' },
  { id: 'briefings', label: 'Briefings' },
  { id: 'tools', label: 'Tools & Frameworks' },
  { id: 'canvases', label: 'Canvases & Downloads' },
  { id: 'experiments', label: 'Experiments & Ramblings' }
]

const challenges = [
  { id: 'all', label: 'All' },
  { id: 'uncertainty', label: 'Navigating Uncertainty' },
  { id: 'groupthink', label: 'Breaking Groupthink' },
  { id: 'innovation', label: 'Unlocking Innovation' },
  { id: 'work', label: 'Rethinking Work' },
  { id: 'strategy', label: 'Weirdness as Strategy' }
]

export default function Resources() {
  const [contentFilter, setContentFilter] = useState('all')
  const [challengeFilter, setChallengeFilter] = useState('all')

  const filteredResources = resources.filter(resource => {
    const contentMatch = contentFilter === 'all' || resource.type === contentFilter
    const challengeMatch = challengeFilter === 'all' || resource.challenge === challengeFilter
    return contentMatch && challengeMatch
  })

  return (
    <main className="min-h-screen bg-base-black pt-20">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/resources-hero.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'rotate(180deg)'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-base-black/70 via-deep-charcoal/80 to-base-black/70" />
        
        {/* Accent Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-primary-teal/10 via-transparent to-transparent" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-soft-white font-playfair"
            >
              Resources
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-3xl text-primary-teal font-serif italic font-semibold mb-8"
            >
              A field kit for reality exploration.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-cloud-gray leading-relaxed max-w-2xl mx-auto space-y-6"
            >
              <p>
                Welcome to the Zokratiq library. This is where we collect the latest sparks, artifacts, and provocations from the edges of business, culture, and philosophy.
              </p>
              <p>
                Think of it as an index of useful strangeness — pieces designed to stretch your lens and sharpen your next move.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b border-gray-800">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="space-y-6">
            {/* Content Type Filters */}
            <div>
              <div className="text-sm font-medium text-soft-white mb-3">Content Type</div>
              <div className="flex flex-wrap gap-2">
                {contentTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setContentFilter(type.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      contentFilter === type.id
                        ? 'bg-primary-teal text-white'
                        : 'bg-deep-charcoal/50 text-cloud-gray hover:bg-primary-teal/20 hover:text-primary-teal'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Challenge Filters */}
            <div>
              <div className="text-sm font-medium text-soft-white mb-3">Challenge</div>
              <div className="flex flex-wrap gap-2">
                {challenges.map(challenge => (
                  <button
                    key={challenge.id}
                    onClick={() => setChallengeFilter(challenge.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      challengeFilter === challenge.id
                        ? 'bg-primary-teal text-white'
                        : 'bg-deep-charcoal/50 text-cloud-gray hover:bg-primary-teal/20 hover:text-primary-teal'
                    }`}
                  >
                    {challenge.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resource */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary-teal/20 to-bright-aqua/20 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-primary-teal/30"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-4">
              The Tao Jones Index — Measuring Cognitive Diversity in Boardrooms
            </h2>
            <p className="text-xl text-cloud-gray mb-8 leading-relaxed">
              Financial indexes compress capital. Ours compresses temperament. This is how you measure the soul of a boardroom.
            </p>
            <a 
              href="/resources/tao-jones-index" 
              className="inline-flex items-center justify-center font-semibold transition-all duration-200 bg-gradient-to-r from-deep-indigo to-primary-teal text-white hover:shadow-lg hover:shadow-primary-teal/25 hover:-translate-y-0.5 px-8 py-4 text-lg rounded-xl"
            >
              Explore Index →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_300px] gap-8 max-w-7xl mx-auto">
            {/* Main Content */}
            <div>
              <div className="grid md:grid-cols-2 gap-8">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-deep-charcoal border border-gray-800 rounded-xl p-6 transition-all duration-300 group ${
                  resource.comingSoon
                    ? 'filter grayscale opacity-60 pointer-events-none border-gray-800/50 bg-deep-charcoal/30'
                    : 'hover:border-primary-teal/50 hover:shadow-lg hover:shadow-primary-teal/10'
                }`}
              >
                <h3 className={`text-xl font-semibold mb-3 transition-colors ${
                  resource.comingSoon
                    ? 'text-soft-white/70'
                    : 'text-soft-white group-hover:text-bright-aqua'
                }`}>
                  {resource.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    resource.comingSoon
                      ? 'bg-primary-teal/10 text-primary-teal/60'
                      : 'bg-primary-teal/20 text-primary-teal'
                  }`}>
                    {resource.typeLabel}
                  </span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    resource.comingSoon
                      ? 'bg-warm-accent/10 text-warm-accent/60'
                      : 'bg-warm-accent/20 text-warm-accent'
                  }`}>
                    {resource.challengeLabel}
                  </span>
                </div>
                
                <p className={`leading-relaxed mb-6 line-clamp-3 ${
                  resource.comingSoon ? 'text-cloud-gray/60' : 'text-cloud-gray'
                }`}>
                  {resource.description}
                </p>
                
                {resource.comingSoon ? (
                  <div className="inline-flex items-center justify-center font-semibold border-2 border-cloud-gray/30 text-cloud-gray/50 px-4 py-2 text-sm rounded-lg w-full cursor-not-allowed">
                    Coming Up
                  </div>
                ) : (
                  <a 
                    href={resource.link}
                    className="inline-flex items-center justify-center font-semibold transition-all duration-200 bg-gradient-to-r from-deep-indigo to-primary-teal text-white hover:shadow-lg hover:shadow-primary-teal/25 hover:-translate-y-0.5 px-4 py-2 text-sm rounded-lg w-full"
                  >
                    {resource.type === 'tools' ? 'Get Tool' : 
                     resource.type === 'articles' ? 'Read Article' :
                     resource.type === 'canvases' ? 'Download' :
                     resource.type === 'briefings' ? 'Explore' :
                     'Try It'}
                  </a>
                )}
              </motion.div>
            ))}
              </div>
              
              {filteredResources.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-cloud-gray text-lg">No resources match your current filters.</p>
                </div>
              )}

              {/* Closing Note */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center mt-16 max-w-3xl mx-auto"
              >
                <p className="text-cloud-gray italic leading-relaxed text-lg">
                  This index is never finished. Like any true field kit, it expands as we find new instruments. Some are polished, some are raw fragments — all designed to help you explore reality differently.
                </p>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="sticky top-24 bg-deep-charcoal/80 border border-cloud-gray/20 rounded-xl p-8 text-center backdrop-blur-lg"
              >
                <h3 className="text-2xl text-primary-teal mb-4 font-serif italic">
                  "Don't just consume — conspire."
                </h3>
                <p className="text-cloud-gray mb-6 leading-relaxed">
                  Subscribe to receive new artifacts, prompts, and tools straight into your inbox.
                </p>
                <form id="subscribe-form" method="post" action="/api/subscribe" aria-label="Subscribe to Zokratiq artifacts" className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const email = formData.get('email') as string;
                    
                    // Basic email validation
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                      const subnote = document.getElementById('form-subnote');
                      if (subnote) subnote.innerHTML = '<span class="text-red-400">That email looks off. Try again.</span>';
                      return;
                    }
                    
                    const button = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                    const subnote = document.getElementById('form-subnote');
                    
                    button.disabled = true;
                    button.textContent = 'Saving your secret...';
                    
                    try {
                      const response = await fetch('/api/subscribe', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          email: email,
                          utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
                          referrer: document.referrer || '',
                          website: formData.get('website') || '' // honeypot
                        })
                      });
                      
                      const result = await response.json();
                      
                      if (response.ok) {
                        if (subnote) {
                          subnote.innerHTML = '<span class="text-primary-teal">Check your inbox — one last step to start conspiring.</span>';
                        }
                        // Update button to show success state
                        button.innerHTML = '✓ Signal Received';
                        button.style.background = 'linear-gradient(135deg, #22c55e, #4ade80)';
                        button.style.borderColor = '#22c55e';
                        button.style.color = '#ffffff';
                      } else {
                        if (subnote) {
                          subnote.innerHTML = `<span class="text-red-400">${result.message || 'Something went wrong. Try again.'}</span>`;
                        }
                        button.disabled = false;
                        button.textContent = "Sign Up";
                      }
                    } catch (error) {
                      if (subnote) {
                        subnote.innerHTML = '<span class="text-red-400">Network error. Try again later.</span>';
                      }
                      button.disabled = false;
                      button.textContent = "Don't just consume — conspire.";
                    }
                  }}
                >
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    placeholder="name@domain.com" 
                    aria-required="true" 
                    autoComplete="email" 
                    className="w-full px-4 py-3 bg-deep-charcoal/50 border border-gray-700 rounded-lg text-soft-white placeholder-cloud-gray/50 focus:border-primary-teal focus:outline-none focus:ring-2 focus:ring-primary-teal/20 transition-all duration-200" 
                  />
                  
                  {/* honeypot (hidden for users, visible to bots) */}
                  <input type="text" name="website" id="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                  
                  <button type="submit" className="inline-flex items-center justify-center font-semibold transition-all duration-200 bg-transparent border-2 border-primary-teal text-primary-teal hover:bg-primary-teal hover:text-base-black px-6 py-3 text-sm rounded-lg w-full">
                    Sign Up
                  </button>
                  <p id="form-subnote" className="text-xs text-cloud-gray/80 leading-relaxed">
                    We send artifacts, prompts & tools. Unsubscribe anytime. Privacy: <a href="/privacy" className="text-primary-teal hover:text-bright-aqua underline">short link</a>.
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}