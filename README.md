# Podugu Bala Veera Venkata Sunil — Portfolio

A cinematic-but-professional personal site: **Earth → India → Andhra Pradesh → candidate found → the work**.

Cybersecurity × AI/ML × Full-Stack, with prompt engineering and AI-assisted development
as supporting skills.

Live: **https://mbs-23.github.io/**


| Thing | Source | Licence |
|---|---|---|
| Earth day texture | NASA Blue Marble (`land_shallow_topo_2048`) | Public domain |
| Earth night texture | NASA Earth at Night (`earth_lights_lrg`) | Public domain |
| World coastlines | Natural Earth 110m land | Public domain |
| India outline | Natural Earth 50m admin-0 | Public domain |
| Indian states (incl. Andhra Pradesh) | Natural Earth 50m admin-1 | Public domain |
| Tool marks | [simple-icons](https://simpleicons.org) | CC0-1.0 |
| Icons | [Lucide](https://lucide.dev) | ISC |
| Fonts | Inter, Instrument Serif, IBM Plex Mono (Google Fonts) | OFL |

The globe flies to **16.7547° N, 81.6819° E** — Tanuku, West Godavari, Andhra Pradesh.
The landmass under the marker is genuinely India because the camera is driven by real
latitude/longitude, not a drawn shape. Coordinates are not printed on the page; they
drive the camera.

---

## Project structure

```
.github/workflows/  deploy.yml — build, check, publish to GitHub Pages
public/
  geo/            world-land.json · india.json · india-states.json   (Natural Earth)
  textures/       earth-day.jpg · earth-night.jpg                     (NASA)
  resumes/        4 PDFs — the redacted web copies
  og-image.png    share card (regenerate from scripts/og-card.html)
scripts/
  audit-links.mjs        proves every anchor and scene resolves
  build-tool-icons.mjs   generates src/data/toolIcons.ts from simple-icons
  og-card.html           source for the share card
resume-src/       local only, never committed — the résumé build pipeline
src/
  data/           every fact on the site — edit here, never in a component
  components/     one file per scene plus shared primitives
  hooks/          scroll spy, scrolled state
  lib/navigate.ts staged navigation bus
  index.css       design tokens + type scale
```

### Data files

| File | Holds |
|---|---|
| `profile.ts` | Name, contacts, socials, education, stats |
| `scenes.ts` | The 15-scene spine — drives nav, indicator and terminal |
| `method.ts` | How I Think, delivery path, communication block |
| `cyber.ts` | 8 security domains, AI×Security crossover, the alert-triage walkthrough |
| `ai.ts` | AI constellation, model stack, earlier AI work |
| `fullstack.ts` | Stack layers and the secure-request trace |
| `promptEngineering.ts` / `vibeCoding.ts` | Workflows, skills, the discipline matrix |
| `skills.ts` | **Skills** and **Tools** — deliberately separate structures |
| `experience.ts` | Roles, the turning point, the trainer block |
| `projects.ts` | **Completed** work only, plus the research/publication entry |
| `currentProjects.ts` | **In progress / experimental / planned** — never mixed with the above |
| `credentials.ts` | Certifications, mission log, the SOC training curriculum |
| `timeline.ts` | The story timeline and the mission statement |
| `resumes.ts` | The four résumé documents |
| `roles.ts` | The recruiter router: role → evidence mapping |
| `toolIcons.ts` | **Generated.** Do not edit — run the icon script |

---

## Common edits

**Add a project (completed):** append to `src/data/projects.ts`. Every field is typed;
`status` must be one of `COMPLETED`, `COMPLETED / ACADEMIC`, `COMPLETED / PROTOTYPE`, and
`learned` is the one-line engineering lesson shown in the project scene.

**Add a project you are still building:** append to `src/data/currentProjects.ts` with a
`badge` (`IN PROGRESS` / `BUILDING` / `EXPERIMENTAL` / `PLANNED`), a `stage`, and a
`column`. **Do not** put unfinished work in `projects.ts` — the separation is the point.

**Add a skill or tool:** `src/data/skills.ts`. Skills carry an `applied` field — where it
was actually used. If you cannot fill that in honestly, it is not a skill yet. Then run:

```bash
node scripts/build-tool-icons.mjs
```

which regenerates `src/data/toolIcons.ts`. Tools with no CC0 mark fall back to a
monogram automatically — that is by design, not a gap.

**Add or reorder a scene:** `src/data/scenes.ts`, then render the component in `App.tsx`
in the same order, and add the id to `ALL_SECTION_IDS` **and** `SCENE_OF`. The audit
script fails the build if you forget.

---

## The recruiter router

`src/data/roles.ts` maps each role a hiring manager might be hiring for to the evidence
that exists for it — experience ids, project ids, skills, tools and the right résumé. The
section renders from that file alone, so adding a role is a data edit.

It is an **evidence router, not a scoring system**. There are no match percentages and no
rankings. The only judgement is `fit`, and it has two honest values:

- `direct` — hands-on experience and shipped work behind it
- `adjacent` — real foundations, no professional depth yet (shown, not hidden)

Every id in `roles.ts` must exist in `experience.ts`, `projects.ts` and `resumes.ts`; the
type system and the link audit keep that true. "Read the … résumé" fires `openResume(id)`,
which the vault listens for, so the router opens the exact document rather than dropping
the visitor in a grid.

---

## Credentials are four different claims

`credentials.ts` labels every entry with a `kind`, and the section groups by it:

| kind | means |
|---|---|
| `certification` | an exam actually passed, with issuer and validity |
| `training` | a structured programme completed — training, not employment |
| `programme` | an internship or government programme certificate |
| `recognition` | awarded for performance, not attendance |

Letters live in their own `letters` array. This separation is the reason the site can never
imply an exam was passed when a course was attended — CEH v13 in particular is a training
track.

---

## Numbers carry their source

Any project with `results` also carries `resultsSource`, rendered directly beneath the
figures. OmniAI Cloud's accuracy and latency numbers are labelled as evaluation results
reported in the project paper on curated test sets — not production telemetry. Never add a
metric without saying where it came from.

---

## Résumés

`public/resumes/` holds four one-page, ATS-safe PDFs: a master plus three tracks
(cybersecurity, AI/GenAI, software engineering).

These are the **web copies**. They are built from the real résumés with two redactions:

- the **phone number** is removed — a public page is a spam magnet
- **pentest client names** are removed — engagement confidentiality

Rebuild them after updating the source résumés:

```bash
python resume-src/web-resumes/build_web_resumes.py
```

The script refuses to write a file if a redaction fails, and reports the page count so a
résumé can never silently become two pages. Résumés are **view-only** in the UI — the
viewer has no download control by design.

---

## The opening sequence

`src/components/OriginSequence.tsx` owns the timeline. Adjust the `FULL`, `SHORT` and
`LITE` millisecond maps to retime it.

- **Desktop** gets the full cut: globe → India → Andhra Pradesh → candidate reveal (~12s).
- **Phones and touch devices** get `LITE`: the same story, map only — no WebGL, no
  satellite imagery, ~8s.
- **Returning visitors** get `SHORT` (flag: `bvvs.origin.seen.v2` in `localStorage`).
- `prefers-reduced-motion: reduce` **skips it entirely**.
- Escape, Enter, Space or the Skip button end it at any point, and a wall-clock safety
  net ends it even if the browser stops delivering frames.

**To disable the opening permanently**, in `src/App.tsx` change the initial state to
`useState(false)`.

---

## Performance notes

- Three.js is a **lazy chunk** (~130 KB gzip) fetched only for the desktop opening. The
  globe appears once, in the intro — not behind the hero and not at the contact scene.
- Geometry is pre-trimmed and coordinate-rounded (171 KB total for all three files).
- Tool marks are generated into a trimmed set; oversized logos are dropped in favour of
  monograms.
- Animation pauses off-screen and under reduced motion.

Current build: `index` ~152 KB gzip, `motion` ~48 KB, `three` ~130 KB (lazy), CSS ~9 KB.

---

## Accessibility

- Semantic landmarks, a skip link, and real `<button>` / `<a>` elements for every action.
- Visible focus rings on everything interactive.
- The terminal is an *alternative* route — every section is reachable without it.
- `prefers-reduced-motion` disables the opening, parallax, scrubbed animation and hover
  transforms while keeping all content.
- A `<noscript>` block gives the name, the résumé link and the email address.

---

## Content integrity rules

These are deliberate. Please keep them.

- No invented companies, clients, metrics, users, CVEs or certificate IDs.
- Project status is honest; planned work is never shown as shipped.
- **Training is labelled as training.** The CyberGuide Telugu *SOC with AI L2/L3*
  programme and the *Amroha Police* government internship are two separate things and
  must never be merged into one entry.
- CEH v13 is a **training track**, never "CEH certified".
- Security work is described as authorised, lab or educational.
- Prompt engineering and vibe coding are positioned as **intermediate**.

---

## Deploy

Pushing to `main` builds and publishes automatically via
`.github/workflows/deploy.yml`.

The first workflow run enables Pages by itself (`configure-pages` with
`enablement: true`), so there is nothing to switch on by hand. If the repository has
Pages restricted by an organisation policy, set **Settings → Pages → Source: GitHub
Actions** manually and re-run the workflow.

If the site is ever served from a sub-path instead of the domain root, set
`base: '/<repo-name>/'` in `vite.config.ts` — every asset URL already uses
`import.meta.env.BASE_URL` — and update the absolute URLs in `index.html`
(`canonical`, `og:url`, `og:image`) plus `public/robots.txt` and `public/sitemap.xml`.

---

## Attribution

Earth imagery courtesy of NASA. Geographic data from Natural Earth. Both public domain.
