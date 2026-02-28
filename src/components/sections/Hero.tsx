import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ChevronDown, Play } from 'lucide-react'
import { clipReveal, EASE } from '../../lib/animations'
import { Button } from '../ui'
import heroBg from '../../CosmicKreatifStudios294.jpg'

// YouTube video IDs to cycle as the hero background
const YT_ID = 'ML_RwZ3EhiM'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: containerRef })

  // Content fades + drifts up as user scrolls away
  const rawOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const rawContentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 25 })
  const contentY = useSpring(rawContentY, { stiffness: 60, damping: 20 })

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden"
    >
      {/* ── Static image fallback (always visible while video loads) ── */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          role="presentation"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── YouTube video background (muted autoplay, covers fallback once loaded) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <iframe
          src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_ID}&controls=0&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&disablekb=1`}
          allow="autoplay; encrypted-media; picture-in-picture"
          title="Chords Ministry — background"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            /* Always cover the container regardless of viewport ratio */
            width: 'max(177.78vh, 100%)',
            height: 'max(56.25vw, 100%)',
            minWidth: '100%',
            minHeight: '100%',
            border: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ── Multi-layer dark overlay for text legibility ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-chords/65 via-chords/50 to-chords pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-chords/20 via-transparent to-chords/20 pointer-events-none" />

      {/* ── Noise grain ── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* ── Hero content ── */}
      <motion.div
        className="relative z-10 text-center max-w-6xl mx-auto px-6 lg:px-12"
        style={{ y: contentY, opacity }}
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-10 lg:mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
          <span className="h-px w-8 bg-gold" />
          <span className="text-gold text-[10px] font-semibold tracking-[0.48em] uppercase">
            Excellence in Harmony · UENR, Sunyani
          </span>
          <span className="h-px w-8 bg-gold" />
        </motion.div>

        {/* ── Clip-reveal heading — each line slides up from behind ── */}
        <h1
          className="font-black leading-[0.92] tracking-tight mb-10 lg:mb-14"
          style={{ fontSize: 'clamp(3.8rem, 11.5vw, 11rem)' }}
        >
          {['Raising', 'Kingdom', 'Voices'].map((word, i) => (
            <div key={word} className="overflow-hidden block">
              <motion.span
                className={`block ${i === 1 ? 'text-gold italic font-display' : 'text-white'}`}
                variants={clipReveal}
                custom={i}
                initial="hidden"
                animate="visible"
              >
                {word}
              </motion.span>
            </div>
          ))}

          {/* Mobile-only: "Chords Ministry" label as 4th line */}
          <div className="block lg:hidden overflow-hidden mt-3">
            <motion.span
              className="block text-gold/80 font-black tracking-[0.32em] uppercase"
              style={{ fontSize: 'clamp(1rem, 4.5vw, 1.4rem)' }}
              variants={clipReveal}
              custom={3}
              initial="hidden"
              animate="visible"
            >
              Chords Ministry
            </motion.span>
          </div>
        </h1>

        {/* Subtext */}
        <motion.p
          className="text-white/48 text-base lg:text-[1.1rem] max-w-[480px] mx-auto mb-12 leading-[1.75]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15, ease: EASE }}
        >
          A non-denominational music group at UENR, Sunyani. Spreading the Word of God through music and choreography since 2014.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.35, ease: EASE }}
        >
          <Button href="#join" variant="primary" onClick={() => window.dispatchEvent(new CustomEvent('join-modal:open'))}>
            Join Us
          </Button>

          <Button href="#events" variant="outline">
            <span className="w-6 h-6 rounded-full border border-white/30 group-hover:border-gold flex items-center justify-center transition-colors duration-300 shrink-0">
              <Play size={9} fill="currentColor" className="ml-[1px]" />
            </span>
            Watch Ministrations
          </Button>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.7 }}
      >
        <span className="text-white/25 text-[9px] tracking-[0.35em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-white/25" />
        </motion.div>
      </motion.div>

      {/* Fade into next section */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-chords to-transparent pointer-events-none" />
    </section>
  )
}
