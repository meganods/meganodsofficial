import type { MetadataRoute } from 'next'
import { db } from '@/lib/firebase'
import { collection, getDocs, Timestamp } from 'firebase/firestore'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.meganods.com'
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technologies/neural-ai-cognitive-systems`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technologies/distributed-cloud-edge-mesh`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technologies/zero-trust-cyber-shield`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technologies/spatial-robotics-vision-ai`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technologies/hyper-scale-web-mobile-frameworks`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const blogSnapshot = await getDocs(collection(db, 'blogs'))
    blogRoutes = blogSnapshot.docs.map((docSnap) => {
      const data = docSnap.data()
      const slug = data.slug || docSnap.id
      let postModifiedDate = lastModified
      if (data.updatedAt instanceof Timestamp) {
        postModifiedDate = data.updatedAt.toDate()
      } else if (data.createdAt instanceof Timestamp) {
        postModifiedDate = data.createdAt.toDate()
      }
      return {
        url: `${baseUrl}/blog/${encodeURIComponent(slug)}`,
        lastModified: postModifiedDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })
  } catch (err) {
    console.error('SITEMAP_BLOG_FETCH_ERROR:', err)
  }

  let projectRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/projects/meganods-team-platform`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/deep-threat-sentinel`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/omni-neural-mesh`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/quantum-ledger-core`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/spatial-vision-copilot`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/synapse-biometric-id`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  try {
    const projectSnapshot = await getDocs(collection(db, 'projects'))
    const dynamicProjectRoutes = projectSnapshot.docs
      .map((docSnap) => {
        const data = docSnap.data()
        const slug = data.slug || docSnap.id
        return {
          url: `${baseUrl}/projects/${encodeURIComponent(slug)}`,
          lastModified,
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        }
      })
      .filter((r) => !projectRoutes.some((pr) => pr.url === r.url))
    projectRoutes = [...projectRoutes, ...dynamicProjectRoutes]
  } catch (err) {
    console.error('SITEMAP_PROJECT_FETCH_ERROR:', err)
  }

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
