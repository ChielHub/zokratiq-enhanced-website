'use client'

import { motion } from 'framer-motion'
import { LanguageToggle } from '@/components/ui/LanguageToggle'

const serviceLinks = [
  { name: 'Zokratiq Labs', href: '/labs' },
  { name: 'Mis/Fits', href: '/misfits' },
  { name: 'Reality Scan', href: '/scan' },
  { name: 'Work With Us', href: '/partner-with-us' }
]

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Resources', href: '/resources' },
  { name: 'Manifesto', href: '/manifesto-for-misfits.html' },
  { name: 'Contact', href: '#contact' }
]

const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/zokratiq',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/zokratiq',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  }
]

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-base-black to-charcoal-light border-t border-primary-teal/20 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="text-3xl font-bold text-soft-white">Zokratiq</div>
            <div className="text-cloud-gray font-mono text-sm opacity-80">
              Reality Exploration Studio
            </div>
            <div className="text-cloud-gray/80 leading-relaxed mt-4">
              We turn curiosity into operating leverage—designing Playful Businesses where exploration fuels strategy, product, and culture.
            </div>
          </motion.div>
          
          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <h4 className="text-primary-teal text-lg font-semibold mb-6 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="text-cloud-gray hover:text-primary-teal transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Company Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <h4 className="text-primary-teal text-lg font-semibold mb-6 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="text-cloud-gray hover:text-primary-teal transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-cloud-gray/60 text-sm mb-4 md:mb-0">
            © 2024 Zokratiq. All rights reserved. Built for the perceptive.
          </div>
          
          {/* Language Toggle - Desktop & Tablet Only */}
          <div className="hidden sm:block mb-4 md:mb-0">
            <LanguageToggle />
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-cloud-gray/60 hover:text-primary-teal transition-colors duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}