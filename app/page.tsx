import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero'
import { TechShowcaseSlider } from '@/components/sections/tech-showcase-slider'
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
        
        {/* Technology Slider Section */}
        <TechShowcaseSlider />
        
        {/* Section 2: Services Preview */}
        <ServicesPreviewSection />
        
        {/* Section 3: Features */}
        <FeaturesSection />
        
        {/* Section 5: Projects/Case Studies */}
        <ProjectsPreviewSection />
        
        {/* Section 6: Tech Stack */}
        <TechStackSection />
        
        {/* Section 7: Team Preview - Engineering Leadership Hub */}
        <TeamPreviewSection />
        
        {/* Section 8: Testimonials - Trusted by Industry Leaders */}
        <TestimonialsSection />

        {/* Section 9: CTA - Expand the Intelligence Mesh */}
        <CTASection />
        
        {/* Section 10: Blog Preview */}
        <BlogPreviewSection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
