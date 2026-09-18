import { experience, trainer, type Track } from '../data/experience'
import { ENERGY, Reveal, Section, SectionHeader } from './ui'

const TRACK: Record<Track, { label: string; energy: keyof typeof ENERGY }> = {
  security: { label: 'Security', energy: 'cyber' },
  ai: { label: 'AI / ML', energy: 'ai' },
  government: { label: 'Government', energy: 'warn' },
  training: { label: 'Training', energy: 'safe' },
}

export function ExperienceTimeline() {
  return (
    <Section id="experience" className="py-24 sm:py-32" tone="cyber">
      <SectionHeader
        n="12"
        eyebrow="Service record"
        title="Experience"
        lead="Seven internships and one paid role across two years — several of them running in parallel, all of them hands-on."
        tone="cyber"
      />

      <ol className="relative mt-14">
        <span aria-hidden className="absolute left-[7px] top-3 bottom-3 hidden w-px bg-border sm:block" />

        {experience.map((role, i) => {
          const track = TRACK[role.track]
          const colour = ENERGY[track.energy]
          return (
            <Reveal key={role.id} delay={i * 0.03} as="li">
              <div className="relative grid gap-4 pb-12 sm:grid-cols-[auto_1fr] sm:gap-8">
                <div className="hidden pt-1.5 sm:block">
                  <span
                    className="block h-[15px] w-[15px] rounded-full border-2 bg-bg"
                    style={{
                      borderColor: colour,
                      boxShadow: i === 0 ? `0 0 16px -3px ${colour}` : 'none',
                    }}
                    aria-hidden
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span
                      className="font-mono text-[0.66rem] tracking-[0.16em] uppercase"
                      style={{ color: colour }}
                    >
                      {role.period}
                    </span>
                    <span aria-hidden className="h-3 w-px bg-border-2" />
                    <span className="font-mono text-[0.6rem] tracking-[0.14em] text-muted uppercase">
                      {track.label}
                    </span>
                    <span aria-hidden className="h-3 w-px bg-border-2" />
                    <span className="font-mono text-[0.6rem] tracking-wide text-muted">{role.mode}</span>
                  </div>

                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-fg sm:text-xl">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-[0.9rem] text-secondary">{role.org}</p>

                  <ul className="mt-5 space-y-2.5">
                    {role.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[0.88rem] leading-relaxed text-secondary">
                        <span aria-hidden className="mt-2.5 h-px w-3 shrink-0" style={{ background: colour, opacity: 0.55 }} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {role.proof && (
                    <p
                      className="mt-4 rounded-[3px] border px-4 py-3 font-mono text-[0.66rem] leading-relaxed"
                      style={{
                        borderColor: `color-mix(in srgb, ${colour} 30%, transparent)`,
                        background: `color-mix(in srgb, ${colour} 6%, transparent)`,
                        color: 'var(--color-muted)',
                      }}
                    >
                      {role.proof}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          )
        })}
      </ol>
    </Section>
  )
}

/** KNOWLEDGE TRANSFER — the teaching half of the Skills Uprise role. */
export function TrainerSection() {
  return (
    <Section id="trainer" className="py-24 sm:py-32" tone="safe">
      <SectionHeader
        n={null}
        eyebrow="Knowledge transfer"
        title="Teaching It"
        lead="The fastest way to find the gaps in your own understanding is to stand in front of fifty people and explain it."
        tone="safe"
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="panel-soft rounded-[3px] p-8 text-center" style={{ color: 'var(--color-safe)' }}>
              <p className="text-5xl font-semibold tracking-tight text-fg sm:text-6xl">
                {trainer.headline}
              </p>
              <p className="mt-3 text-sm text-secondary">{trainer.subject}</p>

              <ul className="mt-7 flex flex-wrap justify-center gap-2">
                {trainer.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded border border-safe/30 bg-safe/8 px-2.5 py-1 font-mono text-[0.62rem] text-safe"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 border-t border-border pt-6">
                {trainer.loop.map((l, i) => (
                  <span key={l} className="flex items-center gap-2">
                    <span className="font-mono text-[0.6rem] tracking-[0.16em] text-fg">{l}</span>
                    {i < trainer.loop.length - 1 && (
                      <span aria-hidden className="text-muted">
                        →
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul className="space-y-4">
            {trainer.points.map((p, i) => (
              <Reveal key={p} delay={0.05 + i * 0.05} as="li">
                <div className="flex gap-4 rounded-[3px] border border-border bg-surface p-5">
                  <span className="font-mono text-[0.6rem] tabular-nums text-safe">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[0.9rem] leading-relaxed text-secondary">{p}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
