import Link from 'next/link'

export default function RealityExplorersGuidePage() {
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
                Strategic Resource
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                📖 Reality Explorers <span className="text-primary-teal">Guide</span>
              </h1>
              <div className="text-xl md:text-2xl font-serif text-cloud-gray mb-12 leading-relaxed">
                <p className="mb-4 text-bright-aqua font-semibold">Navigate post-normal times with practical tools.</p>
                <p>A strategic guide for leaders, founders, and curious minds ready to explore beyond conventional frameworks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Preview Section */}
      <section className="py-24 lg:py-32 bg-deep-charcoal/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-8">
                  What's Inside
                </h2>
                
                <div className="space-y-6 text-cloud-gray leading-relaxed">
                  <div className="flex items-start space-x-3">
                    <span className="text-primary-teal text-xl mt-1">•</span>
                    <div>
                      <h3 className="font-semibold text-soft-white mb-2">Reality Scanning Protocols</h3>
                      <p>Frameworks for detecting paradigm shifts and hidden opportunities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-primary-teal text-xl mt-1">•</span>
                    <div>
                      <h3 className="font-semibold text-soft-white mb-2">Sense-Making Tools</h3>
                      <p>Practical methods for navigating uncertainty and complexity</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-primary-teal text-xl mt-1">•</span>
                    <div>
                      <h3 className="font-semibold text-soft-white mb-2">Strategic Canvases</h3>
                      <p>Visual frameworks for mapping futures and possibilities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-primary-teal text-xl mt-1">•</span>
                    <div>
                      <h3 className="font-semibold text-soft-white mb-2">Case Studies</h3>
                      <p>Real-world applications from organizations navigating change</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-deep-charcoal via-base-black to-deep-charcoal border border-primary-teal/20 rounded-2xl p-8 relative overflow-hidden">
                  {/* Preview content */}
                  <div className="text-center mb-8">
                    <div className="w-24 h-32 mx-auto bg-gradient-to-br from-primary-teal/20 to-bright-aqua/20 rounded-lg border border-primary-teal/30 flex items-center justify-center mb-6">
                      <div className="text-3xl">📖</div>
                    </div>
                    <h3 className="text-xl font-bold text-soft-white mb-2">Reality Explorers Guide</h3>
                    <p className="text-cloud-gray text-sm">Strategic toolkit for post-normal times</p>
                  </div>
                  
                  <div className="space-y-4">
                    <a
                      href="/reality-explorers-guide.pdf"
                      className="inline-flex items-center justify-center font-semibold transition-all duration-200 bg-primary-teal text-base-black hover:bg-bright-aqua hover:shadow-lg hover:shadow-primary-teal/25 px-8 py-4 text-lg rounded-xl group w-full"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download Guide
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="ml-2 transition-transform group-hover:translate-y-1">
                        <path d="M4 12l6 6 6-6M10 2v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </a>
                    <p className="text-xs text-cloud-gray/70">
                      PDF • 42 pages • Free download
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
  title: 'Reality Explorers Guide - Zokratiq',
  description: 'Strategic toolkit for navigating post-normal times. Practical frameworks, tools and methods for leaders exploring beyond conventional boundaries.',
}