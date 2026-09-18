import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { aiConstellation, aiHistory, aiStack } from '../data/ai'
import { Reveal, Section, SectionHeader } from './ui'

/**
 * The AI constellation. Two rings of disciplines around a centre; selecting a
 * node dims the rest and reports what it was actually used for. Below it the
 * model stack, and the honest history of the earlier mini-projects.
 */
export default function AIUniverse() {
  const [active, setActive] = useState<string | null>(null)
  const selected = aiConstellation.find((n) => n.id === active)

  return (
    <Section id="ai" className="py-24 sm:py-32" tone="ai">
      <SectionHeader
        n="05"
        eyebrow="AI / ML world"
        title="The Constellation"
        lead="From classical machine learning to multi-modal generative systems — and the projects where each one was actually applied."
        tone="ai"
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* ---------- Constellation ---------- */}
        <div className="lg:col-span-7">
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            {/* Rings */}
            <span className="absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ai/20" aria-hidden />
            <span className="absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ai/12" aria-hidden />

            {/* Connectors */}
            <svg className="absolute inset-0 h-full w-full" aria-hidden>
              {aiConstellation.map((n) => {
                const rad = (n.angle * Math.PI) / 180
                const r = n.ring === 1 ? 26 : 43
                const dim = active !== null && active !== n.id
                return (
                  <line
                    key={n.id}
                    x1="50%"
                    y1="50%"
                    x2={`${50 + Math.cos(rad) * r}%`}
                    y2={`${50 + Math.sin(rad) * r}%`}
                    stroke="var(--color-ai)"
                    strokeWidth="1"
                    opacity={dim ? 0.06 : active === n.id ? 0.6 : 0.18}
                  />
                )
              })}
            </svg>

            {/* Centre */}
            <div className="absolute left-1/2 top-1/2 z-10 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ai/45 bg-bg/95 text-center">
              <div>
                <p className="text-[0.72rem] font-semibold text-ai">AI</p>
                <p className="font-mono text-[0.48rem] tracking-[0.16em] text-muted">CORE</p>
              </div>
            </div>

            {/* Nodes */}
            {aiConstellation.map((n) => {
              const rad = (n.angle * Math.PI) / 180
              const r = n.ring === 1 ? 26 : 43
              const isActive = active === n.id
              const dim = active !== null && !isActive
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setActive(isActive ? null : n.id)}
                  aria-pressed={isActive}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border bg-bg/90 px-2.5 py-1 font-mono text-[0.54rem] tracking-[0.1em] whitespace-nowrap transition-all duration-200 hover:scale-105 sm:text-[0.6rem]"
                  style={{
                    left: `${50 + Math.cos(rad) * r}%`,
                    top: `${50 + Math.sin(rad) * r}%`,
                    borderColor: isActive ? 'var(--color-ai)' : 'color-mix(in srgb, var(--color-ai) 30%, transparent)',
                    color: isActive ? 'var(--color-fg)' : 'var(--color-ai)',
                    opacity: dim ? 0.32 : 1,
                    boxShadow: isActive ? '0 0 20px -4px var(--color-ai)' : 'none',
                  }}
                >
                  {n.label}
                </button>
              )
            })}
          </div>

          {/* Readout */}
          <div className="mt-4 min-h-[74px] rounded-[3px] border border-border bg-surface px-5 py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected?.id ?? 'idle'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {selected ? (
                  <>
                    <p className="font-mono text-[0.62rem] tracking-[0.18em] text-ai uppercase">{selected.label}</p>
                    <p className="mt-2 text-[0.86rem] leading-relaxed text-secondary">{selected.detail}</p>
                    <p className="mt-2 font-mono text-[0.6rem] tracking-wide text-muted">{selected.evidence}</p>
                  </>
                ) : (
                  <p className="font-mono text-[0.66rem] tracking-wide text-muted">
                    Select a node to see where it was applied.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ---------- Stack + history ---------- */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="type-mono mb-4">Model & framework stack</p>
            <ul className="flex flex-wrap gap-2">
              {aiStack.map((s) => (
                <li
                  key={s}
                  className="rounded border border-border bg-surface px-2.5 py-1.5 font-mono text-[0.66rem] text-secondary"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10">
              <p className="type-mono mb-4">Earlier AI work</p>
              <ul className="divide-y divide-border border-y border-border">
                {aiHistory.map((h) => (
                  <li key={h.title} className="py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-[0.92rem] font-medium text-fg">{h.title}</h3>
                      <span className="font-mono text-[0.58rem] tracking-wider text-muted">{h.year}</span>
                    </div>
                    <p className="mt-1.5 text-[0.82rem] leading-relaxed text-secondary">{h.note}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-mono text-[0.58rem] tracking-wider text-ai">{h.tech}</span>
                      <span aria-hidden className="h-2.5 w-px bg-border-2" />
                      <span className="font-mono text-[0.56rem] tracking-[0.14em] text-muted uppercase">
                        {h.kind}
                      </span>
                    </div>
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
