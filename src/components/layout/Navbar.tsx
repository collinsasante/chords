import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../../constants/navigation'
import { useScrollLock } from '../../hooks/useScrollLock'
import { EASE } from '../../lib/animations'
import chordsLogo from '../../chords.png'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useScrollLock(open)

  return (
    <>
      <motion.nav
        className={[
          'fixed top-0 inset-x-0 z-50 transition-all duration-700',
          scrolled
            ? 'bg-chords/96 backdrop-blur-2xl border-b border-chords-border shadow-[0_1px_0_0_rgba(255,255,255,0.03)]'
            : 'bg-transparent',
        ].join(' ')}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-28 lg:h-32">

          {/* ── Logo ── */}
          <a href="#home" className="group flex items-center">
            <img
              src={chordsLogo}
              alt="Chords Ministry"
              className="h-24 lg:h-28 w-auto object-contain group-hover:opacity-85 transition-opacity duration-300"
            />
          </a>

          {/* ── Desktop links ── */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-white/55 hover:text-white text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-400" />
              </a>
            ))}
          </div>

          {/* ── Right side ── */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('join-modal:open'))}
              className="hidden lg:inline-flex items-center bg-gold text-chords font-black text-[10px] px-7 py-3 tracking-[0.22em] uppercase hover:bg-gold-light active:scale-[0.97] transition-all duration-300"
            >
              Join Us
            </button>

            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:text-gold transition-colors duration-300"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'close' : 'open'}
                  initial={{ rotate: open ? -90 : 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: open ? 90 : -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile full-screen overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-chords/98 backdrop-blur-2xl flex flex-col lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {/* Gold top accent */}
            <div className="h-[2px] bg-gold w-full" />

            <div className="flex flex-col justify-center items-center h-full gap-7 px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-white/65 hover:text-gold text-[2.4rem] font-black tracking-widest uppercase transition-colors duration-300"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: EASE }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.button
                className="mt-6 bg-gold text-chords font-black text-sm px-14 py-4 tracking-[0.22em] uppercase hover:bg-gold-light transition-all duration-300"
                onClick={() => { setOpen(false); window.dispatchEvent(new CustomEvent('join-modal:open')) }}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + NAV_LINKS.length * 0.07, duration: 0.5, ease: EASE }}
              >
                Join Us
              </motion.button>

              {/* Subtle tagline at bottom */}
              <motion.p
                className="absolute bottom-10 text-white/20 text-xs tracking-[0.4em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Raising Kingdom Voices
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
