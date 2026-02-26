const ITEMS = [
  'Excellence in Harmony',
  'Music',
  'Worship',
  'Choreography',
  'Non-Denominational',
  'UENR Sunyani',
  'Est. 2014',
  'Ayeyi Soronko',
  'Freshers Akwaaba',
  'Sound of the Gospel',
]

/**
 * A GPU-accelerated CSS marquee strip.
 * Uses three copies of the item list so the seam is never visible.
 * Pauses on hover for accessibility.
 */
export function Marquee() {
  return (
    <div
      className="overflow-hidden border-y border-chords-border py-[17px] bg-chords"
      aria-hidden="true"
    >
      <div className="marquee-track flex items-center w-max">
        {[0, 1, 2].map((copy) => (
          <div key={copy} className="flex items-center shrink-0">
            {ITEMS.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center">
                <span className="text-white/[0.11] text-[9px] font-bold tracking-[0.5em] uppercase px-6 whitespace-nowrap hover:text-white/25 transition-colors duration-500 cursor-default">
                  {item}
                </span>
                <span className="text-gold/25 text-[6px] leading-none">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
