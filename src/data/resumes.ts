/**
 * Résumés — VIEW ONLY, and deliberately redacted for the open web.
 *
 * These four PDFs are the web copies built by
 * `resume-src/web-resumes/build_web_resumes.py`: identical to the résumés sent
 * with applications, minus the phone number and the names of pentest clients.
 * Each is one A4 page, single column, real selectable text — so an ATS parses
 * them cleanly.
 */

export interface ResumeDoc {
  id: string
  file: string
  label: string
  title: string
  role: string
  blurb: string
  energy: 'cyber' | 'ai' | 'safe' | 'prompt'
  highlights: string[]
}

/** Resolves a résumé file to a URL that survives a sub-path deploy. */
export const resumeHref = (file: string) => `${import.meta.env.BASE_URL}resumes/${file}`

export const masterResume: ResumeDoc = {
  id: 'master',
  file: 'Podugu-Sunil-Resume-Master.pdf',
  label: 'START HERE',
  title: 'Master Résumé',
  role: 'Security & AI Engineer',
  blurb:
    'One page, everything that matters: seven internships, the published paper, the tooling I have shipped, and the security and AI stacks — written so a recruiter, an ATS and a hiring engineer all read it the same way.',
  energy: 'cyber',
  highlights: [
    'One page · A4 · ATS-safe single column',
    'No tables, text boxes or graphics — real selectable text',
    'Quantified results on every project',
    'Full offensive + defensive + AI stack',
  ],
}

export const trackResumes: ResumeDoc[] = [
  {
    id: 'track-security',
    file: 'Podugu-Sunil-Resume-Cybersecurity.pdf',
    label: 'TRACK 01',
    title: 'Cybersecurity & Application Security',
    role: 'Cybersecurity Analyst | VAPT | SOC',
    blurb:
      'Security-weighted: authorised VAPT work, OWASP Top 10 and API testing, SIEM and SOC tooling, digital forensics, and the security tools I built myself.',
    energy: 'cyber',
    highlights: ['VAPT & OWASP Top 10', 'Splunk · Sentinel · Wazuh', 'DFIR toolchain', 'ShadowPortX · Log IDS/IPS'],
  },
  {
    id: 'track-ai',
    file: 'Podugu-Sunil-Resume-AI-GenAI.pdf',
    label: 'TRACK 02',
    title: 'AI / ML & GenAI Engineering',
    role: 'AI / ML Engineer | GenAI · RAG · Computer Vision',
    blurb:
      'Applied-AI weighted: OmniAI Cloud and the published paper up front, then computer vision, NLP, OCR and the Oracle AI certifications.',
    energy: 'ai',
    highlights: ['PyTorch · Transformers', 'YOLO · ResNet · BLIP', 'Published paper', 'OmniAI Cloud'],
  },
  {
    id: 'track-fullstack',
    file: 'Podugu-Sunil-Resume-Software-Engineer.pdf',
    label: 'TRACK 03',
    title: 'Software Engineering (Python)',
    role: 'Software Engineer | FastAPI · Django · SQL',
    blurb:
      'Engineering weighted: shipped desktop and web applications end-to-end, with secure coding and DSA fundamentals as the differentiator.',
    energy: 'safe',
    highlights: ['FastAPI · Flask · Django', 'PHP · SQL · MySQL', 'PyQt6 desktop app', 'Secure code review'],
  },
]

export const allResumes: ResumeDoc[] = [masterResume, ...trackResumes]

/** Shown under the vault — the site never pretends these are the full copies. */
export const resumeNote =
  'Web copies: identical to the résumé sent with an application, with the phone number and client names removed. Ask by email for the full copy.'
