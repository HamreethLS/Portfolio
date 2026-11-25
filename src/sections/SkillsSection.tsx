import { skillGroups } from '../content/skills'
import { SectionHeading } from '../components/ui/SectionHeading'

export function SkillsSection() {
  return <section id="skills" className="content-section" aria-labelledby="skills-heading"><SectionHeading id="skills" index="04" title="Skills" description="Tools and technical areas, grouped by discipline." />
    {skillGroups.length ? <div className="record-list">{skillGroups.map((group) => <div className="record" key={group.id}><h3>{group.name}</h3><ul className="tag-list">{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>)}</div> : <p className="placeholder">[No verified skills supplied yet.]</p>}
  </section>
}
