import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Enterprise AI & Cloud Consultation',
  description: 'Contact Meganods for AI solutions, cloud infrastructure, cybersecurity, and digital transformation services. Reach our global offices or submit a project inquiry.',
  keywords: [
    'Contact Meganods',
    'Get in Touch',
    'Project Inquiry',
    'IT Consultation',
    'AI Services Contact',
    'Cloud Computing Contact',
    'Business Inquiry',
  ],
  openGraph: {
    title: 'Contact Us | Enterprise AI & Cloud Consultation',
    description: 'Get in touch with Meganods for AI, cloud, and cybersecurity solutions. Submit your project inquiry today.',
    url: 'https://www.meganods.com/contact',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Meganods - Contact Us',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Enterprise AI & Cloud Consultation',
    description: 'Reach out to Meganods for AI, cloud, and cybersecurity solutions.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.meganods.com/contact',
  },
}

const contactPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://www.meganods.com/contact#webpage',
  url: 'https://www.meganods.com/contact',
  name: 'Contact Meganods',
  description: 'Inquire about enterprise technology partnerships, custom software engineering, and AI consultations with Meganods.',
  mainEntity: {
    '@type': 'Organization',
    name: 'Meganods',
    url: 'https://www.meganods.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'admin@meganods.com',
        telephone: '+918796140682',
        availableLanguage: ['English', 'Hindi'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'client operations',
        email: 'admin@meganods.com',
        telephone: '+917838130064',
        availableLanguage: ['English', 'Hindi'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'technical inquiries',
        email: 'admin@meganods.com',
        telephone: '+917428128001',
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'OC-821, 8th Floor, Gaur City Centre, Greater Noida West',
      addressLocality: 'Greater Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201306',
      addressCountry: 'IN',
    },
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      {children}
    </>
  )
}
