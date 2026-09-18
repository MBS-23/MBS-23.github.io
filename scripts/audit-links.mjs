/**
 * Every route on this site is an anchor, so a typo is a dead link that no type
 * checker would catch. This walks the source and proves four things:
 *
 *   1. every navigateTo(...) / href="#..." target is a section that exists
 *   2. every scene in scenes.ts is rendered
 *   3. every rendered section id is reachable (scene list or in-page link)
 *   4. every external link is an absolute https URL opened safely
 *
 *     node scripts/audit-links.mjs
 */

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SRC = fileURLToPath(new URL('../src/', import.meta.url))

const files = []
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (/\.tsx?$/.test(entry.name)) files.push(full)
  }
}
walk(SRC)

const read = (f) => readFileSync(f, 'utf8')
const all = files.map((f) => ({ f, s: read(f) }))
const source = all.map((x) => x.s).join('\n')

const grabAll = (re, text = source) => [...text.matchAll(re)].map((m) => m[1])

/* ---- what exists ---- */
const renderedIds = new Set([
  ...grabAll(/<section[^>]*\sid="([a-z-]+)"/g),
  ...grabAll(/<Section\s+id="([a-z-]+)"/g),
  ...grabAll(/id=\{`project-\$\{([a-z.]+)\}`\}/g).length ? ['project-*'] : [],
])
// ids rendered through the <Section> primitive with a template or prop
for (const id of grabAll(/<Section[^>]*id="([a-z-]+)"/g)) renderedIds.add(id)
renderedIds.add('main')

const scenesFile = read(join(SRC, 'data', 'scenes.ts'))
const sceneIds = grabAll(/\{ id: '([a-z]+)'/g, scenesFile)
const allSectionIds = grabAll(/^\s*'([a-z]+)',$/gm, scenesFile.split('ALL_SECTION_IDS')[1] ?? '')
const sceneOfKeys = grabAll(/^\s*([a-z]+): '[a-z]+',$/gm, scenesFile.split('SCENE_OF')[1] ?? '')

/* ---- what is linked ---- */
const navTargets = new Set(grabAll(/navigateTo\('([a-z-]+)'\)/g))
const hashTargets = new Set(grabAll(/href="#([a-z-]+)"/g))
const terminalTargets = new Set(grabAll(/target: '([a-z-]+)'/g))

const problems = []
const note = (m) => problems.push(m)

const dynamicProjectAnchors = /href=\{`#project-\$\{/.test(source)

for (const t of [...navTargets, ...terminalTargets]) {
  if (!renderedIds.has(t)) note(`navigation target "${t}" is not rendered by any section`)
}
for (const t of hashTargets) {
  if (!renderedIds.has(t) && t !== 'main') note(`in-page link "#${t}" has no matching id`)
}
for (const id of sceneIds) {
  if (!renderedIds.has(id)) note(`scene "${id}" in scenes.ts is never rendered`)
}
for (const id of allSectionIds) {
  if (!renderedIds.has(id)) note(`ALL_SECTION_IDS lists "${id}" but nothing renders it`)
  if (!sceneOfKeys.includes(id)) note(`SCENE_OF has no entry for "${id}" — the indicator will stall`)
}
for (const id of renderedIds) {
  if (id === 'main' || id === 'project-*') continue
  if (!allSectionIds.includes(id) && !hashTargets.has(id)) {
    note(`section "${id}" is rendered but unreachable: not in ALL_SECTION_IDS and nothing links to it`)
  }
}

/* ---- external links ---- */
const externals = new Set([...source.matchAll(/https?:\/\/[^\s'"`)]+/g)].map((m) => m[0]))
for (const url of externals) {
  if (url.startsWith('http://')) note(`insecure external link: ${url}`)
}
const targetBlank = [...source.matchAll(/target="_blank"([\s\S]{0,160})/g)]
for (const [, after] of targetBlank) {
  if (!/rel="noreferrer noopener"|rel="noopener noreferrer"/.test(after)) {
    note('a target="_blank" link is missing rel="noreferrer noopener"')
  }
}

/* ---- report ---- */
console.log(`sections rendered : ${[...renderedIds].filter((i) => i !== 'project-*').sort().join(', ')}`)
console.log(`scenes            : ${sceneIds.length}`)
console.log(`nav targets       : ${[...navTargets].sort().join(', ')}`)
console.log(`project anchors   : ${dynamicProjectAnchors ? 'dynamic #project-<id> (generated from the same list)' : 'none'}`)
console.log(`external links    : ${[...externals].sort().join('\n                    ')}`)

if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`)
  for (const p of problems) console.log(`  ✗ ${p}`)
  process.exit(1)
}
console.log('\n✓ every link, anchor and scene resolves')
