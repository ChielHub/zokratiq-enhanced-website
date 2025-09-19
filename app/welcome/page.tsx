import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Welcome to The Signal - Zokratiq',
  description: 'Welcome to The Signal - your gateway to reality exploration artifacts from Zokratiq.',
  robots: 'noindex, nofollow'
}

export default function WelcomePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `nav { display: none !important; }`
      }} />
      <main className="min-h-screen bg-base-black text-soft-white flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <img src="/zokratiq-logo-new.jpeg" alt="Zokratiq" className="w-16 h-16 rounded-full object-cover mx-auto mb-6"/>
          <div className="font-bold text-soft-white text-2xl mb-2">Zokratiq</div>
          <div className="text-sm font-mono text-primary-teal uppercase tracking-wider">Reality Exploration Studio</div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-teal mb-6">Welcome to The Signal</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-teal to-bright-aqua mx-auto mb-8"></div>
          </div>
          
          <div className="space-y-6 text-lg md:text-xl text-cloud-gray leading-relaxed max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl font-serif text-soft-white font-semibold">
              Your inbox just became a gate.
            </p>
            
            <p>You&apos;re now connected to <span className="text-primary-teal font-semibold">The Signal</span> — our irregular transmission of reality exploration artifacts.</p>
            
            <p>What you&apos;ll receive: new frameworks, prompts, and tools that nudge perception. Not noise. Delivered infrequently, intentionally.</p>
            
            <div className="bg-deep-charcoal/50 border border-primary-teal/20 rounded-lg p-8 my-12">
              <div className="text-2xl mb-4">📡</div>
              <p className="text-primary-teal font-semibold text-lg mb-4">First transmission incoming soon</p>
              <p className="text-base">Add <span className="font-mono text-bright-aqua">hello@zokratiq.com</span> to your safe senders to ensure our artifacts reach you.</p>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800">
            <p className="text-lg font-serif italic text-primary-teal mb-6">
              &ldquo;This is where the useful things hide.&rdquo;
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/" className="inline-flex items-center px-6 py-3 bg-primary-teal text-base-black font-semibold rounded-lg hover:bg-bright-aqua transition-all duration-300">
                ← Back to Zokratiq
              </a>
              <a href="/resources/" className="inline-flex items-center px-6 py-3 border-2 border-primary-teal/60 text-primary-teal font-semibold rounded-lg hover:border-primary-teal hover:bg-primary-teal/10 transition-all duration-300">
                Explore Resources
              </a>
            </div>
          </div>

          <div className="pt-8 text-sm text-cloud-gray/60">
            <p className="mb-2">— The Zokratiq Team</p>
            <p className="font-mono">Reality Exploration Studio</p>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}