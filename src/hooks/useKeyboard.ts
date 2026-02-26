import { useEffect, useRef } from 'react'

type KeyHandlers = Partial<Record<string, () => void>>

/**
 * Attaches keyboard event listeners for the given key map.
 * Uses a ref so that the map can be updated without re-registering the listener.
 * The listener is only active when `enabled` is true.
 */
export function useKeyboard(handlers: KeyHandlers, enabled = true): void {
  const handlersRef = useRef(handlers)
  handlersRef.current = handlers

  useEffect(() => {
    if (!enabled) return

    const onKeyDown = (e: KeyboardEvent) => {
      handlersRef.current[e.key]?.()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [enabled])
}
