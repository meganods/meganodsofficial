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

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children
}
