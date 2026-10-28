import Link from 'next/link'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { Shield, Lock, Eye, Cookie, ArrowLeft } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const lastUpdated = 'September 25, 2026'

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
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-primary font-bold uppercase tracking-[0.3em]">
                Legal Documentation
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm font-mono text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Policy Body */}
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section className="bg-card/60 border border-border rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-black uppercase text-foreground mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                1. Overview & Commitment
              </h2>
              <p>
                At <strong>Meganods</strong> (accessible from <a href="https://www.meganods.com" className="text-primary underline">https://www.meganods.com</a>), your privacy is one of our main priorities. This Privacy Policy document outlines the types of information that is collected and recorded by Meganods and how we use it.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground">
                2. Information We Collect
              </h2>
              <p>
                We may collect personal identification information when you interact with our platform, submit contact inquiries, or subscribe to our intelligence feed. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact information (e.g., email address, phone number).</li>
                <li>Company name, project specifications, and professional requirements.</li>
                <li>Browser telemetry, IP address, device specifications, and page interaction timestamps through standard server log files.</li>
              </ul>
            </section>

            {/* Crucial Google AdSense Disclosure Clause */}
            <section className="bg-gradient-to-br from-indigo-500/5 to-transparent border border-primary/20 rounded-3xl p-8 space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground flex items-center gap-2">
                <Cookie className="w-5 h-5 text-primary" />
                3. Google AdSense & Advertising Cookies
              </h2>
              <p>
                Google is a third-party vendor on our website. It uses cookies, including the DoubleClick DART cookie, to serve ads to our site visitors based on their visit to www.meganods.com and other websites on the internet.
              </p>
              <div className="bg-card border border-border rounded-2xl p-6 space-y-3 text-sm">
                <p className="font-semibold text-foreground">Important Advertising Disclosures:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to your website or other websites.
                  </li>
                  <li>
                    Google’s use of advertising cookies enables it and its partners to serve personalized ads to your users based on their visit to your sites and/or other sites on the Internet.
                  </li>
                  <li>
                    Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary font-bold underline">Google Ads Settings</a>.
                  </li>
                  <li>
                    Alternatively, you can opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary font-bold underline">www.aboutads.info</a>.
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground">
                4. Web Log Files & Analytics
              </h2>
              <p>
                Meganods follows a standard procedure of using log files and modern privacy-centric web analytics (such as Vercel Analytics). The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and number of clicks. These are not linked to any information that is personally identifiable.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground">
                5. Third-Party Privacy Policies
              </h2>
              <p>
                Meganods's Privacy Policy does not apply to other advertisers or websites. We advise you to consult the respective Privacy Policies of these third-party ad servers (such as Google AdSense) for more detailed information, including their practices and instructions about how to opt out of certain options.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground">
                6. GDPR & CCPA Data Protection Rights
              </h2>
              <p>
                We ensure that you are fully aware of all of your data protection rights. Every user is entitled to the following:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>The right to access</strong> — You have the right to request copies of your personal data.</li>
                <li><strong>The right to rectification</strong> — You have the right to request that we correct any information you believe is inaccurate.</li>
                <li><strong>The right to erasure</strong> — You have the right to request that we erase your personal data under certain conditions.</li>
                <li><strong>The right to restrict processing</strong> — You have the right to request that we restrict the processing of your personal data.</li>
              </ul>
            </section>

            <section className="bg-card/60 border border-border rounded-3xl p-8 space-y-3">
              <h2 className="text-xl font-black uppercase text-foreground flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                7. Contact Our Privacy Officer
              </h2>
              <p>
                If you have additional questions or require more information about our Privacy Policy or data practices, do not hesitate to contact us:
              </p>
              <div className="font-mono text-sm space-y-1 text-foreground">
                <p><strong>Email:</strong> <a href="mailto:admin@meganods.com" className="text-primary">admin@meganods.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+918796140682" className="text-primary hover:underline">+91 8796140682</a> / <a href="tel:+917007601257" className="text-primary hover:underline">+91 70076 01257</a> / <a href="tel:+917428128001" className="text-primary hover:underline">+91 7428 128 001</a></p>
                <p><strong>Headquarters:</strong> OC-821 8th Floor, Gaur City Centre, Greater Noida West, Uttar Pradesh, India.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
