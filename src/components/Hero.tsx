import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { profile } from '../data/profile'
import { navigateTo, toggleTerminal } from '../lib/navigate'

/**
 * SCENE 01 — ORIGIN.
 *
 * The name is a title sequence, not a billboard: a masked serif reveal, a
 * hairline, then the disciplines in descending weight.
 *
 * The globe belongs to the opening and stays there — repeating it behind the
 * hero and again at the contact scene made the page feel heavier than the work
 * it is carrying.
 */

const DISCIPLINES = [
  { label: 'CYBERSECURITY', colour: 'var(--color-cyber)' },
  { label: 'AI / ML', colour: 'var(--color-ai)' },
  { label: 'FULL-STACK', colour: 'var(--color-safe)' },
]

/** The supporting disciplines, in descending weight. */
const SECONDARY = [
  { label: 'APPLICATION SECURITY', colour: 'var(--color-cyber)' },
  { label: 'SOC', colour: 'var(--color-safe)' },
  { label: 'AI SECURITY', colour: 'var(--color-ai)' },
  { label: 'GENAI', colour: 'var(--color-ai)' },
  { label: 'PROMPT ENGINEERING', colour: 'var(--color-prompt)' },
  { label: 'AI-ASSISTED DEVELOPMENT', colour: 'var(--color-warn)' },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const line = (delay: number) => ({
    initial: reduce ? undefined : { y: '110%' },
    animate: reduce ? undefined : { y: 0 },
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  const rise = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 14 },
    animate: reduce ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section id="home" className="relative isolate min-h-[100svh] overflow-hidden">
      {/* ---------- Environment ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-fine absolute inset-0 opacity-60 [mask-image:radial-gradient(100%_80%_at_20%_40%,#000_10%,transparent_72%)]" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(70% 60% at 12% 44%, rgba(5,6,8,0.96), rgba(5,6,8,0.7) 46%, transparent 78%)' }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-5 pt-28 pb-9 sm:px-8 sm:pt-32 lg:px-10">
        <div className="flex flex-1 items-center">
          <div className="w-full max-w-3xl">
            {/* Who and where, in one line */}
            <motion.p {...rise(0.05)} className="font-mono text-[0.56rem] tracking-[0.28em] text-muted">
              {profile.location.toUpperCase()}
            </motion.p>

            {/* Name — surname first, the way every certificate reads */}
            <motion.p {...rise(0.09)} className="mt-6 font-mono text-[0.6rem] tracking-[0.4em] text-muted">
              {profile.surname.toUpperCase()}
            </motion.p>

            <h1 className="type-identity mt-1.5 text-fg">
              {profile.nameLines.map((l, i) => (
                <span key={l} className="mask-line">
                  <motion.span className="block" {...line(0.12 + i * 0.11)}>
                    {l}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Hairline */}
            <motion.div
              className="mt-8 h-px w-20 origin-left bg-cyber"
              initial={reduce ? undefined : { scaleX: 0 }}
              animate={reduce ? undefined : { scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* What the initials stand for — asked often enough to answer here */}
            <motion.p {...rise(0.46)} className="mt-5 font-mono text-[0.58rem] tracking-[0.22em] text-muted">
              BVVS <span className="text-secondary">=</span> BALA VEERA VENKATA SUNIL
            </motion.p>

            {/* Disciplines — primary */}
            <motion.div {...rise(0.5)} className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
              {DISCIPLINES.map((d, i) => (
                <span key={d.label} className="flex items-center gap-4">
                  <span
                    className="font-mono text-[0.72rem] tracking-[0.2em] sm:text-[0.82rem]"
                    style={{ color: d.colour }}
                  >
                    {d.label}
                  </span>
                  {i < DISCIPLINES.length - 1 && (
                    <span aria-hidden className="text-muted">
                      ×
                    </span>
                  )}
                </span>
              ))}
            </motion.div>

            {/* Disciplines — secondary */}
            <motion.p {...rise(0.58)} className="mt-3.5 flex max-w-2xl flex-wrap items-center gap-x-3 gap-y-1.5">
              {SECONDARY.map((d, i) => (
                <span key={d.label} className="flex items-center gap-3">
                  <span className="font-mono text-[0.6rem] tracking-[0.2em]" style={{ color: d.colour }}>
                    {d.label}
                  </span>
                  {i < SECONDARY.length - 1 && (
                    <span aria-hidden className="text-muted">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </motion.p>

            {/* Positioning — the one sentence, then the qualifier */}
            <motion.p {...rise(0.66)} className="mt-9 max-w-2xl text-[1.12rem] leading-snug text-fg sm:text-[1.28rem]">
              {profile.positioning}
            </motion.p>
            <motion.p {...rise(0.72)} className="mt-4 max-w-xl text-[0.94rem] leading-relaxed text-secondary">
              {profile.positioningDetail}
            </motion.p>

            {/* Actions */}
            <motion.div {...rise(0.76)} className="mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigateTo('work')}
                className="bg-fg px-7 py-3.5 font-mono text-[0.64rem] tracking-[0.2em] uppercase text-bg transition-opacity hover:opacity-88"
              >
                View work
              </button>
              <button
                type="button"
                onClick={() => navigateTo('contact')}
                className="border border-border-2 px-7 py-3.5 font-mono text-[0.64rem] tracking-[0.2em] uppercase text-fg transition-colors hover:bg-white/5"
              >
                Get in touch
              </button>
              <button
                type="button"
                onClick={() => toggleTerminal(true)}
                className="px-2 py-3.5 font-mono text-[0.62rem] tracking-[0.2em] uppercase text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
              >
                Open system
              </button>
            </motion.div>

            {/* The four things a recruiter checks first */}
            <motion.dl {...rise(0.86)} className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              {[
                { k: 'Status', v: 'Available · immediate joiner', dot: true },
                { k: 'Graduating', v: profile.graduating },
                { k: 'Based in', v: profile.location },
                { k: 'Open to', v: profile.relocation.slice(0, 4).join(' · ') + ' +' },
              ].map((f) => (
                <div key={f.k}>
                  <dt className="font-mono text-[0.54rem] tracking-[0.22em] text-muted uppercase">{f.k}</dt>
                  <dd className="mt-1.5 flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.06em] text-secondary">
                    {f.dot && <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-safe" aria-hidden />}
                    {f.v}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>

        {/* ---------- Foot ---------- */}
        <motion.div {...rise(0.98)} className="flex flex-wrap items-end justify-between gap-6 border-t border-border pt-6">
          <button
            type="button"
            onClick={() => navigateTo('about')}
            className="group inline-flex items-center gap-3 font-mono text-[0.58rem] tracking-[0.24em] uppercase text-muted transition-colors hover:text-fg"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full border border-border">
              <ArrowDown size={12} aria-hidden className="transition-transform group-hover:translate-y-0.5" />
            </span>
            Scroll
          </button>

          <p className="font-mono text-[0.58rem] tracking-[0.24em] text-muted">
            BUILDING · SECURING · EXPLORING
          </p>

          <p className="hidden font-mono text-[0.58rem] tracking-[0.2em] text-muted sm:block">
            {profile.graduating}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
