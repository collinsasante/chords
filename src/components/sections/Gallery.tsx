import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { fadeUp, viewport } from '../../lib/animations'
import { SectionLabel } from '../ui'

const PIXIESET_URL = 'https://cosmickreatifstudios70.pixieset.com/ayeyisoronko25/'

export function Gallery() {
  return (
    <section id="gallery" className="py-28 lg:py-44 bg-chords">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <SectionLabel label="Moments" centered className="mb-5" />
          <h2
            className="text-white font-black leading-[1.01] mb-4"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.5rem)' }}
          >
            Gallery
          </h2>
          <p className="text-white/38 text-[14px] max-w-sm mx-auto leading-relaxed">
            Glimpses of worship, community, and encounters with the living God.
          </p>
        </motion.div>

        {/* ── Pixieset embedded gallery ── */}
        <motion.div
          className="border border-chords-border overflow-hidden"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <iframe
            src={PIXIESET_URL}
            title="Chords Ministry — Photo Gallery"
            className="w-full"
            style={{ height: '85vh', minHeight: '600px', border: 'none' }}
            loading="lazy"
            allowFullScreen
          />
        </motion.div>

        {/* ── Open full gallery link ── */}
        <motion.div
          className="mt-6 flex justify-end"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <a
            href={PIXIESET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/35 text-[11px] font-medium uppercase tracking-[0.25em] hover:text-gold transition-colors duration-300"
          >
            Open full gallery
            <ExternalLink size={11} />
          </a>
        </motion.div>

      </div>
    </section>
  )
}
