import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, Check } from 'lucide-react'
import { EASE } from '../../lib/animations'
import { useScrollLock } from '../../hooks/useScrollLock'

// ── Types ────────────────────────────────────────────────────────────────────

type MemberType = 'current' | 'old'

interface CurrentMember {
  type: 'current'
  fullName: string
  email: string
  phone: string
  department: string
  level: string
  instrument: string
  timestamp: string
}

interface OldMember {
  type: 'old'
  fullName: string
  email: string
  phone: string
  graduationYear: string
  instrument: string
  message: string
  timestamp: string
}

const STORAGE_KEY = 'chords_members'

function saveRecord(data: CurrentMember | OldMember) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as (CurrentMember | OldMember)[]
  existing.push(data)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
}

// ── Small form primitives ─────────────────────────────────────────────────────

function Field({ label, required = false, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-white/45 text-[10px] font-semibold uppercase tracking-[0.22em] mb-2">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = 'w-full bg-chords border border-chords-border text-white/80 text-sm px-4 py-3 placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors duration-300'

// ── Main component ────────────────────────────────────────────────────────────

export function JoinModal() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<MemberType>('current')
  const [done, setDone] = useState(false)

  // Current member state
  const [cur, setCur] = useState({ fullName: '', email: '', phone: '', department: '', level: '', instrument: '' })
  // Old member state
  const [old, setOld] = useState({ fullName: '', email: '', phone: '', graduationYear: '', instrument: '', message: '' })

  useScrollLock(open)

  useEffect(() => {
    const handle = () => { setOpen(true); setDone(false) }
    window.addEventListener('join-modal:open', handle)
    return () => window.removeEventListener('join-modal:open', handle)
  }, [])

  function close() {
    setOpen(false)
    setDone(false)
    setCur({ fullName: '', email: '', phone: '', department: '', level: '', instrument: '' })
    setOld({ fullName: '', email: '', phone: '', graduationYear: '', instrument: '', message: '' })
  }

  function submitCurrent(e: React.FormEvent) {
    e.preventDefault()
    saveRecord({ ...cur, type: 'current', timestamp: new Date().toISOString() })
    setDone(true)
  }

  function submitOld(e: React.FormEvent) {
    e.preventDefault()
    saveRecord({ ...old, type: 'old', timestamp: new Date().toISOString() })
    setDone(true)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 lg:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-chords/95 backdrop-blur-xl" onClick={close} />

          {/* Sheet */}
          <motion.div
            className="relative w-full max-w-lg bg-chords-card border border-chords-border overflow-y-auto max-h-[92vh]"
            initial={{ opacity: 0, y: 56, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 56, scale: 0.96 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {/* Gold top accent */}
            <div className="h-[2px] bg-gold w-full shrink-0" />

            {/* Header */}
            <div className="px-8 pt-8 pb-0 border-b border-chords-border">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-gold text-[9px] font-bold uppercase tracking-[0.4em] mb-2">
                    Chords Ministry
                  </p>
                  <h3 className="text-white font-black text-2xl leading-tight">
                    {done ? 'Welcome to the Family!' : 'Register with Us'}
                  </h3>
                </div>
                <button
                  onClick={close}
                  className="w-9 h-9 border border-chords-border flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300 shrink-0 mt-1"
                  aria-label="Close"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Tabs */}
              {!done && (
                <div className="flex -mb-[1px]">
                  {(['current', 'old'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={[
                        'px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] border-b-2 transition-all duration-300',
                        tab === t
                          ? 'border-gold text-gold'
                          : 'border-transparent text-white/35 hover:text-white/60',
                      ].join(' ')}
                    >
                      {t === 'current' ? 'Current Member' : 'Old Member'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Body */}
            <div className="px-8 py-8">
              {done ? (
                /* ── Success state ── */
                <div className="flex flex-col items-center text-center py-6 gap-5">
                  <div className="w-14 h-14 bg-gold flex items-center justify-center">
                    <Check size={24} className="text-chords" />
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed max-w-xs">
                    Your details have been saved. We'll be in touch soon. God bless you!
                  </p>
                  <button
                    onClick={close}
                    className="mt-4 bg-gold text-chords font-black text-[10px] uppercase tracking-[0.25em] px-10 py-3.5 hover:bg-gold-light transition-all duration-300"
                  >
                    Close
                  </button>
                </div>

              ) : tab === 'current' ? (
                /* ── Current Member form ── */
                <form onSubmit={submitCurrent} className="space-y-5">
                  <Field label="Full Name" required>
                    <input
                      className={inputCls}
                      value={cur.fullName}
                      onChange={(e) => setCur((f) => ({ ...f, fullName: e.target.value }))}
                      placeholder="Your full name"
                      required
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Email" required>
                      <input
                        type="email"
                        className={inputCls}
                        value={cur.email}
                        onChange={(e) => setCur((f) => ({ ...f, email: e.target.value }))}
                        placeholder="you@email.com"
                        required
                      />
                    </Field>
                    <Field label="Phone" required>
                      <input
                        type="tel"
                        className={inputCls}
                        value={cur.phone}
                        onChange={(e) => setCur((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+234 ..."
                        required
                      />
                    </Field>
                  </div>

                  <Field label="Department / Faculty" required>
                    <input
                      className={inputCls}
                      value={cur.department}
                      onChange={(e) => setCur((f) => ({ ...f, department: e.target.value }))}
                      placeholder="e.g. Engineering, Medicine..."
                      required
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Level / Year" required>
                      <select
                        className={inputCls + ' appearance-none cursor-pointer'}
                        value={cur.level}
                        onChange={(e) => setCur((f) => ({ ...f, level: e.target.value }))}
                        required
                      >
                        <option value="" disabled>Select level</option>
                        {['100 Level', '200 Level', '300 Level', '400 Level', '500 Level', 'Postgraduate'].map((l) => (
                          <option key={l} value={l} className="bg-chords-card">{l}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Instrument / Voice Part">
                      <input
                        className={inputCls}
                        value={cur.instrument}
                        onChange={(e) => setCur((f) => ({ ...f, instrument: e.target.value }))}
                        placeholder="e.g. Guitar, Soprano..."
                      />
                    </Field>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-gold text-chords font-black text-[10px] uppercase tracking-[0.25em] py-4 hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Join Now <ChevronRight size={14} />
                  </button>
                </form>

              ) : (
                /* ── Old Member form ── */
                <form onSubmit={submitOld} className="space-y-5">
                  <Field label="Full Name" required>
                    <input
                      className={inputCls}
                      value={old.fullName}
                      onChange={(e) => setOld((f) => ({ ...f, fullName: e.target.value }))}
                      placeholder="Your full name"
                      required
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Email" required>
                      <input
                        type="email"
                        className={inputCls}
                        value={old.email}
                        onChange={(e) => setOld((f) => ({ ...f, email: e.target.value }))}
                        placeholder="you@email.com"
                        required
                      />
                    </Field>
                    <Field label="Phone" required>
                      <input
                        type="tel"
                        className={inputCls}
                        value={old.phone}
                        onChange={(e) => setOld((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+234 ..."
                        required
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Graduation Year" required>
                      <input
                        type="number"
                        className={inputCls}
                        value={old.graduationYear}
                        onChange={(e) => setOld((f) => ({ ...f, graduationYear: e.target.value }))}
                        placeholder="e.g. 2021"
                        min="1990"
                        max={new Date().getFullYear()}
                        required
                      />
                    </Field>
                    <Field label="Instrument / Voice Part">
                      <input
                        className={inputCls}
                        value={old.instrument}
                        onChange={(e) => setOld((f) => ({ ...f, instrument: e.target.value }))}
                        placeholder="e.g. Bass, Alto..."
                      />
                    </Field>
                  </div>

                  <Field label="Message / Testimony">
                    <textarea
                      className={inputCls + ' resize-none'}
                      rows={4}
                      value={old.message}
                      onChange={(e) => setOld((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Share your experience with Chords Ministry..."
                    />
                  </Field>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-gold text-chords font-black text-[10px] uppercase tracking-[0.25em] py-4 hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Reconnect <ChevronRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
