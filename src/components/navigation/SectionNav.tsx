import type { KeyboardEvent, RefObject } from 'react'
import { sections, type SectionId } from '../../app/sections'
import type { SearchResult } from '../../content/search'

interface SectionNavProps {
  active: SectionId
  query: string
  results: SearchResult[]
  onQueryChange: (value: string) => void
  onSelect: (id: SectionId) => void
  onSelectResult: (result: SearchResult) => void
  searchRef: RefObject<HTMLInputElement>
}

export function SectionNav({ active, query, results, onQueryChange, onSelect, onSelectResult, searchRef }: SectionNavProps) {
  function handleNavigationKeys(event: KeyboardEvent<HTMLElement>) {
    if (event.target instanceof HTMLInputElement || !['ArrowDown', 'ArrowUp'].includes(event.key)) return
    const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[data-nav-item]'))
    if (!buttons.length) return
    event.preventDefault()
    const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement)
    const direction = event.key === 'ArrowDown' ? 1 : -1
    const nextIndex = currentIndex < 0 ? 0 : (currentIndex + direction + buttons.length) % buttons.length
    buttons[nextIndex].focus()
    buttons[nextIndex].click()
  }

  return <nav className="section-nav" aria-label="Portfolio navigation and search" onKeyDown={handleNavigationKeys}>
    <div className="nav-topline"><span className="pane-label">{query ? 'SEARCH RESULTS' : 'DESTINATIONS'}</span><span className="pane-count">{query ? String(results.length).padStart(2, '0') : '06'} / 06</span></div>
    <label className="filter-wrap">
      <span aria-hidden="true" className="filter-icon">⌕</span>
      <span className="sr-only">Search portfolio content</span>
      <input ref={searchRef} type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search portfolio" aria-keyshortcuts="/" />
      {query && <button className="clear-filter" type="button" aria-label="Clear portfolio search" onClick={() => onQueryChange('')}>×</button>}
    </label>
    <div className={`nav-list${query ? ' search-results' : ''}`} role="list" aria-label={query ? 'Search results' : 'Portfolio destinations'}>
      {query ? results.map((result) => <div className="nav-row" role="listitem" key={result.id}>
        <button type="button" data-nav-item className="nav-item search-result" onClick={() => onSelectResult(result)}>
          <span className="nav-marker" aria-hidden="true">⌁</span><span className="result-copy"><span className="nav-label">{result.title}</span><span className="result-detail">{result.detail}</span></span><span className="result-section">{sections.find((section) => section.id === result.section)?.index}</span>
        </button>
      </div>) : sections.map(({ id, label, index, shortcut }) => <div className="nav-row" role="listitem" key={id}>
        <button type="button" data-nav-item className={`nav-item${active === id ? ' is-active' : ''}`} aria-current={active === id ? 'page' : undefined} onClick={() => onSelect(id)}>
          <span className="nav-index">{index}</span><span className="nav-label">{label}</span><span className="nav-shortcut">ALT+{shortcut}</span>
        </button>
      </div>)}
      {query && results.length === 0 && <p className="no-results">No verified content matches “{query}”.</p>}
    </div>
    <div className="nav-footer"><span className="pane-label">INPUT</span><p>↑ ↓ move <span>·</span> Enter open <span>·</span> Alt+1–6</p></div>
  </nav>
}
