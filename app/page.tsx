import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero'
import { FeaturesSection } from '@/components/sections/features'
import { AboutPreviewSection } from '@/components/sections/about-preview'
import { ServicesPreviewSection } from '@/components/sections/services-preview'
import { ProjectsPreviewSection } from '@/components/sections/projects-preview'
import { TestimonialsSection } from '@/components/sections/testimonials'
import { TeamPreviewSection } from '@/components/sections/team-preview'
import { BlogPreviewSection } from '@/components/sections/blog-preview'
import { TechStackSection } from '@/components/sections/tech-stack'
import { CTASection } from '@/components/sections/cta'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <Navigation />
      <main>
        {/* Section 1: Hero */}
        <HeroSection />
        
        {/* Section 2: Services Preview */}
        <ServicesPreviewSection />
        
        {/* Section 3: Features */}
        <FeaturesSection />
        
        {/* Section 5: Projects/Case Studies */}
        <ProjectsPreviewSection />
        
        {/* Section 6: Tech Stack */}
        <TechStackSection />
        
        {/* Section 7: Testimonials */}
        <TestimonialsSection />
        
        {/* Section 8: Team Preview */}
        <TeamPreviewSection />
        
        {/* Section 9: Blog Preview */}
        <BlogPreviewSection />
        
        {/* Section 10: CTA */}
        <CTASection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
