import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { SectionLabel } from '../ui'
import { fadeUp, viewport } from '../../lib/animations'

const YOUTUBE_ID = 'ML_RwZ3EhiM'

export function Videos() {
  return (
    <section id="videos" className="py-28 lg:py-44 bg-chords-lighter">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <SectionLabel label="Watch Us" centered className="mb-5" />
          <h2
            className="text-white font-black leading-[1.01] mb-4"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.5rem)' }}
          >
            Ministrations
          </h2>
          <p className="text-white/38 text-[14px] max-w-md mx-auto leading-relaxed">
            Experience the sound of revival: live worship, teachings, and moments from our ministry.
          </p>
        </motion.div>

        {/* ── YouTube featured video ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className="relative aspect-video bg-chords-card border border-chords-border overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1&color=white&iv_load_policy=3`}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title="Chords Ministry — featured ministration"
              loading="lazy"
            />
          </div>

          {/* Label + YouTube link */}
          <div className="flex items-center justify-between mt-4 px-1">
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-4 bg-gold" />
              <span className="text-white/50 text-[11px] font-medium uppercase tracking-[0.25em]">
                Featured Ministration
              </span>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${YOUTUBE_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group/yt inline-flex items-center gap-1.5 text-white/35 text-[11px] hover:text-gold transition-colors duration-300"
            >
              Watch on YouTube
              <ExternalLink size={11} className="group-hover/yt:translate-x-0.5 transition-transform duration-300" />
            </a>
          </div>
        </motion.div>

        {/* ── Follow CTA ── */}
        <motion.div
          className="mt-14 pt-12 border-t border-chords-border flex flex-col sm:flex-row items-center justify-between gap-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div>
            <p className="text-white font-bold text-lg mb-1">Follow our journey</p>
            <p className="text-white/38 text-sm">Stay connected with the latest from Chords Ministry</p>
          </div>
          <a
            href="https://www.youtube.com/@chordsministry"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-gold text-chords text-[11px] font-black uppercase tracking-[0.2em] px-8 py-3.5 hover:bg-gold-light transition-all duration-300"
          >
            Subscribe on YouTube
          </a>
        </motion.div>

      </div>
    </section>
  )
}
