'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LanguageOption {
  code: string
  label: string
  flag: string
}

const languages: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'nl', label: 'Dutch', flag: '🇳🇱' }
]

export function LanguageToggle() {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLangData = languages.find(lang => lang.code === currentLanguage) || languages[0]
  const otherLanguages = languages.filter(lang => lang.code !== currentLanguage)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageSelect = (languageCode: string) => {
    setCurrentLanguage(languageCode)
    setIsOpen(false)
    // Here you would typically trigger the actual language change
    console.log(`Language changed to: ${languageCode}`)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-cloud-gray hover:text-primary-teal transition-colors duration-200 rounded-lg hover:bg-deep-charcoal/50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-base">{currentLangData.flag}</span>
        <span className="hidden sm:inline">{currentLangData.label}</span>
        <span className="sm:hidden">{currentLangData.code.toUpperCase()}</span>
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="transition-transform"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-2 min-w-[140px] bg-deep-charcoal border border-primary-teal/20 rounded-lg shadow-lg backdrop-blur-md z-50"
          >
            {otherLanguages.map((language) => (
              <motion.button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-cloud-gray hover:text-primary-teal hover:bg-primary-teal/10 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
              >
                <span className="text-base">{language.flag}</span>
                <span className="hidden sm:inline">{language.label}</span>
                <span className="sm:hidden">{language.code.toUpperCase()}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}