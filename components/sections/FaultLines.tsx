'use client'

import { useEffect, useRef } from 'react'

interface FaultLineModule {
  id: string
  glyph: string
  title: string
  subhead: string
  description: string
  copy: string
  quote: string
  cta: string
  ctaLink?: string
}

const getCTALink = (id: string): string => {
  switch (id) {
    case 'great-resignation':
      return '/partner-with-us'
    case 'great-stagnation':
      return '/labs'
    case 'hyperspecialization':
      return '/work-is-weird'
    case 'cognitive-uniformity':
      return '/scan'
    case 'meta-crisis':
      return '/scan'
    case 'great-reconfiguration':
      return '/labs'
    default:
      return '/labs'
  }
}

const faultLines: FaultLineModule[] = [
  {
    id: 'great-resignation',
    glyph: '🪓',
    title: 'The Great Resignation',
    subhead: 'Why employees ghost their work',
    description: '50% say their job is meaningless. But this isn\'t laziness — it\'s a hunger for meaning.',
    copy: 'People aren\'t quitting because they\'re weak. They\'re quitting because the story broke. In a world drained of myth, sense-making becomes the new salary.',
    quote: '"I want to matter, not just clock in."',
    cta: 'Rebuild meaning with Curiosity Tribes'
  },
  {
    id: 'great-stagnation',
    glyph: '🛌',
    title: 'The Great Stagnation',
    subhead: 'Why innovation feels stale',
    description: 'Despite our tech, most organizations feel like they\'re sleepwalking.',
    copy: 'Speed without synthesis creates static. Insight needs friction, cross-pollination, myth. The future isn\'t faster — it\'s stranger.',
    quote: '"Progress without perception is just prettier entropy."',
    cta: 'Explore Frontier-Idea Briefings'
  },
  {
    id: 'hyperspecialization',
    glyph: '🧬',
    title: 'Hyperspecialization',
    subhead: 'Why brilliance is bored',
    description: 'We\'ve over-optimized ourselves into irrelevance.',
    copy: 'Your team doesn\'t need another specialist. It needs a neo-generalist — someone weird enough to connect the forgotten dots. New ideas live at the intersection, not the silo.',
    quote: '"Your T-shaped hire might need a circle brain."',
    cta: 'Meet the mis/fits'
  },
  {
    id: 'cognitive-uniformity',
    glyph: '🧠',
    title: 'Cognitive Uniformity',
    subhead: 'Why teams keep missing the obvious',
    description: 'Left-brain monoculture is a design flaw.',
    copy: 'We filter for sameness and call it intelligence. But divergent minds see what consensus can\'t. Inject right-brain imagination into your decision stack.',
    quote: '"Diversity without divergence is decoration."',
    cta: 'Run a Whole-Brain Audit'
  },
  {
    id: 'meta-crisis',
    glyph: '🧨',
    title: 'The Meta-Crisis',
    subhead: 'Why systems fail and everyone freezes',
    description: 'We sense collapse. But we think too small.',
    copy: 'Doom is addictive. Zero-sum is a trance. The real challenge is perception — not panic. To break the trance, break the lens.',
    quote: '"Fear is a system. We rewire it."',
    cta: 'Try a Reality Lens Scan'
  },
  {
    id: 'great-reconfiguration',
    glyph: '🎨',
    title: 'The Great Reconfiguration',
    subhead: 'Why the Creator Era is already here',
    description: 'We\'re shifting from Consumers to Co-Creators.',
    copy: 'The industrial model is dead. The brand-as-pipeline is over. The next advantage is co-agency, myth, resonance.',
    quote: '"You\'re not selling products. You\'re narrating futures."',
    cta: 'Join Zokratiq Labs'
  }
]

function HomepageFaultLineModule({ faultLine, index }: { faultLine: FaultLineModule; index: number }) {
  const moduleRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          // Trigger timeline animation
          if (timelineRef.current) {
            timelineRef.current.classList.add('timeline-animate')
          }
        }
      },
      { threshold: 0.2 }
    )

    if (moduleRef.current) {
      observer.observe(moduleRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const ctaLink = getCTALink(faultLine.id)

  return (
    <div 
      ref={moduleRef}
      className="fault-line-module animate-fade-in-up relative"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {/* Enhanced Timeline Elements */}
      <div className="absolute left-8 top-0 bottom-0 flex flex-col items-center z-10">
        {/* Pulsating Growth Circle */}
        <div 
          ref={timelineRef}
          className="timeline-circle timeline-circle-pulse w-8 h-8 rounded-full bg-gradient-to-br from-primary-teal to-bright-aqua border-2 border-primary-teal/50 relative flex-shrink-0 mt-20 shadow-lg shadow-primary-teal/25"
          style={{ 
            animationDelay: `${index * 0.5}s`,
            '--delay': `${index * 0.5}s`
          } as React.CSSProperties & { '--delay': string }}
        >
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-primary-teal/60 to-bright-aqua/60"></div>
          <div className="absolute inset-0 rounded-full border border-bright-aqua/40"></div>
        </div>
        
        {/* Elegant Connecting Line with Gradient */}
        {index < 5 && (
          <div className="relative flex-1 mt-6" style={{ minHeight: '200px' }}>
            <div 
              className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-teal via-primary-teal/60 to-primary-teal/20"
              style={{ 
                animationDelay: `${index * 0.3 + 0.5}s`
              }}
            ></div>
            {/* Subtle dots along the line */}
            <div className="absolute left-1/2 top-1/3 w-1 h-1 bg-primary-teal/60 rounded-full transform -translate-x-1/2 animate-pulse" style={{ animationDelay: `${index * 0.5 + 1}s` }}></div>
            <div className="absolute left-1/2 top-2/3 w-1 h-1 bg-bright-aqua/60 rounded-full transform -translate-x-1/2 animate-pulse" style={{ animationDelay: `${index * 0.5 + 1.5}s` }}></div>
          </div>
        )}
      </div>

      <div className="container mx-auto px-6 py-16 lg:py-24 pl-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-5xl lg:text-6xl glyph-shimmer flex-shrink-0">
              {faultLine.glyph}
            </div>
            <div className="flex-1">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3 stagger-fade-in">
                {faultLine.title}
              </h3>
              <p className="text-xl text-primary-teal font-semibold stagger-fade-in delay-100">
                {faultLine.subhead}
              </p>
            </div>
          </div>

          <div className="space-y-6 lg:pl-20">
            <p className="text-xl text-gray-200 leading-relaxed stagger-fade-in delay-200">
              {faultLine.description}
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed stagger-fade-in delay-300">
              {faultLine.copy}
            </p>
            
            <blockquote className="text-2xl lg:text-3xl font-medium text-white italic border-l-4 border-primary-teal pl-6 py-4 bg-deep-charcoal/20 rounded-r-lg stagger-fade-in delay-400">
              {faultLine.quote}
            </blockquote>
            
            <div className="pt-4 stagger-fade-in delay-500">
              <a 
                href={ctaLink}
                className="inline-flex items-center justify-center font-semibold transition-all duration-300 focus-ring disabled:opacity-50 disabled:pointer-events-none border-2 border-primary-teal text-primary-teal hover:bg-primary-teal hover:text-white hover:shadow-lg hover:shadow-primary-teal/25 hover:-translate-y-1 px-8 py-4 text-lg rounded-xl"
              >
                <span className="relative z-10">{faultLine.cta}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FaultLines() {
  return (
    <section id="fault-lines" className="fault-lines-section relative overflow-hidden bg-gradient-to-b from-deep-charcoal via-deep-charcoal to-base-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              The Cracks Beneath the System
            </h2>
            <div className="space-y-4 text-xl text-gray-300">
              <p className="font-medium">Business-as-usual is unraveling.</p>
              <p>
                We live in a time of multiple overlapping fractures — some visible, most not. 
                At Zokratiq, we call these <span className="text-primary-teal font-semibold">Fault Lines</span>: 
                deep discontinuities in the foundations of modern work, meaning, and value creation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-lg">
                <p className="text-primary-teal font-medium">Each one is a signal.</p>
                <p className="text-primary-teal font-medium">Each one demands new eyes.</p>
              </div>
            </div>
          </div>
        </div>

        {faultLines.map((faultLine, index) => (
          <HomepageFaultLineModule 
            key={faultLine.id} 
            faultLine={faultLine} 
            index={index}
          />
        ))}
      </div>

      <style jsx>{`
        .animate-fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease-out forwards;
        }
        
        .glyph-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .stagger-fade-in {
          opacity: 0;
          transform: translateY(16px);
          animation: staggerFadeIn 0.8s ease-out forwards;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        
        .timeline-circle {
          opacity: 0;
          transform: scale(0);
          animation: timelineCircleAppear 0.6s ease-out forwards;
        }
        
        .timeline-circle.timeline-animate {
          animation: timelineCircleAppear 0.6s ease-out forwards, pulse 2s infinite 0.8s;
        }
        
        .timeline-line {
          opacity: 0;
          transform: scaleY(0);
          transform-origin: top;
          animation: timelineLineGrow 0.8s ease-out forwards;
        }
        
        .animate-in .timeline-line {
          animation-play-state: running;
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; filter: brightness(1.2); }
        }
        
        @keyframes staggerFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes timelineCircleAppear {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes timelineLineGrow {
          to {
            opacity: 1;
            transform: scaleY(1);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }
        
        .fault-lines-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgb(20 184 166), transparent);
        }
      `}</style>
    </section>
  )
}