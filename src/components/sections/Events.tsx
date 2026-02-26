import { motion } from 'framer-motion'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import { stagger, cardUp, fadeUp, viewport, EASE } from '../../lib/animations'
import { SectionLabel } from '../ui'
import { EVENTS } from '../../constants/events'

export function Events() {
  return (
    <section id="events" className="py-28 lg:py-44 bg-chords-lighter">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div>
            <SectionLabel label="Upcoming" className="mb-5" />
            <h2
              className="text-white font-black leading-[1.01]"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.5rem)' }}
            >
              Events &amp; Programs
            </h2>
          </div>

          <a
            href="#"
            className="group self-start md:self-end mb-1 inline-flex items-center gap-2 text-gold text-[10px] font-semibold uppercase tracking-[0.25em] hover:gap-3.5 transition-all duration-300"
          >
            View All Events
            <ArrowRight
              size={13}
              className="group-hover:translate-x-0.5 transition-transform duration-300"
            />
          </a>
        </motion.div>

        {/* ── Cards ── */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-7"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {EVENTS.map((event, i) => (
            <motion.article
              key={event.title}
              className="group bg-chords-card border border-chords-border overflow-hidden hover:border-gold/28 transition-all duration-500"
              variants={cardUp}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video">
                <motion.img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.75, ease: EASE }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chords/55 to-transparent pointer-events-none" />

                {/* Category pill */}
                <div className="absolute top-4 left-4 bg-gold text-chords text-[8.5px] font-black px-3 py-[5px] tracking-[0.22em] uppercase">
                  {event.category}
                </div>

                {/* Index */}
                <div className="absolute bottom-4 right-4 text-white/30 font-black text-sm tracking-widest">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Body */}
              <div className="p-7 lg:p-8">
                {/* Left gold bar on hover */}
                <div className="flex gap-4">
                  <div className="w-[2px] bg-transparent group-hover:bg-gold transition-colors duration-500 shrink-0 self-stretch" />
                  <div>
                    <h3 className="text-white font-bold text-xl lg:text-[1.3rem] mb-3 group-hover:text-gold transition-colors duration-300 leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-white/42 text-[13px] leading-relaxed mb-6">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className="space-y-2.5 mb-7 pt-5 border-t border-chords-border">
                  <div className="flex items-center gap-2.5">
                    <Calendar size={12} className="text-gold shrink-0" />
                    <span className="text-white/38 text-[12.5px]">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin size={12} className="text-gold shrink-0" />
                    <span className="text-white/38 text-[12.5px]">{event.location}</span>
                  </div>
                </div>

                <a
                  href="#"
                  className="group/link inline-flex items-center gap-2 text-gold text-[10.5px] font-semibold uppercase tracking-[0.22em] hover:gap-3.5 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight
                    size={12}
                    className="group-hover/link:translate-x-0.5 transition-transform duration-300"
                  />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
