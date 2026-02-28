import type { ComponentType } from 'react'
import { Instagram, Youtube, Mail, MapPin } from 'lucide-react'
import { NAV_LINKS } from '../../constants/navigation'
import { TikTokIcon } from '../ui/TikTokIcon'
import chordsLogo from '../../chords.png'

// Narrow icon shape used only for rendering — cast Lucide icons to avoid
// their broad propTypes.size (string|number) conflicting with our number-only slot.
type SocialIcon = ComponentType<{ size?: number; className?: string }>

interface SocialLink {
  icon: SocialIcon
  label: string
  href: string
}

const ic = (c: unknown) => c as SocialIcon

const SOCIAL: SocialLink[] = [
  { icon: ic(Instagram), label: 'Instagram', href: 'https://www.instagram.com/chordsministry7/' },
  { icon: TikTokIcon,    label: 'TikTok',    href: 'https://www.tiktok.com/@chords.ministry' },
  { icon: ic(Youtube),   label: 'YouTube',   href: 'https://www.youtube.com/@chordsministry1699' },
]

const MINISTRY_LINKS = [
  'Vocals',
  'Band',
]

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-white font-bold text-[9px] uppercase tracking-[0.35em] mb-8 flex items-center gap-3">
      <span className="h-px w-5 bg-gold shrink-0" />
      {children}
    </h4>
  )
}

export function Footer() {
  return (
    <footer className="bg-chords border-t border-chords-border">
      {/* Gold top accent line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-12 lg:gap-16 py-20 lg:py-24">

          {/* ── Brand ── */}
          <div>
            <a href="#home" className="group inline-flex mb-7">
              <img
                src={chordsLogo}
                alt="Chords Ministry"
                className="h-28 w-auto object-contain group-hover:opacity-80 transition-opacity duration-300"
              />
            </a>

            <p className="text-white/32 text-sm leading-[1.8] mb-9 max-w-[260px]">
              Excellence in Harmony. A non-denominational music group at UENR, Sunyani. Spreading the Word of God through music and choreography since 2014.
            </p>

            <div className="flex gap-2.5">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 border border-chords-border text-white/30 hover:border-gold hover:text-gold flex items-center justify-center transition-all duration-300"
                >
                  <s.icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick links ── */}
          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="space-y-[14px]">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group text-white/32 text-sm hover:text-gold transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="h-px w-0 bg-gold group-hover:w-4 transition-all duration-400" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Ministries ── */}
          <div>
            <FooterHeading>Ministries</FooterHeading>
            <ul className="space-y-[14px]">
              {MINISTRY_LINKS.map((item) => (
                <li key={item}>
                  <a
                    href="#ministries"
                    className="group text-white/32 text-sm hover:text-gold transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="h-px w-0 bg-gold group-hover:w-4 transition-all duration-400" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact + Newsletter ── */}
          <div>
            <FooterHeading>Contact Us</FooterHeading>

            <ul className="space-y-5 mb-9">
              <li className="flex items-start gap-3">
                <MapPin size={13} className="text-gold mt-0.5 shrink-0" />
                <span className="text-white/32 text-sm leading-relaxed">
                  University of Energy and Natural Resources<br />(UENR), Sunyani, Ghana
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={13} className="text-gold shrink-0" />
                <a
                  href="mailto:chordsinstrumentals@gmail.com"
                  className="text-white/32 text-sm hover:text-gold transition-colors duration-300"
                >
                  chordsinstrumentals@gmail.com
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <p className="text-white/25 text-[9px] uppercase tracking-[0.3em] mb-3">
              Stay updated
            </p>
            <div className="flex h-11">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 min-w-0 bg-chords-card border border-chords-border text-white/60 text-[12px] px-4 placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors duration-300"
              />
              <button className="shrink-0 bg-gold text-chords px-4 text-[10px] font-black uppercase tracking-wider hover:bg-gold-light transition-colors duration-300">
                Go
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-chords-border py-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/22 text-[11px] tracking-wide">
            © {new Date().getFullYear()} Chords Ministry. All rights reserved.
          </p>
          <p className="text-white/22 text-[11px] tracking-wide">
            Made with ♡ for the Kingdom of God
          </p>
        </div>
      </div>
    </footer>
  )
}
