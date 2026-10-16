import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tech Insights | AI, Cloud & Cyber Architecture',
  description: 'Read the latest tech insights, AI breakthroughs, cloud computing trends, and cybersecurity updates from Meganods experts. Stay informed with in-depth articles and tutorials.',
  keywords: ['Tech Blog', 'AI Blog', 'Cloud Computing Blog', 'Cybersecurity News', 'Machine Learning Articles', 'Technology Insights', 'Meganods Blog', 'Software Development'],
  openGraph: {
    title: 'Tech Insights | AI, Cloud & Cyber Architecture',
    description: 'Latest tech insights, AI breakthroughs, and cybersecurity updates from Meganods experts.',
    url: 'https://www.meganods.com/blog',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Meganods Tech Insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Insights | AI, Cloud & Cyber Architecture',
    description: 'Latest tech insights from Meganods experts.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.meganods.com/blog',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
