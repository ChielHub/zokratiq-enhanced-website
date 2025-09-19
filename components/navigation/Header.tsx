'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LanguageToggle } from '@/components/ui/LanguageToggle'

interface HeaderProps {
  className?: string
}

export function Header({ className = '' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { label: 'About', href: '/about' },
    { label: 'Labs', href: '/labs' },
    { 
      label: 'Mis/Fits', 
      href: '/misfits',
      special: true // For purple hover effect
    },
    { label: 'Resources', href: '/resources' },
    { label: 'Work With Us', href: '/partner-with-us' },
    { label: 'Contact', href: 'https://zokratiq.com/#contact' }
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-base-black/95 backdrop-blur-md border-b border-primary-teal/20' 
          : 'bg-transparent'
      } ${className}`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <img 
              src="/zokratiq-logo-new.jpeg" 
              alt="Zokratiq" 
              className="w-10 h-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="hidden sm:block">
              <div className="font-bold text-soft-white text-lg">
                Zokratiq
              </div>
              <div className="text-xs font-mono text-primary-teal/80 -mt-1">
                Reality Exploration Studio
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex items-center space-x-6">
              {menuItems.map((item, index) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`relative text-cloud-gray font-medium transition-all duration-300 hover:text-primary-teal group ${
                      item.special ? 'hover:text-purple-400' : ''
                    }`}
                  >
                    {item.label}
                    <span 
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                        item.special ? 'bg-purple-400' : 'bg-primary-teal'
                      }`} 
                    />
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* CTA Button */}
            <Link
              href="/scan"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-deep-charcoal to-primary-teal text-soft-white font-semibold rounded-lg hover:from-primary-teal hover:to-bright-aqua hover:shadow-lg hover:shadow-primary-teal/25 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Reality Scan
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-cloud-gray hover:text-primary-teal transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span 
                className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                }`} 
              />
              <span 
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} 
              />
              <span 
                className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                }`} 
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="lg:hidden overflow-hidden bg-deep-charcoal/95 backdrop-blur-md rounded-lg mx-4 mb-4"
        >
          <ul className="py-4 space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-6 py-3 text-cloud-gray font-medium transition-all duration-300 hover:text-primary-teal hover:bg-primary-teal/10 ${
                    item.special ? 'hover:text-purple-400' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/scan"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block mx-6 mt-4 px-4 py-2 bg-gradient-to-r from-deep-charcoal to-primary-teal text-soft-white font-semibold rounded-lg text-center hover:from-primary-teal hover:to-bright-aqua transition-all duration-300"
              >
                Reality Scan
              </Link>
            </li>
            
            {/* Language Toggle - Mobile */}
            <li className="border-t border-cloud-gray/20 mt-4 pt-4">
              <div className="px-6">
                <div className="text-xs text-cloud-gray/60 uppercase tracking-wider font-mono mb-3">Language</div>
                <LanguageToggle />
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.nav>
  )
}