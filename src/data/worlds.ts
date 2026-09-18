/**
 * The five dimensions of the portfolio. Each world owns a semantic energy
 * colour and a target section — the hero switcher and the world selector
 * both read from here.
 */

export type WorldId = 'cyber' | 'ai' | 'fullstack' | 'prompt' | 'vibe'

export interface World {
  id: WorldId
  index: string
  name: string
  title: string
  /** CSS custom-property name for this world's energy. */
  energy: string
  tagline: string
  provides: string[]
  blurb: string
  /** Section id the world links into. */
  target: string
}

export const worlds: World[] = [
  {
    id: 'cyber',
    index: '01',
    name: 'CYBERSECURITY',
    title: 'Cybersecurity',
    energy: 'var(--color-cyber)',
    tagline: 'Break it, then defend it',
    provides: ['Security', 'Defense', 'Detection', 'Application Security', 'SOC', 'Threat Intelligence'],
    blurb:
      'Web application VAPT, OWASP Top 10 testing, SOC dashboards and detection engineering, digital forensics and threat intelligence — learned hands-on across four security internships.',
    target: 'cyber',
  },
  {
    id: 'ai',
    index: '02',
    name: 'AI / ML',
    title: 'Artificial Intelligence',
    energy: 'var(--color-ai)',
    tagline: 'Make the system think',
    provides: ['Intelligence', 'Automation', 'Machine Learning', 'Generative AI', 'LLMs', 'Computer Vision', 'NLP'],
    blurb:
      'Multi-modal AI systems, model routing and explainability, computer vision with YOLO and ResNet, NLP and OCR pipelines — culminating in OmniAI Cloud and a published conference paper.',
    target: 'ai',
  },
  {
    id: 'fullstack',
    index: '03',
    name: 'FULL-STACK',
    title: 'Full-Stack Development',
    energy: 'var(--color-safe)',
    tagline: 'Ship it end to end',
    provides: ['Building', 'Frontend', 'Backend', 'Database', 'API', 'Deployment'],
    blurb:
      'Frontend to API to backend to database — built with HTML, CSS, JavaScript, PHP, Python, Flask, Django, FastAPI and SQL, with the security layer wired in rather than bolted on.',
    target: 'fullstack',
  },
  {
    id: 'prompt',
    index: '04',
    name: 'PROMPT ENGINEERING',
    title: 'Prompt Engineering',
    energy: 'var(--color-prompt)',
    tagline: 'Instruct the model properly',
    provides: ['Instruction', 'Reasoning', 'Workflow Design', 'AI Interaction', 'AI System Control'],
    blurb:
      'Designing the instruction, the context and the constraints so a model produces something usable — then evaluating and iterating on the result instead of accepting the first answer.',
    target: 'prompt',
  },
  {
    id: 'vibe',
    index: '05',
    name: 'VIBE CODING',
    title: 'Vibe Coding',
    energy: '#ffffff',
    tagline: 'Idea to product, fast',
    provides: ['Rapid Prototyping', 'AI-Assisted Development', 'Idea → Product', 'Experimentation', 'Iteration'],
    blurb:
      'AI-assisted development used as an accelerator, not a replacement: idea, prompt, engineering judgment, testing and security review — then a product.',
    target: 'vibe',
  },
]

/** Hero world switcher — three environments, the origin story plus two disciplines. */
export type SceneId = 'origin' | 'cyber' | 'ai'

export interface Scene {
  id: SceneId
  label: string
  eyebrow: string
  headline: string
  energy: string
  line: string
}

export const scenes: Scene[] = [
  {
    id: 'origin',
    label: 'ORIGIN',
    eyebrow: 'WORLD 01 — ORIGIN',
    headline: 'BVVS SUNIL',
    energy: 'var(--color-ai)',
    line: 'Tanuku, Andhra Pradesh → a B.Tech in AI & ML → a workshop that changed the direction of everything after it.',
  },
  {
    id: 'cyber',
    label: 'CYBER',
    eyebrow: 'WORLD 02 — CYBERSECURITY',
    headline: 'BUILD. DETECT. DEFEND.',
    energy: 'var(--color-cyber)',
    line: 'Web application VAPT, live client penetration testing, SOC dashboards with real-time alerting, digital forensics and threat intelligence.',
  },
  {
    id: 'ai',
    label: 'AI',
    eyebrow: 'WORLD 03 — ARTIFICIAL INTELLIGENCE',
    headline: 'ROUTE. FUSE. EXPLAIN.',
    energy: 'var(--color-ai)',
    line: 'Multi-modal AI with automatic model selection, label-correction fusion and an explainability layer that reports why each model was chosen.',
  },
]
