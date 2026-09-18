import { about, education, profile } from '../data/profile'
import { turningPoint } from '../data/experience'
import { Panel, Reveal, Section, SectionHeader } from './ui'

/** The nodes that orbit the identity in the About diagram. */
const IDENTITY_NODES = [
  { label: 'AI', angle: 270, tone: 'var(--color-ai)' },
  { label: 'CYBERSECURITY', angle: 315, tone: 'var(--color-cyber)' },
  { label: 'WEB SECURITY', angle: 0, tone: 'var(--color-cyber)' },
  { label: 'SOC', angle: 45, tone: 'var(--color-safe)' },
  { label: 'NETWORKS', angle: 90, tone: 'var(--color-safe)' },
  { label: 'MACHINE LEARNING', angle: 135, tone: 'var(--color-ai)' },
  { label: 'GENAI', angle: 180, tone: 'var(--color-ai)' },
  { label: 'AUTOMATION', angle: 205, tone: 'var(--color-prompt)' },
  { label: 'DETECTION', angle: 232, tone: 'var(--color-safe)' },
  { label: 'THREAT INTEL', angle: 250, tone: 'var(--color-warn)' },
]

export default function About() {
  return (
    <Section id="about" className="py-24 sm:py-32" tone="ai">
      <SectionHeader n="02" eyebrow="The Operator" title="About" lead={about.lead} tone="ai" />

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* ---------- Narrative ---------- */}
        <div className="lg:col-span-7">
          <div className="space-y-5">
            {about.narrative.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className={i === 0 ? 'text-lg leading-relaxed text-fg sm:text-xl' : 'leading-relaxed text-secondary'}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          {/* The turning point */}
          <Reveal delay={0.1}>
            <figure className="mt-12 border-l-2 border-cyber pl-6">
              <p className="type-mono mb-3">The turning point · {turningPoint.date}</p>
              <blockquote className="leading-relaxed text-fg">{turningPoint.body}</blockquote>
              <figcaption className="mt-3 font-mono text-[0.66rem] tracking-wide text-muted">
                {turningPoint.title} — {turningPoint.org}
              </figcaption>
            </figure>
          </Reveal>

          {/* Education */}
          <Reveal delay={0.12}>
            <div className="mt-14">
              <p className="type-mono mb-5">Education</p>
              <ul className="divide-y divide-border border-y border-border">
                {education.map((e) => (
                  <li key={e.degree} className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:gap-6">
                    <div>
                      <h3 className="text-base font-semibold text-fg">{e.degree}</h3>
                      <p className="mt-1 text-sm text-secondary">{e.org}</p>
                      {e.note && <p className="mt-2 text-sm leading-relaxed text-muted">{e.note}</p>}
                    </div>
                    <div className="sm:text-right">
                      <p className="font-mono text-[0.68rem] tracking-wide text-muted">{e.period}</p>
                      <p className="mt-1 font-mono text-[0.72rem] text-ai">{e.result}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* ---------- Identity diagram + numbers ---------- */}
        <div className="lg:col-span-5">
          <Reveal delay={0.06}>
            <Panel label="Identity reconstruction" tone="ai" className="overflow-hidden">
              <div className="relative grid aspect-square place-items-center p-4">
                {/* Rings */}
                <span className="absolute h-[58%] w-[58%] rounded-full border border-border" aria-hidden />
                <span className="absolute h-[86%] w-[86%] rounded-full border border-border" aria-hidden />

                {/* Connectors */}
                <svg className="absolute inset-0 h-full w-full" aria-hidden>
                  {IDENTITY_NODES.map((n) => {
                    const rad = (n.angle * Math.PI) / 180
                    const r = 43
                    return (
                      <line
                        key={n.label}
                        x1="50%"
                        y1="50%"
                        x2={`${50 + Math.cos(rad) * r}%`}
                        y2={`${50 + Math.sin(rad) * r}%`}
                        stroke={n.tone}
                        strokeWidth="1"
                        opacity="0.2"
                      />
                    )
                  })}
                </svg>

                {/* Centre */}
                <div className="relative z-10 grid h-24 w-24 place-items-center rounded-full border border-border-2 bg-bg/90 text-center sm:h-28 sm:w-28">
                  <div>
                    <p className="text-[0.8rem] font-semibold tracking-tight text-fg">BVVS</p>
                    <p className="font-mono text-[0.52rem] tracking-[0.2em] text-muted">SUNIL</p>
                  </div>
                </div>

                {/* Nodes */}
                {IDENTITY_NODES.map((n) => {
                  const rad = (n.angle * Math.PI) / 180
                  const r = 43
                  return (
                    <span
                      key={n.label}
                      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border bg-bg/85 px-2 py-0.5 font-mono text-[0.46rem] tracking-[0.1em] whitespace-nowrap sm:text-[0.52rem]"
                      style={{
                        left: `${50 + Math.cos(rad) * r}%`,
                        top: `${50 + Math.sin(rad) * r}%`,
                        borderColor: `color-mix(in srgb, ${n.tone} 40%, transparent)`,
                        color: n.tone,
                      }}
                    >
                      {n.label}
                    </span>
                  )
                })}
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={0.12}>
            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[3px] border border-border bg-border">
              {about.stats.map((s) => (
                <div key={s.label} className="bg-surface px-5 py-5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                      {s.value}
                    </span>
                    <span className="mt-1.5 block text-[0.8rem] leading-snug text-secondary">{s.label}</span>
                    <span className="mt-1 block font-mono text-[0.6rem] tracking-wide text-muted">{s.note}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 font-mono text-[0.66rem] leading-relaxed tracking-wide text-muted">
              {profile.location} · {profile.graduating}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
