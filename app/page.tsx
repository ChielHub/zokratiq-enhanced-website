import { Hero } from '@/components/sections/Hero'
import { Intro } from '@/components/sections/Intro'
import { FaultLines } from '@/components/sections/FaultLines'
import { CracksNewsletter } from '@/components/sections/CracksNewsletter'
import { CoreServices } from '@/components/sections/CoreServices'
import { WhyZokratiq } from '@/components/sections/WhyZokratiq'
import { Resources } from '@/components/sections/Resources'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Intro />
      <FaultLines />
      <CracksNewsletter />
      <CoreServices />
      <WhyZokratiq />
      <Resources />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />
    </main>
  )
}