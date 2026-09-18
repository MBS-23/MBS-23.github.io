import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { aiSecurity, cyberDomains } from '../data/cyber'
import { Reveal, Section, SectionHeader } from './ui'

/**
 * The cybersecurity universe. Eight domains rather than one flat skill list —
 * selecting a domain expands its contents. Below it, the AI × Security crossover
 * that the whole portfolio points at.
 */
export default function CyberUniverse() {
  const [open, setOpen] = useState(cyberDomains[0].id)

  return (
    <Section id="cyber" className="py-24 sm:py-32" tone="cyber">
      <SectionHeader
        n="04"
        eyebrow="Cybersecurity world"
        title="Security Domains"
        lead="Organised the way the work actually divides. Every tool below was used hands-on in a lab, an internship, or an authorised engagement."
        tone="cyber"
      />

      {/* ---------- Domain grid ---------- */}
      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cyberDomains.map((d, i) => {
          const isOpen = open === d.id
          return (
            <Reveal key={d.id} delay={i * 0.03}>
              <button
                type="button"
                onClick={() => setOpen(d.id)}
                aria-pressed={isOpen}
                className="panel-soft group h-full w-full rounded-[3px] p-4 text-left transition-colors"
                style={{
                  color: isOpen ? 'var(--color-cyber)' : 'var(--color-border-2)',
                  borderColor: isOpen ? 'color-mix(in srgb, var(--color-cyber) 45%, transparent)' : undefined,
                  background: isOpen
                    ? 'linear-gradient(165deg, color-mix(in srgb, var(--color-cyber) 10%, var(--color-surface)), var(--color-bg))'
                    : undefined,
                }}
              >
                <span className="type-mono" style={{ color: isOpen ? 'var(--color-cyber)' : undefined }}>
                  Domain {d.index}
                </span>
                <span className="mt-2.5 block text-sm font-semibold tracking-tight text-fg">
                  {d.title}
                </span>
                <span className="mt-2 block text-[0.76rem] leading-snug text-muted">{d.summary}</span>
                <span className="mt-3 block font-mono text-[0.58rem] tracking-wider text-muted">
                  {d.items.length} entries
                </span>
              </button>
            </Reveal>
          )
        })}
      </div>

      {/* ---------- Expanded domain ---------- */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          {cyberDomains
            .filter((d) => d.id === open)
            .map((d) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="panel-soft rounded-[3px] border-cyber/25 p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="type-sub text-fg">{d.title}</h3>
                  <p className="font-mono text-[0.62rem] tracking-[0.16em] text-cyber uppercase">
                    Domain {d.index}
                  </p>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-secondary">{d.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {d.items.map((item) => (
                    <li
                      key={item}
                      className="rounded border border-border bg-bg/60 px-3 py-1.5 font-mono text-[0.68rem] text-secondary transition-colors hover:border-cyber/50 hover:text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* ---------- AI × Security crossover ---------- */}
      <div className="mt-20">
        <Reveal>
          <div className="border-t border-border pt-10">
            <p className="type-mono mb-4">The crossover</p>
            <h3 className="type-headline text-fg">
              AI <span className="text-muted">×</span> Security
            </h3>
            <p className="mt-4 max-w-2xl leading-relaxed text-secondary">
              Building AI systems on one side, breaking and defending applications on the other. The overlap is
              where I am heading.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {/* Left */}
          <Reveal delay={0.04}>
            <div className="panel-soft h-full rounded-[3px] p-6" style={{ color: 'var(--color-cyber)' }}>
              <p className="type-mono mb-4" style={{ color: 'var(--color-cyber)' }}>
                {aiSecurity.left.title}
              </p>
              <ul className="space-y-2">
                {aiSecurity.left.items.map((i) => (
                  <li key={i} className="flex gap-2.5 text-[0.86rem] text-secondary">
                    <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-cyber/60" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Centre */}
          <Reveal delay={0.08}>
            <div
              className="panel-soft relative h-full overflow-hidden rounded-[3px] p-6"
              style={{ color: 'var(--color-fg)' }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(80% 60% at 50% 0%, rgba(255,48,79,0.14), transparent 55%), radial-gradient(80% 60% at 50% 100%, rgba(77,235,255,0.14), transparent 55%)',
                }}
              />
              <div className="relative">
                <p className="type-mono mb-4 text-fg">{aiSecurity.centre.title}</p>
                <ul className="flex flex-wrap gap-2">
                  {aiSecurity.centre.items.map((i) => (
                    <li
                      key={i}
                      className="rounded-full border border-border bg-bg/60 px-3 py-1 font-mono text-[0.6rem] tracking-wide text-secondary"
                    >
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Right */}
          <Reveal delay={0.12}>
            <div className="panel-soft h-full rounded-[3px] p-6" style={{ color: 'var(--color-ai)' }}>
              <p className="type-mono mb-4" style={{ color: 'var(--color-ai)' }}>
                {aiSecurity.right.title}
              </p>
              <ul className="space-y-2">
                {aiSecurity.right.items.map((i) => (
                  <li key={i} className="flex gap-2.5 text-[0.86rem] text-secondary">
                    <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-ai/60" />
                    {i}
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
