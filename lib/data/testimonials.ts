export interface TestimonialItem {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
  tag: string
  verified: boolean
}

export const defaultTestimonials: TestimonialItem[] = [
  {
    id: "t-01",
    name: "Arjun Mehta",
    role: "CEO",
    company: "NexaScale Technologies · Mumbai",
    content: "MegaNods rebuilt our entire backend in 6 weeks — something we were told would take 6 months. Their technical depth in vector search and Kubernetes is unlike anything I have encountered in 12 years of building startups.",
    avatar: "/testimonials/arjun-mehta.jpg",
    rating: 5,
    tag: "Enterprise SaaS",
    verified: true
  },
  {
    id: "t-02",
    name: "Priya Nair",
    role: "Head of Digital Operations",
    company: "Tata Consultancy Group · Bengaluru",
    content: "We engaged MegaNods for a critical AI-powered customer intelligence platform. They delivered a fully production-ready system on time, on budget, with zero compromise on quality. They are now our first call for every major initiative.",
    avatar: "/testimonials/priya-nair.jpg",
    rating: 5,
    tag: "Digital Transformation",
    verified: true
  },
  {
    id: "t-03",
    name: "Rajan Sharma",
    role: "CTO",
    company: "PayVault Fintech · Delhi",
    content: "MegaNods is the only team that truly understood our compliance requirements and delivered a PCI-DSS grade payment infrastructure without a single security regression. Their engineers think like architects, not just coders.",
    avatar: "/testimonials/rajan-sharma.jpg",
    rating: 5,
    tag: "Fintech Infrastructure",
    verified: true
  },
  {
    id: "t-04",
    name: "Kavya Reddy",
    role: "Founder",
    company: "EduBridge AI · Hyderabad",
    content: "From MVP to 50,000 active users in under 4 months — MegaNods made that possible. They don't just build what you ask for, they challenge assumptions and engineer resilient distributed architectures that scale smoothly.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    tag: "EdTech AI Product",
    verified: true
  },
  {
    id: "t-05",
    name: "Vikram Singh",
    role: "VP Engineering",
    company: "LogiTrack Corp · Pune",
    content: "MegaNods automated our entire warehouse and delivery orchestration. The system now handles 200,000+ daily transactions with 99.98% uptime. What impressed me most was how deeply they understood operational constraints.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    tag: "Supply Chain Automation",
    verified: true
  },
  {
    id: "t-06",
    name: "Sana Mirza",
    role: "Product Director",
    company: "ClearView Analytics · Bangalore",
    content: "Every sprint was clean, every delivery was documented with full transparency, and they proactively caught security and scaling bottlenecks before release. Absolutely brilliant team.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    tag: "Data & Analytics",
    verified: true
  }
]
