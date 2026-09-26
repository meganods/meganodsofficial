export default function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Meganods',
    url: 'https://www.meganods.com',
    logo: 'https://www.meganods.com/logo.png',
    description: 'Meganods delivers cutting-edge AI technology, cloud computing, cybersecurity, and digital transformation services to empower businesses worldwide.',
    foundingDate: '2015',
    contactPoint: {
      '@type': 'ContactPoint',
      description: 'Meganods is a strategic intelligence and neural infrastructure hub.',
      email: 'admin@meganods.com',
      telephone: '+918796140682',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://www.linkedin.com/in/meganods-08b7b5400/',
      'https://www.instagram.com/mega.nods/',
      'https://twitter.com/meganods',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'OC-821, 8th Floor, Gaur City Centre, Greater Noida West',
      addressLocality: 'Greater Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201306',
      addressCountry: 'IN',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Meganods',
    url: 'https://www.meganods.com',
    description: 'Innovating the Future of Technology — AI, Cloud Computing, Cybersecurity & Digital Transformation',
    publisher: {
      '@type': 'Organization',
      name: 'Meganods',
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
