import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Protection',
  description: 'Learn how Meganods collects, uses, and safeguards your data, including our cookie disclosures, Google AdSense advertising compliance, and privacy rights.',
  keywords: ['Privacy Policy', 'Data Protection', 'Cookies Policy', 'Google AdSense Privacy', 'Meganods Privacy'],
  openGraph: {
    title: 'Privacy Policy & Data Protection',
    description: 'Learn how Meganods protects your data and manages cookies and advertising policies.',
    url: 'https://www.meganods.com/privacy',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Meganods Privacy Policy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy & Data Protection',
    description: 'Learn how Meganods protects your data and manages cookies and advertising policies.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.meganods.com/privacy',
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
