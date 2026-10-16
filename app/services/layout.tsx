import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enterprise Software Company & IT Solutions | Web Development Company | Meganods',
  description: 'Meganods is a premier enterprise software company and IT company in India. We specialize in custom software development, full-stack web development, mobile apps, enterprise AI, cloud architecture, and cybersecurity.',
  keywords: [
    // High-Priority Commercial Buyer Keywords (Top Priority)
    'Software Company',
    'Software Development Company',
    'IT Company',
    'IT Company in India',
    'Web Development Company',
    'Custom Software Development Company',
    'Full-Stack Web Development Company',
    'Mobile App Development Company',
    'IT Services & Solutions Company',
    'Enterprise Software Company',
    'AI Software Company',
    'Cloud Computing Company',
    'Cybersecurity Company',
    'Next.js Web Development Agency',

    // Technical Domain & Category Keywords (Original Keywords)
    'IT Services',
    'AI Solutions',
    'Cloud Computing',
    'Cybersecurity',
    'Data Analytics',
    'Machine Learning',
    'Enterprise Software',
    'Mobile Development',
    'Web Development',
    'Meganods Services',
  ],
  openGraph: {
    title: 'Enterprise Software Company & IT Solutions | Meganods',
    description: 'Premier enterprise software company and web development agency. Custom software, AI systems, cloud infrastructure, and cybersecurity.',
    url: 'https://www.meganods.com/services',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Meganods Enterprise Software and IT Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise Software Company & IT Solutions | Meganods',
    description: 'Multi-sector intelligence, custom software engineering, and web development services by Meganods.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.meganods.com/services',
  },
}

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Meganods Software & IT Services',
  description: 'Enterprise technology services spanning Custom Software Development, Web Development, Mobile Apps, AI Engineering, Cloud Infrastructure, and Cybersecurity.',
  url: 'https://www.meganods.com/services',
  numberOfItems: 6,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'Custom Software Development & Cognitive AI',
        serviceType: 'Software Development Company',
        description: 'End-to-end custom software development, enterprise machine learning engineering, LLM pipeline fine-tuning, and autonomous agents.',
        provider: {
          '@type': 'Organization',
          name: 'Meganods',
          url: 'https://www.meganods.com',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'Web Development Company & High-Scale Platforms',
        serviceType: 'Web Development Company',
        description: 'High-performance Next.js 16 web applications, distributed edge systems, micro-frontends, and scalable cloud database clusters.',
        provider: {
          '@type': 'Organization',
          name: 'Meganods',
          url: 'https://www.meganods.com',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'Mobile App Development Company',
        serviceType: 'Mobile Application Development',
        description: 'Fluid iOS and Android mobile app development engineered with React Native and native Swift/Kotlin architectures.',
        provider: {
          '@type': 'Organization',
          name: 'Meganods',
          url: 'https://www.meganods.com',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        name: 'Cloud Infrastructure & DevOps IT Company',
        serviceType: 'IT Solutions & Cloud',
        description: 'Multi-region cloud infrastructure, Kubernetes orchestration, automated CI/CD pipelines, and 99.99% uptime SLA.',
        provider: {
          '@type': 'Organization',
          name: 'Meganods',
          url: 'https://www.meganods.com',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'Service',
        name: 'Zero-Trust Cybersecurity & IT Compliance',
        serviceType: 'Cybersecurity Company',
        description: 'Proactive penetration testing, FIDO2 WebAuthn authentication, eBPF kernel-level monitoring, and SOC2/ISO compliance.',
        provider: {
          '@type': 'Organization',
          name: 'Meganods',
          url: 'https://www.meganods.com',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 6,
      item: {
        '@type': 'Service',
        name: 'Business Automation & Custom CRM Software',
        serviceType: 'Enterprise Software Solutions',
        description: 'Bespoke internal software tools, ERP systems, lead routing pipelines, and automated multi-step business logic.',
        provider: {
          '@type': 'Organization',
          name: 'Meganods',
          url: 'https://www.meganods.com',
        },
      },
    },
  ],
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      {children}
    </>
  )
}
