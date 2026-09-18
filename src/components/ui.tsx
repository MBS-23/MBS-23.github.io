import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Energy } from '../data/skills'

/* -------------------------------------------------------------------------- */
/*  The five semantic energies. A colour is never written into a component.    */
/* -------------------------------------------------------------------------- */

export const ENERGY: Record<Energy | 'fg', string> = {
  cyber: 'var(--color-cyber)', // cybersecurity
  ai: 'var(--color-ai)', // AI / ML
  safe: 'var(--color-safe)', // full-stack
  prompt: 'var(--color-prompt)', // prompt engineering
  warn: 'var(--color-warn)', // vibe coding
  fg: 'var(--color-fg)',
}

/* -------------------------------------------------------------------------- */
/*  Reveal — the one scroll-entrance primitive. Silent under reduced motion.   */
/* -------------------------------------------------------------------------- */

export function Reveal({
  children,
  delay = 0,
  y = 20,
  x = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  x?: number
  className?: string
  as?: 'div' | 'li' | 'span' | 'article' | 'section'
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as]

  return (
    <Tag
      className={className}
      initial={reduce ? undefined : { opacity: 0, y, x }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}

/* -------------------------------------------------------------------------- */
/*  Section scaffolding                                                        */
/* -------------------------------------------------------------------------- */

export function Section({
  id,
  children,
  className = '',
  tone,
}: {
  id: string
  children: ReactNode
  className?: string
  /** A very low wash of the world's energy, only where the world changes. */
  tone?: Energy
}) {
  return (
    <section id={id} className={`relative scroll-mt-20 px-5 sm:px-8 lg:px-10 ${className}`}>
      {tone && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[380px] opacity-[0.06]"
          style={{ background: `radial-gradient(56% 100% at 30% 0%, ${ENERGY[tone]}, transparent 72%)` }}
        />
      )}
      <div className="relative mx-auto w-full max-w-[1440px]">{children}</div>
    </section>
  )
}

/**
 * Section header.
 *
 * `n` is the scene number — pass `null` for a block that lives inside another
 * scene, so the numbering in the indicator never lies.
 */
export function SectionHeader({
  n,
  eyebrow,
  title,
  lead,
  tone,
  action,
}: {
  n?: string | null
  eyebrow: string
  title: string
  lead?: string
  tone?: Energy
  action?: ReactNode
}) {
  const colour = tone ? ENERGY[tone] : 'var(--color-muted)'
  return (
    <header className="border-t border-border pt-7 sm:pt-9">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="flex items-center gap-3 font-mono text-[0.58rem] tracking-[0.24em] uppercase">
            {n && <span style={{ color: colour }}>{n}</span>}
            {n && <span aria-hidden className="h-px w-6" style={{ background: colour, opacity: 0.45 }} />}
            <span className="text-muted">{eyebrow}</span>
          </p>
          <h2 className="type-headline mt-5 text-fg">{title}</h2>
          {lead && <p className="mt-5 max-w-2xl leading-relaxed text-secondary">{lead}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/*  Atoms                                                                      */
/* -------------------------------------------------------------------------- */

export function Chip({ children, tone, solid = false }: { children: ReactNode; tone?: Energy; solid?: boolean }) {
  const c = tone ? ENERGY[tone] : undefined
  return (
    <span
      className="inline-flex items-center rounded-[3px] border px-2.5 py-1 font-mono text-[0.6rem] tracking-wider whitespace-nowrap"
      style={
        c
          ? {
              borderColor: `color-mix(in srgb, ${c} 40%, transparent)`,
              background: solid ? `color-mix(in srgb, ${c} 12%, transparent)` : 'transparent',
              color: c,
            }
          : { borderColor: 'var(--color-border)', color: 'var(--color-secondary)' }
      }
    >
      {children}
    </span>
  )
}

/** Project status. The credibility signal — never decorative. */
export function StatusBadge({ label, tone = 'safe' }: { label: string; tone?: Energy }) {
  const c = ENERGY[tone]
  return (
    <span
      className="inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[0.56rem] tracking-[0.18em] uppercase"
      style={{
        borderColor: `color-mix(in srgb, ${c} 38%, transparent)`,
        background: `color-mix(in srgb, ${c} 9%, transparent)`,
        color: c,
      }}
    >
      <span className="h-1 w-1 rounded-full" style={{ background: c }} aria-hidden />
      {label}
    </span>
  )
}

export function StatusDot({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-mono text-[0.6rem] tracking-[0.22em] text-secondary">
      <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-safe" aria-hidden />
      {label}
    </span>
  )
}

/** Call to action. Square by default — the pill is reserved for the primary. */
export function ActionLink({
  href,
  onClick,
  children,
  variant = 'solid',
  tone = 'cyber',
  external = false,
  className = '',
  ariaLabel,
}: {
  href?: string
  onClick?: () => void
  children: ReactNode
  variant?: 'solid' | 'ghost'
  tone?: Energy
  external?: boolean
  className?: string
  ariaLabel?: string
}) {
  const c = ENERGY[tone]
  const base =
    'group inline-flex items-center justify-center gap-2.5 px-6 py-3 font-mono text-[0.62rem] tracking-[0.2em] uppercase transition-all duration-200'
  const style =
    variant === 'solid'
      ? { background: 'var(--color-fg)', color: 'var(--color-bg)' }
      : { borderColor: `color-mix(in srgb, ${c} 40%, transparent)`, color: 'var(--color-fg)' }
  const cls = variant === 'solid' ? `${base} hover:opacity-88` : `${base} border hover:bg-white/5`

  if (onClick && !href) {
    return (
      <button type="button" onClick={onClick} aria-label={ariaLabel} className={`${cls} ${className}`} style={style}>
        {children}
      </button>
    )
  }

  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${cls} ${className}`}
      style={style}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {children}
    </a>
  )
}

/** Technical surface. */
export function Panel({
  children,
  className = '',
  tone,
  label,
}: {
  children: ReactNode
  className?: string
  tone?: Energy
  label?: string
}) {
  const c = tone ? ENERGY[tone] : 'var(--color-border-2)'
  return (
    <div className={`panel-soft relative ${className}`} style={{ color: c }}>
      {label && (
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <span className="h-1 w-1 rounded-full" style={{ background: c }} aria-hidden />
          <span className="font-mono text-[0.58rem] tracking-[0.2em] uppercase" style={{ color: c }}>
            {label}
          </span>
        </div>
      )}
      <div className="text-fg">{children}</div>
    </div>
  )
}

/** The one architecture-diagram primitive, used by every flow on the site. */
export function FlowChain({
  steps,
  tone = 'cyber',
  dense = false,
}: {
  steps: readonly string[]
  tone?: Energy
  dense?: boolean
}) {
  const c = ENERGY[tone]
  return (
    <ol className={`flex flex-wrap items-center ${dense ? 'gap-x-2 gap-y-2' : 'gap-x-2.5 gap-y-2.5'}`}>
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2.5">
          <span
            className={`border border-border bg-surface px-2.5 py-1.5 font-mono tracking-wider text-secondary ${
              dense ? 'text-[0.58rem]' : 'text-[0.62rem]'
            }`}
          >
            {s}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden style={{ color: c, opacity: 0.5 }} className="text-[0.7rem]">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}
