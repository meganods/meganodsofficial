import Link from 'next/link'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { Cookie, Shield, Eye, Settings, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Cookie Policy | MegaNods',
  description: 'Understand how MegaNods uses cookies, third-party advertising cookies, and tracking technologies to improve your experience.',
}

export default function CookiePolicyPage() {
  const lastUpdated = 'September 30, 2026'

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground pt-32 sm:pt-40 pb-28 selection:bg-indigo-500/20">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          {/* Breadcrumb & Header */}
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Cookie className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-primary font-bold uppercase tracking-[0.3em]">
                Legal & Compliance
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4">
              Cookie Policy
            </h1>
            <p className="text-sm font-mono text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Body Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section className="bg-card/60 border border-border rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-black uppercase text-foreground mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files placed on your computer or mobile device when you visit a website. They are widely used to ensure websites function efficiently, enhance user navigation, and provide analytical reporting to website operators.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground">
                2. Types of Cookies We Use
              </h2>
              <div className="grid gap-4">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-base font-bold text-foreground mb-2">Essential & Functional Cookies</h3>
                  <p className="text-sm">These cookies are necessary for the basic operation and security of our platform, including theme preferences (light/dark mode) and user session state.</p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-base font-bold text-foreground mb-2">Analytics & Performance Cookies</h3>
                  <p className="text-sm">We use analytics cookies (e.g., Google Analytics) to understand how visitors interact with our pages, diagnose technical performance issues, and optimize page load speed.</p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-base font-bold text-foreground mb-2">Third-Party Advertising & AdSense Cookies</h3>
                  <p className="text-sm">Google and authorized third-party ad networks use cookies to serve personalized advertisements based on your visits to our site and other destinations across the web.</p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-indigo-500/5 to-transparent border border-primary/20 rounded-3xl p-8 space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                3. Google AdSense & DART Cookie Disclosure
              </h2>
              <p>
                Google is a third-party vendor on MegaNods. Google uses cookies, including the DoubleClick DART cookie, to serve ads to our visitors based on their browsing activity across the Internet.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Third-party ad servers or networks use cookies, JavaScript, or Web Beacons in their respective advertisements and links that appear on MegaNods.</li>
                <li>You can manage or opt out of personalized Google advertising anytime by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary font-bold underline">Google Ad Settings</a>.</li>
                <li>You can also opt out of third-party vendor cookies for personalized advertising at <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary font-bold underline">aboutads.info</a>.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                4. How You Can Manage Cookies
              </h2>
              <p>
                Most web browsers allow you to control cookies through their browser settings. You can choose to block all cookies, delete existing cookies, or configure alerts when a new cookie is placed on your device.
              </p>
              <p className="text-sm">
                Please note that disabling certain essential cookies may impact specific interactive features or user interface preferences on our platform.
              </p>
            </section>

            <section className="bg-card/60 border border-border rounded-3xl p-8 space-y-3">
              <h2 className="text-xl font-black uppercase text-foreground">5. Contact Us Regarding Cookies</h2>
              <p className="text-sm">
                If you have questions about our Cookie Policy or data handling practices, please contact our compliance team:
              </p>
              <p className="text-sm font-mono text-primary font-bold">
                Email: admin@meganods.com | Phone: +91 8796140682
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
