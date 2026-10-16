import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects & Case Studies | Enterprise Deployments',
  description: 'Browse Meganods enterprise case studies and project portfolio. See real-world AI, cloud, and cybersecurity deployments across healthcare, finance, logistics, and more.',
  keywords: ['Case Studies', 'Project Portfolio', 'Enterprise Deployments', 'AI Projects', 'Cloud Projects', 'Cybersecurity Solutions', 'Meganods Projects', 'Tech Portfolio'],
  openGraph: {
    title: 'Projects & Case Studies | Enterprise Deployments',
    description: 'Explore real-world enterprise deployments by Meganods across healthcare, finance, logistics, and more.',
    url: 'https://www.meganods.com/projects',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Meganods Projects & Case Studies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects & Case Studies | Enterprise Deployments',
    description: 'Enterprise AI, cloud, and cybersecurity deployments by Meganods.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.meganods.com/projects',
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
