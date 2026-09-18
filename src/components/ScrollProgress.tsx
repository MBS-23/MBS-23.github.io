import { motion, useScroll, useSpring } from 'framer-motion'

/** A hairline read-out of how far through the system you are. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.25 })

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[115] h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--color-cyber), var(--color-ai) 55%, var(--color-safe))',
      }}
    />
  )
}
