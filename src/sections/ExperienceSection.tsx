import { useState } from 'react'
import { experience, education } from '../content/experience'
import type { EducationEntry, ExperienceEntry } from '../content/types'
import { SectionHeading } from '../components/ui/SectionHeading'

type SelectedEntry = { kind: 'professional'; entry: ExperienceEntry } | { kind: 'education'; entry: EducationEntry }

export function ExperienceSection() {
  const [selected, setSelected] = useState<SelectedEntry | null>(null)

  if (selected) {
    const heading = selected.kind === 'professional' ? selected.entry.role : selected.entry.qualification
    const organization = selected.kind === 'professional' ? selected.entry.organization : selected.entry.institution
    const duration = selected.entry.duration
    const details = selected.kind === 'professional' ? [...selected.entry.responsibilities, ...selected.entry.contributions] : selected.entry.details
    const technologies = selected.kind === 'professional' ? selected.entry.technologies : []
    return <section id="experience" className="content-section" aria-labelledby="experience-heading">
      <SectionHeading id="experience" index="03" title="Experience" description="Professional experience and education records." />
      <div className="detail-breadcrumb"><button type="button" onClick={() => setSelected(null)}>← Experience &amp; education</button><span aria-hidden="true">/</span><span>{heading}</span></div>
      <article className="experience-detail"><p className="record-meta">{selected.kind === 'professional' ? 'PROFESSIONAL EXPERIENCE' : 'EDUCATION'}{duration ? ` · ${duration}` : ''}</p><h3>{heading}</h3><p className="detail-organization">{organization}</p>
        {selected.kind === 'professional' && <><h4>RESPONSIBILITIES</h4>{selected.entry.responsibilities.length ? <ul className="detail-list">{selected.entry.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="placeholder">[Responsibilities not supplied.]</p>}<h4>TECHNICAL CONTRIBUTIONS</h4>{selected.entry.contributions.length ? <ul className="detail-list">{selected.entry.contributions.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="placeholder">[Technical contributions not supplied.]</p>}</>}
        {selected.kind === 'education' && (details.length ? <ul className="detail-list">{details.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="placeholder">[Additional education details not supplied.]</p>)}
        {selected.kind === 'professional' && (technologies.length ? <><h4>TECHNOLOGIES</h4><ul className="tag-list">{technologies.map((item) => <li key={item}>{item}</li>)}</ul></> : <p className="placeholder">[Technologies not supplied.]</p>)}
      </article>
    </section>
  }

  return <section id="experience" className="content-section" aria-labelledby="experience-heading">
    <SectionHeading id="experience" index="03" title="Experience" description="A structured record of professional work and education." />
    <section className="timeline-group" aria-labelledby="professional-timeline-heading"><h3 id="professional-timeline-heading" className="subsection-label">PROFESSIONAL EXPERIENCE</h3>
      {experience.length ? <ul className="timeline-list">{experience.map((entry) => <li key={entry.id}><button type="button" className="timeline-entry" onClick={() => setSelected({ kind: 'professional', entry })}><span className="timeline-marker" aria-hidden="true">○</span><span className="timeline-copy"><strong>{entry.role}</strong><small>{entry.organization}</small></span><span className="record-meta">{entry.duration ?? 'DURATION NOT SUPPLIED'} <b>↗</b></span></button></li>)}</ul> : <p className="placeholder">[No verified professional experience supplied.]</p>}
    </section>
    <section className="timeline-group" aria-labelledby="education-timeline-heading"><h3 id="education-timeline-heading" className="subsection-label">EDUCATION</h3>
      {education.length ? <ul className="timeline-list">{education.map((entry) => <li key={entry.id}><button type="button" className="timeline-entry" onClick={() => setSelected({ kind: 'education', entry })}><span className="timeline-marker" aria-hidden="true">○</span><span className="timeline-copy"><strong>{entry.qualification}</strong><small>{entry.institution}</small></span><span className="record-meta">{entry.duration ?? 'DURATION NOT SUPPLIED'} <b>↗</b></span></button></li>)}</ul> : <p className="placeholder">[No verified education details supplied.]</p>}
    </section>
    <p className="context-note">Academic projects belong in <span>Projects</span> and remain distinct from professional roles.</p>
  </section>
}
