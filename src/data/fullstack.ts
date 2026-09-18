/**
 * The full-stack engine — the request path, and the security control that
 * belongs at each layer. This is where the development half of the profile
 * meets the security half.
 */

export interface StackLayer {
  id: string
  index: string
  title: string
  tech: string[]
  /** The security control that belongs at this layer. */
  control: string
  note: string
}

export const stackLayers: StackLayer[] = [
  {
    id: 'frontend',
    index: '01',
    title: 'Frontend',
    tech: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap'],
    control: 'Output encoding · CSP-aware rendering',
    note: 'The layer the user touches — and the layer where XSS lands if output is not encoded.',
  },
  {
    id: 'api',
    index: '02',
    title: 'API',
    tech: ['REST APIs', 'FastAPI', 'JSON', 'Postman'],
    control: 'Input validation · rate limiting',
    note: 'Every parameter is untrusted until it has been validated against an expected shape.',
  },
  {
    id: 'auth',
    index: '03',
    title: 'Authentication & Authorization',
    tech: ['Sessions', 'Tokens', 'Role checks'],
    control: 'Session security · access control',
    note: 'Authentication answers who you are. Authorization answers what you may touch — IDOR lives here.',
  },
  {
    id: 'backend',
    index: '04',
    title: 'Backend',
    tech: ['Python', 'Flask', 'Django', 'PHP', 'Node.js'],
    control: 'Secure coding · error handling',
    note: 'Business logic, and the place where a verbose stack trace becomes reconnaissance for an attacker.',
  },
  {
    id: 'database',
    index: '05',
    title: 'Database',
    tech: ['SQL', 'MySQL', 'MongoDB', 'phpMyAdmin'],
    control: 'Parameterised queries · least privilege',
    note: 'Concatenated SQL is the single most reliable way to lose a database.',
  },
  {
    id: 'deploy',
    index: '06',
    title: 'Deployment & Monitoring',
    tech: ['XAMPP / Apache', 'Azure', 'Git / GitHub', 'Docker'],
    control: 'Logging · alerting · secrets handling',
    note: 'If it is not logged, the incident never happened — and secrets never belong in the repository.',
  },
]

/** The secure-request walkthrough shown as an animated trace. */
export const secureRequestTrace = [
  { step: 'LOGIN', detail: 'Credentials submitted over TLS', check: 'Input validation' },
  { step: 'AUTHENTICATION', detail: 'Identity verified, session issued', check: 'Session security' },
  { step: 'AUTHORIZATION', detail: 'Role checked against requested resource', check: 'Access control' },
  { step: 'API', detail: 'Request shape validated, rate limit applied', check: 'Rate limiting' },
  { step: 'DATABASE', detail: 'Parameterised query executed', check: 'SQL safety' },
  { step: 'RESPONSE', detail: 'Data encoded before rendering', check: 'Output encoding' },
  { step: 'LOG', detail: 'Event written for the SOC pipeline', check: 'Logging' },
] as const
