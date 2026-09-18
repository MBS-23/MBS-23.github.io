/**
 * Experience, most recent first. Dates and claims follow the supplied
 * certificates, letters and first-hand accounts exactly.
 */

export type Track = 'security' | 'ai' | 'government' | 'training'

export interface Role {
  id: string
  org: string
  title: string
  period: string
  mode: string
  track: Track
  points: string[]
  /** Documented outcome — certificate, letter, selection. */
  proof?: string
}

export const experience: Role[] = [
  {
    id: 'skillsuprise',
    org: 'Skills Uprise Spectranox Pvt Ltd',
    title: 'Cybersecurity Analyst Intern',
    period: 'Feb 2026 — Aug 2026',
    mode: 'Paid internship · stipend from month 4',
    track: 'security',
    points: [
      'Performed authorised security testing on client web applications (client names withheld), reported the findings and worked with their development teams through remediation.',
      'Developed SOC dashboards for DVWA and Mutillidae, made them live, and wired real-time mail alerting.',
      'Trained 50+ students on secure and insecure website development — HTML, CSS, JavaScript, PHP, SQL, XAMPP — and why the vulnerabilities occur in the first place.',
      'Developed 12+ security bug-hunting labs for real-time practical learning.',
      'Built a tower-triangulation prototype using ESP32s and a mobile device with a real-time dashboard.',
      'Built the PICO Key as a team — a Pico-based device for remote laptop control.',
      'Handled customer and doubt support, and designed certificates for the programme.',
    ],
    proof: 'Selected after a résumé shortlist following the six-month CEH V13 specialisation.',
  },
  {
    id: 'cyberguide',
    org: 'CyberGuide Telugu',
    title: 'SOC with AI — L2 / L3',
    period: '22 Apr 2026 — 30 Jun 2026',
    mode: 'Training programme · CyberGuide Telugu — training, not employment',
    track: 'training',
    points: [
      'SIEM end-to-end: Splunk installation and walkthrough, Microsoft Sentinel deployment, data connectors, analytics rules, NRT rules, incident dashboards and KQL.',
      'Threat intelligence and hunting: cyber kill chain, YARA and YARA rules, LOKI, MISP threat sharing, CTI dashboards and UEBA in Sentinel.',
      'Endpoint and network analysis: Sysmon setup and events, Windows processes, registry, autoruns, scheduled tasks, Event Viewer, tcpdump, Wireshark, Snort.',
      'Digital forensics: order of volatility, chain of custody, FTK Imager acquisition, memory acquisition, Windows file and program-execution artifacts, LNK and prefetch files.',
      'Sentinel automation: playbooks, workbooks, watchlists, automation rules and automated email response. Plus PowerShell 101 and an introduction to Qualys.',
    ],
  },
  {
    id: 'amroha',
    org: 'Amroha Police (Government)',
    title: 'Cyber Security Police Internship',
    period: '11 — 21 Jun 2026 · 10 days',
    mode: 'Government internship · Amroha Police — separate from the SOC training',
    track: 'government',
    points: [
      'Cybercrime case work and the psychology behind cyber crime; OSINT in practice with Shodan, Google dorking, Epieos and breach data.',
      'Cyber laws, research paper writing and cybersecurity career guidance.',
      'Mobile security, malware analysis and DFIR using Autopsy, Cellebrite and Oxygen Forensics.',
      'SOC work with Wazuh; bug hunting for price tampering, IDOR and OTP bypass using Burp Suite.',
      'Blockchain, Web3 and crypto: MD5/SHA hashing, MetaMask, seed phrases, CyberChef, Base64, URL decoding and JWT decoding applied to real reported cases.',
      'Offensive security with AI, Android and iOS testing, subdomain enumeration, dark-web monitoring, Tor, SSL certificates and threat intelligence.',
    ],
  },
  {
    id: 'huebits',
    org: 'Huebits Tech Pvt. Ltd.',
    title: 'GenAI Intern',
    period: '01 Jan 2026 — 31 Mar 2026',
    mode: 'Campus internship',
    track: 'ai',
    points: [
      'Worked on OmniAI Cloud — an intelligent unified multi-modal AI system with automatic model selection and explainability using generative AI.',
      'FastAPI backend and Streamlit frontend, deployed on an Azure free trial during development.',
      'Auto-Selector routing agent across nine specialised pretrained model modules, plus the explainability layer.',
    ],
    proof: 'Certificate of Internship issued 17 April 2026.',
  },
  {
    id: 'supraja-advanced',
    org: 'Supraja Technologies',
    title: 'Advanced Cybersecurity — Application Security',
    period: '2025 — 2026',
    mode: 'Selected from the Level 1 programme',
    track: 'security',
    points: [
      'Advanced Burp Suite workflow and the PortSwigger Web Security Academy lab track.',
      'API security testing.',
      'Splunk-based SOC log analysis.',
      'Delivered the Log-Based IDS/IPS Prevention System as the internship project.',
    ],
  },
  {
    id: 'supraja-vapt',
    org: 'Supraja Technologies',
    title: 'Cybersecurity Intern — Web Application VAPT',
    period: '22 May 2025 — 22 Jul 2025',
    mode: 'Fully offline',
    track: 'security',
    points: [
      'Full offensive-security curriculum with practical exposure: hacking vs. ethical hacking phases, the cyber kill chain, networking, the OSI and TCP/IP models, topologies and ports.',
      'Reconnaissance and scanning with Nmap, ZenMap, Maltego, WHOIS, Wappalyzer, Advanced IP Scanner and Angry IP Scanner; enumeration across FTP, HTTP, SMTP, SNMP, SSH, SSL and Telnet.',
      'Deployed Kali Linux, Metasploitable 2, Windows 7 and Windows 10 in Oracle VirtualBox; backdoor exercises with msfconsole, meterpreter and msfvenom in the lab.',
      'Attacked DVWA and Metasploitable 2 across the OWASP Top 10 2021 — SQL injection, HTML and iframe injection, local file inclusion and payload handling.',
      'Phishing tooling, malware types, event and security log study, wiretapping concepts with Wireshark, DoS/DDoS concepts, CAPTCHA and load balancers, Nessus and Acunetix.',
      'Found a real-world broken-link-hijacking issue during OSINT exercises.',
      'Built ShadowPortX end-to-end and delivered it as the internship project.',
    ],
    proof: 'Letters of Recommendation for placement and for higher studies; selected for the advanced internship.',
  },
  {
    id: 'cothon',
    org: 'Cothon Solutions (AICTE-approved)',
    title: 'AI / ML Intern',
    period: '15 May 2025 — 16 Jul 2025',
    mode: 'Virtual',
    track: 'ai',
    points: [
      'Completed the Legal Contract Analyzer to the client project requirements.',
      'Delivered all assigned tasks and received a formal reference and completion letter.',
    ],
    proof: 'Reference letter issued by Cothon Solutions.',
  },
  {
    id: 'aimer-dl',
    org: 'AIMER Society',
    title: 'AI & Deep Learning Intern',
    period: 'From 15 May 2025',
    mode: 'Online',
    track: 'ai',
    points: [
      'Completed a YOLOv11 object-detection project with clean, consistent detection on a game-asset scenario.',
    ],
  },
  {
    id: 'aimer-apsche',
    org: 'AIMER Society × APSCHE',
    title: 'AI Intern — first internship',
    period: '14 May 2024 — 19 Jul 2024 · 120 hours',
    mode: '8-week training programme',
    track: 'ai',
    points: [
      'Talking Parrot — a rule-driven talking bot built with LLM, NLP, GenAI and OpenCV.',
      'Telegram bot using a weather API key.',
      'Visual Question Answering using a Hugging Face model.',
      'Data visualisation and classification model built in Power BI.',
      'YOLOv8 orange object detection.',
    ],
    proof: 'The entry point — and the reason the AI half of this profile exists.',
  },
]

/** The workshop that changed the trajectory. Called out separately. */
export const turningPoint = {
  title: 'Ethical Hacking & Cyber Security Workshop',
  org: 'Supraja Technologies',
  date: '21 — 23 October 2024',
  body:
    'Around 120 people attended. The top performers overall were selected into the company internship programme — I was one of them, and received a Certificate of Excellence for the level for active participation. Everything in the security half of this portfolio starts here.',
} as const

/** Knowledge transfer — the teaching side of the Skills Uprise role. */
export const trainer = {
  headline: '50+ STUDENTS',
  subject: 'Secure and insecure website development',
  stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL', 'XAMPP'],
  loop: ['TRAIN', 'EXPLAIN', 'DEMONSTRATE', 'DEBUG', 'GUIDE'],
  points: [
    'Taught both sides of the same code — how a feature is written insecurely, and what changes when it is written properly.',
    'Built 12+ bug-hunting labs so the class could exploit a bug before being told how to prevent it.',
    'Ran doubt support and customer support for the cohort throughout the programme.',
  ],
} as const
