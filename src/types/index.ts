import type { LucideIcon } from 'lucide-react'

// Re-export for convenience across the codebase
export type { LucideIcon }

export interface NavLink {
  label: string
  href: string
}

export interface Ministry {
  icon: LucideIcon
  title: string
  description: string
}

export interface Event {
  title: string
  date: string
  location: string
  description: string
  image: string
  category: string
}

export interface GalleryImage {
  src: string
  alt: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  avatar: string
}
