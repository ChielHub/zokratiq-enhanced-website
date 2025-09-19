import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manifesto for the Misfits | Zokratiq',
  description: 'Work was never meant to be this small. A manifesto for polymaths, divergent thinkers, and those who refuse to sand down their strangeness.',
  openGraph: {
    title: 'Manifesto for the Misfits',
    description: 'Work was never meant to be this small. A manifesto for polymaths, divergent thinkers, and those who refuse to sand down their strangeness.',
    type: 'article',
  },
}

export default function ManifestoPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-base-black via-deep-charcoal to-base-black pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-weird-purple/10 via-transparent to-deep-indigo/20"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-soft-white mb-8 font-playfair leading-tight">
              Manifesto for the Misfits
            </h1>
            
            <p className="text-2xl text-heritage-red font-semibold mb-12 font-serif italic">
              Work was never meant to be this small.
            </p>
            
            <div className="text-xl leading-relaxed text-cloud-gray max-w-3xl mx-auto mb-8">
              <p className="mb-6">You read obscure history at night.<br />
              You fall down physics rabbit holes on weekends.<br />
              You light up when philosophy, neuroscience, and poetry collide.</p>
              
              <p className="mb-6">Then Monday morning comes.<br />
              And the office asks you to make the deck a bit prettier.<br />
              The polymath inside you gets smothered by status updates.</p>
            </div>

            <div className="bg-heritage-red/10 border-l-4 border-heritage-red rounded-r-lg p-8 mb-8">
              <p className="text-xl text-heritage-red font-semibold">
                At Zokratiq, we call this the waste of wonder.
              </p>
            </div>

            <p className="text-xl text-cloud-gray mb-6">
              The world is starving for new ideas—yet organizations keep training the weird edges out of people.
            </p>

            <p className="text-2xl text-weird-purple font-semibold italic">
              This manifesto is for those edges.
            </p>
          </div>
        </div>
      </section>

      {/* Manifesto Points */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center text-weird-purple text-2xl font-mono mb-16">⸻</div>

            {/* Point 1 */}
            <div className="mb-16 pb-16 border-b border-cloud-gray/10">
              <div className="text-xl text-weird-purple font-bold font-mono mb-4">1.</div>
              <h2 className="text-4xl font-bold text-primary-teal mb-8 font-playfair leading-tight">
                We refuse to sand down the strangeness.
              </h2>
              <div className="text-xl leading-relaxed text-cloud-gray space-y-6">
                <p>The future belongs to the divergent. Homogeneity might be comfortable, but it kills signal.</p>
                <p><strong className="text-heritage-red">A boardroom with no freaks is a boardroom begging for blind spots.</strong></p>
              </div>
            </div>

            <div className="text-center text-weird-purple text-2xl font-mono mb-16">⸻</div>

            {/* Point 2 */}
            <div className="mb-16 pb-16 border-b border-cloud-gray/10">
              <div className="text-xl text-weird-purple font-bold font-mono mb-4">2.</div>
              <h2 className="text-4xl font-bold text-primary-teal mb-8 font-playfair leading-tight">
                We honor polymath energy.
              </h2>
              <div className="text-xl leading-relaxed text-cloud-gray space-y-6">
                <p>Your "irrelevant" late-night fascinations? <strong className="text-bright-aqua">They&apos;re jet fuel.</strong></p>
                <p>Consciousness research informs org design. History teaches strategy. Systems thinking powers growth.</p>
                <p><em className="text-warm-accent">The things HR ignores are the things that will save the company.</em></p>
              </div>
            </div>

            <div className="text-center text-weird-purple text-2xl font-mono mb-16">⸻</div>

            {/* Point 3 */}
            <div className="mb-16 pb-16 border-b border-cloud-gray/10">
              <div className="text-xl text-weird-purple font-bold font-mono mb-4">3.</div>
              <h2 className="text-4xl font-bold text-primary-teal mb-8 font-playfair leading-tight">
                We choose curiosity over conformity.
              </h2>
              <div className="text-xl leading-relaxed text-cloud-gray space-y-6">
                <p>Metrics matter. But meaning matters more.</p>
                <p>Progress isn&apos;t found in repeating the same playbooks. It comes from asking better questions—<strong className="text-primary-teal">questions that don&apos;t fit neatly in quarterly reports.</strong></p>
              </div>
            </div>

            <div className="text-center text-weird-purple text-2xl font-mono mb-16">⸻</div>

            {/* Point 4 */}
            <div className="mb-16 pb-16 border-b border-cloud-gray/10">
              <div className="text-xl text-weird-purple font-bold font-mono mb-4">4.</div>
              <h2 className="text-4xl font-bold text-primary-teal mb-8 font-playfair leading-tight">
                We believe business is human nature in drag.
              </h2>
              <div className="text-xl leading-relaxed text-cloud-gray space-y-6">
                <p><strong className="text-weird-purple">Work is weird because humans are weird.</strong></p>
                <p>Companies that suppress this will atrophy. Companies that amplify it will thrive.</p>
              </div>
            </div>

            <div className="text-center text-weird-purple text-2xl font-mono mb-16">⸻</div>

            {/* Point 5 */}
            <div className="mb-16">
              <div className="text-xl text-weird-purple font-bold font-mono mb-4">5.</div>
              <h2 className="text-4xl font-bold text-primary-teal mb-8 font-playfair leading-tight">
                We build in the Age of Wizardry.
              </h2>
              <div className="text-xl leading-relaxed text-cloud-gray space-y-6">
                <div className="bg-gradient-to-r from-deep-indigo/30 to-primary-teal/10 border-2 border-primary-teal rounded-lg p-8">
                  <p className="text-cloud-gray italic mb-4">The Age of Prophecy promised certainty. It gave us dashboards, templates, KPIs.</p>
                  <p className="text-primary-teal font-semibold">The Age of Wizardry requires something else: imagination, courage, and the willingness to be misunderstood until you&apos;re proven right.</p>
                </div>
              </div>
            </div>

            <div className="text-center text-weird-purple text-2xl font-mono mb-16">⸻</div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-deep-charcoal/80 border border-weird-purple/30 rounded-2xl p-12 text-center">
              <p className="text-2xl text-warm-accent font-semibold mb-8 font-serif italic">
                Here&apos;s the secret no one wants to admit:
              </p>
              
              <div className="text-xl leading-relaxed text-cloud-gray space-y-6 mb-12">
                <p><strong className="text-soft-white">Having to work is weird anyway.</strong></p>
                <p>Strangers in matching lanyards, pretending spreadsheets are sacred, trading their best hours for someone else&apos;s plan.</p>
                <p className="text-heritage-red font-semibold text-2xl">The world doesn&apos;t need more obedient professionals.</p>
                <p className="text-bright-aqua text-2xl font-semibold">It needs you—wild, cross-wired, unclassifiable.</p>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-weird-purple/20 to-bright-aqua/10 border-2 border-primary-teal/30 rounded-lg p-8 mb-8">
                <h3 className="text-3xl font-bold text-weird-purple mb-6 font-playfair">This is our invitation:</h3>
                <div className="text-xl text-soft-white space-y-3 mb-8">
                  <p>Bring your whole, weird self.</p>
                  <p>Turn outside interests into inside edge.</p>
                  <p className="text-2xl text-bright-aqua font-bold italic font-playfair">Let&apos;s make work weird again.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/misfits/" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-weird-purple to-bright-aqua text-base-black font-semibold rounded-lg hover:shadow-lg hover:shadow-weird-purple/25 transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Join the Misfits →
                  </a>
                  <a 
                    href="/partner-with-us/" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-warm-accent border-2 border-warm-accent font-semibold rounded-lg hover:bg-warm-accent hover:text-base-black transition-all duration-300"
                  >
                    Start a Conversation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}