import { sections, type SectionId } from '../app/sections'
import { credentials } from './credentials'
import { experience, education } from './experience'
import { profile } from './profile'
import { projects } from './projects'
import { skillGroups } from './skills'

export interface SearchResult {
  id: string
  title: string
  detail: string
  section: SectionId
  projectId?: string
  terms: string
}

const isProvided = (value: string) => value.trim().length > 0 && !value.trim().startsWith('[')

function createIndex(): SearchResult[] {
  const viewResults: SearchResult[] = sections.map(({ id, label, index }) => ({
    id: `view-${id}`, title: label, detail: `Open ${label} view · ${index}`, section: id, terms: `${label} ${id}`,
  }))
  const profileResults: SearchResult[] = [profile.name, profile.role, profile.introduction, profile.professionalSummary, profile.motivation]
    .filter(isProvided)
    .map((value, index) => ({ id: `profile-${index}`, title: index === 0 ? profile.name : 'Profile', detail: value, section: 'home', terms: `${profile.name} ${value}` }))
  const aboutResults: SearchResult[] = [...profile.domains, ...profile.currentFocus, ...profile.engineeringApproach]
    .filter(isProvided)
    .map((value, index) => ({ id: `about-${index}`, title: value, detail: 'About · engineering profile', section: 'about', terms: value }))
  const experienceResults: SearchResult[] = experience.map((entry) => ({
    id: `experience-${entry.id}`, title: entry.role, detail: entry.organization, section: 'experience',
    terms: [entry.role, entry.organization, entry.duration, entry.responsibilities.join(' '), entry.contributions.join(' '), entry.technologies.join(' ')].filter(Boolean).join(' '),
  }))
  const educationResults: SearchResult[] = education.map((entry) => ({
    id: `education-${entry.id}`, title: entry.qualification, detail: entry.institution, section: 'experience',
    terms: [entry.qualification, entry.institution, entry.duration, entry.details.join(' ')].filter(Boolean).join(' '),
  }))
  const projectResults: SearchResult[] = projects.map((project) => ({
    id: `project-${project.id}`, title: project.name, detail: [project.domain, project.developmentContext].filter(Boolean).join(' · '),
    section: 'projects', projectId: project.id,
    terms: [project.name, project.summary, project.domain, project.developmentContext, project.developmentStatus, project.technologies.join(' ')].filter(Boolean).join(' '),
  }))
  const skillResults: SearchResult[] = skillGroups.flatMap((group) => group.items.map((skill) => ({
    id: `skill-${group.id}-${skill}`, title: skill, detail: group.name, section: 'about', terms: `${skill} ${group.name}`,
  })))
  const credentialResults: SearchResult[] = credentials.map((credential) => ({
    id: `credential-${credential.id}`, title: credential.name, detail: credential.issuer, section: 'certifications',
    terms: `${credential.name} ${credential.issuer} ${credential.date}`,
  }))
  const contactResults: SearchResult[] = [profile.email, ...profile.links.filter((link) => !link.placeholder).map((link) => `${link.label} ${link.href}`)]
    .filter(isProvided)
    .map((value, index) => ({ id: `contact-${index}`, title: 'Contact', detail: value, section: 'contact', terms: value }))

  return [...viewResults, ...profileResults, ...aboutResults, ...experienceResults, ...educationResults, ...projectResults, ...skillResults, ...credentialResults, ...contactResults]
}

export function searchPortfolio(query: string): SearchResult[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return []
  return createIndex().filter((result) => `${result.title} ${result.detail} ${result.terms}`.toLowerCase().includes(normalized)).slice(0, 30)
}
