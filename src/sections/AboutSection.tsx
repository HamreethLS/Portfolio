import { profile } from '../content/profile'
import { skillGroups } from '../content/skills'
import { SectionHeading } from '../components/ui/SectionHeading'

function TextOrPlaceholder({ value, placeholder }: { value: string; placeholder: string }) {
  return value.startsWith('[') ? <p className="placeholder">{placeholder}</p> : <p>{value}</p>
}

export function AboutSection() {
  return <section id="about" className="content-section about-content" aria-labelledby="about-heading">
    <SectionHeading id="about" index="02" title="About" description="Professional background, working principles, and technical focus." />
    <div className="about-block"><h3>01 / PROFESSIONAL SUMMARY</h3><TextOrPlaceholder value={profile.professionalSummary} placeholder="[Professional summary not supplied.]" /></div>
    <div className="about-block"><h3>02 / MOTIVATION &amp; ENGINEERING PHILOSOPHY</h3><TextOrPlaceholder value={profile.motivation} placeholder="[Motivation and engineering philosophy not supplied.]" /></div>
    <div className="about-block"><h3>03 / ENGINEERING APPROACH</h3>{profile.engineeringApproach.length ? <ul className="approach-list">{profile.engineeringApproach.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="placeholder">[Engineering approach details not supplied.]</p>}</div>
    <div className="about-block"><h3>04 / CURRENT FOCUS</h3>{profile.currentFocus.length ? <ul className="approach-list">{profile.currentFocus.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="placeholder">[Current technical focus not supplied.]</p>}</div>
    <div className="about-block"><h3>05 / TECHNICAL TOOLBOX</h3>{skillGroups.length ? <div className="toolbox-groups">{skillGroups.map((group) => <div className="toolbox-row" key={group.id}><h4>{group.name}</h4><ul className="tag-list">{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>)}</div> : <p className="placeholder">[Verified technologies and domain groupings have not been supplied.]</p>}</div>
  </section>
}
