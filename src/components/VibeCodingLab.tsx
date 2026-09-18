import {
  matrixColumns,
  matrixRows,
  vibeEquation,
  vibeLoop,
  vibeStatement,
} from '../data/vibeCoding'
import { Reveal, Section, SectionHeader } from './ui'

/**
 * The vibe coding lab — a development cockpit. The point of the section is the
 * distinction: AI writes a first draft, engineering judgment, testing and a
 * security review decide what ships.
 */
export default function VibeCodingLab() {
  return (
    <Section id="vibe" className="py-24 sm:py-32">
      <SectionHeader
        n="08"
        eyebrow="Vibe coding"
        title="The Build Lab"
        lead={vibeStatement}
        action={
          <span className="inline-flex items-center gap-2 rounded-full border border-border-2 bg-white/5 px-4 py-2 font-mono text-[0.6rem] tracking-[0.16em] uppercase text-fg">
            Intermediate vibe coder
          </span>
        }
      />

      {/* ---------- The equation ---------- */}
      <Reveal>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 rounded-[3px] border border-border bg-surface px-5 py-6">
          {vibeEquation.map((t, i) => (
            <span key={t} className="flex items-center gap-3">
              <span className="font-mono text-[0.66rem] tracking-[0.16em] text-fg sm:text-[0.74rem]">{t}</span>
              {i < vibeEquation.length - 1 && (
                <span aria-hidden className="text-muted">
                  +
                </span>
              )}
            </span>
          ))}
          <span aria-hidden className="text-muted">
            =
          </span>
          <span className="font-mono text-[0.66rem] tracking-[0.16em] text-safe sm:text-[0.74rem]">PRODUCT</span>
        </div>
      </Reveal>

      <div className="mt-12">
        <p className="type-mono mb-5">The loop</p>
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {vibeLoop.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.035} as="li">
                <div className="flex items-center gap-4 rounded-[3px] border border-border bg-surface px-4 py-3">
                  <span className="font-mono text-[0.58rem] tabular-nums text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1">
                    <span className="block font-mono text-[0.66rem] tracking-[0.14em] text-fg">{s.label}</span>
                    <span className="mt-0.5 block text-[0.74rem] text-muted">{s.note}</span>
                  </span>
                </div>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* ---------- Technical matrix ---------- */}
      <Reveal delay={0.05}>
        <div className="mt-16">
          <p className="type-mono mb-5">My technical matrix</p>
          <div className="overflow-x-auto rounded-[3px] border border-border">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <caption className="sr-only">
                What each of the five disciplines contributes to each kind of work
              </caption>
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th scope="col" className="px-4 py-3 font-mono text-[0.58rem] tracking-[0.16em] text-muted uppercase">
                    &nbsp;
                  </th>
                  {matrixColumns.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className="px-4 py-3 font-mono text-[0.58rem] tracking-[0.14em] text-fg uppercase"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixRows.map((row) => (
                  <tr key={row.verb} className="border-b border-border last:border-0">
                    <th
                      scope="row"
                      className="px-4 py-3 font-mono text-[0.6rem] tracking-[0.16em] text-cyber uppercase"
                    >
                      {row.verb}
                    </th>
                    {row.cells.map((cell, i) => (
                      <td key={i} className="px-4 py-3 text-[0.78rem] text-secondary">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
