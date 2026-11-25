import type { SectionId } from '../../app/sections'
import { sections } from '../../app/sections'

interface IdentityBarProps { current: SectionId; currentLabel: string; onNavigate: (section: SectionId) => void }

export function IdentityBar({ current, currentLabel, onNavigate }: IdentityBarProps) {
  return <header className="identity-bar">
    <button className="identity-mark" onClick={() => onNavigate('home')} aria-label="Open portfolio overview">
      <span className="brand-glyph" aria-hidden="true">H</span><span>HAMREETH<span className="identity-suffix">.PORTFOLIO</span></span>
    </button>
    <div className="session-path" aria-label={`Current view: ${currentLabel}`}><span>WORKSPACE</span><span className="path-separator">/</span><span>{currentLabel.toUpperCase()}</span></div>
    <div className="session-state"><span className="state-mark" aria-hidden="true">●</span><span>INTERACTIVE TUI</span><span className="current-code">{sections.find((section) => section.id === current)?.index}</span></div>
  </header>
}
