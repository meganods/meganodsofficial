import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enterprise Services | AI, Cloud & Cybersecurity',
  description: 'Explore Meganods services — AI & Machine Learning solutions, cloud infrastructure, cybersecurity operations, data analytics, and enterprise web & mobile development.',
  keywords: [
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
    title: 'Enterprise Services | AI, Cloud & Cybersecurity',
    description: 'Multi-sector intelligence and high-performance infrastructure services by Meganods. AI, cloud, security, and custom software development.',
    url: 'https://www.meganods.com/services',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Meganods Enterprise Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise Services | AI, Cloud & Cybersecurity',
    description: 'Multi-sector intelligence and high-performance infrastructure services by Meganods.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.meganods.com/services',
  },
}

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Meganods Technology Services',
  description: 'Comprehensive enterprise services spanning Artificial Intelligence, Cloud Infrastructure, Cybersecurity, and Software Engineering.',
  url: 'https://www.meganods.com/services',
  numberOfItems: 6,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'AI & Neural Systems Development',
        description: 'End-to-end machine learning engineering, LLM pipeline fine-tuning, autonomous agents, and computer vision architectures.',
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
        name: 'Cloud Mesh & Edge Infrastructure',
        description: 'Kubernetes orchestration, multi-cloud disaster resilience, serverless architectures, and sub-45ms latency optimization.',
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
        name: 'Zero-Trust Cybersecurity & Defense',
        description: 'eBPF kernel-level threat detection, penetration testing, cryptographic security audits, and continuous compliance monitoring.',
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
        name: 'Real-Time Data Analytics & BI',
        description: 'Scalable data lakes, streaming ETL pipelines with Kafka, vector database search, and executive analytics dashboards.',
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
        name: 'High-Performance Web & Mobile Engineering',
        description: 'Ultra-fast Next.js web applications, responsive cross-platform React Native apps, and micro-frontend design systems.',
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
        name: 'Digital Transformation & Legacy Modernization',
        description: 'Migrating monolithic systems to event-driven microservices with zero downtime and automated CI/CD deployment pipelines.',
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
