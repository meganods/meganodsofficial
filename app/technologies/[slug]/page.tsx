import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { TECHNOLOGIES_DATA } from '@/lib/data/technologies'
import { TechnologyDetailView } from '@/components/technologies/technology-detail-view'

export function generateStaticParams() {
  return TECHNOLOGIES_DATA.map((t) => ({
    slug: t.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tech = TECHNOLOGIES_DATA.find((t) => t.slug === slug)

  if (!tech) {
    return {
      title: 'Technology Not Found | Meganods',
    }
  }

  const pageUrl = `https://meganods.com/technologies/${encodeURIComponent(slug)}`

  return {
    title: `${tech.title} | Meganods Technology Stack`,
    description: tech.description,
    keywords: [
      tech.title,
      tech.category,
      ...tech.techStack,
      'Meganods Technology',
      'Enterprise Architecture',
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${tech.title} | Meganods`,
      description: tech.description,
      url: pageUrl,
      type: 'website',
      siteName: 'Meganods',
      images: [
        {
          url: tech.image,
          width: 1200,
          height: 630,
          alt: tech.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tech.title} | Meganods`,
      description: tech.description,
      images: [tech.image],
      creator: '@meganods',
    },
  }
}

export default async function TechnologyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tech = TECHNOLOGIES_DATA.find((t) => t.slug === slug)

  if (!tech) {
    notFound()
  }

  const pageUrl = `https://meganods.com/technologies/${encodeURIComponent(slug)}`

  // FAQ Schema
  const faqSchema = tech.faqs && tech.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tech.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null

  // TechArticle / Service Schema
  const techArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    headline: tech.title,
    description: tech.description,
    image: [`https://meganods.com${tech.image}`],
    author: {
      '@type': 'Organization',
      name: 'Meganods',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Meganods',
      logo: {
        '@type': 'ImageObject',
        url: 'https://meganods.com/logo.png',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <TechnologyDetailView tech={tech} />
    </>
  )
}
