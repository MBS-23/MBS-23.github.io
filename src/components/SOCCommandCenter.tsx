import { AlertTriangle } from 'lucide-react'
import { socEvents, triageExample } from '../data/cyber'
import { Chip, Reveal, Section, SectionHeader } from './ui'

/**
 * ALERT TRIAGE — nested inside the cybersecurity scene.
 *
 * This used to be a simulated live SOC dashboard. A dashboard of invented
 * numbers tells a hiring manager nothing, so it is now one real alert walked
 * through the way it was actually practised in training and in the lab
 * dashboards: what is asked at each step, and what tool answers it.
 */

const SEVERITY: Record<string, string> = {
  info: 'var(--color-ai)',
  ok: 'var(--color-safe)',
  warn: 'var(--color-warn)',
  high: 'var(--color-cyber)',
}

export default function SOCCommandCenter() {
  const { alert, steps } = triageExample

  return (
    <Section id="soc" className="pb-24 sm:pb-32">
      <SectionHeader
        n={null}
        eyebrow="Alert triage"
        title="One alert, worked end to end."
        lead="Detection is the easy half. This is the reasoning I apply to an alert — the question at each step, and the tool that answers it."
        tone="cyber"
        action={
          <span className="inline-flex items-center gap-2 border border-border px-3 py-2 font-mono text-[0.56rem] tracking-[0.18em] text-muted uppercase">
            <AlertTriangle size={12} aria-hidden />
            Lab environment · not live
          </span>
        }
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* ---------- The alert ---------- */}
        <div className="lg:col-span-4">
          <Reveal>
            <div className="panel-soft lg:sticky lg:top-24">
              <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                <span className="font-mono text-[0.56rem] tracking-[0.2em] text-muted uppercase">Incoming alert</span>
                <span
                  className="border px-2 py-0.5 font-mono text-[0.54rem] tracking-[0.16em] uppercase"
                  style={{
                    color: SEVERITY[alert.severity],
                    borderColor: `color-mix(in srgb, ${SEVERITY[alert.severity]} 40%, transparent)`,
                  }}
                >
                  {alert.severity}
                </span>
              </div>

              <div className="px-4 py-5">
                <p className="font-mono text-[0.72rem] tracking-[0.1em] text-fg">{alert.label}</p>
                <p className="mt-3 font-mono text-[0.62rem] leading-relaxed break-words text-secondary">
                  {alert.detail}
                </p>
                <p className="mt-4 font-mono text-[0.56rem] tracking-[0.16em] text-muted uppercase">
                  Source · {alert.source}
                </p>
              </div>

              <div className="border-t border-border px-4 py-4">
                <p className="type-mono mb-3">Alert types worked</p>
                <ul className="space-y-1.5">
                  {socEvents.slice(0, 6).map((e) => (
                    <li key={e.label} className="flex items-center gap-2.5">
                      <span
                        className="h-1 w-1 shrink-0 rounded-full"
                        style={{ background: SEVERITY[e.severity] }}
                        aria-hidden
                      />
                      <span className="font-mono text-[0.56rem] tracking-[0.1em] text-muted">{e.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------- The reasoning ---------- */}
        <div className="lg:col-span-8">
          <ol className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.04} as="li">
                <div className="flex h-full flex-col bg-surface px-5 py-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.58rem] tabular-nums tracking-[0.2em] text-cyber">{s.n}</span>
                    <span className="font-mono text-[0.66rem] tracking-[0.18em] text-fg uppercase">{s.action}</span>
                  </div>

                  <p className="mt-4 text-[0.95rem] leading-snug text-fg">{s.question}</p>
                  <p className="mt-3 text-[0.86rem] leading-relaxed text-secondary">{s.work}</p>

                  <div className="mt-5 pt-4">
                    <Chip>{s.tool}</Chip>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
