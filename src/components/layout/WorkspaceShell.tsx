import type { ReactNode, RefObject } from 'react'
import type { SectionId } from '../../app/sections'
import type { SearchResult } from '../../content/search'
import { sections } from '../../app/sections'
import { IdentityBar } from './IdentityBar'
import { SectionNav } from '../navigation/SectionNav'
import { StatusBar } from './StatusBar'

interface WorkspaceShellProps {
  active: SectionId
  activeLabel: string
  contextLabel?: string
  onContextBack: () => void
  query: string
  searchResults: SearchResult[]
  onQueryChange: (value: string) => void
  onNavigate: (section: SectionId) => void
  onSearchResult: (result: SearchResult) => void
  onSearch: () => void
  searchRef: RefObject<HTMLInputElement>
  children: ReactNode
}

export function WorkspaceShell({ active, activeLabel, contextLabel, onContextBack, query, searchResults, onQueryChange, onNavigate, onSearchResult, onSearch, searchRef, children }: WorkspaceShellProps) {
  return <div className="workspace">
    <IdentityBar current={active} currentLabel={activeLabel} onNavigate={onNavigate} />
    <div className="workspace-body">
      <SectionNav active={active} query={query} results={searchResults} onQueryChange={onQueryChange} onSelect={onNavigate} onSelectResult={onSearchResult} searchRef={searchRef} />
      <main id="main-content" className="content-viewport" tabIndex={-1} aria-live="polite">
        <div className="view-toolbar"><div className="view-breadcrumb"><span>PORTFOLIO</span><span aria-hidden="true">/</span>{contextLabel ? <><button type="button" className="breadcrumb-back" onClick={onContextBack}>{activeLabel}</button><span aria-hidden="true">/</span><h1>{contextLabel}</h1></> : <h1>{activeLabel}</h1>}</div><span className="view-index">{contextLabel ? 'DETAIL' : `VIEW ${sections.find((section) => section.id === active)?.index}`}</span></div>
        <div className="view-content" key={active}>{children}</div>
      </main>
    </div>
    <StatusBar current={active} contextLabel={contextLabel} onBack={onContextBack} onSearch={onSearch} />
  </div>
}
