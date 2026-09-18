/**
 * The AI/ML universe — the constellation of disciplines, the model stack,
 * and the mini-project history that came before the flagship work.
 */

export interface ConstellationNode {
  id: string
  label: string
  /** Angle on the constellation ring, degrees. */
  angle: number
  /** Ring radius as a fraction of the container. */
  ring: 1 | 2
  detail: string
  evidence: string
}

export const aiConstellation: ConstellationNode[] = [
  {
    id: 'ml',
    label: 'Machine Learning',
    angle: 270,
    ring: 1,
    detail: 'Classification, evaluation and model selection across supervised vision and text tasks.',
    evidence: 'AIMER Society · B.Tech AI & ML',
  },
  {
    id: 'dl',
    label: 'Deep Learning',
    angle: 342,
    ring: 1,
    detail: 'CNN and RNN architectures — ResNet, DenseNet, VGGNet — trained and compared in Colab.',
    evidence: 'AIMER Deep Learning internship',
  },
  {
    id: 'cv',
    label: 'Computer Vision',
    angle: 54,
    ring: 1,
    detail: 'Object detection and image classification with YOLOv8, YOLOv11, ResNet50 and OpenCV.',
    evidence: 'YOLOv8 orange detection · YOLOv11 detection',
  },
  {
    id: 'nlp',
    label: 'NLP',
    angle: 126,
    ring: 1,
    detail: 'Entity extraction, sentiment and summarisation with spaCy, DistilBERT and T5.',
    evidence: 'Legal Contract Analyzer · OmniAI Cloud',
  },
  {
    id: 'genai',
    label: 'Generative AI',
    angle: 198,
    ring: 1,
    detail: 'Applied GenAI across a production-style multi-modal platform and translation pipelines.',
    evidence: 'Huebits Tech GenAI internship',
  },
  {
    id: 'llm',
    label: 'LLMs',
    angle: 306,
    ring: 2,
    detail: 'Working with large language models through prompting, structured output and tool-oriented workflows.',
    evidence: 'Prompt engineering practice',
  },
  {
    id: 'multimodal',
    label: 'Multimodal AI',
    angle: 18,
    ring: 2,
    detail: 'Image, document and text routed through one system with a shared response contract.',
    evidence: 'OmniAI Cloud',
  },
  {
    id: 'xai',
    label: 'Explainable AI',
    angle: 90,
    ring: 2,
    detail: 'Reporting which models ran, why they were selected, and what corrections were applied.',
    evidence: 'OmniAI Cloud explainability layer',
  },
  {
    id: 'agents',
    label: 'AI Agents',
    angle: 162,
    ring: 2,
    detail: 'Routing agents that read input metadata and build a minimal execution plan.',
    evidence: 'OmniAI Cloud Auto-Selector',
  },
  {
    id: 'ocr',
    label: 'OCR & Documents',
    angle: 234,
    ring: 2,
    detail: 'PaddleOCR and EasyOCR over scanned pages, with PDF extraction and summarisation.',
    evidence: 'Document AI pipeline',
  },
]

export const aiStack = [
  'Python',
  'PyTorch',
  'Hugging Face Transformers',
  'YOLOv8 / YOLOv11',
  'ResNet50',
  'DenseNet',
  'VGGNet',
  'BLIP',
  'PaddleOCR',
  'EasyOCR',
  'NLLB-200',
  'FLAN-T5',
  'spaCy',
  'DistilBERT',
  'OpenCV',
  'LangDetect',
  'Power BI',
] as const

export interface EarlyWork {
  title: string
  kind: 'Internship project' | 'Academic mini-project' | 'Internship project series'
  year: string
  tech: string
  note: string
}

/** Earlier AI/ML work, honestly categorised. */
export const aiHistory: EarlyWork[] = [
  {
    title: 'Talking Parrot',
    kind: 'Internship project',
    year: '2024',
    tech: 'LLM · NLP · GenAI · OpenCV',
    note: 'A rule-driven conversational bot built during the AIMER Society × APSCHE programme.',
  },
  {
    title: 'Telegram Weather Bot',
    kind: 'Internship project',
    year: '2024',
    tech: 'Python · Weather API',
    note: 'API integration and bot command handling.',
  },
  {
    title: 'Visual Question Answering',
    kind: 'Internship project',
    year: '2024',
    tech: 'Hugging Face',
    note: 'Vision-language model answering questions about an uploaded image.',
  },
  {
    title: 'Power BI Data Visualisation',
    kind: 'Internship project',
    year: '2024',
    tech: 'Power BI',
    note: 'Classification and a dashboard-style visualisation model.',
  },
  {
    title: 'YOLOv8 Orange Detection',
    kind: 'Internship project',
    year: '2024',
    tech: 'YOLOv8 · Ultralytics',
    note: 'Clean single-class object detection as the first computer-vision build.',
  },
  {
    title: 'YOLOv11 Object Detection',
    kind: 'Internship project',
    year: '2025',
    tech: 'YOLOv11',
    note: 'Follow-on detection use case during the AIMER deep-learning internship.',
  },
  {
    title: 'Voice-to-Voice & Text-to-Voice Translation',
    kind: 'Academic mini-project',
    year: '2025',
    tech: 'GenAI · Speech',
    note: 'GenAI translation experiments built and demoed in college.',
  },
  {
    title: 'Image Classification — ResNet / DenseNet / VGG / CNN / RNN',
    kind: 'Academic mini-project',
    year: '2025',
    tech: 'PyTorch · Google Colab · ngrok',
    note: 'Architecture comparison including fruit classification, demoed over ngrok tunnels.',
  },
]
