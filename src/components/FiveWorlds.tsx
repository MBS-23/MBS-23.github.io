import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { worlds } from '../data/worlds'
import { navigateTo } from '../lib/navigate'
import { Reveal, Section, SectionHeader } from './ui'

/**
 * The five dimensions, as a selector. Choosing a world changes the environment
 * of the panel — energy colour, what it provides, and where it leads.
 */
export default function FiveWorlds() {
  const [active, setActive] = useState(worlds[0].id)
  const world = worlds.find((w) => w.id === active)!

  return (
    <Section id="worlds" className="py-24 sm:py-32">
      <SectionHeader
        n={null}
        eyebrow="My five worlds"
        title="Five Dimensions"
        lead="Cybersecurity, AI/ML, full-stack development, prompt engineering and vibe coding. Not five hobbies — one system with five entry points."
        tone="prompt"
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Selector */}
        <div className="lg:col-span-5">
          <ul className="divide-y divide-border border-y border-border">
            {worlds.map((w, i) => {
              const isActive = w.id === active
              return (
                <Reveal key={w.id} delay={i * 0.04} as="li">
                  <button
                    type="button"
                    onClick={() => setActive(w.id)}
                    aria-pressed={isActive}
                    className="group flex w-full items-center gap-5 py-5 text-left transition-colors"
                  >
                    <span
                      className="text-2xl font-semibold tabular-nums transition-colors sm:text-3xl"
                      style={{ color: isActive ? w.energy : 'var(--color-border-2)' }}
                    >
                      {w.index}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className="block text-base font-semibold tracking-tight transition-colors sm:text-lg"
                        style={{ color: isActive ? 'var(--color-fg)' : 'var(--color-muted)' }}
                      >
                        {w.name}
                      </span>
                      <span className="mt-0.5 block font-mono text-[0.62rem] tracking-wide text-muted">
                        {w.tagline}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="h-8 w-px shrink-0 transition-all"
                      style={{
                        background: isActive ? w.energy : 'transparent',
                        boxShadow: isActive ? `0 0 12px ${w.energy}` : 'none',
                      }}
                    />
                  </button>
                </Reveal>
              )
            })}
          </ul>
        </div>

        {/* The selected environment */}
        <div className="lg:col-span-7">
          <Reveal delay={0.08}>
            <div
              className="panel-soft relative min-h-[340px] overflow-hidden rounded-[3px] p-6 sm:p-8"
              style={{ color: world.energy }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(90% 70% at 12% 0%, color-mix(in srgb, ${world.energy} 14%, transparent), transparent 65%)`,
                }}
              />
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={world.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="type-mono" style={{ color: world.energy }}>
                      World {world.index}
                    </p>
                    <h3 className="type-sub mt-4 text-fg">{world.title}</h3>
                    <p className="mt-4 max-w-xl leading-relaxed text-secondary">{world.blurb}</p>

                    <p className="type-mono mt-8 mb-3">Provides</p>
                    <ul className="flex flex-wrap gap-2">
                      {world.provides.map((p) => (
                        <li
                          key={p}
                          className="rounded-full border px-3 py-1 font-mono text-[0.62rem] tracking-wider"
                          style={{
                            borderColor: `color-mix(in srgb, ${world.energy} 35%, transparent)`,
                            color: world.energy,
                          }}
                        >
                          {p}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => navigateTo(world.target)}
                      className="group mt-9 inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 font-mono text-[0.66rem] tracking-[0.14em] uppercase transition-colors hover:bg-white/5"
                      style={{ borderColor: `color-mix(in srgb, ${world.energy} 45%, transparent)`, color: world.energy }}
                    >
                      Enter {world.name}
                      <ArrowUpRight
                        size={13}
                        aria-hidden
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
