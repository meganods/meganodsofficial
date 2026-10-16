import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service & User Agreement',
  description: 'Review the Terms of Service and user agreement governing access to Meganods platforms, intellectual property, enterprise services, and digital products.',
  keywords: ['Terms of Service', 'User Agreement', 'Legal Terms', 'Meganods Terms'],
  openGraph: {
    title: 'Terms of Service & User Agreement',
    description: 'Review the Terms of Service governing access to Meganods platform and enterprise solutions.',
    url: 'https://www.meganods.com/terms',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Meganods Terms of Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service & User Agreement',
    description: 'Review the Terms of Service governing access to Meganods platform and enterprise solutions.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.meganods.com/terms',
  },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
