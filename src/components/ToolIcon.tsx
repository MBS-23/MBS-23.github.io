import {
  Activity,
  BarChart3,
  Binary,
  Boxes,
  Bug,
  Cloud,
  Code2,
  DatabaseZap,
  FileSearch,
  FlaskConical,
  Globe,
  HardDrive,
  Network,
  Radar,
  Regex,
  ScanEye,
  ScanText,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Smartphone,
  Sparkles,
  SquareTerminal,
  Waypoints,
  type LucideIcon,
} from 'lucide-react'
import { toolIcon } from '../data/toolIcons'
import { iconKey } from '../data/toolIcons'
import { ENERGY } from './ui'
import type { Energy } from '../data/skills'

/**
 * Every tool gets a real icon, in this order:
 *
 *   1. the tool's own mark, where a CC0-licensed one exists (simple-icons)
 *   2. a Lucide glyph describing what the tool DOES
 *   3. a typographic monogram
 *
 * Step 2 exists because several tools here — Nmap, sqlmap, Wazuh, Sentinel,
 * YARA, MISP, Autopsy, VS Code — have no freely licensed mark, and inventing
 * a logo for somebody else's product would be a fake trademark. A precise
 * function glyph is honest and reads better at 16px than a wrong logo.
 */

const GLYPH: Record<string, LucideIcon> = {
  // offensive / recon
  nmap: Radar,
  zenmap: Radar,
  sqlmap: DatabaseZap,
  maltego: Waypoints,
  shodan: Globe,
  tcpdump: Network,
  nessus: ShieldAlert,
  acunetix: ShieldAlert,

  // defensive / SOC
  wazuh: ShieldCheck,
  microsoftsentinel: ScanEye,
  snort: Siren,
  sysmon: Activity,
  yara: Regex,
  loki: FileSearch,
  misp: Share2,

  // forensics
  autopsy: HardDrive,
  ftkimager: HardDrive,
  cellebrite: Smartphone,
  oxygenforensics: Smartphone,
  cyberchef: FlaskConical,

  // lab targets
  dvwa: Bug,
  mutillidae: Bug,
  metasploitable2: Bug,

  // engineering / AI-assisted
  vscode: Code2,
  claudecode: SquareTerminal,
  antigravity: Sparkles,
  powershell: SquareTerminal,
  easyocr: ScanText,
  powerbi: BarChart3,
  microsoftazure: Cloud,
  oraclecloud: Cloud,
  virtualboxvmware: Boxes,
  restapis: Network,
  datastructuresalgorithms: Binary,
}

/** ORACLE → ORACLE, "Burp Suite" → BS, ReportLab → RL, YARA → YARA. */
export function monogram(name: string): string {
  const cleaned = name.replace(/[^A-Za-z0-9 /.-]/g, '').trim()
  if (cleaned.length <= 4) return cleaned.toUpperCase()
  const words = cleaned.split(/[\s/.-]+/).filter(Boolean)
  if (words.length > 1) {
    return words
      .slice(0, 3)
      .map((w) => w[0])
      .join('')
      .toUpperCase()
  }
  return cleaned.slice(0, 2).toUpperCase()
}

export function ToolIcon({
  name,
  size = 16,
  className = '',
  fallback,
}: {
  name: string
  size?: number
  className?: string
  /** Monogram to use when neither a mark nor a glyph exists. */
  fallback?: string
}) {
  const icon = toolIcon(name)

  if (icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden
        focusable="false"
        className={`shrink-0 ${className}`}
      >
        <path d={icon.d} />
      </svg>
    )
  }

  const Glyph = GLYPH[iconKey(name)]
  if (Glyph) {
    return <Glyph size={size} strokeWidth={1.6} aria-hidden className={`shrink-0 ${className}`} />
  }

  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center font-mono leading-none tracking-tight ${className}`}
      style={{ width: size, height: size, fontSize: Math.max(7, size * 0.42) }}
    >
      {fallback ?? monogram(name)}
    </span>
  )
}

/** Icon + label. The unit used by every technology list on the site. */
export function ToolChip({
  name,
  tone,
  note,
  size = 15,
}: {
  name: string
  tone?: Energy
  note?: string
  size?: number
}) {
  const colour = tone ? ENERGY[tone] : undefined
  return (
    <span
      className="group/chip inline-flex items-center gap-2 border border-border bg-surface px-2.5 py-1.5 transition-colors duration-200 hover:border-border-2"
      title={note ?? name}
    >
      <span
        className="text-muted transition-colors duration-200 group-hover/chip:text-[--tool-tone]"
        style={{ '--tool-tone': colour ?? 'var(--color-fg)' } as React.CSSProperties}
      >
        <ToolIcon name={name} size={size} />
      </span>
      <span className="font-mono text-[0.62rem] tracking-wider whitespace-nowrap text-secondary transition-colors duration-200 group-hover/chip:text-fg">
        {name}
      </span>
    </span>
  )
}
