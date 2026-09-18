import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * REAL EARTH.
 *
 * A textured sphere carrying NASA Blue Marble (day) and NASA Earth-at-Night
 * (city lights) imagery — both public domain — blended across a real terminator,
 * wrapped in a fresnel atmosphere and a star field.
 *
 * Geography is genuine: the camera flies to actual latitude/longitude, so the
 * landmass under the origin marker really is India.
 *
 * The component is fully controlled. `progress` (0→1) drives the camera flight;
 * the parent owns the timeline so the sequence can be scrubbed, skipped or
 * frozen for reduced motion.
 */

export interface EarthTarget {
  lat: number
  lon: number
}

const DEG = Math.PI / 180

/** Distance from the surface at each end of the flight. */
const FAR = 6.2
const NEAR = 1.48

/** Bring a lat/lon to face the camera. Derivation lives in the two groups below. */
const spinFor = (lon: number) => Math.PI / 2 - (lon + 180) * DEG
const tiltFor = (lat: number) => lat * DEG

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export default function EarthScene({
  progress,
  target,
  className = '',
  onReady,
}: {
  /** 0 = far orbit, 1 = close on the target coordinate. */
  progress: number
  target: EarthTarget
  className?: string
  onReady?: () => void
}) {
  const host = useRef<HTMLDivElement>(null)
  // Live values the animation loop reads without re-creating the scene.
  const state = useRef({ progress, target })
  state.current = { progress, target }

  useEffect(() => {
    const el = host.current
    if (!el) return

    let disposed = false
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 100)
    camera.position.set(0, 0, FAR)

    /* ---------------- Stars ---------------- */
    const starCount = 1400
    const starPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      // Shell well outside the globe so stars never intersect the atmosphere.
      const r = 26 + Math.random() * 22
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      starPos[i * 3] = r * Math.sin(ph) * Math.cos(th)
      starPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
      starPos[i * 3 + 2] = r * Math.cos(ph)
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.14, sizeAttenuation: true, transparent: true, opacity: 0.75 })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    /* ---------------- Earth ---------------- */
    // Two nested groups: the outer tilts for latitude, the inner spins for
    // longitude. Composing them in that order puts any coordinate dead centre.
    const tiltGroup = new THREE.Group()
    const spinGroup = new THREE.Group()
    tiltGroup.add(spinGroup)
    scene.add(tiltGroup)

    const loader = new THREE.TextureLoader()
    const dayMap = loader.load(`${import.meta.env.BASE_URL}textures/earth-day.jpg`, () => onReady?.())
    const nightMap = loader.load(`${import.meta.env.BASE_URL}textures/earth-night.jpg`)
    dayMap.colorSpace = THREE.SRGBColorSpace
    nightMap.colorSpace = THREE.SRGBColorSpace
    dayMap.anisotropy = renderer.capabilities.getMaxAnisotropy()
    nightMap.anisotropy = dayMap.anisotropy

    const earthUniforms = {
      dayMap: { value: dayMap },
      nightMap: { value: nightMap },
      sunDir: { value: new THREE.Vector3(0.72, 0.28, 0.62).normalize() },
      exposure: { value: 1.0 },
    }

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 96, 96),
      new THREE.ShaderMaterial({
        uniforms: earthUniforms,
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          varying vec3 vWorldNormal;
          void main() {
            vUv = uv;
            vWorldNormal = normalize(mat3(modelMatrix) * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform sampler2D dayMap;
          uniform sampler2D nightMap;
          uniform vec3 sunDir;
          uniform float exposure;
          varying vec2 vUv;
          varying vec3 vWorldNormal;

          void main() {
            float d = dot(normalize(vWorldNormal), normalize(sunDir));
            // A soft terminator rather than a hard shadow line.
            float day = smoothstep(-0.16, 0.26, d);

            vec3 dayCol = texture2D(dayMap, vUv).rgb;
            vec3 nightCol = texture2D(nightMap, vUv).rgb;

            // City lights only read on the night side, and only where bright.
            vec3 lights = nightCol * pow(1.0 - day, 1.6) * 1.35;
            vec3 col = mix(vec3(0.012, 0.017, 0.028), dayCol, day) + lights;

            gl_FragColor = vec4(col * exposure, 1.0);
          }
        `,
      }),
    )
    spinGroup.add(earth)

    /* ---------------- Atmosphere ---------------- */
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.035, 64, 64),
      new THREE.ShaderMaterial({
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: { tint: { value: new THREE.Color(0x4e9cff) } },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 tint;
          varying vec3 vNormal;
          void main() {
            float rim = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.6);
            gl_FragColor = vec4(tint, 1.0) * clamp(rim, 0.0, 1.0) * 0.9;
          }
        `,
      }),
    )
    scene.add(atmosphere)

    /* ---------------- Origin marker ---------------- */
    // Sits on the surface at the target coordinate — it is genuinely placed,
    // not drawn on top of the screen.
    const marker = new THREE.Group()
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.007, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xff3b4a }),
    )
    const halo = new THREE.Mesh(
      new THREE.RingGeometry(0.014, 0.019, 48),
      new THREE.MeshBasicMaterial({ color: 0xff3b4a, transparent: true, opacity: 0.85, side: THREE.DoubleSide }),
    )
    marker.add(dot, halo)
    spinGroup.add(marker)

    /* ---------------- Resize ---------------- */
    const resize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    /* ---------------- Loop ---------------- */
    // Eased followers so a jump in `progress` still reads as camera movement.
    let spin = spinFor(state.current.target.lon)
    let tilt = tiltFor(state.current.target.lat)
    let dist = FAR
    let raf = 0

    const tick = (now: number) => {
      if (disposed) return
      const { progress: p, target: t } = state.current
      const e = easeInOut(Math.max(0, Math.min(1, p)))

      // Idle drift before the flight begins, locked to the target after.
      const idle = (1 - e) * now * 0.000035
      const wantSpin = spinFor(t.lon) + idle
      const wantTilt = tiltFor(t.lat) * e
      const wantDist = lerp(FAR, NEAR, e)

      spin += (wantSpin - spin) * 0.055
      tilt += (wantTilt - tilt) * 0.055
      dist += (wantDist - dist) * 0.05

      spinGroup.rotation.y = spin
      tiltGroup.rotation.x = tilt
      camera.position.z = dist

      // Marker rides the surface at the real coordinate.
      const phi = (90 - t.lat) * DEG
      const theta = (t.lon + 180) * DEG
      const r = 1.002
      marker.position.set(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta),
      )
      marker.lookAt(marker.position.clone().multiplyScalar(2))
      const pulse = 0.5 + 0.5 * Math.sin(now / 380)
      halo.scale.setScalar(1 + pulse * 0.9)
      ;(halo.material as THREE.MeshBasicMaterial).opacity = (1 - pulse) * 0.8 * e
      ;(dot.material as THREE.MeshBasicMaterial).opacity = e
      marker.visible = e > 0.06

      stars.rotation.y = now * 0.000008

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      renderer.dispose()
      starGeo.dispose()
      starMat.dispose()
      earth.geometry.dispose()
      ;(earth.material as THREE.Material).dispose()
      atmosphere.geometry.dispose()
      ;(atmosphere.material as THREE.Material).dispose()
      dot.geometry.dispose()
      halo.geometry.dispose()
      dayMap.dispose()
      nightMap.dispose()
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement)
    }
    // Scene is built once; `progress` and `target` flow through the ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={host} className={className} aria-hidden />
}
