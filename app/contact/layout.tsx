import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Get in Touch with Meganods',
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
    title: 'Contact Us | Meganods',
    description: 'Get in touch with Meganods for AI, cloud, and cybersecurity solutions. Submit your project inquiry today.',
    url: 'https://www.meganods.com/contact',
    type: 'website',
  },
  twitter: {
    title: 'Contact Meganods | Get in Touch',
    description: 'Reach out to Meganods for AI, cloud, and cybersecurity solutions.',
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
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'admin@meganods.com',
      telephone: '+918796140682',
      availableLanguage: ['English', 'Hindi'],
    },
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
