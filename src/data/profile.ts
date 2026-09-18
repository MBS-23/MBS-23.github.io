/**
 * Identity + biography. Single source of truth — nothing here is invented.
 * Every claim traces back to supplied certificates, letters or first-hand work.
 *
 * PUBLIC PAGE, so this file is deliberately minimal on personal data: email,
 * city and professional profiles only. The phone number lives on the résumé
 * that goes out with an application, never on the open web.
 */

export const profile = {
  /** Formal name, surname first — the form used on every certificate. */
  fullName: 'Podugu Bala Veera Venkata Sunil',
  surname: 'Podugu',
  givenNames: 'Bala Veera Venkata Sunil',
  /** BVVS is simply the initials of the given names. */
  initials: 'BVVS',
  /** Two lines for the masked title reveal. */
  nameLines: ['BALA VEERA', 'VENKATA SUNIL'] as const,
  identity: 'CYBERSECURITY × AI/ML',
  /** The one sentence. Everything else on the site is evidence for it. */
  positioning: 'I build, test and secure software systems — using AI where it creates leverage.',
  positioningDetail:
    'Security is the foundation. AI and software engineering are the systems I build around it — applications that work, tested the way an attacker would test them.',
  status: 'AVAILABLE FOR OPPORTUNITIES · IMMEDIATE JOINER',
  graduating: 'B.Tech AI & ML · 2026',
  location: 'Tanuku, Andhra Pradesh, India',
  /** Cities the user is open to relocating for — recruiters filter on this. */
  relocation: ['Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Mumbai', 'Gujarat', 'Kerala'],
  email: 'bvvsedu@gmail.com',
} as const

export const socials = {
  github: 'https://github.com/MBS-23',
  githubHandle: 'github.com/MBS-23',
  linkedin: 'https://www.linkedin.com/in/bala-veera-venkata-sunil-podugu-294758292/',
  linkedinHandle: 'in/bala-veera-venkata-sunil-podugu',
  tryhackme: 'https://tryhackme.com/p/balasunil',
  tryhackmeHandle: 'p/balasunil',
} as const

export const about = {
  lead: 'The journey started in Artificial Intelligence. Cybersecurity changed its direction. Both are now the same job.',
  narrative: [
    'My technical journey began through Artificial Intelligence and Machine Learning — an APSCHE-backed AI internship, five mini-projects, and a lot of self-taught practice. I prepared my own DAA notes in college and the whole class ended up using them.',
    'In October 2024 a three-day ethical hacking and cybersecurity workshop changed the direction completely. Around 120 people attended; the top performers were selected into the company internship programme, and I was one of them.',
    'From there it expanded into web application VAPT, application security, SOC and SIEM work, digital forensics, threat intelligence, and a government cyber-police internship — while the AI side kept growing through GenAI, multi-modal systems and a published conference paper.',
    'Alongside both, I build: full-stack web applications, AI-assisted development workflows, and the security labs I used to train 50+ students. Five disciplines, one evolving system.',
  ],
  stats: [
    { value: '7', label: 'Internships', note: '2024 — 2026' },
    { value: '50+', label: 'Students trained', note: 'Secure web development' },
    { value: '12+', label: 'Security labs built', note: 'Bug-hunting curriculum' },
    { value: '1', label: 'Published paper', note: 'MITS × IIIC × IEEE' },
    { value: '2', label: 'Oracle certifications', note: 'Valid to Oct 2027' },
    { value: '8/10', label: 'CGPA · zero backlogs', note: 'B.Tech AI & ML' },
  ],
} as const

export const education = [
  {
    period: '2022 — 2026',
    year: '2022',
    degree: 'B.Tech — Artificial Intelligence & Machine Learning',
    org: 'SASI Institute of Technology and Engineering',
    result: 'CGPA 8/10',
    note: 'No backlogs across the four-year B.Tech journey. Authored the class-wide DAA notes.',
  },
  {
    period: '2020 — 2022',
    year: '2020',
    degree: 'Intermediate — MPC Stream',
    org: 'Narayana Junior College',
    result: '814 / 1000',
    note: null,
  },
  {
    period: '2019 — 2020',
    year: '2019',
    degree: 'SSC',
    org: 'Bhashyam Public School',
    result: '588 / 600',
    note: null,
  },
] as const

export const beyondTheCode = [
  'Reading books and articles',
  'Listening to music',
  'Playing shuttle',
  'Nature',
  'Travel and exploring',
  'Taking on challenges',
  'Continuous learning',
] as const
