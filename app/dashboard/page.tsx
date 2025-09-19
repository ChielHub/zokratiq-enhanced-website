'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface PlaybookCard {
  id: string
  title: string
  thumbnail: string
  tags: string[]
  copyability: number
  author: string
  summary: string
  steps: string[]
}

const mockPlaybooks: PlaybookCard[] = [
  {
    id: '1',
    title: 'LinkedIn Lead Generation Sprint',
    thumbnail: '/api/placeholder/300/200',
    tags: ['Lead Gen', 'LinkedIn', 'B2B'],
    copyability: 4.8,
    author: 'Sarah Chen',
    summary: 'Generate 50+ qualified leads in 14 days using organic LinkedIn strategies',
    steps: ['Define ICP', 'Optimize profile', 'Create content calendar', 'Engage prospects']
  },
  {
    id: '2',
    title: 'SaaS Landing Page Conversion Kit',
    thumbnail: '/api/placeholder/300/200',
    tags: ['CRO', 'SaaS', 'Landing Page'],
    copyability: 4.5,
    author: 'Mike Johnson',
    summary: 'Proven framework to boost landing page conversions by 40%+',
    steps: ['Audit current page', 'Rewrite headlines', 'Add social proof', 'A/B test CTA']
  },
  {
    id: '3',
    title: 'Content Distribution Playbook',
    thumbnail: '/api/placeholder/300/200',
    tags: ['Content', 'Distribution', 'Growth'],
    copyability: 4.7,
    author: 'Emma Rodriguez',
    summary: 'Turn one piece of content into 20+ distribution touchpoints',
    steps: ['Create pillar content', 'Repurpose formats', 'Cross-platform posting', 'Track metrics']
  },
  {
    id: '4',
    title: 'Email Sequence Automation',
    thumbnail: '/api/placeholder/300/200',
    tags: ['Email', 'Automation', 'Nurture'],
    copyability: 4.3,
    author: 'David Kim',
    summary: 'Automated email sequences that convert cold leads to customers',
    steps: ['Segment audience', 'Write email sequence', 'Setup automation', 'Monitor performance']
  },
  {
    id: '5',
    title: 'Product Hunt Launch Strategy',
    thumbnail: '/api/placeholder/300/200',
    tags: ['Product Hunt', 'Launch', 'PR'],
    copyability: 4.6,
    author: 'Lisa Park',
    summary: 'Step-by-step guide to launching successfully on Product Hunt',
    steps: ['Pre-launch prep', 'Hunter outreach', 'Launch day execution', 'Post-launch follow-up']
  },
  {
    id: '6',
    title: 'Customer Success Onboarding',
    thumbnail: '/api/placeholder/300/200',
    tags: ['Onboarding', 'Customer Success', 'Retention'],
    copyability: 4.2,
    author: 'John Smith',
    summary: 'Reduce churn by 30% with this proven onboarding framework',
    steps: ['Welcome sequence', 'Product training', 'Success milestones', 'Feedback loops']
  }
]

const chatSuggestions = [
  "Give me strategies to fill my user acquisition funnel",
  "Draft a 2-week LinkedIn lead-gen sprint for B2B SaaS",
  "Combine my top 5 copywriting playbooks into a landing page checklist",
  "Create a content distribution strategy for product launches",
  "Design an email nurture sequence for free trial users"
]

export default function Dashboard() {
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set())
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [currentSuggestion, setCurrentSuggestion] = useState(0)
  const [chatInput, setChatInput] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % chatSuggestions.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleCardSelect = (cardId: string) => {
    const newSelected = new Set(selectedCards)
    if (newSelected.has(cardId)) {
      newSelected.delete(cardId)
    } else {
      newSelected.add(cardId)
    }
    setSelectedCards(newSelected)
  }

  const handleLongPress = (cardId: string) => {
    handleCardSelect(cardId)
  }

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={`w-3 h-3 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-600'
          }`}
        >
          ⭐
        </div>
      ))}
      <span className="text-xs text-gray-400 ml-1">{rating}</span>
    </div>
  )

  return (
    <div className="min-h-screen bg-base-black text-soft-white pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Playbooks</h1>
          <p className="text-gray-400">
            Select playbooks to combine, export, or chat about your collection
          </p>
        </div>

        {/* Chat Input */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={chatSuggestions[currentSuggestion]}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-primary-teal transition-colors"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-teal hover:text-primary-teal/80 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>

        {/* Action Bar */}
        <AnimatePresence>
          {selectedCards.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 right-4 bg-gray-900 border border-gray-700 rounded-lg px-6 py-3 flex items-center gap-4 shadow-lg z-50"
            >
              <span className="text-sm text-gray-300">
                {selectedCards.size} selected
              </span>
              <div className="flex gap-2">
                <button className="bg-primary-teal text-base-black px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-teal/90 transition-colors">
                  Combine → Build Workflow
                </button>
                <button className="bg-gray-700 text-soft-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-600 transition-colors">
                  Export .md
                </button>
                <button className="bg-gray-700 text-soft-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-600 transition-colors">
                  Export .json
                </button>
              </div>
              <button
                onClick={() => setSelectedCards(new Set())}
                className="text-gray-400 hover:text-soft-white transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPlaybooks.map((playbook) => (
            <motion.div
              key={playbook.id}
              layout
              className={`relative bg-gray-900 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                selectedCards.has(playbook.id) 
                  ? 'ring-2 ring-primary-teal' 
                  : 'hover:bg-gray-800'
              }`}
              onMouseEnter={() => setHoveredCard(playbook.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardSelect(playbook.id)}
              onTouchStart={() => {
                setTimeout(() => handleLongPress(playbook.id), 500)
              }}
            >
              {/* Selection Checkbox - Desktop Hover */}
              <AnimatePresence>
                {(hoveredCard === playbook.id || selectedCards.has(playbook.id)) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute top-3 right-3 z-10"
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedCards.has(playbook.id)
                        ? 'bg-primary-teal border-primary-teal'
                        : 'bg-gray-800 border-gray-600'
                    }`}>
                      {selectedCards.has(playbook.id) && (
                        <CheckIcon className="w-4 h-4 text-base-black" />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Thumbnail */}
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <div className="text-4xl">📊</div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{playbook.title}</h3>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {playbook.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-800 text-xs rounded-md text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Copyability Rating */}
                <div className="mb-3">
                  <StarRating rating={playbook.copyability} />
                </div>

                {/* Author */}
                <p className="text-sm text-gray-400">by {playbook.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}