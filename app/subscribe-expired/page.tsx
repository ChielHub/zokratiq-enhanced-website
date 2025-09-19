import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Confirmation Expired - Zokratiq',
  description: 'Your newsletter confirmation link has expired. Subscribe again to join The Signal.',
  robots: 'noindex, nofollow'
}

export default function SubscribeExpiredPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `nav { display: none !important; }`
      }} />
      <main className="min-h-screen bg-base-black text-soft-white flex items-center justify-center px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <img src="/zokratiq-logo-new.jpeg" alt="Zokratiq" className="w-16 h-16 rounded-full object-cover mx-auto mb-6"/>
          <div className="font-bold text-soft-white text-2xl mb-2">Zokratiq</div>
          <div className="text-sm font-mono text-primary-teal uppercase tracking-wider">Reality Exploration Studio</div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-heritage-red mb-6">Link Expired</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-heritage-red to-warm-accent mx-auto mb-8"></div>
          </div>
          
          <div className="space-y-6 text-lg md:text-xl text-cloud-gray leading-relaxed">
            <div className="text-6xl mb-6">⏰</div>
            
            <p className="text-xl font-serif text-soft-white">
              This confirmation link has expired or is invalid.
            </p>
            
            <p>Newsletter confirmation links are valid for 48 hours. If you&apos;d still like to receive <span className="text-primary-teal font-semibold">The Signal</span>, please subscribe again.</p>
            
            <div className="bg-deep-charcoal/50 border border-heritage-red/20 rounded-lg p-8 my-12">
              <p className="text-heritage-red font-semibold text-lg mb-4">What happened?</p>
              <ul className="text-base text-left max-w-md mx-auto space-y-2">
                <li>• The confirmation link may have expired (48 hours)</li>
                <li>• The link may have been used already</li>
                <li>• There might have been a typo in the URL</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800">
            <p className="text-lg font-serif italic text-cloud-gray mb-6">
              &ldquo;Every ending is a new beginning.&rdquo;
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/resources/" className="inline-flex items-center px-6 py-3 bg-primary-teal text-base-black font-semibold rounded-lg hover:bg-bright-aqua transition-all duration-300">
                Subscribe Again
              </a>
              <a href="/" className="inline-flex items-center px-6 py-3 border-2 border-primary-teal/60 text-primary-teal font-semibold rounded-lg hover:border-primary-teal hover:bg-primary-teal/10 transition-all duration-300">
                ← Back to Zokratiq
              </a>
            </div>
          </div>

          <div className="pt-8 text-sm text-cloud-gray/60">
            <p className="mb-2">Need help?</p>
            <p className="font-mono text-primary-teal">hello@zokratiq.com</p>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}