import { credentials } from '../content/credentials'
import { SectionHeading } from '../components/ui/SectionHeading'

export function CertificationsSection() {
  return <section id="certifications" className="content-section" aria-labelledby="certifications-heading"><SectionHeading id="certifications" index="05" title="Certifications" description="Credentials and formal learning records." />
    {credentials.length ? <div className="record-list">{credentials.map((credential) => <article className="record" key={credential.id}><div className="record-meta">{credential.date}</div><div><h3>{credential.name}</h3><p>{credential.issuer}</p>{credential.url && <p><a className="project-link" href={credential.url} target="_blank" rel="noreferrer">View credential ↗</a></p>}</div></article>)}</div> : <p className="placeholder">[No verified certifications supplied yet.]</p>}
  </section>
}
