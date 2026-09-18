import { useState } from 'react'
import { ArrowUpRight, Lock } from 'lucide-react'
import { projects, research } from '../data/projects'
import type { Project } from '../data/projects'
import { Chip, ENERGY, Reveal, Section, SectionHeader, StatusBadge } from './ui'
import { ToolChip } from './ToolIcon'

/**
 * SCENE 10 — PROJECTS.
 *
 * Every finished project gets a full scene rather than a card in a grid: what
 * the problem was, what was built, how it is put together, what it cost and
 * what it taught. Nothing is hidden behind a modal, so a recruiter can read the
 * whole thing by scrolling and a hiring engineer can stop at the architecture.
 *
 * There are no product screenshots here on purpose — the diagrams are drawn
 * from the real architecture instead of showing a picture of a window.
 */

const TONE_LABEL: Record<Project['energy'], string> = {
  cyber: 'Security',
  ai: 'AI / ML',
  safe: 'Engineering',
  warn: 'Hardware',
}

/* -------------------------------------------------------------------------- */
/*  Architecture — the one visual, drawn from the project's real pipeline      */
/* -------------------------------------------------------------------------- */

function Architecture({ steps, tone }: { steps: string[]; tone: Project['energy'] }) {
  const colour = ENERGY[tone]
  return (
    <ol className="relative">
      {steps.map((step, i) => {
        const [head, ...rest] = step.split(' — ')
        const detail = rest.join(' — ')
        const last = i === steps.length - 1
        return (
          <li key={step} className="relative flex gap-4 pb-4 last:pb-0">
            {/* rail */}
            <div className="relative flex w-4 shrink-0 flex-col items-center">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: colour, opacity: last ? 1 : 0.55 }}
                aria-hidden
              />
              {!last && <span aria-hidden className="mt-1 w-px flex-1 bg-border" />}
            </div>

            <div className="min-w-0 pb-1">
              <p className="font-mono text-[0.6rem] tracking-[0.16em] text-fg">
                <span className="mr-2.5 tabular-nums text-muted">{String(i + 1).padStart(2, '0')}</span>
                {head}
              </p>
              {detail && <p className="mt-1 font-mono text-[0.58rem] leading-relaxed text-muted">{detail}</p>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

/* -------------------------------------------------------------------------- */

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-5">
      <p className="type-mono mb-3">{label}</p>
      {children}
    </div>
  )
}

function ProjectScene({ project, index }: { project: Project; index: number }) {
  const colour = ENERGY[project.energy]
  const flip = index % 2 === 1

  return (
    <article
      id={`project-${project.id}`}
      className="scroll-mt-24 border-t border-border py-16 first:border-t-0 sm:py-20"
    >
      {/* ---------- Title row ---------- */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[0.62rem] tabular-nums tracking-[0.2em]" style={{ color: colour }}>
            {project.number}
          </span>
          <span aria-hidden className="h-px w-8" style={{ background: colour, opacity: 0.4 }} />
          <StatusBadge label={project.status} tone={project.energy} />
          <Chip>{project.category}</Chip>
          <span className="font-mono text-[0.56rem] tracking-[0.2em] text-muted uppercase">
            {TONE_LABEL[project.energy]}
          </span>
        </div>

        <h3 className="type-headline mt-6 text-fg">{project.title}</h3>
        <p className="mt-4 max-w-3xl text-[1.02rem] leading-relaxed text-secondary">{project.subtitle}</p>
        <p className="mt-4 font-mono text-[0.6rem] tracking-[0.16em] text-muted uppercase">{project.role}</p>
      </Reveal>

      {/* ---------- Body ---------- */}
      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* narrative */}
        <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
          <Reveal delay={0.05}>
            <div className="space-y-7">
              <Block label="The problem">
                <p className="leading-relaxed text-secondary">{project.problem}</p>
              </Block>

              <Block label="What I built">
                <p className="leading-relaxed text-secondary">{project.solution}</p>
              </Block>

              <Block label="Key capabilities">
                <ul className="space-y-2.5">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[0.92rem] leading-relaxed text-secondary">
                      <span aria-hidden className="mt-2 h-px w-3 shrink-0" style={{ background: colour, opacity: 0.6 }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block label="What it taught me">
                <p className="leading-relaxed text-fg">{project.learned}</p>
              </Block>

              {(project.testing || project.security || project.limitations || project.futureWork) && (
                <Block label="Honest notes">
                  <dl className="space-y-3">
                    {project.testing && (
                      <div>
                        <dt className="font-mono text-[0.56rem] tracking-[0.18em] text-muted uppercase">Testing</dt>
                        <dd className="mt-1 text-[0.9rem] leading-relaxed text-secondary">{project.testing}</dd>
                      </div>
                    )}
                    {project.security && (
                      <div>
                        <dt className="font-mono text-[0.56rem] tracking-[0.18em] uppercase" style={{ color: colour }}>
                          Authorisation
                        </dt>
                        <dd className="mt-1 text-[0.9rem] leading-relaxed text-secondary">{project.security}</dd>
                      </div>
                    )}
                    {project.limitations && (
                      <div>
                        <dt className="font-mono text-[0.56rem] tracking-[0.18em] text-muted uppercase">Limitations</dt>
                        <dd className="mt-1 text-[0.9rem] leading-relaxed text-secondary">{project.limitations}</dd>
                      </div>
                    )}
                    {project.futureWork && (
                      <div>
                        <dt className="font-mono text-[0.56rem] tracking-[0.18em] text-muted uppercase">Next</dt>
                        <dd className="mt-1 text-[0.9rem] leading-relaxed text-secondary">{project.futureWork}</dd>
                      </div>
                    )}
                  </dl>
                </Block>
              )}
            </div>
          </Reveal>
        </div>

        {/* instrument column */}
        <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
          <Reveal delay={0.1}>
            <div className="space-y-8 lg:sticky lg:top-24">
              {/* results — always with the source of the numbers */}
              {project.results && (
                <div>
                  <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-1">
                    {project.results.map((r) => (
                      <div key={r.label} className="bg-surface px-4 py-4">
                        <p className="font-mono text-[1.18rem] leading-none tracking-tight" style={{ color: colour }}>
                          {r.value}
                        </p>
                        <p className="mt-2 text-[0.78rem] leading-snug text-muted">{r.label}</p>
                      </div>
                    ))}
                  </div>
                  {project.resultsSource && (
                    <p className="mt-3 font-mono text-[0.56rem] leading-relaxed tracking-[0.06em] text-muted">
                      {project.resultsSource}
                    </p>
                  )}
                </div>
              )}

              {/* architecture */}
              <div className="panel-soft">
                <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                  <span className="h-1 w-1 rounded-full" style={{ background: colour }} aria-hidden />
                  <span className="font-mono text-[0.56rem] tracking-[0.2em] text-muted uppercase">Architecture</span>
                </div>
                <div className="px-4 py-5">
                  <Architecture steps={[...project.architecture]} tone={project.energy} />
                </div>
              </div>

              {/* stack */}
              <div>
                <p className="type-mono mb-3">Built with</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <ToolChip key={t} name={t} tone={project.energy} />
                  ))}
                </div>
              </div>

              {/* where + links */}
              <div className="border-t border-border pt-5">
                <p className="type-mono mb-3">Where</p>
                <p className="text-[0.88rem] leading-relaxed text-secondary">{project.origin}</p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-2 border border-border-2 px-4 py-2.5 font-mono text-[0.6rem] tracking-[0.18em] text-fg uppercase transition-colors hover:bg-white/5"
                    >
                      Code on GitHub
                      <ArrowUpRight size={12} aria-hidden className="transition-transform group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 border border-border px-4 py-2.5 font-mono text-[0.6rem] tracking-[0.18em] text-muted uppercase">
                      <Lock size={11} aria-hidden />
                      Private · walkthrough on request
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  )
}

/* -------------------------------------------------------------------------- */

export default function ProjectStack() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <Section id="work" className="py-24 sm:py-32">
      <SectionHeader
        n="10"
        eyebrow="Projects"
        title="Finished work, in detail."
        lead="Seven builds that are done — each one with the problem it solved, how it is put together, what it measurably achieved and where it falls short. Work still in progress is kept in the next section, never mixed in here."
        tone="cyber"
      />

      {/* ---------- Index ---------- */}
      <Reveal delay={0.05}>
        <nav aria-label="Projects" className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <a
              key={p.id}
              href={`#project-${p.id}`}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              className="group flex flex-col justify-between gap-3 bg-surface px-4 py-4 transition-colors hover:bg-surface-2"
            >
              <span className="flex items-baseline gap-2.5">
                <span
                  className="font-mono text-[0.58rem] tabular-nums tracking-[0.18em]"
                  style={{ color: hovered === p.id ? ENERGY[p.energy] : 'var(--color-muted)' }}
                >
                  {p.number}
                </span>
                <span className="text-[0.92rem] leading-tight text-fg">{p.title}</span>
              </span>
              <span className="font-mono text-[0.54rem] tracking-[0.16em] text-muted uppercase">{p.category}</span>
            </a>
          ))}
        </nav>
      </Reveal>

      {/* ---------- Scenes ---------- */}
      <div className="mt-6">
        {projects.map((p, i) => (
          <ProjectScene key={p.id} project={p} index={i} />
        ))}
      </div>

      {/* ---------- Research ---------- */}
      <Reveal>
        <div id="research" className="scroll-mt-24 border-t border-border pt-16">
          <p className="type-mono mb-5">Research & publication</p>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <h3 className="type-sub text-fg">{research.title}</h3>
              <p className="mt-5 leading-relaxed text-secondary">{research.contribution}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {research.keywords.map((k) => (
                  <Chip key={k}>{k}</Chip>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <dl className="grid gap-px border border-border bg-border">
                {[
                  { k: 'Venue', v: research.venue },
                  { k: 'Hosts', v: research.hosts },
                  { k: 'Status', v: research.status },
                ].map((row) => (
                  <div key={row.k} className="bg-surface px-4 py-3.5">
                    <dt className="font-mono text-[0.54rem] tracking-[0.18em] text-muted uppercase">{row.k}</dt>
                    <dd className="mt-1.5 text-[0.9rem] text-fg">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
