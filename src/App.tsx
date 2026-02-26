import { useScroll, useSpring, motion } from 'framer-motion'
import { Navbar, Footer } from './components/layout'
import { Hero, About, Ministries, Events, Videos, Gallery, CTA, JoinModal } from './components/sections'
import { Marquee } from './components/ui'

/** Thin gold line that tracks scroll progress across the full page */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      className="fixed top-0 inset-x-0 h-[2px] bg-gold origin-left z-[100] pointer-events-none"
      style={{ scaleX }}
    />
  )
}

export default function App() {
  return (
    <div className="bg-chords text-white overflow-x-hidden">
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Ministries />
        <Events />
        <Videos />
        <Gallery />
        <CTA />
      </main>

      <Footer />
      <JoinModal />
    </div>
  )
}
