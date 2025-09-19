import { Footer } from '@/components/sections/Footer'

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto py-16">
          <h1 className="text-4xl md:text-6xl font-bold text-soft-white mb-12 text-center">
            About Zokratiq
          </h1>
          
          <div className="prose prose-lg max-w-none text-cloud-gray space-y-8">
            <div className="text-xl leading-relaxed">
              <p className="text-primary-teal font-semibold mb-6">
                Zokratiq is a Reality Exploration Studio for visionary teams and institutions.
              </p>
              
              <p className="mb-6">
                We believe work should feel less like a cage and more like an expedition. The world is getting weirder by the day — and that&apos;s not a bug, it&apos;s a feature. The organizations that thrive will be those that learn to navigate uncertainty, embrace oddness, and experiment in public.
              </p>
              
              <div className="mb-8">
                <p className="mb-4">At Zokratiq, we:</p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start">
                    <span className="text-bright-aqua mr-3">•</span>
                    <span><strong className="text-soft-white">Uncover hidden truths:</strong> Seeing what dashboards and quarterly reports miss.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-bright-aqua mr-3">•</span>
                    <span><strong className="text-soft-white">Prototype alternate futures:</strong> Turning signals into stories, and stories into strategy.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-bright-aqua mr-3">•</span>
                    <span><strong className="text-soft-white">Equip misfits & leaders:</strong> Designing tools and rituals that make curiosity contagious.</span>
                  </li>
                </ul>
              </div>
              
              <p className="mb-8">
                We don&apos;t sell trend reports. We build maps, labs, and movements that helps your organization escape flatland and operate with a fuller reality headset.
              </p>
              
              <div className="bg-deep-charcoal/50 border border-primary-teal/20 rounded-lg p-8 mt-8 text-center">
                <h2 className="text-2xl font-bold text-soft-white mb-4">Ready to make work weird again?</h2>
                <p className="text-lg text-cloud-gray mb-6">
                  👉 Read our Mis/Fits Manifesto to see why making work weird again matters.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/manifesto-for-misfits.html" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-teal to-bright-aqua text-base-black font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-teal/25 transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Read the Manifesto
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="ml-2">
                      <path d="M4 10h12m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a 
                    href="/partner-with-us/" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-primary-teal border-2 border-primary-teal font-semibold rounded-lg hover:bg-primary-teal hover:text-base-black transition-all duration-300"
                  >
                    Partner With Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}