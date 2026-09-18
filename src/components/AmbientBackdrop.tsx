import { useEffect, useRef, useState } from 'react'
import LazyEarth from './LazyEarth'
import { ORIGIN } from './GeoMap'

/**
 * THE STAGE THE WHOLE SITE SITS ON.
 *
 * A flat #050608 page reads like an unstyled document. This puts the opening's
 * world permanently behind the content: a drifting starfield across the whole
 * viewport, and Earth holding the bottom-right corner as a horizon. Every
 * section then floats in space instead of sitting on black.
 *
 * Costs are controlled, because this layer never scrolls away:
 *
 *   • Stars are one 2D canvas, capped at ~30fps, and redrawn only on resize.
 *   • The globe is the existing lazy WebGL scene at far orbit, desktop only,
 *     at a low device-pixel ratio and low opacity.
 *   • Both stop completely when the tab is hidden.
 *   • Reduced motion gets a single static frame — stars, no drift.
 *   • Phones get stars only. No WebGL, no imagery download.
 */

interface Star {
  x: number
  y: number
  r: number
  a: number
  /** Twinkle phase so they do not pulse in unison. */
  p: number
  /** Parallax band: far stars drift slower. */
  band: number
}

function Starfield({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let w = 0
    let h = 0
    let stars: Star[] = []
    let raf = 0
    let last = 0
    let disposed = false

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Density by area, not a fixed count, so a 2560px screen is not sparse
      // and a phone is not overloaded.
      const count = Math.round(Math.min(340, Math.max(90, (w * h) / 7800)))
      stars = Array.from({ length: count }, () => {
        const band = Math.random()
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          // Far stars are smaller and dimmer — that is the depth cue.
          r: 0.35 + band * 1.05,
          a: 0.12 + band * 0.5,
          p: Math.random() * Math.PI * 2,
          band,
        }
      })
    }

    const paint = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        const twinkle = reduced ? 1 : 0.72 + 0.28 * Math.sin(t * 0.0009 + s.p)
        ctx.globalAlpha = s.a * twinkle
        ctx.fillStyle = s.band > 0.86 ? 'rgba(200,230,255,1)' : '#ffffff'
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    build()

    if (reduced) {
      paint(0)
    } else {
      const frame = (now: number) => {
        if (disposed) return
        raf = requestAnimationFrame(frame)
        if (document.hidden) return
        // ~30fps is plenty for a starfield and halves the cost.
        if (now - last < 33) return
        const dt = Math.min(now - last, 100)
        last = now
        for (const s of stars) {
          // A slow upward drift, faster for near stars.
          s.y -= (0.0035 + s.band * 0.012) * dt
          if (s.y < -2) {
            s.y = h + 2
            s.x = Math.random() * w
          }
        }
        paint(now)
      }
      raf = requestAnimationFrame(frame)
    }

    const onResize = () => {
      build()
      if (reduced) paint(0)
    }
    window.addEventListener('resize', onResize)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [reduced])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />
}

export default function AmbientBackdrop() {
  const [reduced, setReduced] = useState(false)
  const [globe, setGlobe] = useState(false)
  // Earth belongs to the opening and the close. Through the middle of the page
  // the content is dense and a planet behind a card grid just fights the text,
  // so its presence is tied to scroll position rather than left at full weight.
  const [earthOpacity, setEarthOpacity] = useState(0.5)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)

    const fine = window.matchMedia('(pointer: fine)').matches
    const wide = window.matchMedia('(min-width: 1024px)').matches
    setGlobe(fine && wide && !mq.matches)

    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const max = document.documentElement.scrollHeight - window.innerHeight
        const p = max > 0 ? window.scrollY / max : 0
        const opening = 1 - Math.min(p / 0.14, 1) // strong for the first screens
        const closing = Math.max(0, (p - 0.86) / 0.14) // returns for the outro
        setEarthOpacity(0.06 + opening * 0.4 + closing * 0.34)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Deep space, warmed slightly toward the horizon so it is not flat black. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 78% 108%, rgba(20,38,54,0.55), rgba(8,12,18,0.75) 42%, #050608 78%)',
        }}
      />

      <Starfield reduced={reduced} />

      {/* Earth, held at the bottom-right corner like a horizon. */}
      {globe && (
        <div
          className="absolute -right-[22vw] -bottom-[48vh] h-[128vh] w-[128vh] [mask-image:radial-gradient(58%_58%_at_44%_36%,#000_34%,transparent_72%)]"
          style={{
            opacity: earthOpacity,
            filter: 'saturate(0.85) brightness(0.9)',
            transition: 'opacity 260ms linear',
          }}
        >
          <LazyEarth progress={0} target={{ lat: ORIGIN.lat, lon: ORIGIN.lon }} className="h-full w-full" />
        </div>
      )}

      {/* A faint grain so large dark areas have a surface instead of banding. */}
      <div className="grain absolute inset-0" />

      {/* Vignette — keeps the reading column the brightest part of the frame. */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(110% 80% at 50% 40%, transparent 42%, rgba(5,6,8,0.62) 100%)' }}
      />
    </div>
  )
}
