import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-black text-soft-white flex items-center justify-center px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div>
          {/* Large 404 */}
          <h1 className="text-8xl md:text-9xl font-bold text-primary-teal mb-8 tracking-wider">404</h1>
          
          {/* Main heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-8">
            You're in the Right Place
          </h2>
          
          {/* Main copy */}
          <div className="space-y-6 text-lg md:text-xl text-cloud-gray leading-relaxed mb-12">
            <p>
              Everyone else tells you this is an error.<br/>
              <span className="text-soft-white font-semibold">We disagree.</span>
            </p>
            
            <p>
              You've just found the page that refuses to exist.<br/>
              The blind spot, the misfit pixel, the space where rules collapse.
            </p>
            
            <p>
              Most sites tidy this away.<br/>
              <span className="text-primary-teal font-semibold">We think it's a feature.</span>
            </p>
          </div>
          
          {/* CTA with pointer */}
          <div className="mb-12">
            <p className="text-xl text-soft-white mb-6">
              👉 You can step back to{' '}
              <Link 
                href="/" 
                className="text-primary-teal hover:text-bright-aqua underline font-semibold transition-colors duration-200"
              >
                Home
              </Link>
              , but sometimes the best discoveries start in the "wrong" place.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="border-t border-gray-800 pt-8">
            <h3 className="text-lg font-semibold text-soft-white mb-6">Quick Navigation</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/labs"
                className="text-cloud-gray hover:text-primary-teal transition-colors duration-200 py-2 border-b border-transparent hover:border-primary-teal"
              >
                Labs
              </Link>
              <Link
                href="/work-is-weird"
                className="text-cloud-gray hover:text-primary-teal transition-colors duration-200 py-2 border-b border-transparent hover:border-primary-teal"
              >
                mis/fits
              </Link>
              <Link
                href="/scan"
                className="text-cloud-gray hover:text-primary-teal transition-colors duration-200 py-2 border-b border-transparent hover:border-primary-teal"
              >
                Reality Scan
              </Link>
              <Link
                href="/about"
                className="text-cloud-gray hover:text-primary-teal transition-colors duration-200 py-2 border-b border-transparent hover:border-primary-teal"
              >
                About
              </Link>
            </div>
          </div>
          
          <p className="text-sm text-cloud-gray/60 mt-8 font-mono">
            The future belongs to the perceptive.
          </p>
        </div>
      </div>
    </div>
  )
}