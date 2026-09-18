import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TerminalSquare, X } from 'lucide-react'
import { profile, socials } from '../data/profile'
import { navigateTo, TERMINAL_EVENT } from '../lib/navigate'

/**
 * The portfolio command terminal.
 *
 * A real interactive component — it parses input, keeps history, and drives
 * navigation. It only ever controls this page: there is no shell, no eval, and
 * no way to reach the operating system from here.
 *
 * Normal navigation always works without it. This is an alternative, not a gate.
 */

type LineKind = 'input' | 'system' | 'output' | 'error' | 'accent' | 'blank'
interface Line {
  kind: LineKind
  text: string
}

interface Command {
  name: string
  aliases?: string[]
  summary: string
  /** Section to navigate to after the readout. */
  target?: string
  /** Lines printed before navigating. */
  output?: string[]
  url?: string
}

const COMMANDS: Command[] = [
  { name: 'help', summary: 'List every available command' },
  { name: 'whoami', summary: 'Identity readout' },
  { name: 'focus', summary: 'The five disciplines' },
  { name: 'status', summary: 'Availability' },
  { name: 'about', aliases: ['bvvsabout'], summary: 'Background and story', target: 'about' },
  { name: 'journey', aliases: ['timeline', 'bvvsjourney'], summary: 'Chronological timeline', target: 'journey' },
  { name: 'method', aliases: ['think', 'bvvsthink'], summary: 'How I approach a problem', target: 'think' },
  { name: 'cyber', aliases: ['security', 'bvvscyber'], summary: 'Cybersecurity domains', target: 'cyber' },
  { name: 'soc', aliases: ['bvvssoc'], summary: 'Alert triage, worked end to end', target: 'soc' },
  { name: 'ai', aliases: ['bvvsai'], summary: 'AI / ML constellation', target: 'ai' },
  { name: 'fullstack', aliases: ['stack', 'bvvsfullstack'], summary: 'Full-stack engine', target: 'fullstack' },
  { name: 'prompt', aliases: ['bvvsprompt'], summary: 'Prompt engineering workflow', target: 'prompt' },
  { name: 'vibe', aliases: ['bvvsvibe'], summary: 'Vibe coding lab', target: 'vibe' },
  { name: 'skills', aliases: ['bvvsskills'], summary: 'Skills matrix', target: 'skills' },
  { name: 'tools', aliases: ['bvvstools'], summary: 'Toolchain', target: 'tools' },
  { name: 'projects', aliases: ['work', 'bvvsprojects'], summary: 'Completed projects', target: 'work' },
  { name: 'building', aliases: ['current', 'bvvscurrent'], summary: 'Currently building', target: 'current' },
  { name: 'experience', aliases: ['bvvsexperience'], summary: 'Internships and roles', target: 'experience' },
  { name: 'training', aliases: ['trainer'], summary: 'Knowledge transfer', target: 'trainer' },
  { name: 'learning', summary: 'What I am learning now', target: 'current' },
  { name: 'certifications', aliases: ['certs', 'bvvscertifications'], summary: 'Certifications and mission log', target: 'credentials' },
  { name: 'resume', aliases: ['resumes', 'cv', 'bvvsresume'], summary: 'Résumé vault — view only', target: 'resumes' },
  { name: 'contact', aliases: ['bvvscontact', 'getintouch', 'bvvsgetintouch'], summary: 'Open a channel', target: 'contact' },
  { name: 'home', aliases: ['bvvshome'], summary: 'Return to the origin', target: 'home' },
  { name: 'github', summary: 'Open the GitHub profile', url: socials.github },
  { name: 'linkedin', summary: 'Open the LinkedIn profile', url: socials.linkedin },
  { name: 'tryhackme', aliases: ['thm'], summary: 'Open the TryHackMe profile', url: socials.tryhackme },
  { name: 'clear', aliases: ['cls'], summary: 'Clear the terminal' },
  { name: 'exit', aliases: ['close', 'q'], summary: 'Close the interface' },
]

const BANNER: Line[] = [
  { kind: 'accent', text: 'BVVS SYSTEM INTERFACE' },
  { kind: 'output', text: 'Bala Veera Venkata Sunil — cybersecurity · AI/ML · full-stack' },
  { kind: 'blank', text: '' },
  { kind: 'system', text: 'Type a command, or "help" for the full list.' },
  { kind: 'blank', text: '' },
]

const resolve = (input: string) =>
  COMMANDS.find((c) => c.name === input || c.aliases?.includes(input))

export default function CommandTerminal() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<Line[]>(BANNER)
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIndex, setHistIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const logRef = useRef<HTMLDivElement>(null)

  const push = useCallback((next: Line[]) => setLines((prev) => [...prev, ...next]), [])

  /* ---- open / close wiring ---- */
  useEffect(() => {
    const onToggle = (e: Event) => {
      const d = (e as CustomEvent<{ open?: boolean }>).detail
      setOpen((prev) => (typeof d?.open === 'boolean' ? d.open : !prev))
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      // Ctrl/Cmd + K opens the terminal from anywhere.
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((p) => !p)
      }
    }
    window.addEventListener(TERMINAL_EVENT, onToggle)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener(TERMINAL_EVENT, onToggle)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 60)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
  }, [lines])

  /* ---- command execution ---- */
  const run = (raw: string) => {
    const input = raw.trim().toLowerCase()
    if (!input) return

    setHistory((h) => [input, ...h].slice(0, 40))
    setHistIndex(-1)
    push([{ kind: 'input', text: raw.trim() }])

    if (input === 'clear' || input === 'cls') {
      setLines(BANNER)
      return
    }

    if (input === 'help') {
      push([
        { kind: 'system', text: 'AVAILABLE COMMANDS' },
        { kind: 'blank', text: '' },
        ...COMMANDS.filter((c) => c.name !== 'help').map<Line>((c) => ({
          kind: 'output',
          text: `  ${c.name.padEnd(16)}${c.summary}`,
        })),
        { kind: 'blank', text: '' },
        { kind: 'system', text: 'This interface controls the page only. It runs no system commands.' },
        { kind: 'blank', text: '' },
      ])
      return
    }

    if (input === 'whoami') {
      push([
        { kind: 'accent', text: profile.fullName.replace('Podugu ', '') },
        { kind: 'output', text: `  role      ${profile.identity}` },
        { kind: 'output', text: `  also      Full-Stack · Prompt Engineering · Vibe Coding` },
        { kind: 'output', text: `  status    ${profile.status}` },
        { kind: 'output', text: `  location  ${profile.location}` },
        { kind: 'output', text: `  email     ${profile.email}` },
        { kind: 'blank', text: '' },
      ])
      return
    }

    if (input === 'focus') {
      push([
        { kind: 'output', text: '  CYBERSECURITY' },
        { kind: 'output', text: '  AI / ML' },
        { kind: 'output', text: '  FULL-STACK' },
        { kind: 'output', text: '  PROMPT ENGINEERING' },
        { kind: 'output', text: '  VIBE CODING' },
        { kind: 'blank', text: '' },
      ])
      return
    }

    if (input === 'status') {
      push([
        { kind: 'accent', text: profile.status },
        { kind: 'output', text: `  ${profile.graduating}` },
        { kind: 'output', text: `  ${profile.location}` },
        { kind: 'blank', text: '' },
      ])
      return
    }

    const cmd = resolve(input)

    if (!cmd) {
      push([
        { kind: 'error', text: `COMMAND NOT RECOGNIZED: ${input}` },
        { kind: 'system', text: 'Type "help" for the available commands.' },
        { kind: 'blank', text: '' },
      ])
      return
    }

    if (cmd.name === 'exit') {
      push([{ kind: 'system', text: 'CLOSING INTERFACE…' }])
      setTimeout(() => setOpen(false), 220)
      return
    }

    if (cmd.url) {
      push([
        { kind: 'system', text: 'RESOLVING EXTERNAL PROFILE…' },
        { kind: 'accent', text: `  ${cmd.url}` },
        { kind: 'system', text: 'OPENING IN A NEW TAB.' },
        { kind: 'blank', text: '' },
      ])
      window.open(cmd.url, '_blank', 'noreferrer,noopener')
      return
    }

    if (cmd.target) {
      push([
        { kind: 'system', text: `ACCESSING ${cmd.name.toUpperCase()}…` },
        { kind: 'system', text: 'AUTHENTICATING…' },
        { kind: 'accent', text: 'ACCESS GRANTED.' },
        { kind: 'blank', text: '' },
      ])
      setTimeout(() => {
        setOpen(false)
        navigateTo(cmd.target!)
      }, 420)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(value)
      setValue('')
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIndex + 1, history.length - 1)
      if (next >= 0) {
        setHistIndex(next)
        setValue(history[next])
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = histIndex - 1
      setHistIndex(next)
      setValue(next >= 0 ? history[next] : '')
      return
    }
    if (e.key === 'Tab') {
      // Simple completion against the primary command names.
      e.preventDefault()
      const partial = value.trim().toLowerCase()
      if (!partial) return
      const hit = COMMANDS.find((c) => c.name.startsWith(partial))
      if (hit) setValue(hit.name)
    }
  }

  const colour: Record<LineKind, string> = {
    input: 'text-fg',
    system: 'text-safe',
    output: 'text-secondary',
    error: 'text-cyber',
    accent: 'text-ai',
    blank: '',
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[130] flex items-end justify-center bg-bg/80 p-0 backdrop-blur-md sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio command terminal"
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            initial={{ y: 26, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="scanlines panel-soft flex h-[86vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl sm:h-[70vh] sm:rounded-[3px]"
          >
            {/* Title bar */}
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-cyber" aria-hidden />
                <span className="h-2.5 w-2.5 rounded-full bg-warn" aria-hidden />
                <span className="h-2.5 w-2.5 rounded-full bg-safe" aria-hidden />
                <span className="ml-2 flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.16em] text-muted">
                  <TerminalSquare size={13} aria-hidden />
                  BVVS SYSTEM INTERFACE
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden items-center gap-2 font-mono text-[0.6rem] tracking-[0.18em] text-safe sm:flex">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-safe" aria-hidden />
                  ONLINE
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close terminal"
                  className="grid h-8 w-8 place-items-center rounded-[3px] border border-border text-secondary transition-colors hover:text-fg"
                >
                  <X size={14} aria-hidden />
                </button>
              </div>
            </div>

            {/* Log */}
            <div
              ref={logRef}
              className="no-scrollbar flex-1 overflow-y-auto px-4 py-4 font-mono text-[0.72rem] leading-relaxed sm:text-[0.78rem]"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((l, i) =>
                l.kind === 'blank' ? (
                  <div key={i} className="h-3" />
                ) : (
                  <p key={i} className={`whitespace-pre-wrap break-words ${colour[l.kind]}`}>
                    {l.kind === 'input' && <span className="mr-2 text-ai">❯</span>}
                    {l.kind === 'system' && <span className="mr-2 text-safe">SYSTEM:</span>}
                    {l.text}
                  </p>
                ),
              )}
            </div>

            {/* Prompt */}
            <div className="flex items-center gap-3 border-t border-border px-4 py-3">
              <span className="font-mono text-[0.78rem] text-ai" aria-hidden>
                ❯
              </span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal command input"
                placeholder="type a command — try whoami"
                className="flex-1 bg-transparent font-mono text-[0.78rem] text-fg placeholder:text-muted focus:outline-none"
              />
              <span className="hidden font-mono text-[0.58rem] tracking-[0.14em] text-muted sm:inline">
                ENTER ↵ · ESC to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
