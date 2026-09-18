import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ALL_SECTION_IDS, SCENE_OF, TOTAL, scenes } from '../data/scenes'
import { useActiveSection, useScrolled } from '../hooks/useActiveSection'
import { navigateTo, toggleTerminal } from '../lib/navigate'
import { profile, socials } from '../data/profile'

/**
 * Navigation as an instrument, not a banner.
 *
 * BVVS (the initials) over PODUGU (the family name) is the mark; the indicator
 * tells you where you are in the fourteen-scene run. It starts transparent and
 * only gains a surface once the page has moved.
 */
export default function Navigation() {
  const activeId = useActiveSection(ALL_SECTION_IDS)
  const scrolled = useScrolled(90)
  const [open, setOpen] = useState(false)

  const sceneId = SCENE_OF[activeId] ?? 'home'
  const scene = scenes.find((s) => s.id === sceneId) ?? scenes[0]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = open ? 'hidden' : ''
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    navigateTo(id)
  }

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-[110] transition-colors duration-500',
          scrolled ? 'border-b border-border bg-bg/72 backdrop-blur-xl' : 'border-b border-transparent',
        ].join(' ')}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-5 py-3.5 sm:px-8 lg:px-10"
        >
          {/* ---- Brand mark ---- */}
          <button
            type="button"
            onClick={() => go('home')}
            aria-label={`${profile.fullName} — back to the top`}
            className="shrink-0 text-left leading-[1.02]"
          >
            <span className="block font-mono text-[0.68rem] font-medium tracking-[0.26em] text-fg">BVVS</span>
            <span className="block font-mono text-[0.54rem] tracking-[0.3em] text-muted">PODUGU</span>
          </button>

          {/* ---- Centre links ---- */}
          <ul className="hidden items-center gap-1 lg:flex">
            {scenes
              .filter((s) => s.primary)
              .map((s) => {
                const isActive = sceneId === s.id
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => go(s.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className="group relative px-3 py-2 font-mono text-[0.62rem] tracking-[0.18em] uppercase transition-colors duration-200"
                      style={{ color: isActive ? 'var(--color-fg)' : 'var(--color-muted)' }}
                    >
                      {s.label}
                      <span
                        aria-hidden
                        className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-fg transition-transform duration-300 group-hover:scale-x-100"
                        style={{ transform: isActive ? 'scaleX(1)' : undefined }}
                      />
                    </button>
                  </li>
                )
              })}
          </ul>

          {/* ---- Right: scene indicator + actions ---- */}
          <div className="flex shrink-0 items-center gap-5">
            <div className="hidden text-right leading-[1.05] sm:block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={scene.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.22 }}
                  className="block font-mono text-[0.58rem] tracking-[0.22em] text-muted"
                >
                  {scene.label}
                </motion.span>
              </AnimatePresence>
              <span className="block font-mono text-[0.62rem] tabular-nums tracking-[0.18em] text-fg">
                {scene.n} <span className="text-muted">/ {TOTAL}</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => toggleTerminal(true)}
              className="hidden border border-border px-3.5 py-2 font-mono text-[0.58rem] tracking-[0.18em] uppercase text-secondary transition-colors hover:border-border-2 hover:text-fg sm:inline-block"
            >
              Open system
            </button>

            <button
              type="button"
              onClick={() => go('contact')}
              className="hidden bg-fg px-4 py-2 font-mono text-[0.58rem] tracking-[0.18em] uppercase text-bg transition-opacity hover:opacity-88 md:inline-block"
            >
              Contact
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center border border-border text-secondary transition-colors hover:text-fg lg:hidden"
            >
              <Menu size={15} aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      {/* ---- Full index ---- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[125] overflow-y-auto bg-bg/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex min-h-full flex-col px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="type-mono">Index</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation"
                  className="grid h-10 w-10 place-items-center border border-border text-fg"
                >
                  <X size={17} aria-hidden />
                </button>
              </div>

              <ul className="mt-8">
                {scenes
                  .filter((s) => s.id !== 'home')
                  .map((s, i) => (
                    <motion.li
                      key={s.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 + i * 0.022 }}
                    >
                      <button
                        type="button"
                        onClick={() => go(s.id)}
                        className="flex w-full items-baseline justify-between gap-4 border-b border-border py-4 text-left"
                      >
                        <span className="type-sub text-fg">{s.label}</span>
                        <span className="font-mono text-[0.58rem] tabular-nums text-muted">{s.n}</span>
                      </button>
                    </motion.li>
                  ))}
              </ul>

              <div className="mt-auto pt-10">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    toggleTerminal(true)
                  }}
                  className="w-full border border-border px-4 py-3 font-mono text-[0.62rem] tracking-[0.2em] uppercase text-secondary"
                >
                  Open system
                </button>

                <a
                  href={`mailto:${profile.email}`}
                  className="mt-6 block font-mono text-sm text-fg underline decoration-cyber underline-offset-4"
                >
                  {profile.email}
                </a>
                <div className="mt-4 flex flex-wrap gap-4 font-mono text-[0.62rem] tracking-wider text-muted">
                  <a href={socials.github} target="_blank" rel="noreferrer noopener">GITHUB ↗</a>
                  <a href={socials.linkedin} target="_blank" rel="noreferrer noopener">LINKEDIN ↗</a>
                  <a href={socials.tryhackme} target="_blank" rel="noreferrer noopener">TRYHACKME ↗</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
