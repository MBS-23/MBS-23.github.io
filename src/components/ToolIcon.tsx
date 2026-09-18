import { toolIcon } from '../data/toolIcons'
import { ENERGY } from './ui'
import type { Energy } from '../data/skills'

/**
 * A tool is shown by its own mark where a licensed one exists (simple-icons,
 * CC0) and by a typographic monogram where it does not — so the grid reads as
 * one designed system rather than a half-complete logo wall.
 *
 * Marks are monochrome by default and take the discipline colour only when the
 * row is active, which keeps colour meaning what it means everywhere else.
 */

/** ORACLE → ORACLE, "Burp Suite" → BS, ReportLab → RL, YARA → YARA. */
export function monogram(name: string): string {
  const cleaned = name.replace(/[^A-Za-z0-9 /.-]/g, '').trim()
  if (cleaned.length <= 4) return cleaned.toUpperCase()
  const words = cleaned.split(/[\s/.-]+/).filter(Boolean)
  if (words.length > 1) {
    return words
      .slice(0, 3)
      .map((w) => w[0])
      .join('')
      .toUpperCase()
  }
  return cleaned.slice(0, 2).toUpperCase()
}

export function ToolIcon({
  name,
  size = 16,
  className = '',
  fallback,
}: {
  name: string
  size?: number
  className?: string
  /** Monogram to use when no licensed mark exists for this tool. */
  fallback?: string
}) {
  const icon = toolIcon(name)

  if (icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden
        focusable="false"
        className={`shrink-0 ${className}`}
      >
        <path d={icon.d} />
      </svg>
    )
  }

  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center font-mono leading-none tracking-tight ${className}`}
      style={{ width: size, height: size, fontSize: Math.max(7, size * 0.42) }}
    >
      {fallback ?? monogram(name)}
    </span>
  )
}

/** Icon + label. The unit used by every technology list on the site. */
export function ToolChip({
  name,
  tone,
  note,
  size = 15,
}: {
  name: string
  tone?: Energy
  note?: string
  size?: number
}) {
  const colour = tone ? ENERGY[tone] : undefined
  return (
    <span
      className="group/chip inline-flex items-center gap-2 border border-border bg-surface px-2.5 py-1.5 transition-colors duration-200 hover:border-border-2"
      title={note ?? name}
    >
      <span
        className="text-muted transition-colors duration-200 group-hover/chip:text-[--tool-tone]"
        style={{ '--tool-tone': colour ?? 'var(--color-fg)' } as React.CSSProperties}
      >
        <ToolIcon name={name} size={size} />
      </span>
      <span className="font-mono text-[0.62rem] tracking-wider whitespace-nowrap text-secondary transition-colors duration-200 group-hover/chip:text-fg">
        {name}
      </span>
    </span>
  )
}
