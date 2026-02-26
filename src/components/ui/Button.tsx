import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

interface ButtonProps {
  variant?: 'primary' | 'outline'
  href?: string
  arrow?: boolean
  children: ReactNode
  className?: string
  onClick?: () => void
}

const styles = {
  base: 'group inline-flex items-center gap-3 font-bold text-[11px] tracking-[0.2em] uppercase transition-all duration-300 select-none',
  primary: 'bg-gold text-chords hover:bg-gold-light px-10 py-4',
  outline: 'border border-white/25 text-white/80 hover:border-gold/60 hover:text-gold px-10 py-4',
}

export function Button({
  variant = 'primary',
  href = '#',
  arrow = false,
  children,
  className = '',
  onClick,
}: ButtonProps) {
  return (
    <motion.a
      href={href}
      className={`${styles.base} ${styles[variant]} ${className}`}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      {children}
      {arrow && (
        <ArrowRight
          size={13}
          className="group-hover:translate-x-1 transition-transform duration-300"
          aria-hidden="true"
        />
      )}
    </motion.a>
  )
}
