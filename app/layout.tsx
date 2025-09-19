import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/navigation/Header'
import { ConditionalHeader } from '@/components/ConditionalHeader'

export const metadata: Metadata = {
  title: 'Zokratiq - Reality Exploration Studio',
  description: 'Business meets magic when you hire free-range thinkers. We turn curiosity into operating leverage—designing Playful Businesses where exploration fuels strategy, product, and culture.',
  keywords: 'strategy, business consulting, reality exploration, philosophy, foresight, systems thinking',
  authors: [{ name: 'Zokratiq' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Zokratiq - Reality Exploration Studio',
    description: 'Business meets magic when you hire free-range thinkers.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zokratiq - Reality Exploration Studio',
    description: 'Business meets magic when you hire free-range thinkers.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&family=JetBrains+Mono:wght@400&family=Playfair+Display:ital,wght@1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/jpeg" href="/zokratiq-logo-new.jpeg" />
        <link rel="shortcut icon" type="image/jpeg" href="/zokratiq-logo-new.jpeg" />
        <link rel="apple-touch-icon" href="/zokratiq-logo-new.jpeg" />
      </head>
      <body className="bg-base-black text-soft-white font-sans antialiased overflow-x-hidden">
        <ConditionalHeader />
        {children}
        
        {/* SVG Filters for gooey effect */}
        <svg className="hidden">
          <defs>
            <filter id="gooey">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="gooey"
              />
              <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
            </filter>
          </defs>
        </svg>
      </body>
    </html>
  )
}