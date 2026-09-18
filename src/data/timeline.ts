/**
 * The story timeline — the chronological spine of the portfolio.
 * Each node carries the energy of the discipline it belongs to.
 */

export interface TimelineNode {
  year: string
  title: string
  detail: string
  energy: 'cyber' | 'ai' | 'safe' | 'warn' | 'prompt'
  kind: 'origin' | 'ai' | 'security' | 'build' | 'now'
}

export const storyTimeline: TimelineNode[] = [
  {
    year: '2020',
    title: 'ACADEMIC FOUNDATION',
    detail: 'SSC at Bhashyam Public School — 588/600. Intermediate MPC at Narayana Junior College — 814/1000.',
    energy: 'warn',
    kind: 'origin',
  },
  {
    year: '2022',
    title: 'B.TECH — AI & MACHINE LEARNING',
    detail: 'SASI Institute of Technology and Engineering. Four years, zero backlogs, CGPA 8/10. Self-authored DAA notes adopted by the class.',
    energy: 'ai',
    kind: 'origin',
  },
  {
    year: '2024',
    title: 'FIRST AI INTERNSHIP',
    detail: 'AIMER Society × APSCHE — 120 hours over 8 weeks. Five mini-projects including Visual Question Answering and YOLOv8 detection.',
    energy: 'ai',
    kind: 'ai',
  },
  {
    year: 'OCT 2024',
    title: 'THE TURNING POINT',
    detail: 'A three-day ethical hacking and cybersecurity workshop. ~120 participants; top performers selected into the internship programme. Certificate of Excellence awarded.',
    energy: 'cyber',
    kind: 'security',
  },
  {
    year: '2025',
    title: 'PARALLEL INTERNSHIPS',
    detail: 'Supraja Technologies VAPT (offline), Cothon Solutions AI/ML, and the AIMER deep-learning track — all through the same summer.',
    energy: 'cyber',
    kind: 'security',
  },
  {
    year: '2025',
    title: 'SHADOWPORTX',
    detail: 'A GUI-first port scanner and reconnaissance tool with integrated WHOIS/DNS intelligence, shipped as the VAPT internship project.',
    energy: 'cyber',
    kind: 'build',
  },
  {
    year: '2025',
    title: 'LEGAL CONTRACT ANALYZER',
    detail: 'NLP clause extraction over legal contracts, delivered to client requirements. Reference letter issued.',
    energy: 'ai',
    kind: 'build',
  },
  {
    year: '2025 — 2026',
    title: 'ADVANCED SECURITY & SOC',
    detail: 'Burp Suite, PortSwigger Academy, API testing and Splunk-based SOC work. Log-Based IDS/IPS Prevention System delivered.',
    energy: 'safe',
    kind: 'security',
  },
  {
    year: '2026',
    title: 'OMNIAI CLOUD',
    detail: 'Multi-modal AI with automatic model selection and explainability. Built with Huebits Tech, published at an IEEE/IIIC-affiliated conference.',
    energy: 'ai',
    kind: 'build',
  },
  {
    year: '2026',
    title: 'CYBERSECURITY ANALYST — PAID',
    detail: 'Skills Uprise Spectranox. Live client security testing, SOC dashboards with mail alerting, 12+ labs, 50+ students trained.',
    energy: 'cyber',
    kind: 'security',
  },
  {
    year: '2026',
    title: 'SOC WITH AI — L2 / L3 TRAINING',
    detail:
      'CyberGuide Telugu · Apr — Jun 2026. A structured training programme: Splunk, Microsoft Sentinel (KQL, analytics rules, playbooks), threat hunting, YARA, MISP, Sysmon and forensic artifacts.',
    energy: 'safe',
    kind: 'security',
  },
  {
    year: '2026',
    title: 'CYBER POLICE INTERNSHIP — GOVERNMENT',
    detail:
      'Amroha Police · 11 — 21 Jun 2026, ten days. A separate government programme: real cybercrime case work, OSINT, mobile forensics with Autopsy, Cellebrite and Oxygen, Wazuh SOC monitoring and authorised bug hunting.',
    energy: 'cyber',
    kind: 'security',
  },
  {
    year: 'NOW',
    title: 'BUILDING THE NEXT LEVEL',
    detail: 'PortSwigger end-to-end, TryHackMe AI Security, and the ShadowPortX 2.0 → SecureLens AI → LLM Security Lab series.',
    energy: 'prompt',
    kind: 'now',
  },
]

/** The mission statement block. */
export const mission = {
  lines: [
    'BUILD THE SKILL.',
    'BUILD THE SYSTEM.',
    'UNDERSTAND THE THREAT.',
    'ENGINEER THE SOLUTION.',
    'USE AI INTELLIGENTLY.',
    'SECURE WHAT YOU BUILD.',
  ],
  closing: 'THIS IS NOT THE FINISHED SYSTEM. IT IS THE SYSTEM STILL EVOLVING.',
} as const
