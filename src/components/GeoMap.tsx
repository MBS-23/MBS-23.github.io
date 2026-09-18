import { useEffect, useRef, useState } from 'react'

/**
 * REAL INDIA → REAL ANDHRA PRADESH.
 *
 * Coastlines, the national border and every state boundary are real geometry
 * from Natural Earth (public domain), projected equirectangularly and flown
 * between two genuine bounding boxes: the extent of India, then the extent of
 * Andhra Pradesh. Neighbouring landmass is drawn behind it so the country is
 * seen in its region rather than floating in black.
 *
 * `digital` (0→1) morphs the geographic rendering into the technical data layer
 * — the same borders, redrawn as a system would draw them.
 */

export interface GeoMapProps {
  /** 0 = India in frame, 1 = Andhra Pradesh in frame. */
  zoom: number
  /** 0 = geographic, 1 = digital grid. */
  digital: number
  /** 0 → 1 drives the locator sweep while the origin is being resolved. */
  scan?: number
  className?: string
  onReady?: () => void
}

type Ring = [number, number][]
interface StateFeature {
  name: string
  origin: boolean
  rings: Ring[]
}

/** Tanuku, West Godavari, Andhra Pradesh — the origin point. */
export const ORIGIN = { lat: 16.7547, lon: 81.6819, label: 'TANUKU · WEST GODAVARI' }

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const clamp01 = (t: number) => Math.max(0, Math.min(1, t))

function bboxOf(rings: Ring[]) {
  let minX = 180
  let maxX = -180
  let minY = 90
  let maxY = -90
  for (const ring of rings) {
    for (const [x, y] of ring) {
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
  return { minX, maxX, minY, maxY }
}

export default function GeoMap({ zoom, digital, scan = 0, className = '', onReady }: GeoMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [india, setIndia] = useState<Ring[] | null>(null)
  const [states, setStates] = useState<StateFeature[] | null>(null)
  const [world, setWorld] = useState<Ring[] | null>(null)
  const live = useRef({ zoom, digital, scan })
  live.current = { zoom, digital, scan }

  /* ---------------- Load the geometry once ---------------- */
  useEffect(() => {
    let cancelled = false
    const base = import.meta.env.BASE_URL
    const json = (p: string) => fetch(`${base}${p}`).then((r) => r.json())

    Promise.all([json('geo/india.json'), json('geo/india-states.json')])
      .then(([i, s]) => {
        if (cancelled) return
        setIndia(i.rings as Ring[])
        setStates(s.states as StateFeature[])
        onReady?.()
      })
      .catch(() => {
        // Geometry is the point here, but the sequence must never stall on it.
        if (!cancelled) onReady?.()
      })

    // Regional context is a nice-to-have: it loads separately and late.
    json('geo/world-land.json')
      .then((w) => !cancelled && setWorld(w.rings as Ring[]))
      .catch(() => undefined)

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ---------------- Draw ---------------- */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !india || !states) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const ap = states.find((s) => s.origin)
    const indiaBox = bboxOf(india)
    const apBox = ap ? bboxOf(ap.rings) : indiaBox

    let w = 0
    let h = 0
    let raf = 0
    let disposed = false

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const draw = (now: number) => {
      if (disposed) return
      const z = clamp01(live.current.zoom)
      const d = clamp01(live.current.digital)
      const sc = clamp01(live.current.scan)

      ctx.clearRect(0, 0, w, h)

      /* ---- Viewport: fly from India's extent to Andhra Pradesh's ---- */
      const pad = 0.14
      const cx = lerp((indiaBox.minX + indiaBox.maxX) / 2, (apBox.minX + apBox.maxX) / 2, z)
      const cy = lerp((indiaBox.minY + indiaBox.maxY) / 2, (apBox.minY + apBox.maxY) / 2, z)
      const spanIndia = Math.max(indiaBox.maxX - indiaBox.minX, indiaBox.maxY - indiaBox.minY) * (1 + pad)
      const spanAp = Math.max(apBox.maxX - apBox.minX, apBox.maxY - apBox.minY) * (1 + pad * 2.4)
      const span = lerp(spanIndia, spanAp, z)

      // Fit the span to the smaller axis so nothing ever crops unexpectedly.
      const scale = Math.min(w, h) / span
      const project = (lon: number, lat: number): [number, number] => [
        w / 2 + (lon - cx) * scale,
        h / 2 - (lat - cy) * scale,
      ]

      const trace = (rings: Ring[]) => {
        ctx.beginPath()
        for (const ring of rings) {
          for (let i = 0; i < ring.length; i++) {
            const [px, py] = project(ring[i][0], ring[i][1])
            if (i === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          }
          ctx.closePath()
        }
      }

      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'

      /* ---- Graticule: always present, sharpening with the digital morph ---- */
      const gridAlpha = 0.07 + d * 0.24
      ctx.globalAlpha = gridAlpha
      ctx.strokeStyle = 'rgba(255,255,255,0.5)'
      ctx.lineWidth = 1
      const step = z > 0.55 ? 1 : 2 // degrees — finer as we close in
      const startLon = Math.ceil((cx - span) / step) * step
      const startLat = Math.ceil((cy - span) / step) * step
      ctx.beginPath()
      for (let lon = startLon; lon < cx + span; lon += step) {
        const [x1, y1] = project(lon, cy - span)
        const [x2, y2] = project(lon, cy + span)
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
      }
      for (let lat = startLat; lat < cy + span; lat += step) {
        const [x1, y1] = project(cx - span, lat)
        const [x2, y2] = project(cx + span, lat)
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
      }
      ctx.stroke()
      ctx.globalAlpha = 1

      /* ---- Regional context — neighbouring landmass, kept quiet ---- */
      if (world) {
        trace(world)
        ctx.fillStyle = `rgba(10,14,18,${lerp(0.95, 0.75, d)})`
        ctx.fill()
        ctx.lineWidth = 0.7
        ctx.strokeStyle = `rgba(255,255,255,${lerp(0.07, 0.12, d)})`
        ctx.stroke()
      }

      /* ---- India ---- */
      trace(india)
      ctx.fillStyle = `rgba(${lerp(18, 10, d)}, ${lerp(25, 17, d)}, ${lerp(30, 24, d)}, 0.96)`
      ctx.fill()

      /* ---- State boundaries ---- */
      ctx.lineWidth = 0.75
      ctx.strokeStyle = `rgba(255,255,255,${lerp(0.14, 0.28, d)})`
      for (const s of states) {
        if (s.origin) continue
        trace(s.rings)
        ctx.stroke()
      }

      /* ---- National outline ---- */
      trace(india)
      ctx.lineWidth = 1.4
      ctx.strokeStyle = `rgba(255,255,255,${lerp(0.55, 0.82, d)})`
      ctx.stroke()

      /* ---- Andhra Pradesh — the state being resolved ---- */
      if (ap) {
        trace(ap.rings)
        ctx.fillStyle = `rgba(255,59,74,${lerp(0.06, 0.18, z)})`
        ctx.fill()
        ctx.lineWidth = 1.7
        ctx.strokeStyle = `rgba(255,59,74,${lerp(0.5, 0.95, z)})`
        ctx.shadowColor = 'rgba(255,59,74,0.55)'
        ctx.shadowBlur = 16 * z
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      /* ---- Locator sweep while the origin resolves ---- */
      if (sc > 0 && sc < 1) {
        const y = h * sc
        const grad = ctx.createLinearGradient(0, y - 90, 0, y)
        grad.addColorStop(0, 'rgba(255,59,74,0)')
        grad.addColorStop(1, 'rgba(255,59,74,0.16)')
        ctx.fillStyle = grad
        ctx.fillRect(0, y - 90, w, 90)
        ctx.strokeStyle = 'rgba(255,59,74,0.5)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      /* ---- Place labels ---- */
      const label = (text: string, lon: number, lat: number, alpha: number, colour: string, dy = 0) => {
        if (alpha <= 0.01) return
        ctx.globalAlpha = alpha
        ctx.fillStyle = colour
        ctx.font = '500 10px "IBM Plex Mono", ui-monospace, monospace'
        ctx.textAlign = 'center'
        const [lx, ly] = project(lon, lat)
        ctx.fillText(text, lx, ly + dy)
        ctx.globalAlpha = 1
      }

      label('I N D I A', 79.2, 22.6, (1 - z) * 0.85, 'rgba(255,255,255,0.72)')
      if (ap) {
        const apCx = (apBox.minX + apBox.maxX) / 2
        const apCy = (apBox.minY + apBox.maxY) / 2
        label('ANDHRA PRADESH', apCx - 0.6, apCy + 1.2, clamp01((z - 0.35) / 0.4) * 0.9, 'rgba(255,59,74,0.9)')
      }

      /* ---- Origin marker ---- */
      const [ox, oy] = project(ORIGIN.lon, ORIGIN.lat)
      const appear = clamp01((z - 0.25) / 0.4)
      if (appear > 0) {
        const pulse = 0.5 + 0.5 * Math.sin(now / 420)

        ctx.globalAlpha = appear * (1 - pulse) * 0.9
        ctx.strokeStyle = '#ff3b4a'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(ox, oy, 6 + pulse * 26, 0, Math.PI * 2)
        ctx.stroke()

        ctx.globalAlpha = appear
        ctx.fillStyle = '#ff3b4a'
        ctx.shadowColor = '#ff3b4a'
        ctx.shadowBlur = 12
        ctx.beginPath()
        ctx.arc(ox, oy, 2.6, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // Crosshair — precise rather than a pin.
        ctx.strokeStyle = 'rgba(255,255,255,0.55)'
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(ox - 16, oy)
        ctx.lineTo(ox - 6, oy)
        ctx.moveTo(ox + 6, oy)
        ctx.lineTo(ox + 16, oy)
        ctx.moveTo(ox, oy - 16)
        ctx.lineTo(ox, oy - 6)
        ctx.moveTo(ox, oy + 6)
        ctx.lineTo(ox, oy + 16)
        ctx.stroke()

        // Town label, once we are close enough for it to mean anything. It
        // flips to the other side of the crosshair rather than running off a
        // narrow screen.
        const near = clamp01((z - 0.62) / 0.3)
        if (near > 0.01) {
          ctx.globalAlpha = near
          ctx.fillStyle = 'rgba(255,255,255,0.8)'
          ctx.font = '500 9.5px "IBM Plex Mono", ui-monospace, monospace'
          const labelWidth = ctx.measureText(ORIGIN.label).width
          const fitsRight = ox + 22 + labelWidth < w - 12
          ctx.textAlign = fitsRight ? 'left' : 'right'
          ctx.fillText(ORIGIN.label, fitsRight ? ox + 22 : ox - 22, oy + 3.5)
        }
        ctx.globalAlpha = 1
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [india, states, world])

  return <canvas ref={canvasRef} className={className} aria-hidden />
}
