import Link from 'next/link'

export default function BidaraCanvasPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-base-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-teal via-transparent to-bright-aqua"></div>
          <div className="grain-overlay opacity-50"></div>
        </div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              <span className="inline-block px-4 py-2 bg-primary-teal/20 text-primary-teal rounded-full text-sm font-mono mb-6">
                Innovation Canvas
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                🌿 BIDARA <span className="text-primary-teal">Canvas</span>
              </h1>
              <div className="text-xl md:text-2xl font-serif text-cloud-gray mb-12 leading-relaxed">
                <p className="mb-4 text-bright-aqua font-semibold">Biomimetic Innovation Design and Adaptive Resource Architecture</p>
                <p>A strategic canvas for designing regenerative business models inspired by natural systems.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Canvas Preview Section */}
      <section className="py-24 lg:py-32 bg-deep-charcoal/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-8">
                  Nature-Inspired Strategy
                </h2>
                
                <div className="space-y-6 text-cloud-gray leading-relaxed mb-8">
                  <p>
                    The BIDARA Canvas helps organizations design business models that mirror the resilience, adaptability, and regenerative qualities found in natural ecosystems.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-primary-teal text-xl mt-1">🌱</span>
                      <div>
                        <h3 className="font-semibold text-soft-white mb-2">Regenerative Core</h3>
                        <p>Map value flows that restore rather than deplete</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="text-primary-teal text-xl mt-1">🔄</span>
                      <div>
                        <h3 className="font-semibold text-soft-white mb-2">Adaptive Networks</h3>
                        <p>Design resilient partnerships and feedback loops</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="text-primary-teal text-xl mt-1">⚡</span>
                      <div>
                        <h3 className="font-semibold text-soft-white mb-2">Energy Flows</h3>
                        <p>Optimize resource cycles and minimize waste</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm italic text-cloud-gray/80">
                  Inspired by mycorrhizal networks, forest succession, and biomimetic design principles.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-deep-charcoal via-base-black to-deep-charcoal border border-primary-teal/20 rounded-2xl p-8 relative overflow-hidden">
                  {/* Canvas preview */}
                  <div className="text-center mb-8">
                    <div className="w-32 h-24 mx-auto bg-gradient-to-br from-primary-teal/20 to-bright-aqua/20 rounded-lg border border-primary-teal/30 flex items-center justify-center mb-6">
                      <div className="text-4xl">🌿</div>
                    </div>
                    <h3 className="text-xl font-bold text-soft-white mb-2">BIDARA Innovation Canvas</h3>
                    <p className="text-cloud-gray text-sm">Strategic framework for regenerative business design</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Link
                      href="/resources/bidara-innovation-canvas.html"
                      className="inline-flex items-center justify-center font-semibold transition-all duration-200 bg-primary-teal text-base-black hover:bg-bright-aqua hover:shadow-lg hover:shadow-primary-teal/25 px-8 py-4 text-lg rounded-xl group w-full"
                    >
                      Open Canvas
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="ml-2 transition-transform group-hover:translate-x-1">
                        <path d="M4 10h12m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </Link>
                    <p className="text-xs text-cloud-gray/70">
                      Interactive canvas • Web-based • Free to use
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <section className="py-16 bg-deep-charcoal/30 border-t border-gray-800">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <Link 
              href="/resources"
              className="inline-flex items-center text-cloud-gray hover:text-primary-teal transition-colors duration-200 font-medium"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mr-2">
                <path d="M12 4l-8 8 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              Back to Resources
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export const metadata = {
  title: 'BIDARA Innovation Canvas - Zokratiq',
  description: 'Biomimetic Innovation Design and Adaptive Resource Architecture. A strategic canvas for designing regenerative business models inspired by natural systems.',
}