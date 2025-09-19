import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-base-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-teal via-transparent to-bright-aqua"></div>
          <div className="grain-overlay opacity-50"></div>
        </div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Privacy <span className="text-primary-teal">Policy</span>
              </h1>
              <p className="text-xl md:text-2xl font-serif text-cloud-gray mb-12 leading-relaxed">
                How we handle your data and respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 lg:py-32 bg-deep-charcoal/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <div className="space-y-8 text-cloud-gray">
              <div>
                <h2 className="text-2xl font-bold text-soft-white mb-4">Information We Collect</h2>
                <p>
                  We collect information you provide directly to us, such as when you contact us through our website,
                  subscribe to our newsletter, or engage with our services.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-soft-white mb-4">How We Use Your Information</h2>
                <p>
                  We use the information we collect to provide, maintain, and improve our services, communicate with you,
                  and develop new offerings that align with our mission of exploring post-normal possibilities.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-soft-white mb-4">Information Sharing</h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent,
                  except as described in this policy or as required by law.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-soft-white mb-4">Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information against unauthorized access,
                  alteration, disclosure, or destruction.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-soft-white mb-4">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us through our website or email.
                </p>
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
  title: 'Privacy Policy - Zokratiq',
  description: 'How Zokratiq handles your data and respects your privacy.',
}