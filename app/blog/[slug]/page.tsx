import type { Metadata } from 'next'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, limit, doc, getDoc, Timestamp } from 'firebase/firestore'
import { BlogDetailView } from '@/components/blog/blog-detail-view'
import { defaultBlogs } from '@/lib/data/blogs'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return defaultBlogs.map((b) => ({
    slug: b.slug,
  }))
}

function stripHtml(html: string = ''): string {
  return html.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim()
}

async function getBlogPost(slug: string) {
  try {
    const q = query(collection(db, 'blogs'), where('slug', '==', slug), limit(1))
    const querySnapshot = await getDocs(q)

    let postData: any = null

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0]
      postData = { id: docSnap.id, ...docSnap.data() }
    } else {
      const docRef = doc(db, 'blogs', slug)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        postData = { id: docSnap.id, ...docSnap.data() }
      }
    }

    // Fallback to rich static humanized articles
    if (!postData) {
      const localPost = defaultBlogs.find((b) => b.slug === slug || b.id === slug)
      if (localPost) {
        postData = { ...localPost }
      }
    }

    if (!postData) return { post: null, relatedPosts: [] }

    // Format timestamps for serialization
    let dateStr = postData.date || 'Recent'
    if (postData.createdAt instanceof Timestamp) {
      dateStr = postData.createdAt.toDate().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    }
    const formattedPost = {
      ...postData,
      date: dateStr,
    }

    // Fetch related posts
    let relatedPosts: any[] = []
    if (postData.category) {
      const relatedQ = query(
        collection(db, 'blogs'),
        where('category', '==', postData.category),
        limit(4)
      )
      const relatedSnap = await getDocs(relatedQ)
      relatedPosts = relatedSnap.docs
        .map((d) => {
          const rData = d.data()
          let rDate = rData.date || 'Recent'
          if (rData.createdAt instanceof Timestamp) {
            rDate = rData.createdAt.toDate().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          }
          return { id: d.id, ...rData, date: rDate }
        })
        .filter((d) => d.id !== postData.id)
    }

    return { post: formattedPost, relatedPosts }
  } catch (error) {
    console.error('SERVER_BLOG_FETCH_ERROR:', error)
    return { post: null, relatedPosts: [] }
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { post } = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Article Not Found | Meganods Insights',
      description: 'The requested technical insight article could not be found.',
    }
  }

  const rawDescription = post.excerpt || stripHtml(post.content || '').slice(0, 160)
  const description = rawDescription.length > 160 ? `${rawDescription.slice(0, 157)}...` : rawDescription
  const pageUrl = `https://www.meganods.com/blog/${encodeURIComponent(slug)}`
  const ogImage = post.imageUrl || '/og-image.jpg'
  const authorName = post.author?.name || (typeof post.author === 'string' ? post.author : 'Meganods Team')

  return {
    title: `${post.title} | Meganods Insights`,
    description,
    keywords: post.tags || [post.category, 'AI', 'Cloud Computing', 'Tech Insights', 'Meganods'],
    authors: [{ name: authorName }],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: post.title,
      description,
      url: pageUrl,
      type: 'article',
      siteName: 'Meganods',
      publishedTime: post.createdAt?.toDate ? post.createdAt.toDate().toISOString() : undefined,
      authors: [authorName],
      tags: post.tags || [post.category],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImage],
      creator: '@meganods',
    },
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const { post, relatedPosts } = await getBlogPost(slug)

  let blogPostingSchema: any = null
  if (post) {
    const rawDescription = post.excerpt || stripHtml(post.content || '').slice(0, 160)
    const authorName = post.author?.name || (typeof post.author === 'string' ? post.author : 'Meganods Team')
    const pageUrl = `https://www.meganods.com/blog/${encodeURIComponent(slug)}`

    blogPostingSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl,
      },
      headline: post.title,
      description: rawDescription,
      image: post.imageUrl ? [post.imageUrl] : ['https://www.meganods.com/og-image.jpg'],
      datePublished: post.createdAt?.toDate ? post.createdAt.toDate().toISOString() : post.date,
      dateModified: post.updatedAt?.toDate ? post.updatedAt.toDate().toISOString() : (post.createdAt?.toDate ? post.createdAt.toDate().toISOString() : post.date),
      author: {
        '@type': 'Person',
        name: authorName,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Meganods',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.meganods.com/logo.png',
        },
      },
      articleSection: post.category,
      keywords: post.tags ? post.tags.join(', ') : undefined,
    }
  }

  return (
    <>
      {blogPostingSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
        />
      )}
      <BlogDetailView initialPost={post} initialRelatedPosts={relatedPosts} slug={slug} />
    </>
  )
}
