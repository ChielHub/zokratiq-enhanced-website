import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://zokratiq.com'),
  title: 'Belief Capital Diagnostic — Score What Buyers Really Buy | Zokratiq',
  description: 'Free 6-question diagnostic for founders and strategy leads. Score your belief capital, identify gaps, and get a custom action plan with canvas templates.',
  keywords: 'belief capital, brand positioning, values-based marketing, startup strategy, founder tools, business beliefs, competitive advantage',
  authors: [{ name: 'Zokratiq' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Belief Capital Diagnostic — Score What Buyers Really Buy',
    description: 'Free 6-Q diagnostic: Score your belief capital, see gaps, get moves. For founders & strategy leads who know buyers invest in beliefs, not features.',
    type: 'website',
    locale: 'en_US',
    url: 'https://zokratiq.com/belief',
    siteName: 'Zokratiq',
    images: [
      {
        url: '/og-belief.png',
        width: 1200,
        height: 630,
        alt: 'Belief Capital Diagnostic - Score What Buyers Really Buy'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Belief Capital Diagnostic — Score What Buyers Really Buy',
    description: 'Free 6-Q diagnostic: Score your belief capital, see gaps, get moves. For founders who know buyers invest in beliefs, not features.',
    images: ['/og-belief.png']
  },
  alternates: {
    canonical: 'https://zokratiq.com/belief'
  }
}

export default function BeliefLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}