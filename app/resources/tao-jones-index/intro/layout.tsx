import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Tao Jones Index: Wisdom Beyond the Bottom Line - Zokratiq',
  description: 'Discover how Cognitive Diversity, Temperament Mix, and Policy Courage define leadership in uncertain times. Download the TJI diagnostic and measure what actually matters.',
  keywords: 'Tao Jones Index, cognitive diversity, leadership assessment, policy courage, temperament mix, leadership intelligence, Zokratiq',
}

export default function IntroLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}