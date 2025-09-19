'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Algorithm {
  name: string
  glyph: string
  description: string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface SessionState {
  systemPrompt: string
  messages: Array<{role: string, content: string}>
  algorithms: string[]
  challenge: string
}

const ALGORITHMS = {
  'bias-radar': { name: 'Bias Radar', glyph: '🔍', description: 'Spots the invisible traps' },
  'incentive-scan': { name: 'Incentive Scan', glyph: '⚖️', description: 'Follows the money, status, hidden motives' },
  'evidence-stress-test': { name: 'Evidence Stress-Test', glyph: '🧪', description: 'Makes you prove yourself wrong before the market does' },
  'risk-map': { name: 'Risk Map & Pre-Mortem', glyph: '🌊', description: 'Maps tail risks and failure modes' },
  'daimonic-advisors': { name: 'Daimonic Advisors', glyph: '🔥', description: 'Asks what Future Self, Younger Self, and Daimon would say' },
  'second-order-effects': { name: 'Second-Order Effects', glyph: '🔗', description: 'Maps ripple effects and unintended consequences' },
  'optionality-analysis': { name: 'Optionality Analysis', glyph: '🗂️', description: 'Evaluates paths and preserves flexibility' },
  'time-horizon-scan': { name: 'Time Horizon Scan', glyph: '⏳', description: 'Tests decisions across different time scales' },
  'resource-reality-check': { name: 'Resource Reality Check', glyph: '⚡', description: 'Brutally honest assessment of capabilities' },
  'stakeholder-chess': { name: 'Stakeholder Chess', glyph: '♟️', description: 'Maps political dynamics and alliance structures' },
  'market-reality-test': { name: 'Market Reality Test', glyph: '📊', description: 'Stress-tests assumptions against market dynamics' },
  'identity-coherence-check': { name: 'Identity Coherence Check', glyph: '🎭', description: 'Tests alignment with core identity and values' }
}

export default function DecisionPartner() {
  const [challenge, setChallenge] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [sessionState, setSessionState] = useState<SessionState | null>(null)
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>([])
  const [currentResponse, setCurrentResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showAlgorithms, setShowAlgorithms] = useState(false)
  const [sessionStarted, setSessionStarted] = useState(false)
  const [activeAlgorithms, setActiveAlgorithms] = useState<Algorithm[]>([])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmitChallenge = async () => {
    if (!challenge.trim()) return
    
    setIsLoading(true)
    setSessionStarted(true)

    try {
      const response = await fetch('/api/decision-partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challenge,
          selectedAlgorithms: selectedAlgorithms.length > 0 ? selectedAlgorithms : undefined
        })
      })

      const data = await response.json()
      
      setMessages([
        { role: 'user', content: `Challenge: ${challenge}`, timestamp: new Date() },
        { role: 'assistant', content: data.response, timestamp: new Date() }
      ])
      setSessionState(data.sessionState)
      setActiveAlgorithms(data.algorithms)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitResponse = async () => {
    if (!currentResponse.trim() || !sessionState) return
    
    const newUserMessage = { role: 'user' as const, content: currentResponse, timestamp: new Date() }
    setMessages(prev => [...prev, newUserMessage])
    setCurrentResponse('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/decision-partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionState,
          userResponse: currentResponse
        })
      })

      const data = await response.json()
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response, 
        timestamp: new Date() 
      }])
      setSessionState(data.sessionState)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (sessionStarted) {
        handleSubmitResponse()
      } else {
        handleSubmitChallenge()
      }
    }
  }

  const toggleAlgorithm = (algorithmId: string) => {
    setSelectedAlgorithms(prev => 
      prev.includes(algorithmId) 
        ? prev.filter(id => id !== algorithmId)
        : [...prev, algorithmId]
    )
  }

  const exportMarkdown = () => {
    const markdown = messages.map(msg => 
      `**${msg.role === 'user' ? 'You' : 'Decision Partner'}:** ${msg.content}\n\n`
    ).join('')
    
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `decision-session-${Date.now()}.md`
    a.click()
  }

  if (!sessionStarted) {
    return (
      <main className="min-h-screen bg-base-black text-soft-white pt-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl mb-4"
            >
              🧭
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-soft-white font-playfair">
              Decision Partner
            </h1>
            <p className="text-xl text-primary-teal font-playfair italic">
              Algorithms of Thought for when the stakes are real
            </p>
          </div>

          {/* Challenge Input */}
          <div className="bg-deep-charcoal/50 rounded-2xl p-8 mb-8">
            <label className="block text-lg font-semibold mb-4 text-soft-white">
              What's the decision you're trying to take?
            </label>
            <textarea
              ref={inputRef}
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Should we launch in Market X? Which partner should we choose? Should I take this role?"
              className="w-full h-32 bg-base-black/50 border border-gray-700 rounded-lg px-4 py-3 text-soft-white placeholder-cloud-gray focus:border-primary-teal focus:outline-none resize-none"
            />
          </div>

          {/* Algorithm Selection */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-soft-white">
                Select Algorithms (Optional)
              </h3>
              <button
                onClick={() => setShowAlgorithms(!showAlgorithms)}
                className="text-primary-teal hover:text-bright-aqua transition-colors"
              >
                {showAlgorithms ? 'Let system auto-select' : 'Choose manually'}
              </button>
            </div>
            
            <AnimatePresence>
              {showAlgorithms && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden"
                >
                  {Object.entries(ALGORITHMS).map(([id, algorithm]) => (
                    <motion.div
                      key={id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedAlgorithms.includes(id)
                          ? 'bg-primary-teal/20 border-primary-teal'
                          : 'bg-deep-charcoal/30 border-gray-700 hover:border-primary-teal/50'
                      }`}
                      onClick={() => toggleAlgorithm(id)}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{algorithm.glyph}</span>
                        <div>
                          <h4 className="font-semibold text-soft-white text-sm">
                            {algorithm.name}
                          </h4>
                          <p className="text-cloud-gray text-xs mt-1">
                            {algorithm.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={handleSubmitChallenge}
              disabled={!challenge.trim() || isLoading}
              className="bg-primary-teal text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-bright-aqua transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Aligning the lenses...</span>
                </div>
              ) : (
                'Begin Decision Process'
              )}
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-base-black text-soft-white pt-20 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-800 bg-deep-charcoal/30">
        <div className="container mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">🧭</span>
              <div>
                <h1 className="font-bold text-soft-white">Decision Partner</h1>
                <p className="text-sm text-cloud-gray">Session in progress</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Active Algorithms */}
              <div className="flex items-center space-x-2">
                {activeAlgorithms.map((algo, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center space-x-1 bg-primary-teal/20 px-2 py-1 rounded text-xs"
                    title={algo.description}
                  >
                    <span>{algo.glyph}</span>
                    <span className="hidden sm:inline">{algo.name}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={exportMarkdown}
                disabled={messages.length === 0}
                className="px-4 py-2 bg-deep-charcoal border border-gray-600 rounded-lg text-sm hover:border-primary-teal transition-colors disabled:opacity-50"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-6 lg:px-8 py-6 max-w-4xl">
          <div className="space-y-6">
            {messages.map((message, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-3xl p-4 rounded-2xl ${
                  message.role === 'user' 
                    ? 'bg-primary-teal/20 border border-primary-teal/30' 
                    : 'bg-deep-charcoal/50 border border-gray-700'
                }`}>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">
                      {message.role === 'user' ? '👤' : '🧭'}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm mb-2 text-cloud-gray">
                        {message.role === 'user' ? 'You' : 'Decision Partner'}
                      </div>
                      <div className="text-soft-white whitespace-pre-wrap">
                        {message.content}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-3xl p-4 rounded-2xl bg-deep-charcoal/50 border border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🧭</div>
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin w-4 h-4 border-2 border-primary-teal border-t-transparent rounded-full"></div>
                      <span className="text-cloud-gray">Processing...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-800 bg-deep-charcoal/30">
        <div className="container mx-auto px-6 lg:px-8 py-4 max-w-4xl">
          <div className="flex space-x-4">
            <textarea
              value={currentResponse}
              onChange={(e) => setCurrentResponse(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Your response..."
              className="flex-1 bg-base-black/50 border border-gray-700 rounded-lg px-4 py-3 text-soft-white placeholder-cloud-gray focus:border-primary-teal focus:outline-none resize-none"
              rows={2}
            />
            <button
              onClick={handleSubmitResponse}
              disabled={!currentResponse.trim() || isLoading}
              className="px-6 py-3 bg-primary-teal text-white rounded-lg font-semibold hover:bg-bright-aqua transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}