interface SectionHeadingProps { id: string; index: string; title: string; description?: string }

export function SectionHeading({ id, index, title, description }: SectionHeadingProps) {
  return <header className="section-heading"><p className="section-kicker">SECTION {index} <span>/</span> {id.toUpperCase()}</p><h2 id={`${id}-heading`}>{title}</h2>{description && <p className="section-description">{description}</p>}</header>
}
