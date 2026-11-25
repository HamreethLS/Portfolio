import { profile } from '../content/profile'
import { projects } from '../content/projects'
import { sections, type SectionId } from '../app/sections'

interface HomeSectionProps { onNavigate: (section: SectionId) => void; onOpenProject: (id: string) => void }

function ValueList({ values, empty }: { values: string[]; empty: string }) {
  return values.length ? <span>{values.join(' · ')}</span> : <span className="placeholder-inline">{empty}</span>
}

export function HomeSection({ onNavigate, onOpenProject }: HomeSectionProps) {
  const selectedProjects = projects.slice(0, 3)
  const destinations = sections.filter(({ id }) => id !== 'home')

  return <section id="home" className="content-section home-section" aria-labelledby="home-title">
    <p className="home-overline">ENGINEERING PORTFOLIO <span aria-hidden="true">·</span> OVERVIEW</p>
    <h2 id="home-title" className="home-title">{profile.name}<span className="home-title-period">.</span></h2>
    <p className="home-role">{profile.role}</p>
    <p className="home-intro">{profile.introduction}</p>

    <dl className="overview-facts">
      <div><dt>ENGINEERING DOMAINS</dt><dd><ValueList values={profile.domains} empty="[Domains not supplied]" /></dd></div>
      <div><dt>CURRENT FOCUS</dt><dd><ValueList values={profile.currentFocus} empty="[Current technical focus not supplied]" /></dd></div>
    </dl>

    <div className="overview-projects">
      <div className="overview-section-label"><span>SELECTED PROJECTS</span><span>{String(selectedProjects.length).padStart(2, '0')}</span></div>
      {selectedProjects.length ? <ul className="overview-project-list">{selectedProjects.map((project) => <li key={project.id}><button type="button" onClick={() => onOpenProject(project.id)}><span className="project-prompt" aria-hidden="true">›</span><span>{project.name}</span><span className="project-domain">{project.domain}</span></button></li>)}</ul> : <p className="empty-line">[No verified projects supplied yet.]</p>}
    </div>

    <nav className="overview-entrypoints" aria-label="Explore portfolio sections">
      {destinations.map(({ id, label, index }) => <button type="button" key={id} onClick={() => onNavigate(id)}><span>{index}</span>{label}<span className="entry-arrow" aria-hidden="true">↗</span></button>)}
    </nav>
  </section>
}
