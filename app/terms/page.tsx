import Link from 'next/link'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { FileText, ArrowLeft, CheckCircle2, Scale, AlertTriangle, ShieldCheck } from 'lucide-react'

export default function TermsOfServicePage() {
  const lastUpdated = 'September 25, 2026'

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground pt-32 sm:pt-40 pb-28 selection:bg-indigo-500/20">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          {/* Header */}
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
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-primary font-bold uppercase tracking-[0.3em]">
                Terms & Agreement
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-sm font-mono text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <section className="bg-card/60 border border-border rounded-3xl p-8 shadow-sm space-y-3">
              <h2 className="text-xl font-black uppercase text-foreground flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" />
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using the <strong>Meganods</strong> website (<a href="https://www.meganods.com" className="text-primary underline">https://www.meganods.com</a>) and our related services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground">
                2. Intellectual Property Rights
              </h2>
              <p>
                All intellectual property, proprietary software, design systems, visual assets, trademarks, and documentation published on this website are the sole property of Meganods. Permission is granted to view and use materials for informational purposes only. You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modify or copy proprietary codebases, algorithms, or visual design elements.</li>
                <li>Use materials for unauthorized commercial purposes or public display without prior written consent.</li>
                <li>Attempt to decompile or reverse engineer any software or neural model interfaces hosted on the platform.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                3. Service Deliverables & Engagements
              </h2>
              <p>
                Meganods provides enterprise-grade AI architecture, cloud infrastructure, cybersecurity, and digital transformation consulting. Specific service deliverables, timelines, and SLAs are governed by mutually executed master service agreements (MSAs) and statements of work (SOWs).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                4. Disclaimers & Limitation of Liability
              </h2>
              <p>
                The materials on Meganods's website are provided on an 'as is' basis. Meganods makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
              <p>
                In no event shall Meganods or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Meganods's website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground">
                5. Third-Party Links & Advertising
              </h2>
              <p>
                Meganods has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link or third-party advertisement (including Google AdSense) does not imply endorsement by Meganods. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground">
                6. Governing Law
              </h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India and applicable international digital trade regulations, and you irrevocably submit to the exclusive jurisdiction of the competent courts.
              </p>
            </section>

            <section className="bg-card/60 border border-border rounded-3xl p-8 space-y-3">
              <h2 className="text-xl font-black uppercase text-foreground">
                7. Contact Information
              </h2>
              <p>
                For questions regarding these Terms of Service, please contact our legal desk:
              </p>
              <div className="font-mono text-sm space-y-1 text-foreground">
                <p><strong>Email:</strong> <a href="mailto:admin@meganods.com" className="text-primary">admin@meganods.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+918796140682" className="text-primary hover:underline">+91 8796140682</a> / <a href="tel:+917007601257" className="text-primary hover:underline">+91 70076 01257</a> / <a href="tel:+917428128001" className="text-primary hover:underline">+91 7428 128 001</a></p>
                <p><strong>Organization:</strong> Meganods Official Legal Operations</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
