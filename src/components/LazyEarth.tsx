import { Suspense, lazy } from 'react'
import type { EarthTarget } from './EarthScene'

/**
 * Three.js is the single heaviest dependency on the site, so the Earth is split
 * into its own chunk and only fetched where a globe is actually rendered.
 * Reduced-motion visitors and small screens never download it at all.
 */
const EarthScene = lazy(() => import('./EarthScene'))

export default function LazyEarth(props: {
  progress: number
  target: EarthTarget
  className?: string
  onReady?: () => void
}) {
  return (
    <Suspense fallback={null}>
      <EarthScene {...props} />
    </Suspense>
  )
}
