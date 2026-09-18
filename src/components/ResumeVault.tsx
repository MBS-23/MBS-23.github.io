import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, FileText, Star, X } from 'lucide-react'
import { allResumes, masterResume, resumeHref, resumeNote, trackResumes, type ResumeDoc } from '../data/resumes'
import { RESUME_EVENT } from '../lib/navigate'
import { ENERGY, Reveal, Section, SectionHeader } from './ui'

/**
 * RÉSUMÉ VAULT — view only.
 *
 * Four documents: the master résumé and the three track versions. They open in
 * an in-page viewer. There is deliberately no download control and no `download`
 * attribute anywhere in this component — these are for reading, not collecting.
 */

function Viewer({ doc, onClose }: { doc: ResumeDoc; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const colour = ENERGY[doc.energy]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Résumé preview — ${doc.title}`}
      className="fixed inset-0 z-[135] flex flex-col bg-bg/94 p-3 backdrop-blur-md sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 12, opacity: 0 }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
        className="panel-soft mx-auto flex w-full max-w-5xl flex-1 flex-col overflow-hidden rounded-[3px]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="type-mono" style={{ color: colour }}>
              {doc.label} · View only
            </p>
            <p className="truncate text-sm font-medium text-fg">{doc.title}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close résumé preview"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-secondary transition-colors hover:text-fg"
          >
            <X size={16} aria-hidden />
          </button>
        </div>

        <div className="relative min-h-0 flex-1 bg-white">
          {/* Fallback sits behind the frame, so a browser that cannot render a
              PDF inline still shows something useful rather than a blank box. */}
          <div className="absolute inset-0 grid place-items-center bg-surface px-6 text-center">
            <p className="max-w-sm text-sm leading-relaxed text-secondary">
              Your browser could not display this PDF inline. The résumé is available to view on a desktop
              browser — or ask me for it directly.
            </p>
          </div>
          <iframe
            src={`${resumeHref(doc.file)}#toolbar=0&navpanes=0&view=FitH`}
            title={`Résumé — ${doc.title}`}
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>

        <p className="border-t border-border px-4 py-2.5 text-center font-mono text-[0.58rem] tracking-wide text-muted sm:px-5">
          Viewing only — press ESC to close
        </p>
      </motion.div>
    </motion.div>
  )
}

function TrackCard({ doc, onOpen, delay }: { doc: ResumeDoc; onOpen: () => void; delay: number }) {
  const colour = ENERGY[doc.energy]
  return (
    <Reveal delay={delay}>
      <article className="panel-soft flex h-full flex-col rounded-[3px] p-6" style={{ color: colour }}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.62rem] tracking-[0.18em] uppercase" style={{ color: colour }}>
            {doc.label}
          </span>
          <FileText size={14} aria-hidden style={{ color: colour, opacity: 0.6 }} />
        </div>

        <h3 className="mt-5 text-base font-semibold leading-snug tracking-tight text-fg">
          {doc.title}
        </h3>
        <p className="mt-2 font-mono text-[0.62rem] leading-relaxed text-muted">{doc.role}</p>
        <p className="mt-4 text-[0.84rem] leading-relaxed text-secondary">{doc.blurb}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {doc.highlights.map((h) => (
            <li key={h} className="rounded border border-border px-2 py-0.5 font-mono text-[0.58rem] text-muted">
              {h}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onOpen}
          className="mt-auto inline-flex w-full items-center justify-center gap-2.5 rounded-full border px-5 py-2.5 pt-2.5 font-mono text-[0.64rem] tracking-[0.14em] uppercase transition-colors hover:bg-white/5"
          style={{ borderColor: `color-mix(in srgb, ${colour} 45%, transparent)`, color: colour, marginTop: '1.75rem' }}
        >
          <Eye size={13} aria-hidden /> View résumé
        </button>
      </article>
    </Reveal>
  )
}

export default function ResumeVault() {
  const [open, setOpen] = useState<ResumeDoc | null>(null)

  // The recruiter router points at a specific résumé; open that one directly
  // rather than making the visitor find it again in the grid.
  useEffect(() => {
    const onRequest = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail?.id
      const doc = allResumes.find((d) => d.id === id)
      if (doc) setOpen(doc)
    }
    window.addEventListener(RESUME_EVENT, onRequest)
    return () => window.removeEventListener(RESUME_EVENT, onRequest)
  }, [])

  return (
    <Section id="resumes" className="py-24 sm:py-32" tone="cyber">
      <SectionHeader
        n={null}
        eyebrow="Résumé vault"
        title="Résumés"
        lead="One master résumé plus three track versions, each a single ATS-safe page. They open in the viewer below — these are the web copies, with the phone number and client names removed; ask by email for the full copy."
        tone="cyber"
        action={
          <span className="inline-flex items-center gap-2 rounded-full border border-border-2 bg-white/5 px-4 py-2 font-mono text-[0.6rem] tracking-[0.16em] uppercase text-secondary">
            <Eye size={12} aria-hidden /> View only
          </span>
        }
      />

      {/* ---------- The master ---------- */}
      <Reveal>
        <article className="mt-14 overflow-hidden rounded-[3px] border border-cyber/35 bg-surface">
          <span
            aria-hidden
            className="block h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent, var(--color-cyber), transparent)' }}
          />
          <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-12 lg:gap-12 lg:p-11">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyber/45 bg-cyber/10 px-3 py-1 font-mono text-[0.6rem] tracking-[0.16em] uppercase text-cyber">
                <Star size={11} aria-hidden /> {masterResume.label} — the strongest single version
              </span>

              <h3 className="type-sub mt-6 text-fg">{masterResume.title}</h3>
              <p className="mt-2 font-mono text-[0.72rem] tracking-wide text-cyber">{masterResume.role}</p>
              <p className="mt-5 max-w-2xl leading-relaxed text-secondary">{masterResume.blurb}</p>

              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {masterResume.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-[0.84rem] leading-snug text-secondary">
                    <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyber" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center gap-3 lg:col-span-5">
              <button
                type="button"
                onClick={() => setOpen(masterResume)}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-fg px-6 py-3.5 font-mono text-[0.68rem] tracking-[0.14em] uppercase text-void transition-opacity hover:opacity-90"
              >
                <Eye size={14} aria-hidden /> View master résumé
              </button>
              <p className="text-center font-mono text-[0.6rem] leading-relaxed text-muted">
                One page · A4 · ATS-safe single column
                <br />
                Opens in the viewer — no download
              </p>
            </div>
          </div>
        </article>
      </Reveal>

      {/* ---------- The three tracks ---------- */}
      <div className="mt-8">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4 border-b border-border pb-4">
          <h3 className="font-mono text-[0.74rem] tracking-[0.18em] uppercase text-fg">Standard tracks</h3>
          <p className="font-mono text-[0.62rem] text-muted">Pick the closest discipline</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {trackResumes.map((doc, i) => (
            <TrackCard key={doc.id} doc={doc} delay={i * 0.06} onOpen={() => setOpen(doc)} />
          ))}
        </div>
      </div>

      <p className="mt-10 max-w-3xl border-t border-border pt-5 font-mono text-[0.6rem] leading-relaxed tracking-[0.06em] text-muted">
        {resumeNote}
      </p>

      <AnimatePresence>{open && <Viewer doc={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </Section>
  )
}
