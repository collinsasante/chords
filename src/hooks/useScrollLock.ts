import { useEffect } from 'react'

/**
 * Locks document body scroll when `locked` is true.
 * Restores the original overflow value on cleanup.
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [locked])
}
