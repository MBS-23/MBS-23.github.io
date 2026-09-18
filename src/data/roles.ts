/**
 * THE RECRUITER ROUTER.
 *
 * A hiring manager arrives with a role in mind, not a curiosity about someone's
 * life story. This file maps each role they might be hiring for to the evidence
 * that actually exists for it — experience, projects, skills, tools, résumé.
 *
 * It is an EVIDENCE ROUTER, not a scoring system. There are no match
 * percentages, no rankings and no "98% suitable" theatre. The only judgement
 * expressed is `fit`, and it is honest:
 *
 *   direct   — there is hands-on experience and shipped work behind this
 *   adjacent — real foundations and coursework, but no professional depth yet
 *
 * Every id referenced below must exist in experience.ts, projects.ts and
 * resumes.ts. The link audit and the type system keep that true.
 */

import type { Energy } from './skills'

export type Fit = 'direct' | 'adjacent'

export interface RoleFamily {
  id: string
  label: string
  blurb: string
  energy: Energy
}

export interface RoleTarget {
  id: string
  family: string
  title: string
  fit: Fit
  /** Why the evidence below answers this particular role. */
  why: string
  /** Role ids from experience.ts, most relevant first. */
  experience: string[]
  /** Project ids from projects.ts. */
  projects: string[]
  skills: string[]
  tools: string[]
  /** Résumé id from resumes.ts. */
  resume: string
}

export const FIT_LABEL: Record<Fit, string> = {
  direct: 'Direct experience',
  adjacent: 'Adjacent — foundations, not depth',
}

export const roleFamilies: RoleFamily[] = [
  {
    id: 'security',
    label: 'Cybersecurity',
    blurb: 'The strongest evidence: authorised testing, SOC training and security tooling built end to end.',
    energy: 'cyber',
  },
  {
    id: 'ai',
    label: 'AI / ML',
    blurb: 'Applied AI: a published multi-modal system, computer vision and GenAI internships.',
    energy: 'ai',
  },
  {
    id: 'software',
    label: 'Software',
    blurb: 'Shipped desktop and web applications, with secure coding as the differentiator.',
    energy: 'safe',
  },
  {
    id: 'support',
    label: 'Customer-facing tech',
    blurb: 'Trained 50+ students and ran doubt and customer support — explaining systems is practised work.',
    energy: 'prompt',
  },
  {
    id: 'data',
    label: 'Data & analytics',
    blurb: 'Honest position: real data tooling from AI work, no professional analyst experience yet.',
    energy: 'warn',
  },
]

export const roleTargets: RoleTarget[] = [
  /* ---------------- Cybersecurity ---------------- */
  {
    id: 'soc-analyst',
    family: 'security',
    title: 'SOC Analyst (L1)',
    fit: 'direct',
    why: 'Six months of SOC-focused training on Splunk and Microsoft Sentinel, SOC dashboards built and wired to live alerting, and a documented triage method.',
    experience: ['cyberguide', 'skillsuprise', 'amroha'],
    projects: ['idsips', 'soclabs'],
    skills: ['Log Analysis', 'Threat Hunting', 'Detection Engineering'],
    tools: ['Splunk', 'Microsoft Sentinel', 'Wazuh', 'Sysmon', 'YARA', 'MISP'],
    resume: 'track-security',
  },
  {
    id: 'appsec',
    family: 'security',
    title: 'Application Security / VAPT',
    fit: 'direct',
    why: 'A two-month offline VAPT internship, selection into the advanced application-security track, and six months of authorised testing on client web applications.',
    experience: ['supraja-vapt', 'supraja-advanced', 'skillsuprise'],
    projects: ['shadowportx', 'soclabs'],
    skills: ['VAPT', 'Web App Penetration Testing', 'OWASP Top 10', 'Secure Code Review'],
    tools: ['Burp Suite', 'PortSwigger Academy', 'Nmap', 'Metasploit', 'Nessus', 'Acunetix'],
    resume: 'track-security',
  },
  {
    id: 'security-analyst',
    family: 'security',
    title: 'Cybersecurity Analyst',
    fit: 'direct',
    why: 'The paid role itself: testing client applications, reporting findings, working with developers through remediation, and building the labs the team trained on.',
    experience: ['skillsuprise', 'supraja-vapt', 'amroha'],
    projects: ['shadowportx', 'idsips', 'soclabs'],
    skills: ['VAPT', 'Log Analysis', 'Digital Forensics', 'Secure Code Review'],
    tools: ['Burp Suite', 'Wireshark', 'Splunk', 'Kali Linux', 'Autopsy'],
    resume: 'track-security',
  },
  {
    id: 'security-engineer',
    family: 'security',
    title: 'Security Engineer',
    fit: 'adjacent',
    why: 'Security tooling has been built and shipped — a scanner, a detection pipeline, live SOC dashboards — but as internship and training work, not yet as an engineer inside a production security team.',
    experience: ['skillsuprise', 'supraja-advanced', 'cyberguide'],
    projects: ['shadowportx', 'idsips'],
    skills: ['Detection Engineering', 'Secure Code Review', 'Python', 'Log Analysis'],
    tools: ['Splunk', 'Microsoft Sentinel', 'Wazuh', 'Snort', 'Git / GitHub'],
    resume: 'track-security',
  },
  {
    id: 'ai-security',
    family: 'security',
    title: 'AI Security',
    fit: 'adjacent',
    why: 'Both halves exist — applied AI systems and hands-on security — and the current work is deliberately at the intersection. The professional depth is still being built.',
    experience: ['cyberguide', 'huebits'],
    projects: ['omniai'],
    skills: ['LLMs', 'Prompt Engineering', 'Threat Hunting'],
    tools: ['Hugging Face', 'PyTorch', 'Burp Suite'],
    resume: 'master',
  },

  /* ---------------- AI / ML ---------------- */
  {
    id: 'aiml-engineer',
    family: 'ai',
    title: 'AI / ML Engineer',
    fit: 'direct',
    why: 'A multi-modal system built and evaluated across nine pretrained models, published at an international conference, plus a computer-vision series across several architectures.',
    experience: ['huebits', 'aimer-dl', 'aimer-apsche'],
    projects: ['omniai', 'vision'],
    skills: ['PyTorch', 'Deep Learning', 'Multimodal AI', 'Explainable AI'],
    tools: ['PyTorch', 'Hugging Face', 'Ultralytics YOLO', 'OpenCV', 'Google Colab'],
    resume: 'track-ai',
  },
  {
    id: 'genai-engineer',
    family: 'ai',
    title: 'GenAI Engineer',
    fit: 'direct',
    why: 'A three-month GenAI internship delivering OmniAI Cloud — model routing, an explainability layer, FastAPI services and an Azure deployment during development.',
    experience: ['huebits', 'cothon'],
    projects: ['omniai', 'legal'],
    skills: ['Generative AI', 'LLMs', 'RAG', 'Prompt Engineering', 'NLP'],
    tools: ['Hugging Face', 'PyTorch', 'spaCy', 'PaddleOCR'],
    resume: 'track-ai',
  },
  {
    id: 'cv-engineer',
    family: 'ai',
    title: 'Computer Vision',
    fit: 'direct',
    why: 'Detection and classification work across YOLOv8, YOLOv11, ResNet, DenseNet and VGG, then applied inside OmniAI Cloud for label refinement.',
    experience: ['aimer-dl', 'huebits', 'aimer-apsche'],
    projects: ['vision', 'omniai'],
    skills: ['YOLO', 'ResNet', 'Deep Learning', 'Machine Learning'],
    tools: ['Ultralytics YOLO', 'OpenCV', 'PyTorch', 'Google Colab'],
    resume: 'track-ai',
  },

  /* ---------------- Software ---------------- */
  {
    id: 'python-dev',
    family: 'software',
    title: 'Python Developer',
    fit: 'direct',
    why: 'Python is the language behind every project here: a threaded PyQt6 desktop application, FastAPI services, detection pipelines and document processing.',
    experience: ['huebits', 'supraja-vapt', 'cothon'],
    projects: ['shadowportx', 'omniai', 'idsips'],
    skills: ['Python', 'FastAPI', 'REST APIs', 'Data Structures & Algorithms'],
    tools: ['Python', 'FastAPI', 'PyQt6', 'Postman', 'Git / GitHub'],
    resume: 'track-fullstack',
  },
  {
    id: 'fullstack-dev',
    family: 'software',
    title: 'Full-Stack Developer',
    fit: 'direct',
    why: 'Built and taught both halves of the same stack — PHP/MySQL features written securely and insecurely, plus Python service backends and a React front end.',
    experience: ['skillsuprise', 'huebits'],
    projects: ['soclabs', 'omniai'],
    skills: ['JavaScript', 'PHP', 'SQL', 'React', 'REST APIs'],
    tools: ['MySQL', 'XAMPP', 'Git / GitHub', 'VS Code', 'Docker'],
    resume: 'track-fullstack',
  },
  {
    id: 'secure-swe',
    family: 'software',
    title: 'Secure Software Engineer',
    fit: 'direct',
    why: 'The overlap is the whole point: someone who writes the feature and also knows how it gets attacked, and who has taught that difference to a cohort.',
    experience: ['skillsuprise', 'supraja-advanced'],
    projects: ['soclabs', 'shadowportx', 'idsips'],
    skills: ['Secure Code Review', 'OWASP Top 10', 'Python', 'SQL'],
    tools: ['Burp Suite', 'Git / GitHub', 'MySQL', 'Postman'],
    resume: 'track-fullstack',
  },

  /* ---------------- Customer-facing ---------------- */
  {
    id: 'tech-support',
    family: 'support',
    title: 'Technical Support Engineer',
    fit: 'direct',
    why: 'Ran doubt and customer support for a 50+ student cohort: reproducing the problem, explaining the cause, fixing the code and writing it down so the next person does not ask twice.',
    experience: ['skillsuprise'],
    projects: ['soclabs'],
    skills: ['Log Analysis', 'SQL', 'REST APIs', 'Secure Code Review'],
    tools: ['Postman', 'MySQL', 'XAMPP', 'Wireshark'],
    resume: 'track-fullstack',
  },
  {
    id: 'solutions-engineer',
    family: 'support',
    title: 'Solutions / Sales Engineer',
    fit: 'adjacent',
    why: 'The technical half is evidenced — demonstrating systems, training, and explaining security findings to developers. The commercial half is new.',
    experience: ['skillsuprise', 'supraja-vapt'],
    projects: ['shadowportx', 'soclabs'],
    skills: ['REST APIs', 'Web App Penetration Testing', 'Python'],
    tools: ['Postman', 'Burp Suite', 'Splunk'],
    resume: 'master',
  },

  /* ---------------- Data ---------------- */
  {
    id: 'data-analyst',
    family: 'data',
    title: 'Data Analyst',
    fit: 'adjacent',
    why: 'Real exposure through AI work — Power BI dashboards, pandas/NumPy pipelines, SQL and model evaluation — but no analyst role held yet. Shown here so the judgement is yours, not hidden.',
    experience: ['aimer-apsche', 'huebits'],
    projects: ['omniai', 'vision'],
    skills: ['SQL', 'Machine Learning', 'Python'],
    tools: ['Power BI', 'MySQL', 'Google Colab'],
    resume: 'track-ai',
  },
]
