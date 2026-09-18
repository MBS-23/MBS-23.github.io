import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { promptDemo, promptPipeline, promptSkills } from '../data/promptEngineering'
import { Reveal, Section, SectionHeader } from './ui'

const ROLE_STYLE: Record<string, { label: string; colour: string }> = {
  user: { label: 'USER', colour: 'var(--color-fg)' },
  system: { label: 'SYSTEM', colour: 'var(--color-prompt)' },
  ai: { label: 'AI', colour: 'var(--color-ai)' },
  step: { label: '›', colour: 'var(--color-muted)' },
  result: { label: '✓', colour: 'var(--color-safe)' },
}

/**
 * The prompt engine. The pipeline on the left is the workflow; the window on the
 * right is a generic illustration of it running. Positioned honestly as
 * intermediate — the claim is the method, not mastery.
 */
export default function PromptEngineering() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-25%' })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (reduce) {
      setShown(promptDemo.length)
      return
    }
    if (!inView) return
    const id = setInterval(() => setShown((s) => (s >= promptDemo.length ? 0 : s + 1)), 780)
    return () => clearInterval(id)
  }, [inView, reduce])

  return (
    <Section id="prompt" className="py-24 sm:py-32" tone="prompt">
      <SectionHeader
        n="07"
        eyebrow="Prompt engineering"
        title="The Prompt Engine"
        lead="Designing the instruction, the context and the constraints so a model produces something usable — then evaluating the result instead of accepting the first answer."
        tone="prompt"
        action={
          <span className="inline-flex items-center gap-2 rounded-full border border-prompt/40 bg-prompt/8 px-4 py-2 font-mono text-[0.6rem] tracking-[0.16em] uppercase text-prompt">
            Intermediate prompt engineer
          </span>
        }
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* ---------- Pipeline ---------- */}
        <div className="lg:col-span-5">
          <p className="type-mono mb-5">The pipeline</p>
          <ol className="relative">
            <span aria-hidden className="absolute left-[5px] top-2 bottom-2 w-px bg-border" />
            {promptPipeline.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.04} as="li">
                <div className="relative flex gap-4 pb-5">
                  <span
                    aria-hidden
                    className="relative z-10 mt-1.5 block h-[11px] w-[11px] shrink-0 rounded-full border bg-bg"
                    style={{ borderColor: 'var(--color-prompt)' }}
                  />
                  <div>
                    <p className="font-mono text-[0.66rem] tracking-[0.18em] text-fg">{s.label}</p>
                    <p className="mt-1 text-[0.8rem] leading-snug text-muted">{s.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* ---------- Demo window ---------- */}
        <div className="lg:col-span-7">
          <Reveal delay={0.06}>
            <div ref={ref} className="scanlines panel-soft overflow-hidden rounded-[3px]" style={{ color: 'var(--color-prompt)' }}>
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <span className="font-mono text-[0.62rem] tracking-[0.16em] text-muted">
                  prompt-workflow — illustration
                </span>
                <span className="font-mono text-[0.56rem] tracking-[0.14em] text-prompt">GENERIC DEMO</span>
              </div>

              <div className="min-h-[320px] space-y-2.5 px-5 py-5 font-mono text-[0.72rem] leading-relaxed sm:text-[0.78rem]">
                {promptDemo.slice(0, shown).map((l, i) => {
                  const r = ROLE_STYLE[l.role]
                  return (
                    <motion.p
                      key={`${l.text}-${i}`}
                      initial={reduce ? undefined : { opacity: 0, x: -8 }}
                      animate={reduce ? undefined : { opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-3"
                    >
                      <span className="shrink-0" style={{ color: r.colour }}>
                        {r.label}
                      </span>
                      <span className={l.role === 'result' ? 'text-safe' : 'text-secondary'}>{l.text}</span>
                    </motion.p>
                  )
                })}
                {shown < promptDemo.length && (
                  <p className="flex gap-3">
                    <span className="text-prompt">›</span>
                    <span className="inline-block h-3.5 w-1.5 animate-blink bg-prompt" aria-hidden />
                  </p>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8">
              <p className="type-mono mb-4">Applied prompt skills</p>
              <ul className="flex flex-wrap gap-2">
                {promptSkills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-prompt/28 bg-prompt/6 px-3 py-1.5 font-mono text-[0.62rem] tracking-wide text-prompt"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
