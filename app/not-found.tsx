import Link from 'next/link'
import type { Metadata } from 'next'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Database, Home } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page Not Found (404) | Meganods',
  description: 'The requested page could not be located on the Meganods network.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center pt-32 pb-24 selection:bg-indigo-500/20">
        <div className="w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-8 shadow-2xl">
          <Database className="w-12 h-12" />
        </div>
        
        <span className="text-xs font-mono text-primary font-bold uppercase tracking-[0.4em] mb-3">
          Error 404 • Node Unreachable
        </span>
        
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-foreground mb-6">
          Page Not Found
        </h1>
        
        <p className="text-muted-foreground text-base sm:text-lg max-w-lg mb-10 leading-relaxed font-medium">
          The requested coordinate does not exist or has been relocated within the Meganods intelligence network.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/">
            <Button className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl border-0">
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="outline" className="h-14 px-8 rounded-2xl text-xs uppercase tracking-widest font-bold">
              <span>Explore Services</span>
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
