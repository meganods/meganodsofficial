export interface TeamMember {
  id: string
  slug?: string
  name: string
  role: string
  bio: string
  avatarUrl: string
  initials?: string
  meta: string
  gradient: string
  order: number
  isLeader: boolean
  social?: {
    linkedin?: string
    twitter?: string
    github?: string
    email?: string
  }
}

export const defaultTeam: TeamMember[] = [
  {
    id: "marcus-vance",
    slug: "marcus-vance",
    name: "Dr. Marcus Vance",
    role: "Lead AI Systems Architect & Co-Founder",
    bio: "Former ML researcher at Stanford AI Lab with 12+ years building high-throughput distributed retrieval systems, pgvector vector indexing, and autonomous agent workflows.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    initials: "MV",
    meta: "Executive Board",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    order: 1,
    isLeader: true,
    social: {
      linkedin: "https://www.linkedin.com/in/meganods-08b7b5400/",
      twitter: "https://x.com/MegaNods33550",
      github: "https://github.com/meganods",
      email: "marcus@meganods.com"
    }
  },
  {
    id: "sneha-patel",
    slug: "sneha-patel",
    name: "Sneha Patel",
    role: "Chief Technology Officer & Cloud Architect",
    bio: "Specializes in multi-region Kubernetes orchestrations, zero-trust cloud security, and high-concurrency event-driven microservices across global enterprise footprints.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    initials: "SP",
    meta: "Executive Board",
    gradient: "from-emerald-600 via-teal-600 to-cyan-500",
    order: 2,
    isLeader: true,
    social: {
      linkedin: "https://www.linkedin.com/in/meganods-08b7b5400/",
      twitter: "https://x.com/MegaNods33550",
      github: "https://github.com/meganods",
      email: "sneha@meganods.com"
    }
  },
  {
    id: "ananya-sharma",
    slug: "ananya-sharma",
    name: "Ananya Sharma",
    role: "Head of Enterprise Solutions & Client Partner",
    bio: "Experienced enterprise technology consultant specializing in digital transformation consulting, B2B SaaS architecture, and scaling cross-border client accounts across North America, APAC, and EMEA.",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    initials: "AS",
    meta: "Leadership Council",
    gradient: "from-purple-600 via-pink-600 to-indigo-500",
    order: 3,
    isLeader: true,
    social: {
      linkedin: "https://www.linkedin.com/in/meganods-08b7b5400/",
      twitter: "https://x.com/MegaNods33550",
      email: "ananya@meganods.com"
    }
  },
  {
    id: "vikram-malhotra",
    slug: "vikram-malhotra",
    name: "Vikram Malhotra",
    role: "Principal Cybersecurity & Zero-Trust Architect",
    bio: "Focuses on Linux kernel security, eBPF threat telemetry, WebAuthn cryptographic authentication protocols, and PCI-DSS / SOC 2 compliance engineering.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    initials: "VM",
    meta: "Security Engineering",
    gradient: "from-rose-600 via-orange-600 to-amber-500",
    order: 4,
    isLeader: false,
    social: {
      linkedin: "https://www.linkedin.com/in/meganods-08b7b5400/",
      github: "https://github.com/meganods",
      email: "security@meganods.com"
    }
  },
  {
    id: "pooja-verma",
    slug: "pooja-verma",
    name: "Pooja Verma",
    role: "Lead Full-Stack & Systems Engineer",
    bio: "Architects scalable Next.js and React Native platforms with strict sub-second performance budgets, zero-latency state sync, and modern UX design systems.",
    avatarUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80",
    initials: "PV",
    meta: "Core Systems",
    gradient: "from-indigo-600 via-cyan-500 to-blue-600",
    order: 5,
    isLeader: false,
    social: {
      linkedin: "https://www.linkedin.com/in/meganods-08b7b5400/",
      github: "https://github.com/meganods",
      email: "pooja@meganods.com"
    }
  },
  {
    id: "rajan-mehta",
    slug: "rajan-mehta",
    name: "Rajan Mehta",
    role: "Senior Distributed Data & Pipeline Engineer",
    bio: "Expert in Kafka change data capture (CDC), Apache Iceberg data lakehouses, and high-throughput vector embedding batch pipelines.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    initials: "RM",
    meta: "Data Engineering",
    gradient: "from-amber-500 via-emerald-600 to-teal-600",
    order: 6,
    isLeader: false,
    social: {
      linkedin: "https://www.linkedin.com/in/meganods-08b7b5400/",
      github: "https://github.com/meganods",
      email: "rajan@meganods.com"
    }
  }
]
