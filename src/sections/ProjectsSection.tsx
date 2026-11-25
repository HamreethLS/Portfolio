import { projects } from '../content/projects'
import { SectionHeading } from '../components/ui/SectionHeading'

interface ProjectsSectionProps { selectedProjectId: string | null; onSelectProject: (id: string) => void }

export function ProjectsSection({ selectedProjectId, onSelectProject }: ProjectsSectionProps) {
  const selectedProject = projects.find((project) => project.id === selectedProjectId)

  return <section id="projects" className="content-section projects-content" aria-labelledby="projects-heading">
    <SectionHeading id="projects" index="04" title="Projects" description="Technical work organized as a selectable project directory." />
    {selectedProject ? <>
      <article className="project-detail">
        <p className="project-idline">PROJECT / {selectedProject.id}</p>
        <h3>{selectedProject.name}</h3>
        <p className="project-summary">{selectedProject.summary || '[Project description not supplied.]'}</p>
        <dl className="project-facts">
          <div><dt>DOMAIN</dt><dd>{selectedProject.domain || '[Not supplied]'}</dd></div>
          <div><dt>DEVELOPMENT CONTEXT</dt><dd>{selectedProject.developmentContext || '[Not supplied]'}</dd></div>
          {selectedProject.developmentStatus && <div><dt>STATUS</dt><dd>{selectedProject.developmentStatus}</dd></div>}
          <div><dt>TECHNOLOGY STACK</dt><dd>{selectedProject.technologies.length ? <ul className="tag-list">{selectedProject.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul> : <span className="placeholder">[Not supplied]</span>}</dd></div>
        </dl>
        {selectedProject.links.length > 0 && <div className="project-references"><h4>REFERENCES</h4>{selectedProject.links.map((link) => <a className="project-link" href={link.href} key={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div>}
        <p className="case-study-note">Case study sections are reserved for future verified material.</p>
      </article>
    </> : projects.length ? <>
      <div className="directory-heading"><span>NAME</span><span>DOMAIN</span><span>CONTEXT</span><span>STATUS</span></div>
      <ul className="project-directory" aria-label="Project directory">{projects.map((project) => <li key={project.id}><button type="button" className="project-row" onClick={() => onSelectProject(project.id)}><span className="project-name"><span className="project-prompt" aria-hidden="true">›</span>{project.name}</span><span>{project.domain || '—'}</span><span>{project.developmentContext || '—'}</span><span>{project.developmentStatus || '—'}</span></button></li>)}</ul>
    </> : <div className="empty-state"><p className="empty-state-label">DIRECTORY EMPTY</p><p>[No verified project entries supplied yet.]</p><p>Project records can include domain, context, stack, and verified development status.</p></div>}
  </section>
}
