import Link from 'next/link'

export default function TaoJonesIndexPage() {
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
                Performance Index
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                The <span className="text-primary-teal">Tao Jones</span> Index
              </h1>
              <div className="text-xl md:text-2xl font-serif text-cloud-gray mb-12 leading-relaxed">
                <p className="mb-4 text-bright-aqua font-semibold">The Dow measures dollars. We measure difference.</p>
                <p>The TJI measures what really drives performance: boardroom cognitive diversity, temperament, and policy courage.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 lg:py-32 bg-deep-charcoal/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-8">
                  What We Measure
                </h2>
                
                <div className="space-y-8 text-cloud-gray leading-relaxed">
                  <div>
                    <h3 className="text-xl font-semibold text-primary-teal mb-3">Cognitive Diversity (40%)</h3>
                    <p>How different are the thinking patterns, backgrounds, and mental models of your leadership team?</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-primary-teal mb-3">Temperament Mix (35%)</h3>
                    <p>What's the balance of personalities, risk appetites, and decision-making styles?</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-primary-teal mb-3">Policy Courage (25%)</h3>
                    <p>How willing is leadership to make difficult decisions and challenge conventional wisdom?</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-gradient-to-br from-deep-charcoal via-base-black to-deep-charcoal border border-primary-teal/20 rounded-2xl p-8">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-2xl font-bold text-soft-white mb-2">Your TJI Score</h3>
                    <p className="text-cloud-gray">Discover your organization's cognitive performance index</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Link
                      href="/resources/tao-jones-index/questionnaire"
                      className="block w-full py-4 px-6 bg-primary-teal text-base-black font-semibold rounded-lg text-center hover:bg-bright-aqua transition-colors duration-200"
                    >
                      Take the Assessment
                    </Link>
                    
                    <Link
                      href="/resources/tao-jones-index/methodology"  
                      className="block w-full py-3 px-6 border border-primary-teal/50 text-primary-teal font-medium rounded-lg text-center hover:bg-primary-teal/10 transition-colors duration-200"
                    >
                      View Methodology
                    </Link>
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
  title: 'The Tao Jones Index - Zokratiq',
  description: 'The Tao Jones Index (TJI): measuring boardroom cognitive diversity, temperament, and policy courage. The Dow measures dollars. We measure difference.',
  keywords: 'boardroom diversity, cognitive diversity, Tao Jones Index, corporate governance, risk assessment',
}