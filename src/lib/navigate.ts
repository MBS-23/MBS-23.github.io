/**
 * Portfolio navigation bus.
 *
 * Every route change in this site is a scroll to a section, but it is staged:
 * a portal transition plays, a one-line system readout appears, then the scroll
 * happens. Components fire `navigateTo`; <PortalTransition /> performs it.
 *
 * Plain anchors still work — this only upgrades the experience, it never gates it.
 */

export const NAV_EVENT = 'bvvs:navigate'
export const TERMINAL_EVENT = 'bvvs:terminal'
export const RESUME_EVENT = 'bvvs:resume'

export interface NavDetail {
  /** Target section id, without the leading hash. */
  target: string
  /** System readout shown during the transition. */
  readout: string
}

/** The message shown while the portal is open, per section. */
const READOUTS: Record<string, string> = {
  home: 'RETURNING TO ORIGIN',
  about: 'ACCESSING PROFILE',
  journey: 'LOADING TIMELINE',
  worlds: 'MAPPING SYSTEMS',
  think: 'LOADING METHOD',
  mission: 'LOADING CURRENT MISSION',
  cyber: 'ENTERING CYBERSECURITY DOMAIN',
  ai: 'ENTERING AI CONSTELLATION',
  fullstack: 'BOOTING FULL-STACK ENGINE',
  prompt: 'OPENING PROMPT ENGINE',
  vibe: 'OPENING VIBE CODING LAB',
  skills: 'INDEXING SKILL MATRIX',
  tools: 'LOADING TOOLCHAIN',
  experience: 'RETRIEVING SERVICE RECORD',
  trainer: 'OPENING KNOWLEDGE TRANSFER',
  soc: 'CONNECTING TO SOC — SIMULATION',
  work: 'PROJECT DATABASE ONLINE',
  hiring: 'MATCHING ROLE TO EVIDENCE',
  current: 'READING DEVELOPMENT BOARD',
  credentials: 'VERIFYING CREDENTIALS',
  resumes: 'OPENING RÉSUMÉ VAULT',
  contact: 'OPENING SECURE CHANNEL',
}

export function readoutFor(target: string) {
  return READOUTS[target] ?? `NAVIGATING TO ${target.toUpperCase()}`
}

/** Request a staged navigation to a section. */
export function navigateTo(target: string) {
  window.dispatchEvent(
    new CustomEvent<NavDetail>(NAV_EVENT, {
      detail: { target, readout: readoutFor(target) },
    }),
  )
}

/** Scroll to a section immediately, with no transition. */
export function scrollToSection(target: string) {
  const el = document.getElementById(target)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

/** Open one résumé in the vault viewer, from anywhere on the page. */
export function openResume(id: string) {
  navigateTo('resumes')
  window.dispatchEvent(new CustomEvent<{ id: string }>(RESUME_EVENT, { detail: { id } }))
}

/** Open or close the command terminal. */
export function toggleTerminal(open?: boolean) {
  window.dispatchEvent(new CustomEvent<{ open?: boolean }>(TERMINAL_EVENT, { detail: { open } }))
}
