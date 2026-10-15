export interface ServiceItem {
  id: string
  title: string
  subtitle?: string
  category: string
  meta: string
  icon: string
  gradient: string
  description: string
  features: string[]
  isActive: boolean
  order: number
}

export const defaultServices: ServiceItem[] = [
  {
    id: "neural-ai-systems",
    title: "Neural Architectures & Cognitive AI",
    subtitle: "Custom LLMs, Agentic Workflows & Neural Retrieval",
    category: "Artificial Intelligence",
    meta: "COGNITIVE INTELLIGENCE",
    icon: "Brain",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    description: "End-to-end machine learning engineering, enterprise LLM fine-tuning, LangGraph stateful multi-agent workflows, and low-latency pgvector embedding search pipelines.",
    features: [
      "Custom Enterprise LLM Fine-Tuning",
      "Sub-25ms Vector Similarity Search",
      "Autonomous Multi-Agent Task Orchestration",
      "Deterministic Guardrails & Evaluation",
      "Production RAG Knowledge Retrieval",
      "On-Premises & Hybrid Model Hosting"
    ],
    isActive: true,
    order: 1
  },
  {
    id: "web-systems-engineering",
    title: "High-Scale Web Platforms & SaaS",
    subtitle: "Next.js 16, Distributed Edge & TypeScript",
    category: "Scalable Architecture",
    meta: "WEB PLATFORMS",
    icon: "Globe",
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    description: "Lightning-fast, highly resilient web applications built on Next.js Server Components, Edge runtime caching, reactive websockets, and scalable PostgreSQL database clusters.",
    features: [
      "Sub-100ms Global TTFB on Edge",
      "Full-Stack TypeScript & Strict Schemas",
      "High-Concurrency PostgreSQL & Prisma/Drizzle",
      "Micro-Frontend & Component Design Systems",
      "Real-Time Collaborative WebSockets",
      "SEO & Google Core Web Vitals 100/100"
    ],
    isActive: true,
    order: 2
  },
  {
    id: "native-mobility-mesh",
    title: "Mobile App Development & Mobility",
    subtitle: "Native iOS, Android & Cross-Platform Mobility",
    category: "Mobile Ecosystems",
    meta: "MOBILE MOBILITY",
    icon: "Zap",
    gradient: "from-cyan-500 via-blue-600 to-indigo-600",
    description: "Fluid, kinetic mobile experiences engineered with React Native and native Swift/Kotlin architectures with biometric authentication, offline synchronization, and hardware telemetry.",
    features: [
      "Cross-Platform iOS & Android Deployments",
      "Offline-First SQLite / WatermelonDB Sync",
      "Biometric Passkey & Secure Enclave Auth",
      "Push Notification & Deep Link Automation",
      "App Store & Google Play Expedited Approval",
      "60 FPS Kinetic Framer Motion UI"
    ],
    isActive: true,
    order: 3
  },
  {
    id: "distributed-cloud-core",
    title: "Multi-Region Cloud Infrastructure",
    subtitle: "Active-Active Kubernetes & Edge Networks",
    category: "Cloud Infrastructure",
    meta: "CLOUD INFRASTRUCTURE",
    icon: "Cloud",
    gradient: "from-emerald-600 via-teal-600 to-cyan-500",
    description: "Enterprise multi-region cloud topology built for 99.99% uptime SLA. Zero single point of failure, containerized Kubernetes deployments, and automated failover routing.",
    features: [
      "Active-Active Multi-Region Mesh",
      "Terraform & OpenTofu Infrastructure as Code",
      "Automated Kubernetes Auto-Scaling",
      "Sub-45ms Anycast BGP Routing",
      "Automated Disaster Recovery & Backups",
      "Cloud Cost Optimization Audits"
    ],
    isActive: true,
    order: 4
  },
  {
    id: "zero-trust-cyber-shield",
    title: "Zero-Trust Cybersecurity & Shield",
    subtitle: "Kernel Monitoring, WebAuthn & Hardened Pipelines",
    category: "Cybersecurity",
    meta: "CYBER SECURITY",
    icon: "Shield",
    gradient: "from-purple-600 via-indigo-600 to-blue-600",
    description: "Comprehensive enterprise security posture featuring FIDO2 WebAuthn passkeys, eBPF kernel-level threat detection, automated vulnerability scanning, and strict role-based access control.",
    features: [
      "FIDO2 WebAuthn Passwordless Auth",
      "eBPF Real-Time Kernel Threat Monitoring",
      "SOC 2, ISO 27001 & HIPAA Readiness",
      "End-to-End Encryption at Rest & in Flight",
      "Continuous Automated Vulnerability Scans",
      "Secrets Management & mTLS Service Mesh"
    ],
    isActive: true,
    order: 5
  },
  {
    id: "business-automation-crm",
    title: "Business Process Automation & CRM",
    subtitle: "Automated Workflows & Custom Software",
    category: "Enterprise Automation",
    meta: "ENTERPRISE AUTOMATION",
    icon: "Activity",
    gradient: "from-amber-500 via-orange-500 to-amber-600",
    description: "Bespoke internal software tools, ERP systems, lead routing pipelines, and automated multi-step business logic that eliminate repetitive manual operations.",
    features: [
      "Custom CRM & Lead Routing Engines",
      "Automated Invoice & Billing Pipelines",
      "Third-Party API & Webhook Integrations",
      "Audit Trail & Compliance Logging",
      "Role-Based Permission Matrix Control",
      "Real-Time Executive Analytics Dashboards"
    ],
    isActive: true,
    order: 6
  }
]
