import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Testimonials | Trusted Enterprise Reviews',
  description: 'Read verified testimonials from Meganods clients worldwide. See why Fortune 500 companies and startups trust us for AI, cloud, and cybersecurity solutions.',
  keywords: ['Testimonials', 'Client Reviews', 'Customer Feedback', 'Enterprise Partners', 'Meganods Reviews', 'IT Services Reviews', 'Trusted Technology Partner'],
  openGraph: {
    title: 'Client Testimonials | Trusted Enterprise Reviews',
    description: 'Verified testimonials from global enterprises who trust Meganods for AI, cloud, and cybersecurity solutions.',
    url: 'https://www.meganods.com/testimonials',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Meganods Client Testimonials',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Testimonials | Trusted Enterprise Reviews',
    description: 'See why enterprises trust Meganods for technology solutions.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.meganods.com/testimonials',
  },
}

const testimonialsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.meganods.com/#organization',
  name: 'Meganods Technologies',
  url: 'https://www.meganods.com',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '48',
    reviewCount: '48',
  },
  review: [
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Arjun Mehta',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
      },
      reviewBody: 'MegaNods rebuilt our entire backend in 6 weeks — something we were told would take 6 months. Their technical depth in vector search and Kubernetes is exceptional.',
    },
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Priya Nair',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
      },
      reviewBody: 'We engaged MegaNods for a critical AI-powered customer intelligence platform. They delivered a fully production-ready system on time, on budget, with zero compromise on quality.',
    },
  ],
}

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(testimonialsJsonLd) }}
      />
      {children}
    </>
  )
}
