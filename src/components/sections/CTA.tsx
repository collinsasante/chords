import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionLabel, Button } from '../ui'
import { EASE } from '../../lib/animations'

export function CTA() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const rawImageY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const imageY = useSpring(rawImageY, { stiffness: 55, damping: 18 })

  return (
    <section id="join" ref={ref} className="relative py-36 lg:py-56 overflow-hidden">

      {/* ── Parallax background ── */}
      <motion.div
        className="absolute inset-0 scale-[1.25] will-change-transform"
        style={{ y: imageY }}
      >
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80"
          alt=""
          role="presentation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-chords/88" />
        <div className="absolute inset-0 bg-gradient-to-b from-chords via-transparent to-chords opacity-65" />
      </motion.div>

      {/* ── Large watermark text ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-white/[0.025] font-black uppercase tracking-tight leading-none"
          style={{ fontSize: 'clamp(7rem, 22vw, 20rem)' }}
        >
          REVIVAL
        </span>
      </div>

      {/* ── Horizontal rules ── */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 64 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <SectionLabel label="Be Part of Something Greater" centered className="mb-7" />

          <h2
            className="text-white font-black leading-[1.0] mb-8"
            style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.8rem)' }}
          >
            Be Part of the{' '}
            <em className="text-gold font-display not-italic">Sound</em>
            <br />
            of Revival
          </h2>

          <p className="text-white/42 text-base lg:text-[1.05rem] max-w-lg mx-auto mb-12 leading-[1.8]">
            Whether you have a voice, an instrument, or a passion for movement — there is a place for you in Chords Ministry. Join a non-denominational movement spreading God's Word through music and choreography since 2014.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('join-modal:open'))}
              className="inline-flex items-center gap-2 bg-gold text-chords font-black text-[10px] px-12 py-[18px] tracking-[0.22em] uppercase hover:bg-gold-light active:scale-[0.97] transition-all duration-300"
            >
              Join The Ministry
              <ArrowRight size={14} />
            </button>
            <Button href="#about" variant="outline" className="px-12 py-[18px]">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
