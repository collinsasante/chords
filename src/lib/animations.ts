import type { Variants } from 'framer-motion'

// ─── Easing ────────────────────────────────────────────────────────────────
// Premium exponential ease-out — feels like Apple/Linear.app motion
export const EASE = [0.16, 1, 0.3, 1] as const

// ─── Duration tokens ───────────────────────────────────────────────────────
export const DUR = {
  fast: 0.4,
  base: 0.65,
  slow: 0.9,
  xslow: 1.1,
} as const

// ─── Viewport defaults ─────────────────────────────────────────────────────
export const viewport = { once: true, margin: '-80px' } as const

// ─── Variants ──────────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DUR.base, ease: EASE },
  },
}

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -72 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.xslow, ease: EASE },
  },
}

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 72 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.xslow, ease: EASE },
  },
}

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
}

export const cardUp: Variants = {
  hidden: { opacity: 0, y: 64 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE },
  },
}

/** For hero heading lines — each "i" offsets the delay */
export const clipReveal: Variants = {
  hidden: { y: '115%' },
  visible: (i: number) => ({
    y: '0%',
    transition: {
      duration: DUR.xslow,
      delay: 0.5 + i * 0.2,
      ease: EASE,
    },
  }),
}

/** Scale in from slightly smaller */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.slow, ease: EASE },
  },
}
