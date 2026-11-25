export interface Profile {
  name: string
  role: string
  introduction: string
  domains: string[]
  currentFocus: string[]
  professionalSummary: string
  motivation: string
  engineeringApproach: string[]
  location: string
  email: string
  links: { label: string; href: string; placeholder?: boolean }[]
}

export interface ExperienceEntry {
  id: string
  role: string
  organization: string
  duration?: string
  location?: string
  responsibilities: string[]
  contributions: string[]
  technologies: string[]
}

export interface EducationEntry {
  id: string
  institution: string
  qualification: string
  duration?: string
  details: string[]
}

export interface ProjectEntry {
  id: string
  slug: string
  name: string
  summary: string
  domain: string
  developmentContext: string
  developmentStatus?: string
  technologies: string[]
  links: { label: string; href: string }[]
  caseStudy?: {
    problemDefinition?: string
    requirementsAndConstraints?: string[]
    architecture?: string
    methodology?: string
    implementation?: string
    experimentsAndResults?: string
    decisionsAndTradeoffs?: string[]
  }
}

export interface SkillGroup { id: string; name: string; items: string[] }
export interface Credential { id: string; name: string; issuer: string; date: string; url?: string }
