import type { Metadata } from 'next'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, limit } from 'firebase/firestore'
import { defaultProjects, ProjectNode } from '@/lib/data/projects'
import { ProjectDetailView } from '@/components/projects/project-detail-view'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return defaultProjects.map((p) => ({
    slug: p.slug,
  }))
}

async function getProject(slug: string) {
  try {
    const fallback = defaultProjects.find((p) => p.slug === slug)
    const q = query(collection(db, 'projects'), where('slug', '==', slug), limit(1))
    const querySnapshot = await getDocs(q)

    let projectData = fallback || null

    if (!querySnapshot.empty) {
      const liveData = querySnapshot.docs[0].data() as ProjectNode
      projectData = { ...fallback, ...liveData }
    }

    if (!projectData) return { project: null, relatedProjects: [] }

    const related = defaultProjects.filter((p) => p.slug !== slug).slice(0, 3)
    return { project: projectData, relatedProjects: related }
  } catch (error) {
    console.error('PROJECT_FETCH_ERROR:', error)
    const fallback = defaultProjects.find((p) => p.slug === slug)
    const related = defaultProjects.filter((p) => p.slug !== slug).slice(0, 3)
    return { project: fallback || null, relatedProjects: related }
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { project } = await getProject(slug)

  if (!project) {
    return {
      title: 'Project Case Study | Meganods',
      description: 'Explore enterprise technology deployments and case studies by Meganods.',
    }
  }

  const pageUrl = `https://www.meganods.com/projects/${encodeURIComponent(slug)}`
  const ogImage = project.heroImage || '/og-image.jpg'

  return {
    title: `${project.title} | Meganods Case Study`,
    description: project.description || project.tagline || `Case study on ${project.title} by Meganods.`,
    keywords: [
      project.title,
      project.category,
      ...(project.technologies || []),
      'Case Study',
      'Enterprise Deployment',
      'Meganods Project',
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.description || project.tagline,
      url: pageUrl,
      type: 'website',
      siteName: 'Meganods',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Meganods Case Study`,
      description: project.description || project.tagline,
      images: [ogImage],
      creator: '@meganods',
    },
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const { project, relatedProjects } = await getProject(slug)

  let creativeWorkSchema: any = null
  if (project) {
    const pageUrl = `https://www.meganods.com/projects/${encodeURIComponent(slug)}`
    creativeWorkSchema = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl,
      },
      name: project.title,
      headline: project.title,
      description: project.description || project.tagline,
      image: project.heroImage ? [`https://www.meganods.com${project.heroImage.startsWith('/') ? '' : '/'}${project.heroImage}`] : ['https://www.meganods.com/og-image.jpg'],
      creator: {
        '@type': 'Organization',
        name: 'Meganods',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Meganods',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.meganods.com/logo.png',
        },
      },
      keywords: project.technologies ? project.technologies.join(', ') : undefined,
    }
  }

  return (
    <>
      {creativeWorkSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
        />
      )}
      <ProjectDetailView
        initialProject={project}
        initialRelatedProjects={relatedProjects}
        slug={slug}
      />
    </>
  )
}
