export default function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.meganods.com/#organization',
    name: 'Meganods',
    alternateName: ['MegaNods', 'Meganods Technologies', 'Meganods Official'],
    url: 'https://www.meganods.com',
    logo: 'https://www.meganods.com/logo.png',
    image: 'https://www.meganods.com/og-image.jpg',
    description: 'Meganods delivers cutting-edge AI technology, cloud computing, cybersecurity, and digital transformation services to empower businesses worldwide.',
    slogan: 'Innovating the Future of Technology',
    foundingDate: '2025',
    areaServed: [
      { '@type': 'GeoShape', name: 'Worldwide' },
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Generative AI & LLM Systems',
      'Cloud Architecture & Edge Computing',
      'Zero-Trust Cybersecurity',
      'High-Performance Web & Mobile Engineering',
      'Real-Time Big Data Analytics',
      'Distributed Systems & Microservices',
      'Kubernetes & eBPF Security',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'admin@meganods.com',
      telephone: '+918796140682',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://www.linkedin.com/in/meganods-08b7b5400/',
      'https://www.instagram.com/mega.nods/',
      'https://x.com/MegaNods33550',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'OC-821, 8th Floor, Gaur City Centre, Greater Noida West',
      addressLocality: 'Greater Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201306',
      addressCountry: 'IN',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Meganods Enterprise Tech Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI & Neural Systems Development',
            description: 'Custom machine learning models, autonomous agent frameworks, and LLM integrations.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cloud Mesh & Infrastructure Modernization',
            description: 'Multi-cloud architecture, Kubernetes orchestration, and sub-45ms latency distributed networks.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Zero-Trust Cybersecurity Architecture',
            description: 'Proactive penetration testing, eBPF runtime monitoring, and enterprise security compliance.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'High-Performance Web & Mobile Engineering',
            description: 'Scalable Next.js, React Native, and full-stack software applications engineered for global scale.',
          },
        },
      ],
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.meganods.com/#website',
    name: 'Meganods',
    alternateName: ['MegaNods', 'Meganods Tech'],
    url: 'https://www.meganods.com',
    description: 'Innovating the Future of Technology — AI, Cloud Computing, Cybersecurity & Digital Transformation',
    publisher: {
      '@id': 'https://www.meganods.com/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.meganods.com/blog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.meganods.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.meganods.com/about' },
      { '@type': 'ListItem', position: 3, name: 'Services', item: 'https://www.meganods.com/services' },
      { '@type': 'ListItem', position: 4, name: 'Projects', item: 'https://www.meganods.com/projects' },
      { '@type': 'ListItem', position: 5, name: 'Team', item: 'https://www.meganods.com/team' },
      { '@type': 'ListItem', position: 6, name: 'Blog', item: 'https://www.meganods.com/blog' },
      { '@type': 'ListItem', position: 7, name: 'Contact', item: 'https://www.meganods.com/contact' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
