import { useState } from 'react'
import { Award, BadgeCheck, ChevronDown } from 'lucide-react'
import { achievements, certifications, knowledgeCore } from '../data/credentials'
import { ENERGY, Reveal, Section, SectionHeader } from './ui'

/**
 * Certifications, mission log and the training knowledge core.
 * Certificate cards tilt on hover; nothing here carries an invented ID or date.
 */
export default function Credentials() {
  const [openBranch, setOpenBranch] = useState<string | null>(knowledgeCore[0].branch)

  return (
    <Section id="credentials" className="py-24 sm:py-32" tone="warn">
      <SectionHeader
        n="13"
        eyebrow="Credentials"
        title="Verified"
        lead="Certifications that are current, recognition that came from work rather than attendance, and the full training curriculum behind the SOC half of the profile."
        tone="warn"
      />

      {/* ---------- Certificate wall ---------- */}
      <div className="mt-14">
        <p className="type-mono mb-5 flex items-center gap-2.5">
          <BadgeCheck size={13} aria-hidden className="text-ai" />
          Certifications & programmes
          <span className="text-muted/60">({certifications.length})</span>
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c, i) => {
            const colour = ENERGY[c.energy]
            return (
              <Reveal key={c.title} delay={Math.min(i, 8) * 0.035}>
                <article
                  className="panel-soft group relative h-full overflow-hidden rounded-[3px] p-5 transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-0.6deg]"
                  style={{ color: colour }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(90% 70% at 50% 0%, color-mix(in srgb, ${colour} 18%, transparent), transparent 70%)`,
                    }}
                  />
                  <div className="relative">
                    <span
                      className="inline-block h-1 w-10 rounded-full"
                      style={{ background: colour }}
                      aria-hidden
                    />
                    <h3 className="mt-4 text-[0.92rem] font-medium leading-snug text-fg">{c.title}</h3>
                    <p className="mt-3 text-[0.8rem] text-secondary">{c.issuer}</p>
                    {c.meta && (
                      <p className="mt-1.5 font-mono text-[0.6rem] tracking-wide text-muted">{c.meta}</p>
                    )}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* ---------- Mission log ---------- */}
      <div className="mt-20">
        <p className="type-mono mb-5 flex items-center gap-2.5">
          <Award size={13} aria-hidden className="text-cyber" />
          Mission log
          <span className="text-muted/60">({achievements.length})</span>
        </p>

        <ul className="divide-y divide-border border-y border-border">
          {achievements.map((a, i) => {
            const colour = ENERGY[a.energy]
            return (
              <Reveal key={a.title} delay={Math.min(i, 8) * 0.025} as="li">
                <div className="grid gap-2 py-5 sm:grid-cols-[minmax(0,300px)_1fr] sm:gap-8">
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45"
                      style={{ background: colour }}
                    />
                    <h3 className="text-[0.92rem] font-medium leading-snug text-fg">{a.title}</h3>
                  </div>
                  <p className="text-[0.86rem] leading-relaxed text-secondary">{a.detail}</p>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>

      {/* ---------- Knowledge core ---------- */}
      <div className="mt-20">
        <p className="type-mono mb-2">Knowledge core</p>
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-secondary">
          The full SOC with AI (L2/L3) curriculum from the CyberGuide Telugu training programme, branch by branch. Not a list of buzzwords — the modules that
          were actually worked through.
        </p>

        <div className="space-y-2">
          {knowledgeCore.map((branch, i) => {
            const isOpen = openBranch === branch.branch
            return (
              <Reveal key={branch.branch} delay={i * 0.025}>
                <div className="overflow-hidden rounded-[3px] border border-border bg-surface">
                  <button
                    type="button"
                    onClick={() => setOpenBranch(isOpen ? null : branch.branch)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="flex items-center gap-4">
                      <span className="font-mono text-[0.56rem] tabular-nums text-muted">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[0.95rem] font-semibold tracking-tight text-fg">
                        {branch.branch}
                      </span>
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[0.58rem] text-muted">{branch.items.length}</span>
                      <ChevronDown
                        size={15}
                        aria-hidden
                        className="text-muted transition-transform duration-300"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
                      />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-border px-5 py-4">
                      <ul className="flex flex-wrap gap-1.5">
                        {branch.items.map((item) => (
                          <li
                            key={item}
                            className="rounded border border-border bg-bg/50 px-2.5 py-1 font-mono text-[0.62rem] text-secondary"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
