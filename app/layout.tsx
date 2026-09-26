import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { StarField } from '@/components/effects/shooting-stars'
import { Preloader } from '@/components/ui/preloader'
import { CustomCursor } from '@/components/effects/custom-cursor'
import { CookieConsent } from '@/components/ui/cookie-consent'
import { CommandPalette } from '@/components/ui/command-palette'
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
  metadataBase: new URL('https://www.meganods.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.meganods.com',
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
    creator: '@MegaNods33550',
    site: '@MegaNods33550',
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
    icon: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://www.meganods.com',
  },
  verification: {
    google: 'google02c5a4427971ec21',
  },
  other: {
    'google-adsense-account': 'ca-pub-5266755800049907',
  },
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
      <head>
        {/* Google AdSense Account Meta Tag */}
        <meta name="google-adsense-account" content="ca-pub-5266755800049907" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {/* Google AdSense Script */}
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5266755800049907"
          crossOrigin="anonymous"
        />

        {/* Google tag (gtag.js) for Google Analytics & Google Ads */}
        <Script
          id="gtag-loader"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-EHJZPCJ8NP"
        />
        <Script
          id="gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EHJZPCJ8NP');
              gtag('config', 'AW-18420745292');
            `,
          }}
        />
        <CustomCursor />
        <Preloader />
        <StarField />
        <JsonLd />
        <CookieConsent />
        <CommandPalette />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
