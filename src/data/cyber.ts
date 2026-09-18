/**
 * The cybersecurity universe — organised into domains rather than one
 * undifferentiated skill list. Everything below was covered hands-on in the
 * Supraja, Skills Uprise, CyberGuide and Amroha Police programmes.
 */

export interface Domain {
  id: string
  index: string
  title: string
  summary: string
  items: string[]
}

export const cyberDomains: Domain[] = [
  {
    id: 'network',
    index: '01',
    title: 'Network Security',
    summary: 'The layer everything else sits on — addressing, models, devices and topologies.',
    items: [
      'IPv4 / IPv6',
      'Public & Private IP',
      'OSI Model',
      'TCP/IP Model',
      'TCP / UDP',
      'Network Devices',
      'Network Topologies',
      'Ports & Port Numbers',
      'DNS',
      'SSL / TLS',
      'Demilitarized Zone',
    ],
  },
  {
    id: 'recon',
    index: '02',
    title: 'Reconnaissance',
    summary: 'Mapping the target before touching it — the phase that decides everything after.',
    items: [
      'Nmap',
      'ZenMap',
      'Advanced IP Scanner',
      'Angry IP Scanner',
      'WHOIS',
      'DNS Enumeration',
      'OSINT',
      'Maltego',
      'Shodan',
      'Google Dorking',
      'Wayback Machine',
      'Wappalyzer',
      'HTTrack',
    ],
  },
  {
    id: 'web',
    index: '03',
    title: 'Web & Application Security',
    summary: 'Where most of my offensive work happens — authorised targets and lab environments only.',
    items: [
      'Burp Suite',
      'PortSwigger Labs',
      'OWASP Top 10',
      'VAPT',
      'API Testing',
      'SQL Injection',
      'XSS',
      'HTML Injection',
      'iFrame Injection',
      'Local File Inclusion',
      'Authentication Security',
      'Access Control',
      'DVWA / Mutillidae',
      'Nessus / Acunetix',
    ],
  },
  {
    id: 'soc',
    index: '04',
    title: 'SOC & Detection',
    summary: 'The defensive half — turning raw telemetry into an alert an analyst can act on.',
    items: [
      'Splunk',
      'Wazuh',
      'Microsoft Sentinel',
      'SIEM',
      'KQL',
      'Log Analysis',
      'Detection Engineering',
      'Incident Analysis',
      'Analytics & NRT Rules',
      'Playbooks / Workbooks',
      'Watchlists',
      'UEBA',
    ],
  },
  {
    id: 'dfir',
    index: '05',
    title: 'Digital Forensics',
    summary: 'Acquisition, artifacts and the discipline of handling evidence correctly.',
    items: [
      'Autopsy',
      'FTK Imager',
      'Cellebrite',
      'Oxygen Forensics',
      'Memory Acquisition',
      'Windows Artifacts',
      'Event Logs',
      'Registry',
      'Prefetch',
      'LNK Files',
      'Program Execution Artifacts',
      'Chain of Custody',
      'Order of Volatility',
    ],
  },
  {
    id: 'malware',
    index: '06',
    title: 'Malware & Endpoint',
    summary: 'What persistence looks like on a real Windows host.',
    items: [
      'Windows Processes',
      'Autoruns',
      'Scheduled Tasks',
      'Windows Services',
      'Sysmon',
      'Sysmon Events',
      'Malware Fundamentals',
      'IOC Analysis',
      'Endpoint Security',
      'Snort',
    ],
  },
  {
    id: 'threatintel',
    index: '07',
    title: 'Threat Intelligence',
    summary: 'Knowing what to hunt for before the alert fires.',
    items: [
      'MISP',
      'YARA',
      'YARA Rules',
      'LOKI',
      'IOC Analysis',
      'Threat Hunting',
      'Cyber Kill Chain',
      'CTI Dashboards',
      'TI Ingestion',
    ],
  },
  {
    id: 'cloudsec',
    index: '08',
    title: 'Cloud & AI Security',
    summary: 'Where the two halves of my profile meet — and the direction I am heading.',
    items: [
      'Microsoft Sentinel',
      'Data Connectors',
      'Threat Intelligence Ingestion',
      'Qualys',
      'Oracle Cloud Infrastructure',
      'Microsoft Azure',
      'LLM Security',
      'Prompt Injection',
      'AI-Assisted Phishing Analysis',
      'Security Automation',
    ],
  },
]

/** The AI × Security crossover — the specialisation the whole portfolio points at. */
export const aiSecurity = {
  left: {
    title: 'Cybersecurity',
    items: ['VAPT', 'Application Security', 'SOC & SIEM', 'Threat Intelligence', 'Digital Forensics'],
  },
  right: {
    title: 'Artificial Intelligence',
    items: ['LLMs & GenAI', 'Computer Vision', 'NLP', 'Model Routing', 'Explainability'],
  },
  centre: {
    title: 'AI SECURITY',
    items: [
      'AI-assisted threat detection',
      'Security automation',
      'LLM security',
      'Prompt security',
      'AI phishing analysis',
      'Threat intelligence automation',
      'Security analytics',
      'AI-powered SOC',
      'Adversarial thinking',
      'Explainable security',
    ],
  },
} as const

/** SOC Command Center — a portfolio simulation, not live monitoring. */
export const socEvents = [
  { severity: 'info', label: 'AUTHENTICATION EVENT', detail: 'Successful login · lab account · source 10.0.0.14' },
  { severity: 'warn', label: 'SUSPICIOUS REQUEST', detail: "Encoded payload in query parameter · /search?q=" },
  { severity: 'high', label: 'IOC DETECTED', detail: 'Hash match against MISP feed · quarantined in lab' },
  { severity: 'warn', label: 'UNUSUAL NETWORK ACTIVITY', detail: 'Outbound beacon pattern · 60s interval' },
  { severity: 'high', label: 'POTENTIAL PHISHING INDICATOR', detail: 'SPF failure + display-name mismatch' },
  { severity: 'ok', label: 'MODEL ANALYSIS COMPLETE', detail: 'Classifier returned verdict · confidence logged' },
  { severity: 'info', label: 'ENDPOINT CHECK-IN', detail: 'Sysmon telemetry received · 4 hosts reporting' },
  { severity: 'warn', label: 'BRUTE FORCE PATTERN', detail: '18 failed auth attempts in 40s · lab target' },
  { severity: 'ok', label: 'DETECTION RULE DEPLOYED', detail: 'Scheduled analytics rule enabled in Sentinel' },
  { severity: 'high', label: 'SQL INJECTION ATTEMPT', detail: "UNION SELECT signature · DVWA lab instance" },
] as const

export const socPanels = [
  { id: 'threat', label: 'THREAT LEVEL' },
  { id: 'network', label: 'NETWORK ACTIVITY' },
  { id: 'detection', label: 'DETECTION ENGINE' },
  { id: 'ioc', label: 'IOC FEED' },
  { id: 'siem', label: 'SIEM' },
  { id: 'endpoint', label: 'ENDPOINT STATUS' },
  { id: 'ai', label: 'AI ANALYSIS' },
  { id: 'queue', label: 'ALERT QUEUE' },
] as const

/**
 * ALERT TRIAGE — the worked example shown in the cyber scene.
 *
 * These are the steps actually practised in the SOC with AI L2/L3 programme and
 * in the DVWA / Mutillidae lab dashboards, written against one alert so the
 * reasoning is visible. It is a lab alert, not a live environment.
 */
export const triageExample = {
  alert: {
    severity: 'high',
    label: 'SQL INJECTION ATTEMPT',
    detail: "UNION SELECT signature in a query parameter · DVWA lab instance · source 10.0.0.14",
    source: 'Splunk · web access log',
  },
  steps: [
    {
      n: '01',
      action: 'Triage',
      question: 'Is this real, or is it noise?',
      work: 'Read the raw event, not the rule name. Check the full request, the response code and whether the payload could actually reach the database.',
      tool: 'Splunk · raw log',
    },
    {
      n: '02',
      action: 'Validate',
      question: 'Did it work?',
      work: 'A 200 with a long body after a UNION SELECT is a different incident from a 500 or a blocked request. Confirm against the application response and the database logs.',
      tool: 'Splunk · app + DB logs',
    },
    {
      n: '03',
      action: 'Scope',
      question: 'What else did this source touch?',
      work: 'Pivot on the source IP and the session across the whole window. One probe is noise; a sequence of probes across endpoints is an attacker working through a target.',
      tool: 'Sentinel · KQL pivot',
    },
    {
      n: '04',
      action: 'Correlate',
      question: 'Have we seen this before?',
      work: 'Check the indicators against the threat-intel feed and the hunting notes — known-bad source, known payload family, or something new.',
      tool: 'MISP · YARA · CTI',
    },
    {
      n: '05',
      action: 'Act',
      question: 'What stops it now?',
      work: 'Block or rate-limit the source, capture the evidence, and hand the developer the exact request with the fix — parameterised queries, not input filtering.',
      tool: 'Playbook · remediation note',
    },
    {
      n: '06',
      action: 'Document',
      question: 'What does the next analyst need?',
      work: 'Write the incident up so the next person can follow it without asking: timeline, evidence, decision, and the detection gap that let it through.',
      tool: 'Incident write-up',
    },
  ],
} as const
