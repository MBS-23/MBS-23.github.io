/**
 * CURRENT / EXPERIMENTAL / PLANNED work — deliberately separated from
 * completed projects. No completion percentages: a stage label is honest,
 * a percentage is not.
 */

export type Stage =
  | 'RESEARCH'
  | 'ARCHITECTURE'
  | 'MVP'
  | 'DEVELOPMENT'
  | 'INTEGRATION'
  | 'TESTING'
  | 'SECURITY REVIEW'
  | 'POLISH'

export type Badge = 'IN PROGRESS' | 'BUILDING' | 'EXPERIMENTAL' | 'PLANNED'

/** The development board columns, in order. */
export const boardColumns: { id: string; label: string }[] = [
  { id: 'exploring', label: 'EXPLORING' },
  { id: 'designing', label: 'DESIGNING' },
  { id: 'building', label: 'BUILDING' },
  { id: 'testing', label: 'TESTING' },
]

export interface CurrentProject {
  id: string
  number: string
  title: string
  subtitle: string
  pillar: string
  badge: Badge
  stage: Stage
  column: string
  energy: 'cyber' | 'ai' | 'safe' | 'warn' | 'prompt'
  objective: string
  flow: string[]
  stack: string[]
  scope: string[]
  nextMilestone: string
  /** Ethics guardrail shown on the card where relevant. */
  guardrail?: string
  priority: 1 | 2 | 3
}

export const currentProjects: CurrentProject[] = [
  {
    id: 'logids2',
    number: '00',
    title: 'Log-Based IDS / IPS — extension',
    subtitle: 'Continuing the internship prototype',
    pillar: 'Defensive Security',
    badge: 'IN PROGRESS',
    stage: 'DEVELOPMENT',
    column: 'building',
    energy: 'safe',
    objective:
      'The internship version detects and alerts. This is the work of making it usable by an analyst: broader rule coverage, real correlation, and a triage view that says what to do next.',
    flow: [
      'LOG INGESTION',
      'NORMALIZATION',
      'DETECTION RULES',
      'CORRELATION',
      'RISK SCORING',
      'ALERT',
      'TRIAGE VIEW',
      'RESPONSE ACTION',
    ],
    stack: ['Python', 'Splunk', 'SIEM correlation', 'Log parsing', 'Alerting'],
    scope: [
      'Started from the delivered Supraja internship project, which is listed under completed work',
      'Extending detection beyond SQL injection, XSS, brute force, IDOR and credential stuffing',
      'Adding correlation so related events become one incident rather than five alerts',
      'An analyst view that carries the evidence and the decision, not just the event',
    ],
    nextMilestone: 'Correlation layer over the existing rule set, then the triage view.',
    guardrail: 'Lab environment only. Detection and alerting — no automated blocking of production traffic.',
    priority: 2,
  },
  {
    id: 'shadowportx2',
    number: '01',
    title: 'ShadowPortX 2.0',
    subtitle: 'Advanced Attack Surface Intelligence Platform',
    pillar: 'Application Security',
    badge: 'IN PROGRESS',
    stage: 'ARCHITECTURE',
    column: 'designing',
    energy: 'cyber',
    objective:
      'Close the gap between "what is exposed?" and "what should we fix first?" — asset discovery through to prioritised risk, in one workflow.',
    flow: [
      'ASSET DISCOVERY',
      'DNS / SUBDOMAIN INTELLIGENCE',
      'PORT & SERVICE DISCOVERY',
      'TECHNOLOGY FINGERPRINTING',
      'VULNERABILITY INTELLIGENCE',
      'RISK CORRELATION',
      'SECURITY DASHBOARD',
      'REPORT',
    ],
    stack: ['Python', 'FastAPI', 'asyncio', 'PostgreSQL', 'React', 'HTTPX', 'NVD / CVE data', 'CVSS', 'Docker'],
    scope: [
      'Carries forward the 1.0 engine: TCP, UDP, SYN/Stealth, version detection, DNS and WHOIS, PDF/CSV/JSON reporting',
      'Adds subdomain intelligence, technology identification, security headers and TLS configuration review',
      'Correlates discovered versions with public vulnerability intelligence — correlation, not exploitation',
      'Risk scoring that ranks findings by severity and exposure',
    ],
    nextMilestone: 'Recon engine + findings schema, then the correlation layer.',
    guardrail: 'Authorised targets only. The platform performs vulnerability intelligence correlation — never automated exploitation.',
    priority: 1,
  },
  {
    id: 'securelens',
    number: '02',
    title: 'SecureLens AI',
    subtitle: 'AI-Assisted Secure Code Review & Vulnerability Analysis',
    pillar: 'Application Security',
    badge: 'IN PROGRESS',
    stage: 'DEVELOPMENT',
    column: 'building',
    energy: 'cyber',
    objective:
      'Faster code generation does not mean secure code. Pair static analysis with model reasoning so a finding arrives with an explanation and a fix, not just a line number.',
    flow: [
      'SOURCE CODE',
      'LANGUAGE DETECTION',
      'STATIC ANALYSIS',
      'SECURITY RULES',
      'AI ANALYSIS',
      'FINDING CORRELATION',
      'SEVERITY',
      'REMEDIATION',
      'RETEST',
    ],
    stack: ['Python', 'AST analysis', 'SAST rules', 'LLMs', 'FastAPI', 'CWE mapping'],
    scope: [
      'Phase 1 languages: Python, PHP, JavaScript — the three I write most',
      'Categories: SQL injection, XSS, command injection, path traversal, SSRF, hardcoded secrets, weak cryptography, authentication and authorization weaknesses, unsafe file handling',
      'Every finding carries CWE, evidence, impact, a secure-coding recommendation and a developer explanation',
      'Vulnerable → AI recommendation → developer fix → rescan → PASS / FAIL loop',
    ],
    nextMilestone: 'Finding engine with CWE mapping, then the retest loop.',
    priority: 1,
  },
  {
    id: 'llmseclab',
    number: '03',
    title: 'LLM Security Lab',
    subtitle: 'AI/LLM Security Testing & Evaluation Framework',
    pillar: 'AI Security',
    badge: 'BUILDING',
    stage: 'RESEARCH',
    column: 'exploring',
    energy: 'ai',
    objective:
      'LLM applications introduce risks that traditional application security testing does not cover. Build the controlled environment to test for them.',
    flow: ['TEST', 'TARGET', 'RESPONSE', 'EVALUATION', 'RISK SCORING', 'REPORT'],
    stack: ['Python', 'LLM APIs', 'OWASP LLM Top 10', 'Evaluation harness', 'FastAPI'],
    scope: [
      'Prompt security — direct injection, indirect injection, instruction-conflict scenarios',
      'Data security — sensitive data leakage, system-prompt exposure, unauthorised retrieval',
      'Agent security — excessive permissions, unsafe tool usage, authorization failures',
      'RAG security — malicious documents, injection through retrieved content, unauthorised document access',
    ],
    nextMilestone: 'Test library for the prompt-security category, then the scoring model.',
    guardrail: 'A controlled evaluation environment for systems I own or am authorised to test.',
    priority: 1,
  },
  {
    id: 'phishing',
    number: '04',
    title: 'Automated Phishing Triage',
    subtitle: 'SOC automation over reported email',
    pillar: 'SOC / Defensive Security',
    badge: 'BUILDING',
    stage: 'MVP',
    column: 'building',
    energy: 'safe',
    objective:
      'Manually analysing headers, senders, URLs, attachments and authentication results for every reported email costs a SOC real analyst hours.',
    flow: [
      'EML FILE',
      'HEADER ANALYSIS',
      'URL ANALYSIS',
      'ATTACHMENT ANALYSIS',
      'THREAT INTELLIGENCE',
      'AI CLASSIFICATION',
      'RISK SCORE',
      'ANALYST REPORT',
    ],
    stack: ['Python', 'email parsing', 'URL analysis', 'hashing', 'LLM classification', 'Dashboard'],
    scope: [
      'Parses .eml and extracts every security-relevant field',
      'SPF/DKIM/DMARC result checks, display-name mismatch and urgency-language signals',
      'Attachment hashing and URL reputation as optional, clearly-labelled third-party lookups',
      'Produces a verdict, a risk score, the indicators behind it, and a recommended action',
    ],
    nextMilestone: 'Header and URL analysers, then the risk engine.',
    guardrail: 'Third-party reputation results are labelled as external intelligence, not absolute truth.',
    priority: 1,
  },
  {
    id: 'apifuzzer',
    number: '05',
    title: 'API Security Fuzzer',
    subtitle: 'Controlled API security testing framework',
    pillar: 'Application Security',
    badge: 'EXPERIMENTAL',
    stage: 'RESEARCH',
    column: 'exploring',
    energy: 'cyber',
    objective:
      'APIs carry authorization, validation and rate-limiting weaknesses that functional testing never finds.',
    flow: [
      'API DEFINITION',
      'ENDPOINT PARSER',
      'PARAMETER / AUTH / RATE TESTS',
      'TEST ENGINE',
      'RESPONSE ANALYZER',
      'FINDING ENGINE',
      'SECURITY REPORT',
    ],
    stack: ['Python', 'OpenAPI', 'HTTPX', 'Postman collections', 'Reporting'],
    scope: [
      'OpenAPI import and endpoint inventory',
      'Authentication configuration and authorization test cases',
      'Parameter mutation and rate-limit behaviour checks',
      'Response comparison, status-code analysis, evidence, severity and remediation',
    ],
    nextMilestone: 'OpenAPI import and endpoint inventory.',
    guardrail: 'Runs only against APIs I own or have explicit written authorisation to test.',
    priority: 2,
  },
  {
    id: 'miniedr',
    number: '06',
    title: 'Mini EDR',
    subtitle: 'Endpoint behaviour monitor',
    pillar: 'Detection Engineering',
    badge: 'EXPERIMENTAL',
    stage: 'RESEARCH',
    column: 'exploring',
    energy: 'safe',
    objective:
      'Endpoint telemetry is abundant and unreadable. Turn process, file and registry events into a behaviour score an analyst can act on.',
    flow: [
      'PROCESS / FILE / REGISTRY / SYSMON EVENTS',
      'EVENT COLLECTOR',
      'BEHAVIOR ENGINE',
      'RISK ENGINE',
      'ALERT',
      'INVESTIGATION',
      'OPTIONAL CONTAINMENT',
    ],
    stack: ['Python', 'Sysmon', 'Windows Event Logs', 'YARA', 'Sigma-style rules'],
    scope: [
      'Detects unusually high file-modification rates, suspicious process trees and persistence changes',
      'Flags abnormal PowerShell activity and unexpected registry writes',
      'Detect → score → alert → investigate, with containment as an explicit operator decision',
    ],
    nextMilestone: 'Event collector over Sysmon, then the behaviour engine.',
    guardrail: 'Never terminates processes automatically. Containment is always a human decision.',
    priority: 2,
  },
  {
    id: 'securevault',
    number: '07',
    title: 'SecureVault',
    subtitle: 'Client-side encrypted password & note vault',
    pillar: 'Secure Software Engineering',
    badge: 'PLANNED',
    stage: 'ARCHITECTURE',
    column: 'designing',
    energy: 'prompt',
    objective:
      'Centralised storage of secrets is a high-value target. Build a vault where the server holds ciphertext and never holds the master key.',
    flow: [
      'USER',
      'WEB APPLICATION',
      'KEY DERIVATION',
      'CLIENT-SIDE ENCRYPTION',
      'ENCRYPTED DATA',
      'BACKEND API',
      'DATABASE',
    ],
    stack: ['Authenticated encryption', 'Key derivation', 'Web Crypto', 'FastAPI', 'PostgreSQL'],
    scope: [
      'Encryption happens in the browser; the server stores ciphertext only',
      'Secure authentication, 2FA, session protection and CSRF defences',
      'Rate limiting and audit logging',
      'A written threat model — who holds which key, and what a database compromise actually exposes',
    ],
    nextMilestone: 'Threat model document, then the key-derivation layer.',
    priority: 2,
  },
  {
    id: 'vulntrack',
    number: '08',
    title: 'VulnTrack',
    subtitle: 'Vulnerability & security bug management platform',
    pillar: 'Application Security',
    badge: 'PLANNED',
    stage: 'ARCHITECTURE',
    column: 'designing',
    energy: 'cyber',
    objective:
      'Findings move from tester to developer to security to QA to management. Without a security-focused workflow they get lost in the middle.',
    flow: [
      'FINDING SUBMISSION',
      'VALIDATION ENGINE',
      'CVSS / CWE / OWASP MAPPING',
      'RISK MANAGEMENT',
      'DEVELOPER & SECURITY DASHBOARDS',
      'REPORTS',
    ],
    stack: ['FastAPI', 'React', 'PostgreSQL', 'CVSS calculator', 'CWE / OWASP mapping'],
    scope: [
      'Submission with evidence and screenshots',
      'CVSS scoring, CWE and OWASP mapping, severity and assignment',
      'Remediation, retesting and status tracking with a full audit trail',
      'AI-generated remediation guidance — validated by the security team, never auto-applied',
    ],
    nextMilestone: 'Finding schema and CVSS calculator.',
    priority: 2,
  },
  {
    id: 'sandbox',
    number: '09',
    title: 'Developer Sandbox Executor',
    subtitle: 'Controlled execution environment for untrusted code',
    pillar: 'Security Engineering',
    badge: 'PLANNED',
    stage: 'RESEARCH',
    column: 'exploring',
    energy: 'warn',
    objective:
      'Running untrusted code exposes the host to malicious processes, unwanted network calls, filesystem access and resource exhaustion.',
    flow: [
      'USER CODE',
      'SUBMISSION API',
      'SECURITY VALIDATOR',
      'SANDBOX MANAGER',
      'CONTAINER',
      'PROCESS / NETWORK / FILESYSTEM MONITORS',
      'RISK ANALYZER',
      'EXECUTION REPORT',
    ],
    stack: ['Python', 'Docker', 'cgroups', 'Monitoring', 'FastAPI'],
    scope: [
      'Isolated container execution with resource limits',
      'Process, network and filesystem monitoring during the run',
      'An execution report — runtime, processes spawned, network requests, files touched, resource usage',
    ],
    nextMilestone: 'Submission API and container lifecycle.',
    priority: 3,
  },
  {
    id: 'privaterag',
    number: '10',
    title: 'Private RAG Assistant',
    subtitle: 'Local, privacy-preserving document intelligence',
    pillar: 'AI / GenAI Engineering',
    badge: 'EXPERIMENTAL',
    stage: 'MVP',
    column: 'building',
    energy: 'ai',
    objective:
      'Organisations want AI over internal documents without sending sensitive material to an external service.',
    flow: [
      'DOCUMENTS',
      'DOCUMENT PROCESSOR',
      'CHUNKING',
      'EMBEDDINGS',
      'VECTOR STORE',
      'RETRIEVER',
      'LOCAL LLM',
      'ANSWER + SOURCE CITATIONS',
    ],
    stack: ['Python', 'Local LLM', 'Vector database', 'Embeddings', 'FastAPI'],
    scope: [
      'Fully local inference option — nothing leaves the machine',
      'Document-level authorization and user roles',
      'Prompt-injection defences and retrieval filtering',
      'Sensitive-data detection and audit logging',
      'Every answer cites its sources',
    ],
    nextMilestone: 'Retrieval filtering and document-level authorization.',
    priority: 3,
  },
]

/** The eventual signature project — stated as a direction, not a deliverable. */
export const northStar = {
  title: 'AI Security Copilot',
  status: 'THE DIRECTION',
  body:
    'Once the individual systems exist, they combine: application security testing, AI/LLM security evaluation and SOC automation feeding one security reasoning engine that produces findings, risk scores and remediation.',
  pillars: [
    { label: 'APPSEC', items: ['Web testing', 'API testing', 'Code review'] },
    { label: 'AI SECURITY', items: ['LLM testing', 'RAG security', 'Prompt security'] },
    { label: 'SOC', items: ['Phishing triage', 'Log analysis', 'Threat intel'] },
  ],
} as const

/** Currently learning — states, not invented percentages. */
export const currentLearning = [
  { label: 'PortSwigger Web Security Academy', state: 'ACTIVE' },
  { label: 'Web & Application Security', state: 'PRACTICING' },
  { label: 'TryHackMe — AI Security L1', state: 'CONTINUING' },
  { label: 'Prompt Engineering', state: 'PRACTICING' },
  { label: 'Vibe Coding workflows', state: 'BUILDING' },
  { label: 'Full-Stack Development', state: 'BUILDING' },
  { label: 'AI / GenAI', state: 'CONTINUING' },
  { label: 'Security Automation', state: 'BUILDING' },
] as const

export const currentFocus = [
  'Cybersecurity',
  'AI Security',
  'Full-Stack Development',
  'Prompt Engineering',
  'Vibe Coding',
  'GenAI',
  'Security Automation',
  'Application Security',
] as const
