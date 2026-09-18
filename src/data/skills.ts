/**
 * SKILLS and TOOLS are deliberately separate structures — a skill is a thing
 * I can do, a tool is a thing I operate. Each entry carries a short glyph used
 * by the card grid, so the section reads as a system rather than a word list.
 */

export type Energy = 'cyber' | 'ai' | 'safe' | 'prompt' | 'warn'

export interface SkillItem {
  name: string
  glyph: string
  /** Where this skill was actually used. */
  applied: string
}

export interface SkillGroup {
  id: string
  index: string
  title: string
  kicker: string
  energy: Energy
  /** lucide-react icon name resolved in the component. */
  icon: 'Code2' | 'Layers' | 'BrainCircuit' | 'Database' | 'Binary' | 'ShieldHalf'
  items: SkillItem[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'programming',
    index: '01',
    title: 'Programming',
    kicker: 'The languages I actually write',
    energy: 'safe',
    icon: 'Code2',
    items: [
      { name: 'Python', glyph: 'PY', applied: 'ShadowPortX · OmniAI Cloud · automation' },
      { name: 'C', glyph: 'C', applied: 'DSA fundamentals' },
      { name: 'JavaScript', glyph: 'JS', applied: 'Web development · security labs' },
      { name: 'HTML', glyph: '<>', applied: 'Trained 50+ students' },
      { name: 'CSS', glyph: '#', applied: 'Trained 50+ students' },
      { name: 'PHP', glyph: 'PHP', applied: 'Secure vs. insecure lab builds' },
      { name: 'SQL', glyph: 'SQL', applied: 'Queries, injection testing, remediation' },
    ],
  },
  {
    id: 'development',
    index: '02',
    title: 'Development',
    kicker: 'Frameworks I build services with',
    energy: 'safe',
    icon: 'Layers',
    items: [
      { name: 'Django', glyph: 'DJ', applied: 'Python web development' },
      { name: 'Flask', glyph: 'FL', applied: 'Lightweight AI service endpoints' },
      { name: 'FastAPI', glyph: 'API', applied: 'OmniAI Cloud backend' },
      { name: 'Streamlit', glyph: 'ST', applied: 'OmniAI Cloud frontend' },
      { name: 'React', glyph: 'RE', applied: 'Frontend interfaces' },
      { name: 'Node.js', glyph: 'ND', applied: 'JavaScript runtime work' },
      { name: 'PyQt6', glyph: 'QT', applied: 'ShadowPortX desktop GUI' },
      { name: 'REST APIs', glyph: 'RST', applied: 'Design, consumption and security testing' },
    ],
  },
  {
    id: 'aiml',
    index: '03',
    title: 'AI / ML',
    kicker: 'From classical models to generative systems',
    energy: 'ai',
    icon: 'BrainCircuit',
    items: [
      { name: 'Machine Learning', glyph: 'ML', applied: 'Classification and evaluation' },
      { name: 'Deep Learning', glyph: 'DL', applied: 'CNN / RNN architectures' },
      { name: 'PyTorch', glyph: 'PT', applied: 'OmniAI Cloud model execution' },
      { name: 'YOLO', glyph: 'YLO', applied: 'v8 orange detection · v11 detection' },
      { name: 'ResNet', glyph: 'RES', applied: 'Species-level label correction' },
      { name: 'BLIP', glyph: 'BLP', applied: 'Image captioning' },
      { name: 'Hugging Face', glyph: 'HF', applied: 'Transformers and VQA' },
      { name: 'NLP', glyph: 'NLP', applied: 'Legal Contract Analyzer' },
      { name: 'LLMs', glyph: 'LLM', applied: 'Prompt and workflow design' },
      { name: 'Generative AI', glyph: 'GEN', applied: 'Huebits Tech internship' },
      { name: 'Prompt Engineering', glyph: 'PE', applied: 'Daily development workflow' },
      { name: 'RAG', glyph: 'RAG', applied: 'Retrieval-augmented experiments' },
      { name: 'Multimodal AI', glyph: 'MM', applied: 'OmniAI Cloud routing' },
      { name: 'Explainable AI', glyph: 'XAI', applied: 'OmniAI explainability layer' },
    ],
  },
  {
    id: 'databases',
    index: '04',
    title: 'Databases',
    kicker: 'Where the data lives',
    energy: 'safe',
    icon: 'Database',
    items: [
      { name: 'MySQL', glyph: 'SQL', applied: 'Lab environments and web apps' },
      { name: 'MongoDB', glyph: 'MDB', applied: 'Document storage' },
      { name: 'phpMyAdmin', glyph: 'PMA', applied: 'XAMPP lab administration' },
    ],
  },
  {
    id: 'cs',
    index: '05',
    title: 'Computer Science',
    kicker: 'The fundamentals underneath all of it',
    energy: 'warn',
    icon: 'Binary',
    items: [
      { name: 'Data Structures & Algorithms', glyph: 'DSA', applied: 'Python and C — self-authored class notes' },
      { name: 'Object-Oriented Programming', glyph: 'OOP', applied: 'Application architecture' },
    ],
  },
  {
    id: 'security-skills',
    index: '06',
    title: 'Security Practice',
    kicker: 'Applied, not theoretical',
    energy: 'cyber',
    icon: 'ShieldHalf',
    items: [
      { name: 'VAPT', glyph: 'VPT', applied: 'Supraja Technologies · client testing' },
      { name: 'Web App Penetration Testing', glyph: 'WEB', applied: 'Authorised client engagements' },
      { name: 'OWASP Top 10', glyph: 'O10', applied: 'Testing and remediation guidance' },
      { name: 'Secure Code Review', glyph: 'SCR', applied: 'Secure vs. insecure training labs' },
      { name: 'Log Analysis', glyph: 'LOG', applied: 'Splunk and Sentinel' },
      { name: 'Threat Hunting', glyph: 'HNT', applied: 'CyberGuide SOC L2/L3' },
      { name: 'Digital Forensics', glyph: 'DFR', applied: 'Amroha Police internship' },
      { name: 'Detection Engineering', glyph: 'DET', applied: 'Log-Based IDS/IPS' },
    ],
  },
]

export interface ToolItem {
  name: string
  glyph: string
  energy: Energy
  category: string
}

export const tools: ToolItem[] = [
  { name: 'Burp Suite', glyph: 'BP', energy: 'cyber', category: 'Web Security' },
  { name: 'PortSwigger Academy', glyph: 'PS', energy: 'cyber', category: 'Web Security' },
  { name: 'Nmap', glyph: 'NM', energy: 'cyber', category: 'Recon' },
  { name: 'ZenMap', glyph: 'ZM', energy: 'cyber', category: 'Recon' },
  { name: 'Maltego', glyph: 'MG', energy: 'cyber', category: 'OSINT' },
  { name: 'Shodan', glyph: 'SH', energy: 'cyber', category: 'OSINT' },
  { name: 'Metasploit', glyph: 'MS', energy: 'cyber', category: 'Exploitation' },
  { name: 'Wireshark', glyph: 'WS', energy: 'cyber', category: 'Network Analysis' },
  { name: 'tcpdump', glyph: 'TD', energy: 'cyber', category: 'Network Analysis' },
  { name: 'Nessus', glyph: 'NS', energy: 'cyber', category: 'Vulnerability Scanning' },
  { name: 'Acunetix', glyph: 'AC', energy: 'cyber', category: 'Vulnerability Scanning' },
  { name: 'Kali Linux', glyph: 'KL', energy: 'cyber', category: 'Platform' },
  { name: 'DVWA', glyph: 'DV', energy: 'cyber', category: 'Lab Target' },
  { name: 'Mutillidae', glyph: 'MU', energy: 'cyber', category: 'Lab Target' },
  { name: 'Metasploitable 2', glyph: 'M2', energy: 'cyber', category: 'Lab Target' },

  { name: 'Splunk', glyph: 'SP', energy: 'safe', category: 'SIEM' },
  { name: 'Microsoft Sentinel', glyph: 'MST', energy: 'safe', category: 'SIEM' },
  { name: 'Wazuh', glyph: 'WZ', energy: 'safe', category: 'SOC' },
  { name: 'Snort', glyph: 'SN', energy: 'safe', category: 'IDS' },
  { name: 'Sysmon', glyph: 'SY', energy: 'safe', category: 'Endpoint' },
  { name: 'YARA', glyph: 'YR', energy: 'safe', category: 'Threat Intel' },
  { name: 'LOKI', glyph: 'LK', energy: 'safe', category: 'Threat Intel' },
  { name: 'MISP', glyph: 'MI', energy: 'safe', category: 'Threat Intel' },
  { name: 'Qualys', glyph: 'QY', energy: 'safe', category: 'Vulnerability Mgmt' },

  { name: 'Autopsy', glyph: 'AU', energy: 'warn', category: 'Forensics' },
  { name: 'FTK Imager', glyph: 'FTK', energy: 'warn', category: 'Forensics' },
  { name: 'Cellebrite', glyph: 'CB', energy: 'warn', category: 'Mobile Forensics' },
  { name: 'Oxygen Forensics', glyph: 'OX', energy: 'warn', category: 'Mobile Forensics' },
  { name: 'CyberChef', glyph: 'CC', energy: 'warn', category: 'Analysis' },
  { name: 'VirusTotal', glyph: 'VT', energy: 'warn', category: 'Analysis' },

  { name: 'PyTorch', glyph: 'PT', energy: 'ai', category: 'AI Framework' },
  { name: 'Hugging Face', glyph: 'HF', energy: 'ai', category: 'AI Framework' },
  { name: 'Ultralytics YOLO', glyph: 'YL', energy: 'ai', category: 'Computer Vision' },
  { name: 'OpenCV', glyph: 'CV', energy: 'ai', category: 'Computer Vision' },
  { name: 'PaddleOCR', glyph: 'POC', energy: 'ai', category: 'OCR' },
  { name: 'EasyOCR', glyph: 'EOC', energy: 'ai', category: 'OCR' },
  { name: 'spaCy', glyph: 'SC', energy: 'ai', category: 'NLP' },
  { name: 'Power BI', glyph: 'PBI', energy: 'ai', category: 'Analytics' },

  { name: 'Git / GitHub', glyph: 'GIT', energy: 'prompt', category: 'Engineering' },
  { name: 'VS Code', glyph: 'VS', energy: 'prompt', category: 'Engineering' },
  { name: 'XAMPP', glyph: 'XP', energy: 'prompt', category: 'Engineering' },
  { name: 'Docker', glyph: 'DK', energy: 'prompt', category: 'Engineering' },
  { name: 'VirtualBox / VMware', glyph: 'VM', energy: 'prompt', category: 'Virtualisation' },
  { name: 'Microsoft Azure', glyph: 'AZ', energy: 'prompt', category: 'Cloud' },
  { name: 'Oracle Cloud', glyph: 'OCI', energy: 'prompt', category: 'Cloud' },
  { name: 'PowerShell', glyph: 'PWS', energy: 'prompt', category: 'Scripting' },
  { name: 'Postman', glyph: 'PM', energy: 'prompt', category: 'API Testing' },
  { name: 'Canva', glyph: 'CV2', energy: 'prompt', category: 'Design' },
]

export const toolCategories = [
  { id: 'all', label: 'All' },
  { id: 'cyber', label: 'Offensive' },
  { id: 'safe', label: 'Defensive' },
  { id: 'warn', label: 'Forensics' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'prompt', label: 'Engineering' },
] as const
