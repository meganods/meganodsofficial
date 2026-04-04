import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { StarField } from '@/components/effects/shooting-stars'
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
    default: 'NexaTech Solutions | AI-Powered IT Services & Digital Transformation',
    template: '%s | NexaTech Solutions'
  },
  description: 'NexaTech Solutions delivers cutting-edge AI technology, cloud computing, cybersecurity, and digital transformation services to empower businesses worldwide.',
  keywords: ['IT Solutions', 'AI Technology', 'Digital Transformation', 'Cloud Computing', 'Cybersecurity', 'Machine Learning', 'Data Analytics', 'Software Development'],
  authors: [{ name: 'NexaTech Solutions' }],
  creator: 'NexaTech Solutions',
  publisher: 'NexaTech Solutions',
  metadataBase: new URL('https://nexatech.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nexatech.com',
    siteName: 'NexaTech Solutions',
    title: 'NexaTech Solutions | AI-Powered IT Services & Digital Transformation',
    description: 'Revolutionizing the future with AI technology. We provide cutting-edge IT solutions to empower businesses.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NexaTech Solutions - AI Technology Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexaTech Solutions | AI-Powered IT Services',
    description: 'Revolutionizing the future with AI technology. Cutting-edge IT solutions to empower businesses.',
    images: ['/og-image.jpg'],
    creator: '@nexatech',
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
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0a0a12' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a12' },
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
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <StarField />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
