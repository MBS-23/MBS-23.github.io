/**
 * Prompt engineering — positioned honestly as intermediate. The pipeline
 * below is the workflow; the demo transcript is a generic illustration of it,
 * not a claim about any specific production system.
 */

export const promptPipeline = [
  { id: 'intent', label: 'USER INTENT', note: 'What actually needs to exist at the end' },
  { id: 'prompt', label: 'PROMPT', note: 'The instruction, written to be unambiguous' },
  { id: 'context', label: 'CONTEXT', note: 'The material the model needs in front of it' },
  { id: 'constraints', label: 'CONSTRAINTS', note: 'Format, scope, and what must not happen' },
  { id: 'tools', label: 'TOOLS', note: 'What the model is allowed to reach for' },
  { id: 'model', label: 'MODEL', note: 'Execution' },
  { id: 'evaluation', label: 'EVALUATION', note: 'Did it answer the real question?' },
  { id: 'output', label: 'OUTPUT', note: 'The artefact' },
  { id: 'iteration', label: 'ITERATION', note: 'Rewrite the prompt, not just the answer' },
] as const

export const promptSkills = [
  'Prompt Design',
  'Context Engineering',
  'Instruction Design',
  'Role / System Prompt Design',
  'Structured Outputs',
  'Few-Shot Prompting',
  'Chain-of-Thought-Aware Task Design',
  'Tool-Oriented Workflows',
  'AI Workflow Design',
  'Prompt Evaluation',
  'Prompt Iteration',
  'AI-Assisted Coding',
  'AI Research Workflows',
  'Security-Aware Prompting',
  'LLM Application Design',
] as const

/** A generic demonstration of the workflow — illustrative, not a live model call. */
export const promptDemo = [
  { role: 'user', text: 'Build a secure web application.' },
  { role: 'system', text: 'Intent parsed. Security requirements detected. Constraints applied.' },
  { role: 'ai', text: 'Generating architecture…' },
  { role: 'step', text: 'PLAN — frontend, API, backend, database, auth boundary' },
  { role: 'step', text: 'CODE — scaffold with parameterised queries and validation' },
  { role: 'step', text: 'TEST — functional paths and negative cases' },
  { role: 'step', text: 'SECURITY REVIEW — OWASP Top 10 pass over the generated code' },
  { role: 'result', text: 'RESULT — reviewed, tested, ready to iterate' },
] as const
