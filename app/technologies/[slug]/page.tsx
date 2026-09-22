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

  return {
    title: `${tech.title} | Meganods Technology Stack`,
    description: tech.description,
    openGraph: {
      title: `${tech.title} | Meganods`,
      description: tech.description,
      images: [
        {
          url: tech.image,
          width: 1200,
          height: 630,
          alt: tech.title,
        },
      ],
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

  return <TechnologyDetailView tech={tech} />
}
