import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LazyEarth from './LazyEarth'
import GeoMap, { ORIGIN } from './GeoMap'
import { profile } from '../data/profile'

/**
 * THE OPENING.
 *
 *   SPACE → EARTH → ASIA → INDIA → ANDHRA PRADESH → ORIGIN → CANDIDATE FOUND
 *
 * The globe is real NASA imagery flown to a real coordinate; the map is real
 * Natural Earth geometry. The camera movement is the narrative — there is no
 * decorative motion in this sequence.
 *
 * Returning visitors get a compressed cut. Skipping is always one key or one
 * click away. Reduced-motion visitors never see it at all.
 */

const STORAGE_KEY = 'bvvs.origin.seen.v2'

interface Beat {
  at: number
  label: string
  sub?: string
}

/** Full sequence, in milliseconds. */
const FULL = {
  earthIn: 300,
  asia: 1400,
  handoff: 3800,
  india: 4300,
  state: 5500,
  origin: 6800,
  digital: 7800,
  match: 8500,
  identity: 9000,
  end: 12200,
}

/** Compressed cut. Same beats, a third of the time. */
const SHORT = {
  earthIn: 120,
  asia: 600,
  handoff: 1700,
  india: 1950,
  state: 2500,
  origin: 3100,
  digital: 3600,
  match: 4000,
  identity: 4300,
  end: 6400,
}

/**
 * Phones get the same story without the 3D globe: no Three.js chunk, no 786 KB
 * of satellite imagery, straight into the map. A recruiter opening this on
 * mobile data should be reading in two seconds, not waiting for orbit.
 */
const LITE = {
  earthIn: 0,
  asia: 0,
  handoff: 0,
  india: 700,
  state: 1800,
  origin: 2900,
  digital: 3700,
  match: 4300,
  identity: 4800,
  end: 8100,
}

const clamp01 = (t: number) => Math.max(0, Math.min(1, t))
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a))
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

const BOOT_LINES = ['SYSTEM', 'GEODATA', 'IMAGERY', 'INTERFACE']

export default function OriginSequence({ onComplete, lite = false }: { onComplete: () => void; lite?: boolean }) {
  const [phase, setPhase] = useState<'boot' | 'cinema'>('boot')
  const [t, setT] = useState(0)
  const [bootStep, setBootStep] = useState(0)
  const doneRef = useRef(false)
  const readyRef = useRef({ earth: false, geo: false })

  const short = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1'
  const T = lite ? LITE : short ? SHORT : FULL

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* private mode — the opening simply plays in full next time */
    }
    onComplete()
  }

  /* ---------------- Boot: only as long as the assets actually need ---------- */
  useEffect(() => {
    if (phase !== 'boot') return
    const started = performance.now()
    const minimum = lite ? 350 : short ? 500 : 1100
    let raf = 0

    const tick = (now: number) => {
      const elapsed = now - started
      setBootStep(Math.min(BOOT_LINES.length, Math.floor((elapsed / minimum) * BOOT_LINES.length) + 1))
      const assetsReady = (lite ? readyRef.current.geo : readyRef.current.earth) || elapsed > 3200
      if (elapsed >= minimum && assetsReady) {
        setPhase('cinema')
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    // If frames never arrive, do not hold the visitor on the boot screen.
    const bail = window.setTimeout(() => setPhase('cinema'), 6000)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(bail)
    }
  }, [phase, short, lite])

  /* ---------------- Cinema clock ---------------- */
  useEffect(() => {
    if (phase !== 'cinema') return
    let raf = 0
    let last = performance.now()
    let elapsed = 0

    // The clock advances by frame delta, not wall time: absolute timestamps
    // make a throttled tab skip whole beats. While the tab is hidden the clock
    // holds, so someone opening this in a background tab still sees the film
    // from the start.
    const tick = (now: number) => {
      const delta = now - last
      last = now
      if (!document.hidden) {
        elapsed += Math.min(delta, 100)
        setT(elapsed)
        if (elapsed >= T.end) {
          finish()
          return
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Safety net: if frames never arrive at all — a throttled tab, a stalled
    // GPU — the page must not sit behind a locked overlay forever.
    const bail = window.setTimeout(finish, T.end + 10000)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(bail)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  /* ---------------- Skip ---------------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish()
    }
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      // Always hand scrolling back, however the sequence ended.
      document.body.style.overflow = previous
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ---------------- Derived stage values ---------------- */
  // The globe flies from far orbit to the origin coordinate.
  const earthProgress = easeInOut(seg(t, T.asia, T.handoff))
  // Hand off to the vector map as the globe reaches the surface.
  const mapIn = lite ? 1 : seg(t, T.handoff + 120, T.handoff + 780)
  const earthOut = seg(t, T.handoff - 420, T.handoff + 320)
  const mapZoom = easeInOut(seg(t, T.state, T.origin))
  const locatorScan = seg(t, T.state + 200, T.origin + 300)
  const digital = easeInOut(seg(t, T.digital, T.identity))
  const matched = t >= T.match
  const identity = seg(t, T.identity, T.identity + 900)
  const mapFade = 1 - seg(t, T.identity, T.identity + 1100) * 0.7
  const runtime = phase === 'cinema' ? clamp01(t / T.end) : 0

  const beats: Beat[] = [
    ...(lite ? [] : [{ at: T.earthIn, label: 'EARTH' }, { at: T.asia, label: 'ASIA' }]),
    { at: T.india, label: 'INDIA' },
    { at: T.state, label: 'ANDHRA PRADESH' },
    { at: T.origin, label: 'TANUKU · WEST GODAVARI', sub: 'WHERE THE WORK STARTS' },
  ]
  const activeBeat = t < T.digital ? [...beats].reverse().find((b) => t >= b.at) : undefined

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      role="dialog"
      aria-label="Opening sequence"
    >
      {/* ---------------- Earth ---------------- */}
      {!lite && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: phase === 'cinema' ? 1 - earthOut : 0 }}
        >
          <LazyEarth
            progress={earthProgress}
            target={{ lat: ORIGIN.lat, lon: ORIGIN.lon }}
            className="h-full w-full"
            onReady={() => {
              readyRef.current.earth = true
            }}
          />
        </div>
      )}

      {/* ---------------- Real map ---------------- */}
      <div className="absolute inset-0" style={{ opacity: mapIn * mapFade }}>
        <GeoMap
          zoom={mapZoom}
          digital={digital}
          scan={locatorScan}
          className="h-full w-full"
          onReady={() => {
            readyRef.current.geo = true
          }}
        />
      </div>

      {/* ---------------- Boot readout ---------------- */}
      <AnimatePresence>
        {phase === 'boot' && (
          <motion.div
            key="boot"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10"
          >
            <p className="font-mono text-[0.62rem] tracking-[0.28em] text-muted">BVVS / SYSTEM</p>
            <div className="mx-auto">
              <p className="font-mono text-[0.66rem] tracking-[0.3em] text-secondary">INITIALIZING</p>
              <ul className="mt-5 space-y-1.5">
                {BOOT_LINES.map((l, i) => (
                  <li
                    key={l}
                    className="flex items-center justify-between gap-10 font-mono text-[0.62rem] tracking-[0.16em]"
                    style={{ opacity: i < bootStep ? 1 : 0.2 }}
                  >
                    <span className="text-muted">{l}</span>
                    <span className="text-fg">{i < bootStep ? 'READY' : '···'}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="font-mono text-[0.58rem] tracking-[0.22em] text-muted">{profile.fullName.toUpperCase()}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- Geographic captions ---------------- */}
      <AnimatePresence mode="wait">
        {phase === 'cinema' && activeBeat && (
          <motion.div
            key={activeBeat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-x-0 bottom-[16%] px-6 text-center"
          >
            <p className="font-mono text-[0.72rem] tracking-[0.42em] text-fg sm:text-sm">{activeBeat.label}</p>
            {activeBeat.sub && (
              <p className="mt-2.5 font-mono text-[0.56rem] tracking-[0.24em] text-muted">{activeBeat.sub}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- Identity ---------------- */}
      {phase === 'cinema' && matched && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(64% 44% at 50% 50%, rgba(5,6,8,0.92), rgba(5,6,8,0.66) 58%, transparent 84%)',
              opacity: Math.max(identity, 0.35),
            }}
          />

          <div className="relative w-full max-w-4xl">
            {/* the system announces the result of the search */}
            <AnimatePresence mode="wait">
              <motion.p
                key={identity > 0 ? 'found' : 'scanning'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[0.6rem] tracking-[0.34em] sm:text-[0.68rem]"
              >
                {identity > 0 ? (
                  <>
                    <span className="text-cyber">CANDIDATE FOUND</span>
                    <span aria-hidden className="text-muted">
                      ·
                    </span>
                    <span className="text-secondary">YOUR PERFECT MATCH</span>
                  </>
                ) : (
                  <span className="text-muted">SCANNING CANDIDATES…</span>
                )}
              </motion.p>
            </AnimatePresence>

            {identity > 0 && (
              <>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-6 font-mono text-[0.58rem] tracking-[0.4em] text-muted"
                >
                  {profile.surname.toUpperCase()}
                </motion.p>

                <h1 className="type-identity mt-2 text-fg">
                  {profile.nameLines.map((line, i) => (
                    <span key={line} className="mask-line">
                      <motion.span
                        className="block"
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.05, delay: 0.16 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </h1>

                <motion.div
                  className="mx-auto mt-7 h-px w-24 origin-center bg-cyber"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                  className="mt-6 font-mono text-[0.6rem] tracking-[0.24em] text-secondary sm:text-[0.66rem]"
                >
                  BVVS <span className="text-muted">=</span> BALA VEERA VENKATA SUNIL
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.92 }}
                  className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[0.54rem] tracking-[0.2em] text-muted sm:text-[0.6rem]"
                >
                  <span className="text-cyber">CYBERSECURITY</span>
                  <span aria-hidden>·</span>
                  <span className="text-ai">AI / ML</span>
                  <span aria-hidden>·</span>
                  <span className="text-safe">FULL-STACK</span>
                </motion.p>

                {/* The four things a hiring manager checks before reading anything else. */}
                <motion.ul
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.15 }}
                  className="mx-auto mt-9 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2.5 border-t border-border pt-6 font-mono text-[0.54rem] tracking-[0.18em] text-secondary"
                >
                  <li>{profile.graduating.toUpperCase()}</li>
                  <li className="text-muted" aria-hidden>
                    ·
                  </li>
                  <li>7 INTERNSHIPS</li>
                  <li className="text-muted" aria-hidden>
                    ·
                  </li>
                  <li>PUBLISHED CONFERENCE PAPER</li>
                  <li className="text-muted" aria-hidden>
                    ·
                  </li>
                  <li className="text-safe">AVAILABLE — IMMEDIATE JOINER</li>
                </motion.ul>
              </>
            )}
          </div>
        </div>
      )}

      {/* ---------------- Runtime + skip ---------------- */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 pb-5 sm:px-8 sm:pb-7">
          <p className="font-mono text-[0.54rem] tracking-[0.22em] text-muted">
            {phase === 'boot' ? 'LOADING' : 'ESC TO SKIP'}
          </p>
          <button
            type="button"
            onClick={finish}
            className="pointer-events-auto rounded-full border border-border px-4 py-2 font-mono text-[0.56rem] tracking-[0.2em] text-muted uppercase transition-colors hover:border-border-2 hover:text-fg"
          >
            Skip intro
          </button>
        </div>
        <div className="h-px w-full bg-border">
          <div
            className="h-px bg-cyber transition-[width] duration-150 ease-linear"
            style={{ width: `${runtime * 100}%` }}
            aria-hidden
          />
        </div>
      </div>
    </motion.div>
  )
}
