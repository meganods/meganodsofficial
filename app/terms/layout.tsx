import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Meganods',
  description: 'Review the Terms of Service and user agreement governing access to Meganods platforms, intellectual property, enterprise services, and digital products.',
  keywords: ['Terms of Service', 'User Agreement', 'Legal Terms', 'Meganods Terms'],
  openGraph: {
    title: 'Terms of Service | Meganods',
    description: 'Review the Terms of Service governing access to Meganods platform and enterprise solutions.',
    url: 'https://www.meganods.com/terms',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.meganods.com/terms',
  },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
