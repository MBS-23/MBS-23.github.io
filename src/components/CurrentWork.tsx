import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ShieldAlert } from 'lucide-react'
import {
  boardColumns,
  currentLearning,
  currentProjects,
  northStar,
  type CurrentProject,
} from '../data/currentProjects'
import { ENERGY, FlowChain, Reveal, Section, SectionHeader, StatusBadge } from './ui'

const BADGE_TONE: Record<CurrentProject['badge'], 'cyber' | 'ai' | 'safe' | 'warn' | 'prompt'> = {
  'IN PROGRESS': 'cyber',
  BUILDING: 'ai',
  EXPERIMENTAL: 'warn',
  PLANNED: 'prompt',
}

/**
 * CURRENTLY BUILDING — kept strictly apart from completed work.
 *
 * Stages, not percentages: a percentage on unfinished work is a made-up number,
 * and this section exists precisely to be credible about what is and is not done.
 */
export default function CurrentWork() {
  const [open, setOpen] = useState<string | null>(currentProjects[0].id)

  return (
    <Section id="current" className="py-24 sm:py-32" tone="prompt">
      <SectionHeader
        n="12"
        eyebrow="Currently building"
        title="In Development"
        lead="The portfolio is not the end of the journey. These are the systems being explored, designed, built and tested right now — labelled honestly, none of them presented as finished."
        tone="prompt"
      />

      {/* ---------- Development board ---------- */}
      <Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[3px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {boardColumns.map((col) => {
            const items = currentProjects.filter((p) => p.column === col.id)
            return (
              <div key={col.id} className="bg-surface p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="type-mono">{col.label}</p>
                  <span className="font-mono text-[0.58rem] text-muted">{items.length}</span>
                </div>
                <ul className="space-y-2">
                  {items.map((p) => {
                    const colour = ENERGY[p.energy]
                    return (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => setOpen(p.id)}
                          aria-pressed={open === p.id}
                          className="w-full rounded-[3px] border bg-bg/50 px-3 py-2.5 text-left transition-colors"
                          style={{
                            borderColor:
                              open === p.id
                                ? `color-mix(in srgb, ${colour} 55%, transparent)`
                                : 'var(--color-border)',
                          }}
                        >
                          <span className="block text-[0.78rem] font-medium leading-snug text-fg">{p.title}</span>
                          <span className="mt-1 block font-mono text-[0.54rem] tracking-[0.12em]" style={{ color: colour }}>
                            {p.stage}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                  {items.length === 0 && (
                    <li className="rounded-[3px] border border-dashed border-border px-3 py-4 text-center font-mono text-[0.56rem] text-muted">
                      empty
                    </li>
                  )}
                </ul>
              </div>
            )
          })}
        </div>
      </Reveal>

      {/* ---------- Project list ---------- */}
      <div className="mt-10 space-y-3">
        {currentProjects.map((p, i) => {
          const colour = ENERGY[p.energy]
          const isOpen = open === p.id
          return (
            <Reveal key={p.id} delay={Math.min(i, 6) * 0.03}>
              <div
                className="panel-soft overflow-hidden rounded-[3px]"
                style={{ color: isOpen ? colour : 'var(--color-border-2)' }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : p.id)}
                  aria-expanded={isOpen}
                  className="flex w-full flex-wrap items-center justify-between gap-4 p-5 text-left sm:p-6"
                >
                  <div className="flex min-w-0 items-baseline gap-4 sm:gap-5">
                    <span className="text-xl font-semibold tabular-nums sm:text-2xl" style={{ color: colour }}>
                      {p.number}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold tracking-tight text-fg sm:text-lg">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-[0.8rem] leading-snug text-muted">{p.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-[0.56rem] tracking-[0.14em] text-muted uppercase">{p.pillar}</span>
                    <StatusBadge label={p.badge} tone={BADGE_TONE[p.badge]} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-6 border-t border-border px-5 py-6 sm:px-6">
                        <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
                          <p className="max-w-2xl leading-relaxed text-secondary">{p.objective}</p>
                          <dl className="shrink-0 space-y-2 sm:text-right">
                            <div>
                              <dt className="font-mono text-[0.54rem] tracking-[0.14em] text-muted uppercase">
                                Current stage
                              </dt>
                              <dd className="font-mono text-[0.72rem]" style={{ color: colour }}>
                                {p.stage}
                              </dd>
                            </div>
                            <div>
                              <dt className="font-mono text-[0.54rem] tracking-[0.14em] text-muted uppercase">
                                Next milestone
                              </dt>
                              <dd className="max-w-[260px] text-[0.74rem] leading-snug text-secondary">
                                {p.nextMilestone}
                              </dd>
                            </div>
                          </dl>
                        </div>

                        <div>
                          <p className="type-mono mb-3">Flow</p>
                          <FlowChain steps={p.flow} tone={p.energy} dense />
                        </div>

                        <div>
                          <p className="type-mono mb-3">Scope</p>
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {p.scope.map((s) => (
                              <li key={s} className="flex gap-2.5 text-[0.84rem] leading-snug text-secondary">
                                <span
                                  aria-hidden
                                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                                  style={{ background: colour }}
                                />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="type-mono mb-3">Stack</p>
                          <ul className="flex flex-wrap gap-1.5">
                            {p.stack.map((s) => (
                              <li
                                key={s}
                                className="rounded border border-border px-2.5 py-1 font-mono text-[0.6rem] text-muted"
                              >
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {p.guardrail && (
                          <p className="flex items-start gap-3 rounded-[3px] border border-warn/35 bg-warn/8 px-4 py-3 font-mono text-[0.66rem] leading-relaxed text-warn">
                            <ShieldAlert size={14} aria-hidden className="mt-0.5 shrink-0" />
                            {p.guardrail}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* ---------- The direction ---------- */}
      <Reveal>
        <div className="mt-16 panel-soft rounded-[3px] p-6 sm:p-8" style={{ color: 'var(--color-prompt)' }}>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="type-sub text-fg">{northStar.title}</h3>
            <span className="font-mono text-[0.6rem] tracking-[0.18em] text-prompt uppercase">{northStar.status}</span>
          </div>
          <p className="mt-4 max-w-3xl leading-relaxed text-secondary">{northStar.body}</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {northStar.pillars.map((pil) => (
              <div key={pil.label} className="rounded-[3px] border border-border bg-bg/50 px-4 py-4">
                <p className="type-mono mb-3">{pil.label}</p>
                <ul className="space-y-1.5">
                  {pil.items.map((i) => (
                    <li key={i} className="font-mono text-[0.66rem] text-secondary">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ---------- Currently learning ---------- */}
      <Reveal>
        <div className="mt-14">
          <p className="type-mono mb-5">Currently learning</p>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {currentLearning.map((l) => (
              <li
                key={l.label}
                className="flex items-center justify-between gap-3 rounded-[3px] border border-border bg-surface px-4 py-3"
              >
                <span className="text-[0.8rem] leading-snug text-secondary">{l.label}</span>
                <span className="shrink-0 font-mono text-[0.54rem] tracking-[0.14em] text-safe">{l.state}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
