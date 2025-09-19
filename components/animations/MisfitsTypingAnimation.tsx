'use client'

import { useState, useEffect } from 'react'

interface MisfitsTypingAnimationProps {
  className?: string
}

export default function MisfitsTypingAnimation({ className = '' }: MisfitsTypingAnimationProps) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [phase, setPhase] = useState<'typing' | 'moving-back' | 'inserting-slash' | 'strikethrough' | 'complete'>('typing')
  const [cursorPosition, setCursorPosition] = useState(0)

  useEffect(() => {
    const fullText = 'misfits'
    let timeoutId: NodeJS.Timeout

    const typeText = () => {
      if (displayText.length < fullText.length) {
        setDisplayText(fullText.slice(0, displayText.length + 1))
        timeoutId = setTimeout(typeText, 150)
      } else {
        // Start moving cursor back after typing is complete
        setTimeout(() => {
          setPhase('moving-back')
          setCursorPosition(3) // Position after "mis"
        }, 500)
      }
    }

    const insertSlash = () => {
      setDisplayText('mis/fits')
      setPhase('strikethrough')
      // Move cursor to end
      setTimeout(() => {
        setCursorPosition(8) // After "mis/fits"
        setPhase('complete')
      }, 300)
    }

    if (phase === 'typing') {
      typeText()
    } else if (phase === 'moving-back') {
      setTimeout(() => {
        setPhase('inserting-slash')
        insertSlash()
      }, 500)
    }

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(cursorInterval)
    }
  }, [displayText.length, phase])

  const renderTextWithCursor = () => {
    if (phase === 'complete' || phase === 'strikethrough') {
      const text = displayText
      const beforeSlash = text.substring(0, 3) // "mis"
      const slash = text.substring(3, 4) // "/"
      const afterSlash = text.substring(4) // "fits"
      
      return (
        <span>
          <span className={phase === 'strikethrough' || phase === 'complete' ? 'line-through' : ''}>
            {beforeSlash}
          </span>
          {slash}
          {afterSlash}
          {phase === 'complete' && (
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-75`}>
              |
            </span>
          )}
        </span>
      )
    }

    if (phase === 'moving-back') {
      return (
        <span>
          {displayText}
          <span 
            className={`absolute ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-75`}
            style={{ left: `${cursorPosition * 0.6}em` }}
          >
            |
          </span>
        </span>
      )
    }

    // Typing phase
    return (
      <span>
        {displayText}
        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-75`}>
          |
        </span>
      </span>
    )
  }

  return (
    <span className={`font-mono relative ${className}`}>
      {renderTextWithCursor()}
    </span>
  )
}