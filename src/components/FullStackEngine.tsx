import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { secureRequestTrace, stackLayers } from '../data/fullstack'
import { Reveal, Section, SectionHeader } from './ui'

/**
 * The full-stack engine. The stack is shown as a vertical server rack that
 * activates layer by layer, and the secure-request trace runs a live walkthrough
 * pairing every hop with the control that belongs there.
 *
 * This is the section that connects the development half of the profile to the
 * security half.
 */
export default function FullStackEngine() {
  const traceRef = useRef<HTMLDivElement>(null)
  const inView = useInView(traceRef, { once: false, margin: '-30%' })
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)

  // The trace loops only while it is on screen.
  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setStep(secureRequestTrace.length - 1)
      return
    }
    const id = setInterval(() => setStep((s) => (s + 1) % (secureRequestTrace.length + 1)), 900)
    return () => clearInterval(id)
  }, [inView, reduce])

  return (
    <Section id="fullstack" className="py-24 sm:py-32" tone="safe">
      <SectionHeader
        n="06"
        eyebrow="Full-stack world"
        title="The Engine"
        lead="Frontend to API to backend to database — and the security control that belongs at every layer. Built, and taught, as one thing."
        tone="safe"
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* ---------- The rack ---------- */}
        <div className="lg:col-span-7">
          <ul className="space-y-3">
            {stackLayers.map((layer, i) => (
              <Reveal key={layer.id} delay={i * 0.05} as="li">
                <div className="panel-soft group rounded-[3px] p-5 transition-colors hover:border-safe/35" style={{ color: 'var(--color-safe)' }}>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-baseline gap-4">
                      <span className="text-lg font-semibold text-safe/70">{layer.index}</span>
                      <div>
                        <h3 className="text-base font-semibold tracking-tight text-fg">
                          {layer.title}
                        </h3>
                        <p className="mt-1.5 max-w-lg text-[0.84rem] leading-relaxed text-secondary">{layer.note}</p>
                      </div>
                    </div>
                    <span className="rounded border border-safe/35 bg-safe/8 px-2.5 py-1 font-mono text-[0.58rem] tracking-wider whitespace-nowrap text-safe">
                      {layer.control}
                    </span>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {layer.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded border border-border px-2 py-0.5 font-mono text-[0.6rem] text-muted"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* ---------- Secure request trace ---------- */}
        <div className="lg:col-span-5">
          <Reveal delay={0.06}>
            <div ref={traceRef} className="panel-soft sticky top-24 rounded-[3px] p-6" style={{ color: 'var(--color-safe)' }}>
              <div className="flex items-center justify-between">
                <p className="type-mono" style={{ color: 'var(--color-safe)' }}>
                  Secure request trace
                </p>
                <span className="flex items-center gap-2 font-mono text-[0.56rem] tracking-[0.16em] text-safe">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-safe" aria-hidden />
                  LIVE DEMO
                </span>
              </div>

              <ol className="mt-6 space-y-0">
                {secureRequestTrace.map((s, i) => {
                  const done = step > i
                  const current = step === i
                  return (
                    <li key={s.step} className="relative flex gap-4 pb-5 last:pb-0">
                      {/* Connector */}
                      {i < secureRequestTrace.length - 1 && (
                        <span
                          aria-hidden
                          className="absolute left-[7px] top-5 h-full w-px transition-colors duration-300"
                          style={{ background: done ? 'var(--color-safe)' : 'var(--color-border)' }}
                        />
                      )}
                      <motion.span
                        aria-hidden
                        className="relative z-10 mt-1 block h-[15px] w-[15px] shrink-0 rounded-full border-2 bg-bg"
                        animate={{
                          borderColor: done || current ? 'var(--color-safe)' : 'var(--color-border-2)',
                          boxShadow: current ? '0 0 16px -2px var(--color-safe)' : '0 0 0 rgba(0,0,0,0)',
                          scale: current ? 1.18 : 1,
                        }}
                        transition={{ duration: 0.25 }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <span
                            className="font-mono text-[0.66rem] tracking-[0.16em] transition-colors"
                            style={{ color: done || current ? 'var(--color-fg)' : 'var(--color-muted)' }}
                          >
                            {s.step}
                          </span>
                          <span
                            className="font-mono text-[0.56rem] tracking-wider transition-colors"
                            style={{ color: done || current ? 'var(--color-safe)' : 'var(--color-border-2)' }}
                          >
                            ✓ {s.check}
                          </span>
                        </div>
                        <p className="mt-1 text-[0.78rem] leading-snug text-muted">{s.detail}</p>
                      </div>
                    </li>
                  )
                })}
              </ol>

              <p className="mt-6 border-t border-border pt-4 font-mono text-[0.58rem] leading-relaxed text-muted">
                Illustrative walkthrough of the request path and its controls — not a live application.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
