import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { storyTimeline } from '../data/timeline'
import { ENERGY, Reveal, Section, SectionHeader } from './ui'

/**
 * The chronological spine. A scroll-linked line draws itself down the timeline
 * and each node lights in its discipline's energy as it arrives.
 */
export default function StoryTimeline() {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 65%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })

  return (
    <Section id="journey" className="py-24 sm:py-32" tone="cyber">
      <SectionHeader
        n={null}
        eyebrow="Story timeline"
        title="The Journey"
        lead="Academic foundation, an AI start, a workshop that changed direction, then five years of building compressed into two."
        tone="cyber"
      />

      <ol ref={ref} className="relative mt-14">
        {/* The spine */}
        <span aria-hidden className="absolute left-[7px] top-3 bottom-3 hidden w-px bg-border sm:block" />
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute left-[7px] top-3 bottom-3 hidden w-px origin-top sm:block"
            style={{
              scaleY,
              background: 'linear-gradient(180deg, var(--color-cyber), var(--color-ai) 55%, var(--color-safe))',
            }}
          />
        )}

        {storyTimeline.map((node, i) => {
          const colour = ENERGY[node.energy]
          return (
            <Reveal key={`${node.year}-${node.title}`} delay={i * 0.03} as="li">
              <div className="relative grid gap-3 pb-11 sm:grid-cols-[auto_1fr] sm:gap-8">
                <div className="hidden pt-1.5 sm:block">
                  <span
                    className="block h-[15px] w-[15px] rounded-full border-2 bg-bg"
                    style={{ borderColor: colour, boxShadow: `0 0 14px -3px ${colour}` }}
                    aria-hidden
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span
                      className="font-mono text-[0.66rem] tracking-[0.18em] uppercase"
                      style={{ color: colour }}
                    >
                      {node.year}
                    </span>
                    <span aria-hidden className="h-3 w-px bg-border-2" />
                    <h3 className="text-base font-semibold tracking-tight text-fg sm:text-lg">
                      {node.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 max-w-2xl text-[0.9rem] leading-relaxed text-secondary">{node.detail}</p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </ol>
    </Section>
  )
}
