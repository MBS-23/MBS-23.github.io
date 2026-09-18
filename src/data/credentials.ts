/**
 * Certifications, recognition and the training knowledge core.
 * Nothing here is invented — no certificate numbers, no fabricated issuers.
 */

export interface Certification {
  title: string
  issuer: string
  meta: string | null
  energy: 'cyber' | 'ai' | 'safe' | 'warn' | 'prompt'
}

export const certifications: Certification[] = [
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    meta: 'Valid until 30 October 2027',
    energy: 'ai',
  },
  {
    title: 'Oracle AI Vector Search Certified Professional',
    issuer: 'Oracle',
    meta: 'Valid until 30 October 2027',
    energy: 'ai',
  },
  {
    title: 'CEH V13 Track — Ethical Hacking & Cyber Security Specialisation',
    issuer: 'Skills Uprise',
    meta: 'Six-month programme · from January 2026',
    energy: 'cyber',
  },
  {
    title: 'SOC with AI — L2 / L3',
    issuer: 'CyberGuide Telugu',
    meta: '22 Apr 2026 — 30 Jun 2026',
    energy: 'safe',
  },
  {
    title: 'Certificate of Internship — GenAI',
    issuer: 'Huebits Tech Pvt. Ltd.',
    meta: '01 Jan — 31 Mar 2026 · certificate available on request',
    energy: 'ai',
  },
  {
    title: 'Certificate of Excellence — Ethical Hacking & Cyber Security Workshop',
    issuer: 'Supraja Technologies',
    meta: 'Level 1 · top performer among ~120 participants',
    energy: 'cyber',
  },
  {
    title: 'Certificate of Appreciation — “THE FAST-TRACK: The Sitean Show”',
    issuer: 'SASI Institute of Technology and Engineering',
    meta: null,
    energy: 'warn',
  },
  {
    title: 'Cyber Security Police Internship',
    issuer: 'Amroha Police (Government)',
    meta: '11 — 21 June 2026',
    energy: 'cyber',
  },
]

export interface Achievement {
  title: string
  detail: string
  energy: 'cyber' | 'ai' | 'safe' | 'warn' | 'prompt'
}

/** MISSION LOG — documented outcomes only. */
export const achievements: Achievement[] = [
  {
    title: 'Published conference paper',
    detail:
      'OmniAI Cloud selected and published at the International Conference on Cyber and AI Security — MITS Madanapalle × IIIC × IEEE.',
    energy: 'ai',
  },
  {
    title: 'Letters of Recommendation — placement and higher studies',
    detail: 'Two letters issued by Supraja Technologies following the VAPT internship.',
    energy: 'cyber',
  },
  {
    title: 'Selected into the advanced internship',
    detail:
      'Top performer from a ~120-participant ethical hacking workshop, selected into the Supraja company internship programme.',
    energy: 'cyber',
  },
  {
    title: 'TryHackMe — AI Security L1',
    detail: 'Selected in the AI Security L1 race; free exam voucher and three months of premium access awarded.',
    energy: 'ai',
  },
  {
    title: 'Reference and completion letter',
    detail: 'Issued by Cothon Solutions (AICTE-approved) on completion of the AI/ML internship.',
    energy: 'ai',
  },
  {
    title: 'Trained 50+ students',
    detail: 'Secure and insecure web development, delivered during the paid Skills Uprise Spectranox role.',
    energy: 'safe',
  },
  {
    title: 'Built 12+ security labs',
    detail: 'Purpose-built bug-hunting labs for real-time practical learning.',
    energy: 'safe',
  },
  {
    title: 'Two Oracle certifications',
    detail: 'AI Foundations Associate and AI Vector Search Professional, both valid to October 2027.',
    energy: 'ai',
  },
  {
    title: 'Class-wide DAA notes',
    detail:
      'Prepared my own Design & Analysis of Algorithms notes and documents; the whole class ended up using them.',
    energy: 'warn',
  },
]

/**
 * KNOWLEDGE CORE — the CyberGuide Telugu 'SOC with AI L2/L3' training curriculum.
 * This is the training programme only. The Amroha Police work is a separate
 * government internship and lives in experience.ts; never merge the two.
 */
export const knowledgeCore = [
  {
    branch: 'Foundations',
    items: ['Networking', 'VMware & Kali', 'Ubuntu Linux', 'Linux Fundamentals', 'Linux Commands', 'Intro to SOC'],
  },
  {
    branch: 'Network Analysis',
    items: ['Network Security', 'tcpdump', 'Wireshark', 'Network Traffic Analysis', 'Snort'],
  },
  {
    branch: 'Phishing',
    items: ['Phishing Analysis', 'AI for Phishing Analysis'],
  },
  {
    branch: 'Endpoint Security',
    items: [
      'Windows Processes',
      'Windows Registry',
      'Autoruns',
      'Scheduled Tasks',
      'Event Viewer',
      'Sysmon Setup',
      'Sysmon Events',
      'Process Analysis',
      'LimaCharlie',
    ],
  },
  {
    branch: 'SIEM & Logs',
    items: [
      'Intro to SIEM',
      'Log Management',
      'Log Analysis',
      'Common Attacks',
      'Splunk Installation',
      'Splunk Walkthrough',
      'Splunk BOTS v1',
    ],
  },
  {
    branch: 'Threat Intelligence',
    items: ['TI Basics', 'Cyber Kill Chain', 'Threat Hunting', 'YARA', 'YARA Rules', 'LOKI', 'MISP'],
  },
  {
    branch: 'Digital Forensics',
    items: [
      'Investigation Process',
      'Order of Volatility',
      'Chain of Custody',
      'FTK Imager',
      'Forensic Image Acquisition',
      'Memory Acquisition',
      'Windows Artifacts',
      'File Artifacts',
      'Program Execution Artifacts',
      'LNK Files',
      'Prefetch Files',
    ],
  },
  {
    branch: 'Microsoft Sentinel',
    items: [
      'Deploying Sentinel',
      'Data Connectors',
      'TI Data Ingestion',
      'Windows Log Ingestion',
      'Analytics Rules',
      'Scheduled Rules',
      'NRT Rules',
      'ML Analytics',
      'Incident Dashboard',
      'KQL 101',
      'Threat Hunting in Sentinel',
      'CTI Dashboard',
      'UEBA',
      'Automation Rules',
      'Automated Email',
      'Playbooks',
      'Workbooks',
      'Watchlists',
    ],
  },
  {
    branch: 'Scripting & Scanning',
    items: ['PowerShell 101', 'Get-Alias', 'Objects & Pipelines', 'Selecting, Sorting, Formatting', 'Qualys'],
  },
] as const
