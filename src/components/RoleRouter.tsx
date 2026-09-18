import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { FIT_LABEL, roleFamilies, roleTargets } from '../data/roles'
import type { RoleTarget } from '../data/roles'
import { experience } from '../data/experience'
import { projects } from '../data/projects'
import { allResumes } from '../data/resumes'
import { profile } from '../data/profile'
import { Chip, ENERGY, Reveal, Section, SectionHeader } from './ui'
import { ToolChip } from './ToolIcon'
import { navigateTo, openResume } from '../lib/navigate'

/**
 * FIND YOUR SUITABLE CANDIDATE — the recruiter entry point.
 *
 * Pick the role you are actually hiring for and the page answers with the
 * evidence for it: where it was done, what was built, which tools, which
 * résumé, and a pre-addressed email.
 *
 * Deliberately NOT a scoring system. No match percentage, no ranking, no
 * "98% suitable" theatre — just two honest states, "direct experience" and
 * "adjacent", so the judgement stays with the person hiring.
 */

const byId = <T extends { id: string }>(list: readonly T[], id: string) => list.find((x) => x.id === id)

function EvidencePanel({ role }: { role: RoleTarget }) {
  const family = roleFamilies.find((f) => f.id === role.family)!
  const colour = ENERGY[family.energy]

  const roles = role.experience.map((id) => byId(experience, id)).filter(Boolean)
  const work = role.projects.map((id) => byId(projects, id)).filter(Boolean)
  const resume = byId(allResumes, role.resume)

  return (
    <motion.div
      key={role.id}
      // Keyed, entrance-only: a recruiter clicking through four roles should
      // never wait for an exit animation to finish first.
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-8"
    >
      {/* ---------- Why ---------- */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="type-sub text-fg">{role.title}</h3>
          <span
            className="border px-2.5 py-1 font-mono text-[0.54rem] tracking-[0.16em] uppercase"
            style={{
              color: role.fit === 'direct' ? colour : 'var(--color-muted)',
              borderColor:
                role.fit === 'direct' ? `color-mix(in srgb, ${colour} 40%, transparent)` : 'var(--color-border)',
            }}
          >
            {FIT_LABEL[role.fit]}
          </span>
        </div>
        <p className="mt-4 max-w-2xl leading-relaxed text-secondary">{role.why}</p>
      </div>

      {/* ---------- Experience ---------- */}
      <div className="border-t border-border pt-6">
        <p className="type-mono mb-4">Where this was done</p>
        <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {roles.map((r) => (
            <li key={r!.id} className="bg-surface px-4 py-4">
              <p className="text-[0.92rem] leading-snug text-fg">{r!.title}</p>
              <p className="mt-1.5 font-mono text-[0.58rem] tracking-[0.14em] text-muted uppercase">{r!.org}</p>
              <p className="mt-2 font-mono text-[0.56rem] tracking-[0.1em] text-muted">{r!.period}</p>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => navigateTo('experience')}
          className="group mt-3 inline-flex items-center gap-2 font-mono text-[0.58rem] tracking-[0.18em] text-muted uppercase transition-colors hover:text-fg"
        >
          Full experience
          <ArrowRight size={11} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* ---------- Projects ---------- */}
      <div className="border-t border-border pt-6">
        <p className="type-mono mb-4">What was built</p>
        <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {work.map((p) => (
            <li key={p!.id}>
              <a
                href={`#project-${p!.id}`}
                className="group flex h-full flex-col justify-between gap-3 bg-surface px-4 py-4 transition-colors hover:bg-surface-2"
              >
                <span>
                  <span className="block text-[0.92rem] leading-snug text-fg">{p!.title}</span>
                  <span className="mt-1.5 block text-[0.78rem] leading-snug text-muted">{p!.subtitle}</span>
                </span>
                <span className="flex items-center gap-2 font-mono text-[0.54rem] tracking-[0.16em] uppercase" style={{ color: ENERGY[p!.energy] }}>
                  {p!.status}
                  <ArrowRight size={10} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Skills + tools ---------- */}
      <div className="grid gap-8 border-t border-border pt-6 sm:grid-cols-2">
        <div>
          <p className="type-mono mb-4">Relevant skills</p>
          <div className="flex flex-wrap gap-2">
            {role.skills.map((s) => (
              <Chip key={s} tone={family.energy}>
                {s}
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <p className="type-mono mb-4">Tools operated</p>
          <div className="flex flex-wrap gap-2">
            {role.tools.map((t) => (
              <ToolChip key={t} name={t} tone={family.energy} />
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Actions ---------- */}
      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
        {resume && (
          <button
            type="button"
            onClick={() => openResume(resume.id)}
            className="cta"
          >
            Read the {resume.title.replace(' Résumé', '')} résumé
          </button>
        )}
        <a
          href={`mailto:${profile.email}?subject=${encodeURIComponent(`${role.title} — ${profile.fullName}`)}`}
          className="cta-ghost"
        >
          <Mail size={13} aria-hidden />
          Email about this role
        </a>
      </div>
    </motion.div>
  )
}

export default function RoleRouter() {
  const [familyId, setFamilyId] = useState(roleFamilies[0].id)
  const family = roleFamilies.find((f) => f.id === familyId)!
  const inFamily = useMemo(() => roleTargets.filter((r) => r.family === familyId), [familyId])
  const [roleId, setRoleId] = useState(inFamily[0].id)

  const activeRole = inFamily.find((r) => r.id === roleId) ?? inFamily[0]

  const pickFamily = (id: string) => {
    setFamilyId(id)
    const first = roleTargets.find((r) => r.family === id)
    if (first) setRoleId(first.id)
  }

  return (
    <Section id="hiring" className="py-24 sm:py-32" tone={family.energy}>
      <SectionHeader
        n="11"
        eyebrow="For recruiters"
        title="Find your suitable candidate."
        lead="Tell the page what you are hiring for and it answers with the evidence — where the work was done, what was built, which tools, and the right résumé. No match scores: just what exists, and what doesn't yet."
        tone={family.energy}
      />

      {/* ---------- Families ---------- */}
      <Reveal>
        <div className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label="Role families">
          {roleFamilies.map((f) => {
            const active = f.id === familyId
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => pickFamily(f.id)}
                className="border px-4 py-2.5 font-mono text-[0.6rem] tracking-[0.16em] uppercase transition-colors duration-200"
                style={{
                  color: active ? 'var(--color-bg)' : 'var(--color-secondary)',
                  background: active ? ENERGY[f.energy] : 'transparent',
                  borderColor: active ? ENERGY[f.energy] : 'var(--color-border)',
                }}
              >
                {f.label}
              </button>
            )
          })}
        </div>
        <p className="mt-5 max-w-2xl text-[0.92rem] leading-relaxed text-muted">{family.blurb}</p>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* ---------- Roles ---------- */}
        <div className="lg:col-span-4">
          <p className="type-mono mb-4">Open role</p>
          <ul className="grid gap-px border border-border bg-border">
            {inFamily.map((r) => {
              const active = r.id === activeRole.id
              return (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => setRoleId(r.id)}
                    aria-current={active ? 'true' : undefined}
                    className="flex w-full items-center justify-between gap-3 bg-surface px-4 py-4 text-left transition-colors hover:bg-surface-2"
                  >
                    <span className="min-w-0">
                      <span className="block text-[0.92rem] leading-snug" style={{ color: active ? 'var(--color-fg)' : 'var(--color-secondary)' }}>
                        {r.title}
                      </span>
                      <span className="mt-1 block font-mono text-[0.54rem] tracking-[0.14em] text-muted uppercase">
                        {FIT_LABEL[r.fit]}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rounded-full transition-opacity"
                      style={{ background: ENERGY[family.energy], opacity: active ? 1 : 0 }}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* ---------- Evidence ---------- */}
        <div className="lg:col-span-8">
          <EvidencePanel key={activeRole.id} role={activeRole} />
        </div>
      </div>
    </Section>
  )
}
