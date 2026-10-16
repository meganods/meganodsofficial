import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Our Mission, Vision & Global Story',
  description: 'Learn about Meganods — our mission to innovate the future of technology through AI, cloud computing, and digital transformation. Discover our values, milestones, and global impact.',
  keywords: [
    'About Meganods',
    'Company Mission',
    'Tech Company',
    'AI Innovation',
    'Digital Transformation',
    'Cloud Computing',
    'Our Story',
    'Technology Vision',
  ],
  openGraph: {
    title: 'About Us | Our Mission, Vision & Global Story',
    description: 'Discover the mission, values, and milestones behind Meganods — a technology company innovating the future through AI and digital transformation.',
    url: 'https://www.meganods.com/about',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About Meganods',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Our Mission, Vision & Global Story',
    description: 'Discover the mission, values, and milestones behind Meganods.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.meganods.com/about',
  },
}

const aboutPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://www.meganods.com/about#webpage',
  url: 'https://www.meganods.com/about',
  name: 'About Meganods',
  description: 'Mission, vision, core values, and technological milestones of Meganods.',
  mainEntity: {
    '@type': 'Organization',
    name: 'Meganods',
    url: 'https://www.meganods.com',
    logo: 'https://www.meganods.com/logo.png',
    foundingDate: '2025',
    description: 'Meganods delivers cutting-edge AI technology, cloud computing, cybersecurity, and digital transformation services to empower businesses worldwide.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      {children}
    </>
  )
}
