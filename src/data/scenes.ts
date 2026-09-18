/**
 * The fourteen scenes. This is the spine of the site: the scroll indicator, the
 * navigation and the terminal all read from here, so the running order only
 * ever needs changing in one place.
 */

export interface Scene {
  id: string
  /** Scene number shown in the indicator. */
  n: string
  /** Short label for the indicator. */
  label: string
  /** Nav label — omitted from the condensed desktop bar when false. */
  primary: boolean
}

export const scenes: Scene[] = [
  { id: 'home', n: '01', label: 'ORIGIN', primary: false },
  { id: 'about', n: '02', label: 'THE ENGINEER', primary: true },
  { id: 'think', n: '03', label: 'HOW I THINK', primary: true },
  { id: 'cyber', n: '04', label: 'CYBERSECURITY', primary: true },
  { id: 'ai', n: '05', label: 'AI / ML', primary: true },
  { id: 'fullstack', n: '06', label: 'FULL-STACK', primary: true },
  { id: 'prompt', n: '07', label: 'PROMPT ENGINEERING', primary: false },
  { id: 'vibe', n: '08', label: 'VIBE CODING', primary: false },
  { id: 'skills', n: '09', label: 'SYSTEMS', primary: true },
  { id: 'work', n: '10', label: 'PROJECTS', primary: true },
  { id: 'hiring', n: '11', label: 'FOR RECRUITERS', primary: true },
  { id: 'current', n: '12', label: 'CURRENTLY BUILDING', primary: false },
  { id: 'experience', n: '13', label: 'EXPERIENCE', primary: true },
  { id: 'credentials', n: '14', label: 'CREDENTIALS', primary: false },
  { id: 'contact', n: '15', label: 'CONTACT', primary: false },
]

export const TOTAL = scenes.length

/** Every scrollable anchor, including the ones nested inside a scene. */
export const ALL_SECTION_IDS = [
  'home',
  'about',
  'journey',
  'worlds',
  'think',
  'cyber',
  'soc',
  'ai',
  'fullstack',
  'prompt',
  'vibe',
  'skills',
  'tools',
  'work',
  'hiring',
  'current',
  'experience',
  'trainer',
  'credentials',
  'resumes',
  'mission',
  'contact',
] as const

/** Which scene a nested anchor belongs to. */
export const SCENE_OF: Record<string, string> = {
  home: 'home',
  about: 'about',
  journey: 'about',
  worlds: 'about',
  think: 'think',
  cyber: 'cyber',
  soc: 'cyber',
  ai: 'ai',
  fullstack: 'fullstack',
  prompt: 'prompt',
  vibe: 'vibe',
  skills: 'skills',
  tools: 'skills',
  work: 'work',
  hiring: 'hiring',
  current: 'current',
  experience: 'experience',
  trainer: 'experience',
  credentials: 'credentials',
  resumes: 'credentials',
  mission: 'contact',
  contact: 'contact',
}
