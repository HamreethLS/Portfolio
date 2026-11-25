import type { SectionId } from '../../app/sections'
import { sections } from '../../app/sections'

interface StatusBarProps { current: SectionId; contextLabel?: string; onBack: () => void; onSearch: () => void }

export function StatusBar({ current, contextLabel, onBack, onSearch }: StatusBarProps) {
  return <footer className="status-bar" aria-label="Application status">
    <span className="status-left"><i aria-hidden="true" /> READY</span>
    <span className="status-view">{contextLabel ? `PROJECT: ${contextLabel}` : `VIEW ${sections.find((section) => section.id === current)?.index} · ${current.toUpperCase()}`}</span>
    {contextLabel ? <button type="button" className="status-search" onClick={onBack}><kbd>ESC</kbd> BACK TO PROJECTS</button> : <button type="button" className="status-search" onClick={onSearch}><kbd>/</kbd> SEARCH</button>}
    <span className="status-right">PORTFOLIO TUI <b>·</b> V1</span>
  </footer>
}
