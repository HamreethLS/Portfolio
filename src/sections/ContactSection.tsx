import { profile } from '../content/profile'
import { SectionHeading } from '../components/ui/SectionHeading'

export function ContactSection() {
  const links = profile.links.filter((link) => !link.placeholder && link.href)
  const hasEmail = !profile.email.startsWith('[')
  return <section id="contact" className="content-section" aria-labelledby="contact-heading"><SectionHeading id="contact" index="06" title="Contact" description="For professional enquiries and engineering conversations." />
    {hasEmail || links.length ? <div className="contact-row">{hasEmail && <a className="contact-link" href={`mailto:${profile.email}`}>{profile.email}</a>}{links.map((link) => <a className="contact-link" href={link.href} key={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div> : <p className="placeholder">[Contact email and public profile links have not been supplied.]</p>}
  </section>
}
