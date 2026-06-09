import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { StarField } from '@/components/effects/shooting-stars'
import { Preloader } from '@/components/ui/preloader'
import JsonLd from '@/components/seo/json-ld'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'Meganods | Innovating the Future of Technology',
    template: '%s | Meganods'
  },
  description: 'Meganods delivers cutting-edge AI technology, cloud computing, cybersecurity, and digital transformation services to empower businesses worldwide.',
  keywords: ['IT Solutions', 'AI Technology', 'Digital Transformation', 'Cloud Computing', 'Cybersecurity', 'Machine Learning', 'Data Analytics', 'Software Development'],
  authors: [{ name: 'Meganods' }],
  creator: 'Meganods',
  publisher: 'Meganods',
  metadataBase: new URL('https://meganods.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://meganods.com',
    siteName: 'Meganods',
    title: 'Meganods | Innovating the Future of Technology',
    description: 'Innovating the future with AI technology. We provide cutting-edge IT solutions to empower businesses.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Meganods - Innovating the Future of Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meganods | Innovating the Future of Technology',
    description: 'Innovating the future with AI technology. Cutting-edge IT solutions to empower businesses.',
    images: ['/og-image.jpg'],
    creator: '@meganods',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/WhatsApp Image 2026-04-04 at 12.39.24 PM.jpeg',
    apple: '/WhatsApp Image 2026-04-04 at 12.39.24 PM.jpeg',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#ffffff' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <Preloader />
        <StarField />
        <JsonLd />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
