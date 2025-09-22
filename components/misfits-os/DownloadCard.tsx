'use client'

import { motion } from 'framer-motion'

interface DownloadCardProps {
  downloadStarted: boolean
  onDownload: () => void
}

export default function DownloadCard({ downloadStarted, onDownload }: DownloadCardProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gradient-to-r from-weird-purple/10 to-primary-teal/10 border-2 border-weird-purple/20 rounded-xl p-8"
      >
        <div className="text-center">
          {downloadStarted ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-16 h-16 bg-primary-teal rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold text-primary-teal mb-4">
                Download Started!
              </h3>
              <p className="text-cloud-gray mb-6">
                Your Misfits OS Blueprint should be downloading now. If the download didn't start automatically, click the button below.
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-weird-purple/20 border-2 border-weird-purple rounded-full flex items-center justify-center mx-auto mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-weird-purple">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-weird-purple mb-4">
                Preparing Your Download...
              </h3>
              <p className="text-cloud-gray mb-6">
                Your Blueprint will download automatically in a few seconds. No action needed!
              </p>
            </>
          )}

          <button
            onClick={onDownload}
            className="inline-flex items-center justify-center px-6 py-3 bg-weird-purple text-white font-semibold rounded-lg hover:bg-weird-purple/80 transition-all duration-300"
          >
            {downloadStarted ? 'Download Again' : 'Download Now'}
          </button>

          <div className="mt-6 pt-6 border-t border-weird-purple/20">
            <div className="text-sm text-cloud-gray/80 space-y-2">
              <p><strong>Having trouble?</strong></p>
              <p>• Check your browser's download folder</p>
              <p>• Disable pop-up blockers for this site</p>
              <p>• Try a different browser if issues persist</p>
              <p>• Email us at hello@zokratiq.com for direct delivery</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Blueprint Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 bg-base-black/30 border border-primary-teal/20 rounded-lg p-6"
      >
        <h4 className="text-lg font-bold text-primary-teal mb-4 text-center">
          What's Inside Your 18-Page Blueprint
        </h4>

        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-weird-purple mr-2 mt-1">📊</span>
              <div>
                <strong className="text-soft-white">Cognitive Sameness Crisis</strong>
                <p className="text-cloud-gray/80">Why 73% of teams think alike + hidden costs</p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-weird-purple mr-2 mt-1">🏗️</span>
              <div>
                <strong className="text-soft-white">Misfits OS Framework</strong>
                <p className="text-cloud-gray/80">4-layer operating system for cognitive diversity</p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-weird-purple mr-2 mt-1">🎯</span>
              <div>
                <strong className="text-soft-white">16 Misfit Archetypes</strong>
                <p className="text-cloud-gray/80">Detailed hiring profiles + identification criteria</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-weird-purple mr-2 mt-1">⚡</span>
              <div>
                <strong className="text-soft-white">Activation Rituals</strong>
                <p className="text-cloud-gray/80">90-day integration playbook + templates</p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-weird-purple mr-2 mt-1">📈</span>
              <div>
                <strong className="text-soft-white">Implementation Roadmap</strong>
                <p className="text-cloud-gray/80">Phase-by-phase deployment guide</p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-weird-purple mr-2 mt-1">💼</span>
              <div>
                <strong className="text-soft-white">Quick Reference Guide</strong>
                <p className="text-cloud-gray/80">Diagnostic checklist + emergency interventions</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}