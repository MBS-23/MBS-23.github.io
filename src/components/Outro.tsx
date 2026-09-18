import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { beyondTheCode, profile, socials } from '../data/profile'
import { currentFocus } from '../data/currentProjects'
import { mission } from '../data/timeline'
import { Reveal, Section, SectionHeader } from './ui'
import { navigateTo } from '../lib/navigate'

/**
 * SCENE 15 — CONTACT.
 *
 * The closing is deliberately plain: a headline, an address, and the four ways
 * to reach him. Nothing competes with the call to action.
 */

const DISCIPLINES = [
  { label: 'CYBERSECURITY', colour: 'var(--color-cyber)' },
  { label: 'AI / ML', colour: 'var(--color-ai)' },
  { label: 'FULL-STACK', colour: 'var(--color-safe)' },
  { label: 'PROMPT ENGINEERING', colour: 'var(--color-prompt)' },
  { label: 'VIBE CODING', colour: 'var(--color-warn)' },
]

export default function Outro() {
  const reduce = useReducedMotion()
  const closeRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: closeRef, offset: ['start 80%', 'end end'] })
  const veil = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <>
      {/* ---------- Current mission ---------- */}
      <Section id="mission" className="py-24 sm:py-32">
        <SectionHeader
          n={null}
          eyebrow="Current mission"
          title="Still building."
          lead="Not a finished portfolio of finished things — a working system with more of it written every month."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ul>
              {mission.lines.map((l, i) => (
                <Reveal key={l} delay={i * 0.05} as="li">
                  <p className="type-sub border-b border-border py-4 text-fg">{l}</p>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <p className="type-mono mb-5">Current focus</p>
              <ul className="flex flex-wrap gap-2">
                {currentFocus.map((f) => (
                  <li key={f} className="border border-border px-3 py-1.5 font-mono text-[0.62rem] text-secondary">
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-10">
                <p className="type-mono mb-5">Beyond the code</p>
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {beyondTheCode.map((h) => (
                    <li key={h} className="text-[0.86rem] text-secondary">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------- Contact ---------- */}
      <section id="contact" className="relative isolate scroll-mt-20 overflow-hidden">

        <div className="relative mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-[0.58rem] tracking-[0.24em] uppercase">
              <span className="text-cyber">15</span>
              <span aria-hidden className="h-px w-6 bg-cyber/45" />
              <span className="text-muted">Contact</span>
            </p>

            <h2 className="type-identity mt-7 max-w-4xl text-fg">Let&rsquo;s build something real.</h2>

            <p className="mt-7 max-w-2xl leading-relaxed text-secondary">
              Open to opportunities across cybersecurity, AI/ML, software engineering, technical
              support and solutions roles. Graduating 2026, able to join immediately, and open to
              relocating to {profile.relocation.join(' · ')}. The fastest route is email.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-11 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}?subject=Opportunity`}
                className="cta"
              >
                <Mail size={14} aria-hidden />
                {profile.email}
              </a>
              <button
                type="button"
                onClick={() => navigateTo('resumes')}
                className="cta-ghost"
              >
                View résumé
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <dl className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
                { label: 'GitHub', value: socials.githubHandle, href: socials.github },
                { label: 'LinkedIn', value: 'View profile', href: socials.linkedin },
                { label: 'TryHackMe', value: socials.tryhackmeHandle, href: socials.tryhackme },
              ].map((c) => (
                <div key={c.label} className="bg-surface px-5 py-6">
                  <dt className="type-mono mb-3">{c.label}</dt>
                  <dd>
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-1.5 font-mono text-[0.74rem] break-all text-secondary transition-colors hover:text-fg"
                    >
                      {c.value}
                      {c.href.startsWith('http') && (
                        <ArrowUpRight size={11} aria-hidden className="shrink-0 transition-transform group-hover:-translate-y-0.5" />
                      )}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

        </div>
      </section>

      {/* ---------- Final screen ---------- */}
      <div ref={closeRef} className="relative isolate overflow-hidden border-t border-border">
        {!reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-bg"
            style={{ opacity: veil }}
          />
        )}

        <div className="relative mx-auto w-full max-w-[1440px] px-5 py-24 text-center sm:px-8 sm:py-32 lg:px-10">
          <Reveal>
            <p className="font-mono text-[0.58rem] tracking-[0.3em] text-muted">SYSTEM SESSION COMPLETE</p>
            <h2 className="type-identity mx-auto mt-8 max-w-3xl text-fg">BALA VEERA VENKATA SUNIL</h2>

            <div className="mx-auto mt-9 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2">
              {DISCIPLINES.map((d, i) => (
                <span key={d.label} className="flex items-center gap-3">
                  <span className="font-mono text-[0.58rem] tracking-[0.2em]" style={{ color: d.colour }}>
                    {d.label}
                  </span>
                  {i < DISCIPLINES.length - 1 && (
                    <span aria-hidden className="text-muted">
                      ×
                    </span>
                  )}
                </span>
              ))}
            </div>

            <p className="mt-12 font-mono text-[0.66rem] tracking-[0.2em] text-secondary">{mission.closing}</p>

            <p className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[0.6rem] tracking-[0.24em] text-muted">
              <span>BUILD.</span>
              <span>LEARN.</span>
              <span>SECURE.</span>
              <span>CREATE.</span>
            </p>
          </Reveal>
        </div>

        {/* ---------- Colophon ---------- */}
        <footer className="relative border-t border-border">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
            <p className="font-mono text-[0.56rem] tracking-[0.24em] text-muted">END OF TRANSMISSION</p>
            <p className="font-mono text-[0.56rem] tracking-[0.2em] text-muted">
              © {new Date().getFullYear()} {profile.fullName}
            </p>
            <p className="font-mono text-[0.56rem] tracking-[0.2em] text-muted">
              Geography: Natural Earth · Imagery: NASA — both public domain
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
