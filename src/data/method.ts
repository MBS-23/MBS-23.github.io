/**
 * How the work actually gets done — the thinking loop, the delivery path, and
 * the communication half of the profile that matters for customer-facing
 * engineering roles.
 */

export const thinkingLoop = [
  { step: 'OBSERVE', note: 'What is actually in front of me, before assuming anything' },
  { step: 'UNDERSTAND', note: 'How the pieces relate, and which one carries the risk' },
  { step: 'BREAK DOWN', note: 'Split it until each part is something I can verify' },
  { step: 'BUILD', note: 'The smallest thing that proves the idea' },
  { step: 'TEST', note: 'Including the paths I would rather not think about' },
  { step: 'SECURE', note: 'Input, auth, output, storage, logging' },
  { step: 'IMPROVE', note: 'Rewrite what I now understand better' },
] as const

export const questions = {
  lazy: 'Does it work?',
  real: [
    'Why does it work?',
    'How can it fail?',
    'How can it scale?',
    'How can it be secured?',
    'How can it be improved?',
  ],
} as const

/** The delivery path — the same shape whether the request is a feature or a finding. */
export const deliveryPath = [
  'USER PROBLEM',
  'REQUIREMENTS',
  'ANALYSIS',
  'ARCHITECTURE',
  'IMPLEMENTATION',
  'TESTING',
  'SECURITY',
  'DEPLOYMENT',
  'ITERATION',
] as const

/**
 * Engineering + communication. This exists because the technical half of a
 * support, solutions or sales-engineering role is only half the job — and
 * teaching 50+ students is real evidence for the other half.
 */
export const communication = {
  lead:
    'Two years of security and AI work, and a paid role spent explaining both to a room of fifty students. The technical depth is the easy half to evidence — being able to explain it is the half that decides whether it lands.',
  columns: [
    {
      title: 'Troubleshooting',
      items: [
        'Root cause analysis',
        'Application debugging',
        'Log analysis',
        'System & application diagnostics',
        'Incident and ticket handling',
      ],
    },
    {
      title: 'Integration & data',
      items: [
        'REST APIs · Postman',
        'JSON · HTTP/HTTPS',
        'SQL · MySQL · MongoDB',
        'TCP/IP · DNS · ports',
        'API–database integration',
      ],
    },
    {
      title: 'Customer-facing',
      items: [
        'Technical communication',
        'Requirement gathering',
        'Product demonstration',
        'Technical documentation',
        'Training & knowledge transfer',
      ],
    },
  ],
} as const
