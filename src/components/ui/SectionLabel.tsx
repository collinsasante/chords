interface SectionLabelProps {
  label: string
  /** When true, renders a gold dash on both sides and centres itself */
  centered?: boolean
  className?: string
}

export function SectionLabel({ label, centered = false, className = '' }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-3 ${centered ? 'justify-center' : ''} ${className}`}
      aria-hidden="true"
    >
      <div className="h-px w-8 bg-gold shrink-0" />
      <span className="text-gold text-[10px] font-semibold tracking-[0.45em] uppercase whitespace-nowrap">
        {label}
      </span>
      {centered && <div className="h-px w-8 bg-gold shrink-0" />}
    </div>
  )
}
