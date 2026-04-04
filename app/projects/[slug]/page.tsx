"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Clock, CheckCircle, ArrowRight } from "lucide-react"
import { use } from "react"

const projects = {
  "ai-analytics-platform": {
    title: "AI-Powered Analytics Platform",
    category: "Artificial Intelligence",
    client: "TechCorp Industries",
    duration: "8 months",
    team: "12 specialists",
    year: "2024",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=700&fit=crop",
    description: "A comprehensive AI-powered analytics platform that transforms raw data into actionable business insights, featuring real-time dashboards, predictive analytics, and automated reporting.",
    challenge: "TechCorp Industries was struggling with data silos across multiple departments, making it difficult to gain unified insights and make data-driven decisions. Their existing analytics tools were outdated and couldn't handle the volume of data being generated.",
    solution: "We developed a custom AI-powered analytics platform that integrates data from all sources, applies machine learning algorithms for predictive insights, and presents information through intuitive dashboards accessible to all stakeholders.",
    results: [
      { metric: "40%", label: "Increase in operational efficiency" },
      { metric: "60%", label: "Reduction in reporting time" },
      { metric: "25%", label: "Cost savings in first year" },
      { metric: "3x", label: "Faster decision making" }
    ],
    features: [
      "Real-time data integration from 20+ sources",
      "AI-powered predictive analytics engine",
      "Custom dashboard builder with drag-and-drop",
      "Automated report generation and scheduling",
      "Role-based access control and security",
      "Mobile-responsive design for on-the-go access"
    ],
    technologies: ["Python", "TensorFlow", "React", "PostgreSQL", "AWS", "Docker", "Kubernetes"],
    testimonial: {
      quote: "NexusTech transformed how we understand our business. The AI analytics platform has become indispensable for our daily operations and strategic planning.",
      author: "Michael Roberts",
      role: "CTO, TechCorp Industries",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop"
    ]
  },
  "secure-cloud-infrastructure": {
    title: "Enterprise Cloud Infrastructure",
    category: "Cloud Solutions",
    client: "GlobalFinance Corp",
    duration: "12 months",
    team: "18 specialists",
    year: "2024",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=700&fit=crop",
    description: "A secure, scalable cloud infrastructure solution designed for financial services, featuring multi-region deployment, real-time monitoring, and compliance with international banking regulations.",
    challenge: "GlobalFinance Corp needed to modernize their legacy infrastructure while maintaining strict compliance with financial regulations across multiple jurisdictions. The migration had to be seamless with zero downtime.",
    solution: "We architected a hybrid cloud solution with multi-region deployment, implemented comprehensive security measures, and executed a phased migration that ensured business continuity throughout the transition.",
    results: [
      { metric: "99.99%", label: "System uptime achieved" },
      { metric: "50%", label: "Infrastructure cost reduction" },
      { metric: "100%", label: "Regulatory compliance maintained" },
      { metric: "10x", label: "Scalability improvement" }
    ],
    features: [
      "Multi-region active-active deployment",
      "Zero-trust security architecture",
      "Real-time threat detection and response",
      "Automated compliance monitoring",
      "Disaster recovery with 15-minute RPO",
      "24/7 managed services and support"
    ],
    technologies: ["AWS", "Azure", "Terraform", "Kubernetes", "Prometheus", "Grafana", "Vault"],
    testimonial: {
      quote: "The migration was flawless. NexusTech delivered a world-class infrastructure that exceeds all our compliance requirements while significantly reducing costs.",
      author: "Jennifer Walsh",
      role: "VP of Technology, GlobalFinance Corp",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
    },
    gallery: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=500&fit=crop"
    ]
  },
  "smart-iot-ecosystem": {
    title: "Smart IoT Ecosystem",
    category: "IoT Solutions",
    client: "MetroCity Council",
    duration: "18 months",
    team: "25 specialists",
    year: "2023",
    heroImage: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1400&h=700&fit=crop",
    description: "A comprehensive smart city IoT ecosystem connecting thousands of sensors and devices to optimize traffic flow, reduce energy consumption, and improve citizen services.",
    challenge: "MetroCity faced challenges with traffic congestion, high energy costs, and inefficient city services. They needed a unified platform to manage diverse city systems and improve quality of life for residents.",
    solution: "We deployed a city-wide IoT network with intelligent edge computing, created a unified management platform, and implemented AI algorithms for predictive maintenance and resource optimization.",
    results: [
      { metric: "35%", label: "Reduction in traffic congestion" },
      { metric: "28%", label: "Energy savings achieved" },
      { metric: "50K+", label: "Connected devices" },
      { metric: "90%", label: "Citizen satisfaction rate" }
    ],
    features: [
      "City-wide sensor network deployment",
      "Real-time traffic management system",
      "Smart street lighting with adaptive controls",
      "Environmental monitoring and alerts",
      "Citizen mobile app for city services",
      "Predictive maintenance for infrastructure"
    ],
    technologies: ["LoRaWAN", "Edge Computing", "Node.js", "MongoDB", "TensorFlow", "React Native", "Grafana"],
    testimonial: {
      quote: "The smart city platform has revolutionized how we serve our citizens. Traffic flows better, energy bills are down, and our residents love the mobile app.",
      author: "David Chen",
      role: "Smart City Director, MetroCity Council",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    gallery: [
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=500&fit=crop"
    ]
  }
}

const relatedProjects = [
  {
    slug: "secure-cloud-infrastructure",
    title: "Enterprise Cloud Infrastructure",
    category: "Cloud Solutions",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
  },
  {
    slug: "smart-iot-ecosystem",
    title: "Smart IoT Ecosystem",
    category: "IoT Solutions",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop"
  },
  {
    slug: "ai-analytics-platform",
    title: "AI-Powered Analytics Platform",
    category: "Artificial Intelligence",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
  }
]

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const project = projects[resolvedParams.slug as keyof typeof projects] || projects["ai-analytics-platform"]

  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 h-[70vh]">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/projects"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>

            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              {project.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl mb-6 text-balance">
              {project.title}
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur border border-border rounded-full">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Client:</span>
                <span className="font-medium">{project.client}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur border border-border rounded-full">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">{project.duration}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur border border-border rounded-full">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Year:</span>
                <span className="font-medium">{project.year}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold">Project Results</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-background border border-border rounded-2xl"
              >
                <div className="text-4xl font-bold text-gradient mb-2">{result.metric}</div>
                <p className="text-muted-foreground text-sm">{result.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-red-500/10 text-red-400 rounded-lg flex items-center justify-center text-sm font-bold">01</span>
                The Challenge
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.challenge}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm font-bold">02</span>
                Our Solution
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold">Key Features</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-4 bg-background border border-border rounded-xl"
              >
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold">Project Gallery</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {project.gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-video rounded-2xl overflow-hidden border border-border group"
              >
                <img
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold">Technologies Used</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-background border border-border rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-gradient-to-br from-primary/10 via-purple-500/10 to-primary/10 rounded-3xl p-8 md:p-12 border border-primary/20"
          >
            <svg className="w-12 h-12 text-primary/30 mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
              {project.testimonial.quote}
            </blockquote>
            <div className="flex items-center gap-4">
              <img
                src={project.testimonial.avatar}
                alt={project.testimonial.author}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{project.testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{project.testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let&apos;s discuss how we can help transform your business with cutting-edge technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                Start a Project <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background border border-border font-semibold rounded-xl hover:border-primary transition-colors"
              >
                View Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Related Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedProjects.filter(p => p.slug !== resolvedParams.slug).slice(0, 3).map((project, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="relative overflow-hidden rounded-xl aspect-video mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <span className="absolute bottom-4 left-4 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
