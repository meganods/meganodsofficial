import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Meganods | Our Mission, Vision & Story',
  description: 'Learn about Meganods — our mission to innovate the future of technology through AI, cloud computing, and digital transformation. Discover our values, milestones, and global impact.',
  keywords: ['About Meganods', 'Company Mission', 'Tech Company', 'AI Innovation', 'Digital Transformation', 'Cloud Computing', 'Our Story', 'Technology Vision'],
  openGraph: {
    title: 'About Meganods | Our Mission, Vision & Story',
    description: 'Discover the mission, values, and milestones behind Meganods — a technology company innovating the future through AI and digital transformation.',
    url: 'https://meganods.com/about',
    type: 'website',
  },
  twitter: {
    title: 'About Meganods | Our Mission, Vision & Story',
    description: 'Discover the mission, values, and milestones behind Meganods.',
  },
  alternates: {
    canonical: 'https://meganods.com/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
