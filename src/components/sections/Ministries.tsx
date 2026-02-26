import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { staggerSlow, cardUp, fadeUp, viewport, EASE } from '../../lib/animations'
import { SectionLabel } from '../ui'
import { MINISTRIES } from '../../constants/ministries'

/** 3-D perspective tilt card driven by mouse position */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 200, damping: 28, restDelta: 0.001 }
  const rotateX = useSpring(useTransform(y, [-60, 60], [6, -6]), springConfig)
  const rotateY = useSpring(useTransform(x, [-60, 60], [-6, 6]), springConfig)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

export function Ministries() {
  return (
    <section id="ministries" className="py-28 lg:py-44 bg-chords">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-20 lg:mb-24"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <SectionLabel label="What We Do" centered className="mb-5" />
          <h2
            className="text-white font-black leading-[1.01]"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.5rem)' }}
          >
            Our Ministries
          </h2>
        </motion.div>

        {/* ── Cards grid ── */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          variants={staggerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {MINISTRIES.map((item, i) => (
            <motion.div key={item.title} variants={cardUp}>
              <TiltCard className="h-full">
                <div className="group relative h-full bg-chords-card border border-chords-border p-8 lg:p-9 overflow-hidden hover:border-gold/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/6 transition-all duration-500 cursor-default">

                  {/* Background number */}
                  <div
                    className="absolute -top-3 -right-1 font-black text-white/[0.035] leading-none select-none pointer-events-none"
                    style={{ fontSize: '5.5rem', fontVariantNumeric: 'tabular-nums' }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Top accent line — animates on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  {/* Icon box */}
                  <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-7 group-hover:bg-gold/18 transition-colors duration-400">
                    <item.icon
                      size={22}
                      className="text-gold transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-white font-bold text-[1.1rem] mb-3 group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/42 text-[13px] leading-[1.75]">
                    {item.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
