import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { NAV_EVENT, scrollToSection, type NavDetail } from '../lib/navigate'

/**
 * The section-change transition.
 *
 * Red and cyan orbs converge into a ring, a one-line system readout types out,
 * the page scrolls behind the veil, then it lifts. ~900ms total — short enough
 * that it reads as a cut, not a wait.
 *
 * Under reduced motion the whole thing collapses to an immediate scroll.
 */

const ORBS = [
  { colour: 'var(--color-cyber)', from: { x: -260, y: -120 } },
  { colour: 'var(--color-safe)', from: { x: 240, y: 140 } },
  { colour: 'var(--color-ai)', from: { x: -200, y: 180 } },
  { colour: 'var(--color-cyber)', from: { x: 280, y: -160 } },
]

export default function PortalTransition() {
  const [active, setActive] = useState<NavDetail | null>(null)
  const [typed, setTyped] = useState('')
  const busy = useRef(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onNav = (e: Event) => {
      const detail = (e as CustomEvent<NavDetail>).detail
      if (!detail) return

      if (reduce) {
        scrollToSection(detail.target)
        return
      }
      if (busy.current) return
      busy.current = true
      setActive(detail)
      setTyped('')

      // Type the readout while the portal is closed over the page.
      let i = 0
      const typer = setInterval(() => {
        i += 1
        setTyped(detail.readout.slice(0, i))
        if (i >= detail.readout.length) clearInterval(typer)
      }, 22)

      // Scroll behind the veil, then lift it.
      const scrollAt = setTimeout(() => scrollToSection(detail.target), 420)
      const clearAt = setTimeout(() => {
        setActive(null)
        busy.current = false
      }, 980)

      return () => {
        clearInterval(typer)
        clearTimeout(scrollAt)
        clearTimeout(clearAt)
      }
    }

    window.addEventListener(NAV_EVENT, onNav)
    return () => window.removeEventListener(NAV_EVENT, onNav)
  }, [reduce])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[120] grid place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          aria-hidden
        >
          <motion.div
            className="absolute inset-0 bg-bg/88 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Orbs converge into the portal ring */}
          <div className="relative grid h-48 w-48 place-items-center">
            {ORBS.map((o, i) => (
              <motion.span
                key={i}
                className="absolute h-3 w-3 rounded-full"
                style={{ background: o.colour, boxShadow: `0 0 18px ${o.colour}` }}
                initial={{ x: o.from.x, y: o.from.y, opacity: 0, scale: 0.4 }}
                animate={{ x: 0, y: 0, opacity: [0, 1, 0.9], scale: [0.4, 1, 0.6] }}
                transition={{ duration: 0.5, delay: i * 0.045, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}

            <motion.span
              className="absolute rounded-full border"
              style={{ borderColor: 'var(--color-ai)' }}
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ width: 150, height: 150, opacity: [0, 0.9, 0.35] }}
              transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="absolute rounded-full border"
              style={{ borderColor: 'var(--color-cyber)' }}
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ width: 104, height: 104, opacity: [0, 0.8, 0.25] }}
              transition={{ duration: 0.65, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* System readout */}
          <div className="absolute bottom-[28%] px-6 text-center">
            <p className="font-mono text-[0.66rem] tracking-[0.24em] text-safe sm:text-xs">
              SYSTEM: {typed}
              <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 animate-blink bg-safe align-middle" />
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
