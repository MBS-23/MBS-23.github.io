/**
 * Vibe coding — AI-assisted development as an accelerator, with engineering
 * judgment, testing and a security review still in the loop. Positioned
 * honestly as intermediate.
 */

export const vibeStatement =
  'I use AI-assisted development workflows to rapidly explore, prototype, iterate and build software products while still applying engineering, debugging, testing and security principles.'

export const vibeEquation = [
  'IDEA',
  'PROMPT',
  'ENGINEERING JUDGMENT',
  'TESTING',
  'SECURITY',
] as const

export const vibeLoop = [
  { id: 'idea', label: 'IDEA', note: 'The problem worth solving' },
  { id: 'prompt', label: 'PROMPT', note: 'Scoped, constrained, specific' },
  { id: 'agent', label: 'AI CODING AGENT', note: 'Generates a first implementation' },
  { id: 'code', label: 'GENERATED CODE', note: 'Read it — all of it' },
  { id: 'preview', label: 'LIVE PREVIEW', note: 'Run it, do not trust it' },
  { id: 'debug', label: 'DEBUG', note: 'Where the judgment actually happens' },
  { id: 'security', label: 'SECURITY REVIEW', note: 'Injection, auth, secrets, output handling' },
  { id: 'iterate', label: 'ITERATE', note: 'Rewrite the prompt with what you learned' },
  { id: 'product', label: 'PRODUCT', note: 'Shipped' },
] as const

/** The technical matrix — what each discipline contributes to each verb. */
export const matrixColumns = ['CYBERSECURITY', 'AI / ML', 'FULL-STACK', 'PROMPT ENG.', 'VIBE CODING'] as const

export const matrixRows: { verb: string; cells: string[] }[] = [
  {
    verb: 'BUILD',
    cells: ['Security tooling', 'Model pipelines', 'Web applications', 'Prompt systems', 'Fast prototypes'],
  },
  {
    verb: 'ANALYZE',
    cells: ['VAPT & logs', 'Model output', 'Request traces', 'Prompt results', 'Generated code'],
  },
  {
    verb: 'AUTOMATE',
    cells: ['Detection rules', 'Inference routing', 'Scripts & APIs', 'AI workflows', 'Scaffolding'],
  },
  {
    verb: 'SECURE',
    cells: ['OWASP Top 10', 'LLM security', 'Auth & input', 'Safe prompting', 'Security review'],
  },
  {
    verb: 'EXPERIMENT',
    cells: ['Lab exploits', 'Architectures', 'New stacks', 'Prompt variants', 'Rapid iteration'],
  },
  {
    verb: 'DEPLOY',
    cells: ['SOC dashboards', 'Azure services', 'XAMPP / cloud', 'Repeatable prompts', 'Working products'],
  },
  {
    verb: 'LEARN',
    cells: ['PortSwigger', 'Papers & models', 'Frameworks', 'Evaluation', 'Every build'],
  },
]

