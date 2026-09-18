import { communication, deliveryPath, questions, thinkingLoop } from '../data/method'
import { FlowChain, Reveal, Section, SectionHeader } from './ui'

/**
 * SCENE 03 — HOW I THINK.
 *
 * Editorial, not card-based. The loop reads as a numbered sequence, the
 * questions as a statement, and the delivery path as one chain. The
 * communication block sits underneath because it is the same method pointed at
 * a person instead of a system.
 */
export default function HowIThink() {
  return (
    <Section id="think" className="py-24 sm:py-32">
      <SectionHeader
        n="03"
        eyebrow="Method"
        title="How I Think"
        lead="The same loop whether it is a feature, a finding or a failure. It is the reason the security half and the building half are not two different jobs."
      />

      <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* ---------- The loop ---------- */}
        <div className="lg:col-span-6">
          <ol>
            {thinkingLoop.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.04} as="li">
                <div className="group grid grid-cols-[auto_1fr] items-baseline gap-5 border-b border-border py-5">
                  <span className="font-mono text-[0.58rem] tabular-nums text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <span className="type-sub text-fg">{s.step}</span>
                    <p className="mt-1.5 text-[0.88rem] leading-relaxed text-secondary">{s.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* ---------- The questions ---------- */}
        <div className="lg:col-span-6">
          <Reveal delay={0.08}>
            <div className="lg:sticky lg:top-28">
              <p className="type-mono mb-6">The difference</p>

              <p className="text-secondary">I don&rsquo;t just ask:</p>
              <p className="type-headline mt-3 text-muted line-through decoration-cyber/70 decoration-1">
                {questions.lazy}
              </p>

              <p className="mt-10 text-secondary">I ask:</p>
              <ul className="mt-4 space-y-3">
                {questions.real.map((q, i) => (
                  <Reveal key={q} delay={0.1 + i * 0.06} as="li">
                    <p className="type-sub text-fg">{q}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ---------- Delivery path ---------- */}
      <Reveal>
        <div className="mt-20 border-t border-border pt-10">
          <p className="type-mono mb-5">From problem to production</p>
          <FlowChain steps={deliveryPath} tone="safe" />
        </div>
      </Reveal>

      {/* ---------- Engineering + communication ---------- */}
      <div className="mt-20 border-t border-border pt-10">
        <Reveal>
          <div className="max-w-3xl">
            <p className="type-mono mb-4">Engineering + communication</p>
            <h3 className="type-headline text-fg">Explaining it is the other half.</h3>
            <p className="mt-5 leading-relaxed text-secondary">{communication.lead}</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {communication.columns.map((col, i) => (
            <Reveal key={col.title} delay={i * 0.06}>
              <div className="h-full bg-surface p-6">
                <p className="type-mono mb-5">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.86rem] leading-snug text-secondary">
                      <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-border-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
