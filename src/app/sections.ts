export const sections = [
  { id: 'home', label: 'Overview', index: '01', shortcut: '1' },
  { id: 'about', label: 'About', index: '02', shortcut: '2' },
  { id: 'experience', label: 'Experience', index: '03', shortcut: '3' },
  { id: 'projects', label: 'Projects', index: '04', shortcut: '4' },
  { id: 'certifications', label: 'Certifications', index: '05', shortcut: '5' },
  { id: 'contact', label: 'Contact', index: '06', shortcut: '6' },
] as const

export type SectionId = (typeof sections)[number]['id']
