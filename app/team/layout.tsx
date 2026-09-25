import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Team | Meet Our Expert Engineers & Architects',
  description: 'Meet the Meganods team — world-class engineers, designers, and AI architects united by the mission to innovate the future of technology.',
  keywords: ['Meganods Team', 'Tech Team', 'Engineers', 'AI Architects', 'Software Developers', 'Leadership', 'Company Culture', 'Remote First'],
  openGraph: {
    title: 'Team | Meganods — Expert Engineers & Architects',
    description: 'Meet the world-class engineers, designers, and AI architects behind Meganods.',
    url: 'https://www.meganods.com/team',
    type: 'website',
  },
  twitter: {
    title: 'Meganods Team | Expert Engineers & Architects',
    description: 'Meet the world-class team behind Meganods.',
  },
  alternates: {
    canonical: 'https://www.meganods.com/team',
  },
}

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children
}
