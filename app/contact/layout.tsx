import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Get in Touch with Meganods',
  description: 'Contact Meganods for AI solutions, cloud infrastructure, cybersecurity, and digital transformation services. Reach our global offices or submit a project inquiry.',
  keywords: ['Contact Meganods', 'Get in Touch', 'Project Inquiry', 'IT Consultation', 'AI Services Contact', 'Cloud Computing Contact', 'Business Inquiry'],
  openGraph: {
    title: 'Contact Us | Meganods',
    description: 'Get in touch with Meganods for AI, cloud, and cybersecurity solutions. Submit your project inquiry today.',
    url: 'https://meganods.com/contact',
    type: 'website',
  },
  twitter: {
    title: 'Contact Meganods | Get in Touch',
    description: 'Reach out to Meganods for AI, cloud, and cybersecurity solutions.',
  },
  alternates: {
    canonical: 'https://meganods.com/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
