import { useState } from 'react'
import { Binary, BrainCircuit, Code2, Database, Layers, ShieldHalf } from 'lucide-react'
import { skillGroups, toolCategories, tools } from '../data/skills'
import { ENERGY, Reveal, Section, SectionHeader } from './ui'
import { ToolIcon } from './ToolIcon'

const ICONS = { Code2, Layers, BrainCircuit, Database, Binary, ShieldHalf }

/**
 * SKILLS and TOOLS are two separate sections, deliberately.
 *
 * Cards carry the tool's own mark where a CC0-licensed one exists and a
 * monogram where it does not, so the grid reads
 * better as a system anyway.
 */

function SkillCard({ glyph, name, applied, colour }: { glyph: string; name: string; applied: string; colour: string }) {
  return (
    <div
      className="panel-soft group relative h-full overflow-hidden rounded-[3px] p-4 transition-transform duration-200 hover:-translate-y-0.5"
      style={{ color: colour }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(90% 70% at 20% 0%, color-mix(in srgb, ${colour} 16%, transparent), transparent 70%)` }}
      />
      <div className="relative flex items-start gap-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-[3px] border transition-colors duration-300"
          style={{ borderColor: `color-mix(in srgb, ${colour} 40%, transparent)`, color: colour }}
        >
          <ToolIcon name={name} fallback={glyph} size={17} />
        </span>
        <span className="min-w-0">
          <span className="block text-[0.86rem] font-medium leading-snug text-fg">{name}</span>
          <span className="mt-1 block text-[0.7rem] leading-snug text-muted">{applied}</span>
        </span>
      </div>
    </div>
  )
}

export function SkillsSection() {
  return (
    <Section id="skills" className="py-24 sm:py-32" tone="ai">
      <SectionHeader
        n="09"
        eyebrow="Skills"
        title="What I Can Do"
        lead="Grouped by discipline, each one annotated with where it was actually applied. Tools live in their own section below — a skill and a tool are not the same claim."
        tone="ai"
      />

      <div className="mt-14 space-y-12">
        {skillGroups.map((group, gi) => {
          const Icon = ICONS[group.icon]
          const colour = ENERGY[group.energy]
          return (
            <Reveal key={group.id} delay={gi * 0.04}>
              <div>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-8 w-8 place-items-center rounded-[3px] border"
                      style={{ borderColor: `color-mix(in srgb, ${colour} 40%, transparent)`, color: colour }}
                    >
                      <Icon size={15} aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold tracking-tight text-fg">{group.title}</h3>
                      <p className="font-mono text-[0.6rem] tracking-wide text-muted">{group.kicker}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[0.58rem] tracking-[0.18em]" style={{ color: colour }}>
                    {group.index} · {group.items.length}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.items.map((item) => (
                    <SkillCard
                      key={item.name}
                      glyph={item.glyph}
                      name={item.name}
                      applied={item.applied}
                      colour={colour}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

export function ToolsSection() {
  const [filter, setFilter] = useState<string>('all')
  const shown = filter === 'all' ? tools : tools.filter((t) => t.energy === filter)

  return (
    <Section id="tools" className="py-24 sm:py-32" tone="cyber">
      <SectionHeader
        n={null}
        eyebrow="Toolchain"
        title="What I Operate"
        lead={`${tools.length} tools across offensive security, defence, forensics, AI and engineering — filtered by what you want to see.`}
        tone="cyber"
        action={
          <div role="group" aria-label="Filter tools" className="flex flex-wrap gap-2">
            {toolCategories.map((c) => {
              const isActive = filter === c.id
              const colour = c.id === 'all' ? 'var(--color-fg)' : ENERGY[c.id as keyof typeof ENERGY]
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFilter(c.id)}
                  aria-pressed={isActive}
                  className="rounded-full border px-3.5 py-1.5 font-mono text-[0.6rem] tracking-[0.12em] uppercase transition-colors"
                  style={{
                    borderColor: isActive ? colour : 'var(--color-border)',
                    color: isActive ? colour : 'var(--color-muted)',
                    background: isActive ? `color-mix(in srgb, ${colour} 12%, transparent)` : 'transparent',
                  }}
                >
                  {c.label}
                </button>
              )
            })}
          </div>
        }
      />

      <p aria-live="polite" className="sr-only">
        {shown.length} tools shown
      </p>

      <div className="mt-12 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((t, i) => {
          const colour = ENERGY[t.energy]
          return (
            <Reveal key={t.name} delay={Math.min(i, 12) * 0.02}>
              <div
                className="group flex h-full items-center gap-3 rounded-[3px] border border-border bg-surface p-3 transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderColor: undefined }}
              >
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-[3px] border transition-colors duration-300"
                  style={{
                    borderColor: `color-mix(in srgb, ${colour} 38%, transparent)`,
                    color: colour,
                    background: `color-mix(in srgb, ${colour} 8%, transparent)`,
                  }}
                >
                  <ToolIcon name={t.name} fallback={t.glyph} size={17} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[0.84rem] font-medium text-fg">{t.name}</span>
                  <span className="block font-mono text-[0.58rem] tracking-wide text-muted">{t.category}</span>
                </span>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
