import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Meganods',
  description: 'Learn how Meganods collects, uses, and safeguards your data, including our cookie disclosures, Google AdSense advertising compliance, and privacy rights.',
  keywords: ['Privacy Policy', 'Data Protection', 'Cookies Policy', 'Google AdSense Privacy', 'Meganods Privacy'],
  openGraph: {
    title: 'Privacy Policy | Meganods',
    description: 'Learn how Meganods protects your data and manages cookies and advertising policies.',
    url: 'https://www.meganods.com/privacy',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.meganods.com/privacy',
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
