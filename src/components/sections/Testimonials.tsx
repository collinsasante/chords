import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { fadeUp, viewport, EASE } from '../../lib/animations'
import { SectionLabel } from '../ui'
import { TESTIMONIALS } from '../../constants/testimonials'

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (index: number) => {
    setDir(index > current ? 1 : -1)
    setCurrent(index)
  }

  const prev = () => go((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => go((current + 1) % TESTIMONIALS.length)

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      setDir(1)
      setCurrent((i) => (i + 1) % TESTIMONIALS.length)
    }, 6500)
    return () => clearInterval(id)
  }, [])

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 70 : -70, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.55, ease: EASE } },
    exit: (d: number) => ({ x: d > 0 ? -70 : 70, opacity: 0, transition: { duration: 0.3, ease: EASE } }),
  }

  return (
    <section className="relative py-28 lg:py-44 bg-chords-lighter overflow-hidden">

      {/* ── Watermark quote mark ── */}
      <div
        className="absolute -top-16 -left-8 font-display font-black text-white/[0.028] leading-none select-none pointer-events-none"
        style={{ fontSize: 'clamp(10rem, 28vw, 22rem)' }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <SectionLabel label="Testimonials" centered className="mb-5" />
          <h2
            className="text-white font-black leading-[1.01]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)' }}
          >
            What Members Say
          </h2>
        </motion.div>

        {/* ── Slider ── */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative bg-chords-card border border-chords-border p-10 lg:p-14 overflow-hidden"
            >
              {/* Subtle gold corner accent */}
              <div className="absolute top-0 left-0 w-10 h-[2px] bg-gold" />
              <div className="absolute top-0 left-0 w-[2px] h-10 bg-gold" />

              {/* Large quote */}
              <div
                className="font-display font-black text-gold/10 leading-none mb-5 select-none"
                style={{ fontSize: '4.5rem', lineHeight: 1 }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              {/* Quote text */}
              <blockquote className="text-white/72 text-base lg:text-[1.15rem] leading-[1.8] mb-10 italic font-light">
                {TESTIMONIALS[current].quote}
              </blockquote>

              {/* Divider */}
              <div className="h-px w-12 bg-gold/40 mb-8" />

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={TESTIMONIALS[current].avatar}
                  alt={TESTIMONIALS[current].name}
                  className="w-12 h-12 lg:w-[52px] lg:h-[52px] rounded-full object-cover border-[1.5px] border-gold/35"
                />
                <div>
                  <div className="text-white font-bold text-[15px]">
                    {TESTIMONIALS[current].name}
                  </div>
                  <div className="text-white/35 text-[12px] mt-0.5">
                    {TESTIMONIALS[current].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Controls ── */}
          <div className="flex items-center justify-between mt-7">
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-11 h-11 border border-chords-border text-white/38 hover:border-gold hover:text-gold flex items-center justify-center transition-all duration-300"
            >
              <ChevronLeft size={17} />
            </button>

            {/* Progress dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-[3px] rounded-full transition-all duration-400 ${
                    i === current ? 'w-8 bg-gold' : 'w-[14px] bg-chords-border'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next"
              className="w-11 h-11 border border-chords-border text-white/38 hover:border-gold hover:text-gold flex items-center justify-center transition-all duration-300"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
