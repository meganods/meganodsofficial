import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services | AI Solutions, Cloud Computing & Cybersecurity',
  description: 'Explore Meganods services — AI & Machine Learning solutions, cloud infrastructure, cybersecurity operations, data analytics, and enterprise web & mobile development.',
  keywords: ['IT Services', 'AI Solutions', 'Cloud Computing', 'Cybersecurity', 'Data Analytics', 'Machine Learning', 'Enterprise Software', 'Mobile Development', 'Web Development', 'Meganods Services'],
  openGraph: {
    title: 'Services | Meganods — AI Solutions, Cloud & Cybersecurity',
    description: 'Multi-sector intelligence and high-performance infrastructure services by Meganods. AI, cloud, security, and custom software development.',
    url: 'https://www.meganods.com/services',
    type: 'website',
  },
  twitter: {
    title: 'Meganods Services | AI, Cloud & Cybersecurity',
    description: 'Multi-sector intelligence and high-performance infrastructure services by Meganods.',
  },
  alternates: {
    canonical: 'https://www.meganods.com/services',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
