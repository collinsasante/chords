import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { slideLeft, slideRight, fadeUp, stagger, viewport, EASE } from '../../lib/animations'
import { SectionLabel } from '../ui'

const STATS = [
  { value: '100+', label: 'Active Members' },
  { value: '10+', label: 'Years of Ministry' },
  { value: '2014', label: 'Founded' },
]

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-28 lg:py-44 bg-chords-lighter">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} className="grid lg:grid-cols-2 gap-14 lg:gap-28 items-center">

          {/* ── Image column ── */}
          <motion.div
            className="relative"
            variants={slideLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Decorative border — top-left */}
            <div className="absolute -top-5 -left-5 w-28 h-28 border border-gold/18 pointer-events-none z-10" />

            {/* Ministry video — starts at 40:00 */}
            <div className="relative overflow-hidden aspect-video">
              <iframe
                src="https://www.youtube.com/embed/7Jg_MHPJSrc?start=2400&rel=0&modestbranding=1&color=white&iv_load_policy=3"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title="Chords Ministry — ministry video"
                loading="lazy"
              />
            </div>

            {/* Floating gold stat card */}
            <motion.div
              className="absolute -bottom-8 -right-4 lg:-right-8 bg-gold px-7 py-6 shadow-2xl shadow-gold/15"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            >
              <div className="text-chords font-black text-5xl leading-none">2014</div>
              <div className="text-chords/65 text-[9px] font-bold uppercase tracking-[0.3em] mt-1.5">
                Est. UENR Sunyani
              </div>
            </motion.div>

            {/* Decorative border — bottom-left */}
            <div className="absolute -bottom-14 -left-5 w-16 h-16 border border-gold/10 pointer-events-none" />
          </motion.div>

          {/* ── Text column ── */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <SectionLabel label="About Us" className="mb-5" />

            <h2
              className="text-white font-black leading-[1.01] mb-8"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.3rem)' }}
            >
              Who We Are
            </h2>

            <div className="space-y-5 mb-12 text-white/52 text-base lg:text-[1.05rem] leading-[1.8]">
              <p>
                Chords Ministry is a non-denominational music group born on the campus of the University of Energy and Natural Resources (UENR), Sunyani. Since 2014, we have existed for one purpose: to spread the Word of God through the transformative power of music and choreography.
              </p>
              <p>
                We believe every note is a declaration and every movement is an act of worship. Through our annual events, campus outreaches, and intentional community, we carry the sound of the Gospel beyond four walls, into hearts, halls, and lives across campus and beyond.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              className="pt-10 border-t border-chords-border grid grid-cols-3 gap-4"
              variants={stagger}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {STATS.map((stat) => (
                <motion.div key={stat.label} variants={fadeUp}>
                  <div className="text-gold font-black text-[2.2rem] lg:text-[2.6rem] leading-none mb-1.5">
                    {stat.value}
                  </div>
                  <div className="text-white/30 text-[9px] font-semibold uppercase tracking-[0.2em] leading-snug">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
