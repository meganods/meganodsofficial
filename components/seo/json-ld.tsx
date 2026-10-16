export default function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'Corporation', 'ITService'],
    '@id': 'https://www.meganods.com/#organization',
    name: 'Meganods',
    legalName: 'Meganods Technologies',
    alternateName: ['MegaNods', 'Meganods Technologies', 'Meganods Official', 'Meganods Software Company'],
    url: 'https://www.meganods.com',
    logo: 'https://www.meganods.com/logo.png',
    image: 'https://www.meganods.com/og-image.jpg',
    description: 'Meganods is a premier enterprise software company and IT company in India, delivering custom software development, full-stack web development, mobile apps, enterprise AI, cloud architecture, and cybersecurity.',
    slogan: 'Innovating the Future of Technology',
    foundingDate: '2025',
    priceRange: '$$ - $$$',
    currenciesAccepted: 'USD, INR, EUR, GBP, AED',
    paymentAccepted: 'Credit Card, Wire Transfer, Bank Transfer, UPI',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 10,
      maxValue: 50,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    areaServed: [
      { '@type': 'GeoShape', name: 'Worldwide' },
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
    knowsAbout: [
      'Software Company',
      'Software Development Company',
      'IT Company',
      'Web Development Company',
      'Mobile App Development Company',
      'Custom Enterprise Software Engineering',
      'Artificial Intelligence & Generative AI',
      'Cloud Architecture & Edge Computing',
      'Zero-Trust Cybersecurity',
      'High-Performance Next.js Engineering',
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
      name: 'Meganods Enterprise Software & IT Services Catalog',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Software Development & Cognitive AI',
            serviceType: 'Software Development Company',
            description: 'Custom machine learning models, autonomous agent frameworks, and enterprise software engineering.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'High-Scale Web Development & SaaS Platforms',
            serviceType: 'Web Development Company',
            description: 'Lightning-fast Next.js web applications, full-stack micro-frontends, and distributed edge architectures.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Native & Cross-Platform Mobile App Development',
            serviceType: 'Mobile App Development Company',
            description: 'Fluid iOS and Android mobile apps engineered with React Native and native Swift/Kotlin architectures.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cloud Mesh & DevOps Infrastructure Modernization',
            serviceType: 'IT Solutions & Cloud Infrastructure',
            description: 'Multi-cloud architecture, Kubernetes orchestration, and sub-45ms latency distributed networks.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Zero-Trust Cybersecurity & IT Compliance',
            serviceType: 'Cybersecurity Company',
            description: 'Proactive penetration testing, eBPF runtime monitoring, FIDO2 WebAuthn, and enterprise security compliance.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Process Automation, ERP & Custom CRM Solutions',
            serviceType: 'Enterprise Software Solutions',
            description: 'Bespoke CRM systems, workflow automation engines, and custom enterprise tools that eliminate manual friction.',
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
