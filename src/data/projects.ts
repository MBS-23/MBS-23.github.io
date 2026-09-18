import { socials } from './profile'

/**
 * COMPLETED work only. Anything still being built lives in currentProjects.ts —
 * the two are never mixed, so nothing planned is ever shown as finished.
 */

export type ProjectStatus = 'COMPLETED' | 'COMPLETED / ACADEMIC' | 'COMPLETED / PROTOTYPE'

export interface Project {
  id: string
  number: string
  title: string
  subtitle: string
  category: string
  status: ProjectStatus
  role: string
  /** Energy token key used for the card accent. */
  energy: 'cyber' | 'ai' | 'safe' | 'warn'
  description: string
  problem: string
  solution: string
  architecture: string[]
  technologies: string[]
  features: string[]
  results?: { value: string; label: string }[]
  security?: string
  testing?: string
  limitations?: string
  futureWork?: string
  /** The engineering lesson, in the builder's own words. */
  learned: string
  origin: string
  github: string | null
  live: string | null
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'omniai',
    number: '01',
    title: 'OmniAI Cloud',
    subtitle:
      'An Intelligent Unified Multi-Modal AI System with Automatic Model Selection and Explainability using Generative AI',
    category: 'Multimodal AI',
    status: 'COMPLETED / ACADEMIC',
    role: 'Final-year project · team of four · campus internship with Huebits Tech',
    energy: 'ai',
    description:
      'A unified multi-modal AI system that intelligently processes images, documents and text through an automated agent that selects and routes each input to the most appropriate models — then explains the decision.',
    problem:
      'Specialised pretrained models keep improving, but building an end-to-end system means deciding which models to run for each input, combining their outputs, and living with cold-start latency and opaque decisions.',
    solution:
      'A three-tier system: a Streamlit UI, a FastAPI gateway, and an Auto-Selector agent that reads file magic bytes and metadata to build a minimal execution plan across nine specialised modules — with an explainability layer on top of every response.',
    architecture: [
      'USER INPUT — image · document · text',
      'INPUT ANALYSIS — magic bytes, metadata, classification',
      'AUTO-SELECTOR — conditional model selection',
      'MODEL ROUTING — vision · OCR · NLP · document pipelines',
      'MODEL EXECUTION — nine pretrained modules',
      'FUSION — generic label correction',
      'EXPLAINABILITY — why each model was selected',
      'RESULT — JSON response with metadata',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'Streamlit',
      'PyTorch',
      'ResNet50',
      'YOLOv8n / YOLOv8x',
      'BLIP',
      'PaddleOCR',
      'EasyOCR',
      'LangDetect',
      'NLLB-200',
      'spaCy',
      'DistilBERT',
      'FLAN-T5',
      'Microsoft Azure',
    ],
    features: [
      'Automatic input classification from file magic bytes and metadata',
      'Conditional model routing — only the required models execute',
      'Generic label correction: ResNet50 overrides coarse COCO labels from YOLO',
      'Multi-language support with automatic detection and translation',
      'Document intelligence — PDF extraction, OCR fallback, summarisation',
      'Explainability engine reporting selected modules and correction reasons',
      'Startup pre-initialisation of heavy models to remove cold-start latency',
    ],
    results: [
      { value: '95%', label: 'Animal species detection accuracy, against a 68–85% single-model baseline' },
      { value: '86s → 1.8s', label: 'First-request latency after startup pre-initialisation' },
      { value: '−76%', label: 'Unnecessary model execution removed by intelligent routing' },
    ],
    testing:
      'Evaluated on curated multi-modal datasets — 100 wildlife images across 30+ species, 50 text and scanned PDFs, and 200 multilingual text samples — against YOLOv8n, YOLOv8x, ResNet50 and a voting-ensemble baseline.',
    limitations:
      'Depends on publicly available pretrained models with no fine-tuning; large models demand memory; OCR remains sensitive to low-quality scans; modalities are currently limited to image, text and PDF.',
    futureWork:
      'Video and audio modalities, self-improving routing, domain fine-tuning, and lightweight models for constrained deployment.',
    learned:
      'Accuracy is a routing problem before it is a model problem. Running every model is the expensive way to be right — reading the input first, then executing only what that input needs, was worth more than any single model upgrade. And a system that cannot explain why it chose a model is a system nobody trusts.',
    origin:
      'Built as a four-person final-year project alongside a campus internship with Huebits Tech Pvt. Ltd., and published at the International Conference on Cyber and AI Security (MITS Madanapalle × IIIC × IEEE).',
    github: socials.github,
    live: null,
    featured: true,
  },
  {
    id: 'shadowportx',
    number: '02',
    title: 'ShadowPortX',
    subtitle: 'Offensive & Defensive Port Scanner',
    category: 'Offensive Security',
    status: 'COMPLETED',
    role: 'Sole developer · Supraja Technologies internship project',
    energy: 'cyber',
    description:
      'A Python-based advanced port scanner and reconnaissance tool that gives a consolidated view of open ports, services, versions and DNS/WHOIS intelligence behind a modern PyQt6 interface.',
    problem:
      'Most scanners are command-line first, which makes them inaccessible to beginners. GUI alternatives like Zenmap are dated and leave you switching tools for WHOIS and DNS, and output arrives as plain text or XML that still needs formatting.',
    solution:
      'One tabbed desktop application combining scanning, domain intelligence and reporting — with a multithreaded engine for speed and one-click export in three formats.',
    architecture: [
      'TARGET — hostname or IP, validated',
      'RECONNAISSANCE — DNS resolution and WHOIS lookup',
      'PORT SCANNING — TCP · UDP · Stealth (SYN)',
      'SERVICE DETECTION — version identification',
      'INTELLIGENCE — consolidated view in one tab',
      'REPORT — PDF · CSV · JSON, timestamped and saved',
    ],
    technologies: ['Python', 'PyQt6', 'socket', 'whois', 'Threading', 'ReportLab', 'PyInstaller'],
    features: [
      'TCP, UDP, Stealth (SYN) and Version scan modes',
      'Integrated WHOIS and DNS intelligence — registration, records, name servers',
      'Multithreaded scanning engine with configurable timeout',
      'One-click export to PDF, CSV and JSON',
      'In-app report viewer with filtering and preview',
      'Tabbed interface: Dashboard, Intelligence, Settings, Reports, Project Info',
      'Theme support via .qss stylesheets, packaged as a standalone Windows executable',
    ],
    results: [
      { value: '4', label: 'Scan modes — TCP, UDP, Stealth/SYN, Version' },
      { value: '3', label: 'One-click report formats' },
    ],
    security:
      'Designed for educational use and authorised security testing only. Every demonstration runs against lab environments or targets with explicit permission.',
    limitations:
      'Desktop-only, single-target workflow with no persistent findings database — which is exactly what ShadowPortX 2.0 addresses.',
    futureWork: 'Auto-update, splash screen and animated loaders were designed for; the full rebuild is ShadowPortX 2.0.',
    learned:
      'A scanner is only useful if the output is usable. Most of the real work was not the sockets — it was threading, timeouts, and turning raw results into a report somebody can hand to a client.',
    origin: 'Built during the Supraja Technologies Web Application VAPT internship.',
    github: socials.github,
    live: null,
    featured: true,
  },
  {
    id: 'idsips',
    number: '03',
    title: 'Log-Based IDS / IPS Prevention System',
    subtitle: 'Detection and response from log telemetry',
    category: 'Defensive Security',
    status: 'COMPLETED / PROTOTYPE',
    role: 'Sole developer · Supraja Advanced Application Security internship project',
    energy: 'safe',
    description:
      'A log-analysis intrusion detection and prevention workflow: ingest logs, normalise them, run detection rules, score the risk and raise an alert an analyst can act on.',
    problem:
      'A dashboard that only displays events is not a defence. The gap is between seeing an event and doing something about it.',
    solution:
      'A pipeline that treats detection and response as one workflow — a rule match produces an action, not just a chart.',
    architecture: [
      'LOG — ingestion from application and system sources',
      'NORMALIZATION — common event shape',
      'DETECTION — signature and pattern rules',
      'THREAT ANALYSIS — risk scoring',
      'ALERT — real-time notification',
      'RESPONSE — prevention action',
    ],
    technologies: ['Python', 'Splunk', 'SIEM correlation', 'Log parsing', 'Alerting'],
    features: [
      'Real-time log ingestion and normalisation',
      'Detection rules across SQL injection, XSS, brute force, IDOR and credential-stuffing patterns',
      'Risk scoring per detection',
      'Real-time alerting',
      'IOC intelligence correlation',
    ],
    security: 'Built and exercised entirely in a lab environment.',
    learned:
      'Detection without response is just logging. Writing the rules taught me that the hard part is not matching a pattern, it is deciding what is worth waking someone up for.',
    origin: 'Built during the Supraja Technologies Advanced Application Security internship.',
    github: null,
    live: null,
    featured: false,
  },
  {
    id: 'legal',
    number: '04',
    title: 'Legal Contract Analyzer',
    subtitle: 'Document intelligence for contract review',
    category: 'AI / NLP',
    status: 'COMPLETED',
    role: 'Sole developer · Cothon Solutions internship project',
    energy: 'ai',
    description:
      'An AI/ML tool that reads legal contracts and extracts the clauses that matter, so a reviewer starts from a shortlist rather than page one.',
    problem:
      'Contract review is slow and repetitive, and the clauses that carry risk are scattered through documents that all look the same.',
    solution:
      'A pipeline that ingests PDF and DOCX contracts, segments them, and surfaces key clauses and entities for review.',
    architecture: [
      'DOCUMENT — PDF or DOCX ingestion',
      'EXTRACTION — text and structure parsing',
      'NLP ENGINE — entity and clause recognition',
      'HIGHLIGHTS — key clauses surfaced',
      'REVIEW — analyst-ready output',
    ],
    technologies: ['Python', 'spaCy', 'Hugging Face', 'Legal-BERT', 'CUAD', 'pdfplumber', 'docx2txt'],
    features: [
      'PDF and DOCX ingestion',
      'Clause segmentation and key-clause extraction',
      'Named entity recognition over legal text',
      'Built to the client project requirements',
    ],
    learned:
      'Document AI lives or dies on ingestion. Real contracts arrive as scans, as exports, with broken layouts — the model was never the bottleneck, the text extraction was.',
    origin: 'Built for the Cothon Solutions (AICTE-approved) AI/ML internship. A formal reference letter was issued on completion.',
    github: null,
    live: null,
    featured: false,
  },
  {
    id: 'soclabs',
    number: '05',
    title: 'SOC Dashboards & Security Labs',
    subtitle: 'A live teaching platform for 50+ students',
    category: 'Security Engineering · Training',
    status: 'COMPLETED',
    role: 'Built during the paid Skills Uprise Spectranox role',
    energy: 'safe',
    description:
      'Live SOC dashboards over DVWA and Mutillidae with real-time mail alerting, alongside 12+ purpose-built bug-hunting labs used to train a full cohort.',
    problem:
      'Students learn vulnerability names long before they understand what an attack looks like from the defender’s side.',
    solution:
      'Make the attack observable. A student exploits a lab, and the alert lands in an inbox seconds later — the offensive and defensive views of the same event, side by side.',
    architecture: [
      'LAB TARGET — DVWA · Mutillidae on XAMPP',
      'EXPLOIT — student action',
      'LOG CAPTURE — application and server logs',
      'DASHBOARD — live SOC view',
      'ALERT — real-time mail notification',
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'XAMPP', 'DVWA', 'Mutillidae', 'SMTP alerting'],
    features: [
      'Live SOC dashboards for DVWA and Mutillidae',
      'Real-time mail alerting with links',
      '12+ hands-on bug-hunting labs',
      'Secure vs. insecure implementations of the same feature, for teaching',
    ],
    results: [
      { value: '50+', label: 'Students trained in secure vs. insecure development' },
      { value: '12+', label: 'Security labs designed and shipped' },
    ],
    security: 'Educational lab environment. All targets are intentionally vulnerable training applications.',
    learned:
      'Teaching an attack forces you to understand it properly. Explaining why a payload works to 50 people exposes every gap in your own understanding, fast.',
    origin: 'Built during the paid Cybersecurity Analyst internship at Skills Uprise Spectranox Pvt Ltd.',
    github: null,
    live: null,
    featured: false,
  },
  {
    id: 'hardware',
    number: '06',
    title: 'Tower Triangulation & PICO Key',
    subtitle: 'Hardware-side security prototypes',
    category: 'Hardware & IoT',
    status: 'COMPLETED / PROTOTYPE',
    role: 'Team builds during the Skills Uprise Spectranox role',
    energy: 'warn',
    description:
      'Two prototypes: an ESP32-based tower triangulation rig with a real-time dashboard, and a Raspberry Pi Pico HID key that controls a laptop remotely.',
    problem:
      'Web-only security training never covers the physical access half of the threat model.',
    solution:
      'Build both sides — a positioning rig that streams live data, and an HID device that demonstrates what physical access to a port actually means.',
    architecture: [
      'ESP32 NODES — signal capture from a mobile device',
      'TRIANGULATION — position estimate',
      'DASHBOARD — real-time view',
      'PICO KEY — HID device, remote laptop control',
    ],
    technologies: ['ESP32', 'Raspberry Pi Pico', 'Python', 'HID', 'Real-time dashboard'],
    features: [
      'Multi-node ESP32 triangulation prototype',
      'Live position dashboard',
      'Pico-based HID key for remote device control',
    ],
    security: 'Prototypes built and demonstrated in a controlled training environment.',
    learned:
      'Physical access changes the whole threat model. Building an HID device that a laptop trusts by default made the “locked screen is enough” assumption impossible to keep.',
    origin: 'Team builds during the Skills Uprise Spectranox Pvt Ltd role.',
    github: null,
    live: null,
    featured: false,
  },
  {
    id: 'vision',
    number: '07',
    title: 'Computer Vision & Deep Learning Series',
    subtitle: 'YOLOv8, YOLOv11 and the architecture comparisons',
    category: 'Computer Vision',
    status: 'COMPLETED',
    role: 'Internship and academic mini-projects',
    energy: 'ai',
    description:
      'The computer-vision work that came before OmniAI Cloud: object detection with YOLOv8 and YOLOv11, plus classification across ResNet, DenseNet, VGGNet, CNN and RNN architectures.',
    problem: 'Understanding what each architecture is actually good at requires building with all of them.',
    solution:
      'A series of focused builds — one detection task per model family, compared on the same kind of problem.',
    architecture: [
      'DATASET — task-specific images',
      'MODEL — YOLOv8 / YOLOv11 / ResNet / DenseNet / VGG / CNN / RNN',
      'TRAINING — Google Colab',
      'DEMO — served over ngrok',
    ],
    technologies: ['Python', 'PyTorch', 'Ultralytics YOLO', 'OpenCV', 'Google Colab', 'ngrok'],
    features: [
      'YOLOv8 orange object detection',
      'YOLOv11 object detection use case',
      'Fruit classification across ResNet, DenseNet and VGGNet',
      'CNN and RNN comparison builds',
    ],
    learned:
      'Comparing architectures on the same task is how the trade-offs stop being theoretical — speed, accuracy and training cost pull against each other, and the right model depends on which one you can afford to lose.',
    origin: 'AIMER Society internships and academic mini-projects.',
    github: socials.github,
    live: null,
    featured: false,
  },
]

/** Research and publication. Only what the certificates support. */
export const research = {
  title: 'OmniAI Cloud: An Intelligent Unified Multi-Modal AI System with Automatic Model Selection and Explainability using Generative AI',
  venue: 'International Conference on Cyber and AI Security',
  hosts: 'MITS Madanapalle · IIIC · IEEE',
  status: 'Selected and published · certified',
  pipeline: ['RESEARCH', 'IMPLEMENTATION', 'EVALUATION', 'PAPER', 'PUBLICATION'],
  contribution:
    'A unified multi-modal AI system that automatically selects the appropriate AI model and provides explainable decision-making in a single deployable platform.',
  keywords: [
    'Multi-modal AI',
    'Model selection',
    'Explainable AI',
    'YOLOv8',
    'ResNet50',
    'BLIP',
    'PaddleOCR',
    'NLLB',
    'T5',
  ],
} as const
