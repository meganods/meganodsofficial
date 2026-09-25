import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog & Tech Insights | AI, Cloud & Cybersecurity News',
  description: 'Read the latest tech insights, AI breakthroughs, cloud computing trends, and cybersecurity updates from Meganods experts. Stay informed with in-depth articles and tutorials.',
  keywords: ['Tech Blog', 'AI Blog', 'Cloud Computing Blog', 'Cybersecurity News', 'Machine Learning Articles', 'Technology Insights', 'Meganods Blog', 'Software Development'],
  openGraph: {
    title: 'Blog & Tech Insights | Meganods',
    description: 'Latest tech insights, AI breakthroughs, and cybersecurity updates from Meganods experts.',
    url: 'https://www.meganods.com/blog',
    type: 'website',
  },
  twitter: {
    title: 'Meganods Blog | AI, Cloud & Cybersecurity Insights',
    description: 'Latest tech insights from Meganods experts.',
  },
  alternates: {
    canonical: 'https://www.meganods.com/blog',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
