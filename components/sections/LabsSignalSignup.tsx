'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function LabsSignalSignup() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-16 bg-primary-teal">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-base-black/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-base-black mb-4">
                Stay ahead of the curve
              </h3>
              <p className="text-lg text-base-black/80 leading-relaxed max-w-2xl mx-auto">
                Get signal intelligence, frontier insights, and new artifacts delivered to your inbox. No noise — just clarity.
              </p>
            </div>
            
            <form 
              id="labs-subscribe-form" 
              method="post" 
              action="/api/subscribe" 
              aria-label="Subscribe to Zokratiq signal intelligence" 
              className="max-w-md mx-auto"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const email = formData.get('email') as string;
                
                // Basic email validation
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                  const subnote = document.getElementById('labs-form-subnote');
                  if (subnote) subnote.innerHTML = '<span class="text-red-600">That email looks off. Try again.</span>';
                  return;
                }
                
                const button = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                const subnote = document.getElementById('labs-form-subnote');
                
                button.disabled = true;
                button.textContent = 'Sending signal...';
                
                try {
                  const response = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      email: email,
                      utm_source: 'labs-page',
                      referrer: document.referrer || '',
                      website: formData.get('website') || ''
                    })
                  });
                  
                  const result = await response.json();
                  
                  if (response.ok) {
                    if (subnote) {
                      subnote.innerHTML = '<span class="text-base-black">Check your inbox — signal incoming.</span>';
                    }
                    button.innerHTML = '✓ Signal Received';
                    button.style.background = 'linear-gradient(135deg, #22c55e, #4ade80)';
                    button.style.borderColor = '#22c55e';
                    button.style.color = '#ffffff';
                  } else {
                    if (subnote) {
                      subnote.innerHTML = `<span class="text-red-600">${result.message || 'Something went wrong. Try again.'}</span>`;
                    }
                    button.disabled = false;
                    button.textContent = "Join Signal";
                  }
                } catch (error) {
                  if (subnote) {
                    subnote.innerHTML = '<span class="text-red-600">Network error. Try again later.</span>';
                  }
                  button.disabled = false;
                  button.textContent = "Join Signal";
                }
              }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="labs-email" className="sr-only">Email address</label>
                  <input 
                    id="labs-email" 
                    name="email" 
                    type="email" 
                    required 
                    placeholder="your@email.com" 
                    aria-required="true" 
                    autoComplete="email" 
                    className="w-full px-6 py-4 bg-base-black/20 border-2 border-base-black/30 rounded-xl text-base-black placeholder-base-black/60 focus:border-base-black focus:outline-none focus:ring-2 focus:ring-base-black/20 transition-all duration-200 text-lg" 
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="px-8 py-4 bg-base-black text-primary-teal font-semibold rounded-xl hover:bg-base-black/90 transition-all duration-300 text-lg whitespace-nowrap"
                >
                  Join Signal
                </button>
              </div>
              
              {/* honeypot */}
              <input type="text" name="website" id="labs-website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
              
              <p id="labs-form-subnote" className="text-sm text-base-black/70 mt-4 text-center">
                Signal intelligence & frontier insights • Unsubscribe anytime
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}