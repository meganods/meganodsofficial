import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects & Case Studies | Enterprise Deployments',
  description: 'Browse Meganods enterprise case studies and project portfolio. See real-world AI, cloud, and cybersecurity deployments across healthcare, finance, logistics, and more.',
  keywords: ['Case Studies', 'Project Portfolio', 'Enterprise Deployments', 'AI Projects', 'Cloud Projects', 'Cybersecurity Solutions', 'Meganods Projects', 'Tech Portfolio'],
  openGraph: {
    title: 'Projects & Case Studies | Meganods',
    description: 'Explore real-world enterprise deployments by Meganods across healthcare, finance, logistics, and more.',
    url: 'https://meganods.com/projects',
    type: 'website',
  },
  twitter: {
    title: 'Meganods Projects & Case Studies',
    description: 'Enterprise AI, cloud, and cybersecurity deployments by Meganods.',
  },
  alternates: {
    canonical: 'https://meganods.com/projects',
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
