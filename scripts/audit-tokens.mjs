/**
 * Tailwind silently drops a utility that references a colour token which does
 * not exist — so `text-void` on a white button rendered white-on-white and the
 * label was invisible. Nothing in the type system or the build catches that.
 *
 * This reads the real token list out of index.css `@theme` and fails if any
 * component uses a colour utility that resolves to nothing.
 *
 *     node scripts/audit-tokens.mjs
 */

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SRC = fileURLToPath(new URL('../src/', import.meta.url))

const css = readFileSync(join(SRC, 'index.css'), 'utf8')
const tokens = new Set([...css.matchAll(/--color-([a-z0-9-]+):/g)].map((m) => m[1]))

// Tailwind's own keywords and default palette, which need no token.
const BUILTIN = new Set([
  'white', 'black', 'transparent', 'current', 'inherit', 'none', 'auto',
  'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime',
  'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia',
  'pink', 'rose',
])

const PREFIXES = ['text', 'bg', 'border', 'fill', 'stroke', 'divide', 'ring', 'outline', 'from', 'via', 'to', 'decoration', 'shadow', 'accent', 'caret', 'placeholder']

const files = []
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (/\.tsx?$/.test(entry.name)) files.push(full)
  }
}
walk(SRC)

const problems = []

for (const file of files) {
  const source = readFileSync(file, 'utf8')
  const lines = source.split('\n')
  lines.forEach((line, i) => {
    // Only look inside className strings.
    for (const match of line.matchAll(/className="([^"]+)"/g)) {
      for (const raw of match[1].split(/\s+/)) {
        // strip variants (hover:, sm:, group-hover:, data-[…]:) and modifiers
        const cls = raw.split(':').pop() ?? ''
        const m = cls.match(/^-?([a-z]+)-([a-z][a-z0-9-]*)$/)
        if (!m) continue
        const [, prefix, name] = m
        if (!PREFIXES.includes(prefix)) continue
        const base = name.replace(/\/\d+$/, '')
        // a numbered palette shade (red-500) arrives here as "red-500"
        const root = base.split('-')[0]
        if (BUILTIN.has(root)) continue
        if (tokens.has(base)) continue
        // Layout words that share a prefix with colour utilities.
        // Words that share a prefix with colour utilities but are not colours:
        // border sides and widths, text sizes and alignment, shadow sizes…
        if (/^(t|b|l|r|s|e|x|y)(-\d+)?$/.test(base)) continue
        if (/^\d+$/.test(base)) continue
        if (
          /^(solid|dashed|dotted|double|hidden|none|left|right|center|start|end|justify|balance|pretty|wrap|nowrap|ellipsis|clip|inherit|top|bottom|collapse|separate|visible|inset|current|transparent|auto|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|base|spacing)$/.test(
            base,
          )
        )
          continue
        problems.push(`${file.replace(SRC, 'src/')}:${i + 1}  ${raw}  →  no --color-${base}`)
      }
    }
  })
}

console.log(`colour tokens defined : ${[...tokens].sort().join(', ')}`)
console.log(`files scanned         : ${files.length}`)

if (problems.length) {
  console.log(`\n${problems.length} DEAD COLOUR UTILITY(IES) — these render as no colour at all:`)
  for (const p of problems) console.log(`  ✗ ${p}`)
  process.exit(1)
}
console.log('\n✓ every colour utility resolves to a real token')
