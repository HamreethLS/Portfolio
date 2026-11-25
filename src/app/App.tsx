import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { WorkspaceShell } from '../components/layout/WorkspaceShell'
import { searchPortfolio, type SearchResult } from '../content/search'
import { projects } from '../content/projects'
import { AboutSection } from '../sections/AboutSection'
import { CertificationsSection } from '../sections/CertificationsSection'
import { ContactSection } from '../sections/ContactSection'
import { ExperienceSection } from '../sections/ExperienceSection'
import { HomeSection } from '../sections/HomeSection'
import { ProjectsSection } from '../sections/ProjectsSection'
import { sections, type SectionId } from './sections'

export default function App() {
  const [active, setActive] = useState<SectionId>('home')
  const [query, setQuery] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const activeLabel = sections.find((section) => section.id === active)?.label ?? 'Overview'
  const selectedProject = projects.find((project) => project.id === selectedProjectId)
  const searchResults = useMemo(() => searchPortfolio(query), [query])

  function pushViewState(section: SectionId, projectId: string | null) {
    window.history.pushState({ portfolioTui: true, section, projectId }, '')
  }

  const navigate = useCallback((section: SectionId) => {
    if (active === section && selectedProjectId === null) return
    pushViewState(section, null)
    setActive(section)
    setSelectedProjectId(null)
  }, [active, selectedProjectId])

  const openProject = useCallback((id: string) => {
    if (!projects.some((project) => project.id === id)) return
    if (active !== 'projects' || selectedProjectId !== null) window.history.pushState({ portfolioTui: true, section: 'projects', projectId: null }, '')
    window.history.pushState({ portfolioTui: true, section: 'projects', projectId: id }, '')
    setActive('projects')
    setSelectedProjectId(id)
  }, [active, selectedProjectId])

  const backFromProject = useCallback(() => {
    if (selectedProjectId) window.history.back()
    else setSelectedProjectId(null)
  }, [selectedProjectId])

  const selectSearchResult = useCallback((result: SearchResult) => {
    setQuery('')
    if (result.projectId) openProject(result.projectId)
    else navigate(result.section)
  }, [navigate, openProject])

  useEffect(() => {
    window.history.replaceState({ portfolioTui: true, section: 'home', projectId: null }, '')
    function handlePopState(event: PopStateEvent) {
      const state = event.state as { portfolioTui?: boolean; section?: SectionId; projectId?: string | null } | null
      if (!state?.portfolioTui || !sections.some((section) => section.id === state.section)) {
        setActive('home')
        setSelectedProjectId(null)
        setQuery('')
        return
      }
      setActive(state.section!)
      setSelectedProjectId(state.projectId ?? null)
      setQuery('')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    function handleShortcuts(event: KeyboardEvent) {
      const target = event.target
      const isEditing = target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      if (event.key === '/' && !isEditing && !event.altKey && !event.ctrlKey && !event.metaKey) {
        event.preventDefault()
        searchRef.current?.focus()
        return
      }
      if (event.key === 'Escape' && selectedProjectId) {
        backFromProject()
        return
      }
      if (event.key === 'Escape' && target === searchRef.current) {
        setQuery('')
        searchRef.current?.blur()
        return
      }
      if (event.altKey && /^[1-6]$/.test(event.key) && !event.ctrlKey && !event.metaKey) {
        event.preventDefault()
        navigate(sections[Number(event.key) - 1].id)
      }
    }
    window.addEventListener('keydown', handleShortcuts)
    return () => window.removeEventListener('keydown', handleShortcuts)
  }, [backFromProject, navigate, selectedProjectId])

  function renderView() {
    switch (active) {
      case 'home': return <HomeSection onNavigate={navigate} onOpenProject={openProject} />
      case 'about': return <AboutSection />
      case 'experience': return <ExperienceSection />
      case 'projects': return <ProjectsSection selectedProjectId={selectedProjectId} onSelectProject={openProject} />
      case 'certifications': return <CertificationsSection />
      case 'contact': return <ContactSection />
    }
  }

  return <>
    <a className="skip-link" href="#main-content">Skip to current view</a>
    <WorkspaceShell
      active={active}
      activeLabel={activeLabel}
      contextLabel={selectedProject?.name}
      onContextBack={backFromProject}
      query={query}
      searchResults={searchResults}
      onQueryChange={setQuery}
      onNavigate={navigate}
      onSearchResult={selectSearchResult}
      onSearch={() => searchRef.current?.focus()}
      searchRef={searchRef}
    >
      {renderView()}
    </WorkspaceShell>
  </>
}
