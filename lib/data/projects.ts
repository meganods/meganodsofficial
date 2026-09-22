export interface ProjectWorkflowStep {
  step: string;
  role: string;
  action: string;
  color: string;
}

export interface ProjectTimelineMilestone {
  phase: string;
  title: string;
  desc: string;
}

export interface ProjectHighlight {
  title: string;
  desc: string;
}

export interface ProjectNode {
  id: string;
  title: string;
  tagline?: string;
  category: string;
  slug: string;
  client: string;
  liveUrl?: string;
  duration: string;
  team: string;
  year: string;
  heroImage: string;
  description: string;
  challenge: string;
  solution: string;
  order: number;
  results: { metric: string; label: string }[];
  features: string[];
  technologies: string[];
  workflow?: ProjectWorkflowStep[];
  timeline?: ProjectTimelineMilestone[];
  highlights?: ProjectHighlight[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
  gallery?: string[];
}

export const defaultProjects: ProjectNode[] = [
  {
    id: 'meganods-team-platform',
    title: 'MegaNods Team Platform',
    tagline: 'Team collaboration for new startups that scale',
    slug: 'meganods-team-platform',
    category: 'Enterprise CRM & Collaboration',
    client: 'MegaNods Global Ecosystem',
    liveUrl: 'https://www.meganodsteam.com/',
    duration: '6 Months',
    team: '14 Specialists',
    year: '2025',
    heroImage: '/meganodsteam-hero.png',
    description: 'Modern CRM, team collaboration, and automated pipeline engine designed for hyper-scaling startups and distributed engineering teams. Features intelligent task delegation, live lead monitoring, and dual-role Admin & Agent operational workspaces.',
    challenge: 'Early-stage startups and high-growth ventures struggle with fragmented pipeline management, chaotic task distribution, and disconnected communication between leadership, managers, and clients.',
    solution: 'Architected a unified real-time CRM and collaboration platform featuring automated lead intake, wavy node status telemetry, dedicated Admin and Agent portals, and instant client onboarding tracking.',
    order: 1,
    results: [
      { metric: '100+', label: 'Global Startups' },
      { metric: '4x', label: 'Task Execution Velocity' },
      { metric: '99.99%', label: 'Platform Availability' }
    ],
    features: [
      'Interactive Pipeline & Lead Management',
      'Intelligent Task Delegation & Automation',
      'Dual Role Portals: Admin & Agent Workspaces',
      'Real-Time Telemetry & Company Analytics',
      'Client Lifecycle & Deal Won Tracking',
      'Role-Based Access Control & Department Mesh'
    ],
    workflow: [
      { step: '01', role: 'Priya (CEO)', action: 'Assigns Task', color: '#9333ea' },
      { step: '02', role: 'Amit (Team Member)', action: 'Qualifies Task', color: '#06b6d4' },
      { step: '03', role: 'Neha (Team Member)', action: 'Updates Status', color: '#10b981' },
      { step: '04', role: 'Vikram (Manager)', action: 'Reviews Progress', color: '#ec4899' },
      { step: '05', role: 'Rahul (Team Member)', action: 'Completes Tasks', color: '#6366f1' },
      { step: '06', role: 'Client', action: 'Onboard Won', color: '#f59e0b' }
    ],
    timeline: [
      { phase: 'Phase 01', title: 'Architecture & Pipeline Design', desc: 'Engineered the unified database schema, lead pipeline stages, and multi-tenant workspace isolation.' },
      { phase: 'Phase 02', title: 'Admin & Agent Portal Engineering', desc: 'Developed specialized role-specific dashboards with granular permission matrices and task assignment engines.' },
      { phase: 'Phase 03', title: 'Real-Time Wavy Telemetry Mesh', desc: 'Integrated real-time socket events and visual animation nodes for live process flow monitoring.' },
      { phase: 'Phase 04', title: 'Global Production Deployment', desc: 'Deployed on high-frequency edge servers with zero-downtime scaling and automated database backups.' }
    ],
    highlights: [
      { title: 'Full Lifecycle Pipeline', desc: 'Track deals from initial contact to closed-won with visual drag-and-drop stages.' },
      { title: 'Sub-second Sync', desc: 'Instant live updates across all active team members with zero reload latency.' },
      { title: 'Automated Reminders', desc: 'Intelligent notifications and task SLA monitors ensure zero missed milestones.' }
    ],
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Socket.io', 'Cloud Architecture'],
    testimonial: {
      quote: 'MegaNods Team streamlined our entire startup workflow from lead generation to client onboarding in record time.',
      author: 'Priya Singh',
      role: 'CEO & Founder, Startup Velocity',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&auto=format&fit=crop'
    },
    gallery: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    id: 'mediguide4u-healthcare',
    title: 'MediGuide4U Healthcare',
    tagline: 'Intelligent patient triage & verified medical specialist discovery',
    slug: 'mediguide4u-healthcare-ecosystem',
    category: 'HealthTech & Telemedicine',
    client: 'MediGuide Health Network',
    liveUrl: 'https://www.mediguide4u.com/',
    duration: '8 Months',
    team: '12 Specialists',
    year: '2025',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop',
    description: 'Intelligent patient guidance, specialist discovery, and telemedicine navigation platform streamlining clinical access worldwide with HIPAA-compliant telemedicine infrastructure.',
    challenge: 'Fragmented patient pathways and complex medical navigation preventing patients from finding verified specialists promptly.',
    solution: 'Architected an AI-assisted clinical triage portal and verified medical directory with real-time appointment scheduling and HIPAA compliance.',
    order: 2,
    results: [
      { metric: '50k+', label: 'Monthly Patients' },
      { metric: '< 2s', label: 'Specialist Matching' },
      { metric: '98%', label: 'Triage Accuracy' }
    ],
    features: [
      'AI Clinical Triage & Symptom Evaluation',
      'Verified Specialist & Doctor Directory',
      'HIPAA-Compliant Patient Data Mesh',
      'Real-time Consultation & Telehealth Booking',
      'Multilingual Health Navigation Support',
      'Automated Prescription Routing'
    ],
    workflow: [
      { step: '01', role: 'Patient Intake', action: 'Symptom Triage', color: '#3b82f6' },
      { step: '02', role: 'Neural Engine', action: 'Specialist Matching', color: '#6366f1' },
      { step: '03', role: 'Clinical Desk', action: 'Appointment Scheduled', color: '#10b981' },
      { step: '04', role: 'Physician', action: 'Consultation Complete', color: '#ec4899' }
    ],
    timeline: [
      { phase: 'Phase 01', title: 'HIPAA Architecture & Compliance', desc: 'Implemented end-to-end encrypted medical record databases and patient consent protocols.' },
      { phase: 'Phase 02', title: 'Specialist Directory Engine', desc: 'Built geo-indexed doctor database with real-time slot synchronization.' },
      { phase: 'Phase 03', title: 'Telehealth WebRTC Portal', desc: 'Integrated high-definition encrypted video calling and instant prescription generation.' }
    ],
    highlights: [
      { title: 'Zero-Wait Triage', desc: 'Instant AI symptom checker routes patients to the correct medical specialty.' },
      { title: 'Verified Credentials', desc: '100% board-certified physicians with verified licenses.' }
    ],
    technologies: ['React', 'Next.js 14', 'Tailwind CSS', 'Cloud Database', 'WebRTC', 'HIPAA Mesh'],
    testimonial: {
      quote: 'MediGuide4U has set a new benchmark for patient discovery and seamless digital healthcare navigation.',
      author: 'Dr. Sarah Al-Mansoor',
      role: 'Chief Medical Officer, HealthCare Forward',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&h=150&auto=format&fit=crop'
    },
    gallery: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    id: 'multimallpro-marketplace',
    title: 'MultiMallPro Marketplace',
    tagline: 'High-performance multi-vendor commerce platform',
    slug: 'multimallpro-multi-vendor-commerce',
    category: 'eCommerce & Marketplace',
    client: 'MultiMallPro Global Retail',
    liveUrl: 'https://www.multimallpro.com/',
    duration: '7 Months',
    team: '11 Specialists',
    year: '2025',
    heroImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2000&auto=format&fit=crop',
    description: 'High-performance multi-vendor digital commerce marketplace featuring real-time vendor dashboards, unified checkout, split payment disbursements, and automated catalog sync.',
    challenge: 'Scaling concurrent multi-vendor operations, split payments, and inventory synchronization across hundreds of independent sellers.',
    solution: 'Engineered a scalable headless multi-vendor commerce hub with sub-second page loads, automated merchant payouts, and localized international currencies.',
    order: 3,
    results: [
      { metric: '300+', label: 'Verified Merchants' },
      { metric: '65%', label: 'Checkout Conversion' },
      { metric: '< 100ms', label: 'Catalog Search' }
    ],
    features: [
      'Multi-Vendor Merchant Portal & Storefronts',
      'Automated Split Payment Gateway & Payouts',
      'Real-time Inventory & Stock Telemetry',
      'Headless Ultra-Fast Next.js Storefront',
      'Dynamic Currency & Tax Localization',
      'Merchant Performance Analytics HUD'
    ],
    workflow: [
      { step: '01', role: 'Merchant Onboarding', action: 'Store Verified', color: '#10b981' },
      { step: '02', role: 'Catalog Mesh', action: 'Products Listed', color: '#3b82f6' },
      { step: '03', role: 'Customer Hub', action: 'Unified Cart Checkout', color: '#8b5cf6' },
      { step: '04', role: 'Automated Payout', action: 'Split Disbursement', color: '#f59e0b' }
    ],
    timeline: [
      { phase: 'Phase 01', title: 'Headless Commerce Core', desc: 'Architected high-throughput catalog indexer with sub-second product filtering.' },
      { phase: 'Phase 02', title: 'Stripe Connect Split Engine', desc: 'Configured automated multi-party escrow disbursements with automated tax calculation.' },
      { phase: 'Phase 03', title: 'Merchant Self-Service Dashboard', desc: 'Built comprehensive sales analytics, inventory manager, and fulfillment tracker.' }
    ],
    highlights: [
      { title: 'Universal Checkout', desc: 'Buy from multiple merchants in a single transaction with automated split billing.' },
      { title: 'Sub-100ms Search', desc: 'Algolia-powered instant indexing across 50,000+ SKU inventory items.' }
    ],
    technologies: ['Next.js 14', 'Node.js', 'Stripe Connect', 'Tailwind CSS', 'PostgreSQL', 'Redis'],
    testimonial: {
      quote: 'MultiMallPro transformed our multi-merchant ecosystem into a rapid-growth, highly lucrative global marketplace.',
      author: 'Marcus Sterling',
      role: 'Head of Global eCommerce, Retail Ventures',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop'
    },
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    id: 'neural-finance-bridge',
    title: 'Neural Finance Bridge',
    tagline: 'Predictive neural routing for cross-chain liquidity',
    slug: 'neural-finance-bridge',
    category: 'DeFi & AI',
    client: 'Apex Capital',
    duration: '8 Months',
    team: '12 Specialists',
    year: '2024',
    heroImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop',
    description: 'A decentralized liquidity bridge powered by predictive neural models to optimize cross-chain asset transfers with sub-second routing.',
    challenge: 'High latency and slippage in multi-chain environments leading to capital inefficiency.',
    solution: 'Implemented an AI-driven routing engine that predicts liquidity shifts and executes swaps at sub-100ms speeds.',
    order: 4,
    results: [
      { metric: '40%', label: 'Slippage Reduction' },
      { metric: 'sub-100ms', label: 'Execution Speed' },
      { metric: '$2B+', label: 'Total Volume Locked' }
    ],
    features: ['Predictive Routing', 'Cross-chain Interoperability', 'Neural Security Protocols', 'Dynamic Fee Optimization'],
    technologies: ['Solidity', 'Next.js 14', 'Python (PyTorch)', 'Tailwind CSS'],
    testimonial: {
      quote: 'Meganods delivered a solution that transformed our trading desk efficiency beyond all internal expectations.',
      author: 'Jonathan Thorne',
      role: 'Head of Trading, Apex Capital',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop'
    },
    gallery: [
      'https://images.unsplash.com/photo-1642104704074-907c0698bcd9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    id: 'kinetic-logistics-mesh',
    title: 'Kinetic Logistics Mesh',
    tagline: 'Hyper-local IoT fleet tracking & telemetry control plane',
    slug: 'kinetic-logistics-mesh',
    category: 'Logistics & IoT',
    client: 'SwiftLog Global',
    duration: '12 Months',
    team: '18 Specialists',
    year: '2024',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop',
    description: 'A global logistics tracking mesh utilizing hyper-local IoT nodes and real-time visualization HUDs for worldwide supply chain operations.',
    challenge: 'Fragmentation in global supply chain data resulting in 15% annual inventory loss.',
    solution: 'Developed a unified control plane using high-frequency IoT data and kinetic UI dashboards.',
    order: 5,
    results: [
      { metric: '95%', label: 'Tracking Accuracy' },
      { metric: '20%', label: 'Inventory Recovery' },
      { metric: 'Global', label: 'Sector Coverage' }
    ],
    features: ['Real-time Telemetry', 'Predictive Maintenance', 'Asset Identity Mesh', 'Mobile Logistics Hub'],
    technologies: ['React Native', 'Node.js', 'MQTT', 'Google Cloud'],
    testimonial: {
      quote: 'The visual clarity provided by the Meganods dashboard has redefined how we manage our global fleet.',
      author: 'Sarah Jenkins',
      role: 'COO, SwiftLog Global',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop'
    },
    gallery: [
      'https://images.unsplash.com/photo-1594818378824-35368a18413a?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    id: 'cyber-shield-protocol',
    title: 'Cyber-Shield Protocol',
    tagline: 'Zero-trust automated threat detection and incident kill-switch',
    slug: 'cyber-shield-protocol',
    category: 'Cybersecurity',
    client: 'Defense One',
    duration: '15 Months',
    team: '25 Specialists',
    year: '2023',
    heroImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
    description: 'An advanced threat detection system utilizing zero-trust architecture, behavioral fingerprinting, and automated response nodes.',
    challenge: 'Increasing frequency of sub-millisecond automated brute-force attacks on core systems.',
    solution: 'Engineered a multi-layered defense protocol that uses behavioral analysis to terminate threats before breach.',
    order: 6,
    results: [
      { metric: '100%', label: 'Breach Prevention' },
      { metric: '0.5s', label: 'Response Time' },
      { metric: '$0', label: 'Capital Loss' }
    ],
    features: ['Zero-Trust Architecture', 'Behavioral Fingerprinting', 'Automated Kill-Switch', 'Forensic Audit Log'],
    technologies: ['Rust', 'C++', 'TensorFlow', 'PostgreSQL'],
    testimonial: {
      quote: 'The security infrastructure established by Meganods is the gold standard for our strategic defense operations.',
      author: 'General Marcus Vance',
      role: 'Security Director, Defense One',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop'
    },
    gallery: []
  },
  {
    id: 'eco-grid-intelligence',
    title: 'Eco-Grid Intelligence',
    tagline: 'Intelligent renewable energy load balancing grid',
    slug: 'eco-grid-intelligence',
    category: 'Sustainability',
    client: 'GreenWave Energy',
    duration: '10 Months',
    team: '10 Specialists',
    year: '2024',
    heroImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000&auto=format&fit=crop',
    description: 'An intelligent energy grid management system that optimizes renewable distribution across urban sectors using predictive demand analysis.',
    challenge: 'Energy waste due to inefficient peak-load distribution from renewable sources.',
    solution: 'Designed a self-healing energy mesh that redirects surplus power to high-demand nodes in real-time.',
    order: 7,
    results: [
      { metric: '30%', label: 'Waste Reduction' },
      { metric: '1M+', label: 'Households Served' },
      { metric: 'Net Zero', label: 'Operational Impact' }
    ],
    features: ['Dynamic Load Balancing', 'Surplus Redirection', 'Grid Health HUD', 'Predictive Consumption'],
    technologies: ['React', 'Python', 'Redis', 'AWS Lambda'],
    testimonial: {
      quote: 'Sustainability and technology converged perfectly in the Meganods implementation.',
      author: 'Emily Chen',
      role: 'Sustainability Lead, GreenWave',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&auto=format&fit=crop'
    },
    gallery: []
  },
  {
    id: 'horizon-mobile-mesh',
    title: 'Horizon Mobile Mesh',
    tagline: 'Resilient offline-first telecommunications architecture',
    slug: 'horizon-mobile-mesh',
    category: 'Communication',
    client: 'Horizon Telecom',
    duration: '9 Months',
    team: '14 Specialists',
    year: '2024',
    heroImage: 'https://images.unsplash.com/photo-1512428559083-a4051eba336f?q=80&w=2000&auto=format&fit=crop',
    description: 'A revolutionary cross-platform communication app designed for 100% uptime in low-connectivity areas using peer-to-peer data syncing.',
    challenge: 'Poor mobile application performance in emerging markets with intermittent network nodes.',
    solution: 'Built a local-first architecture using Flutter with synchronized offline data mesh capabilities.',
    order: 8,
    results: [
      { metric: '99.9%', label: 'Uptime' },
      { metric: '200M+', label: 'Active Sessions' },
      { metric: 'Lite', label: 'Binary Footprint' }
    ],
    features: ['Local-First Data', 'P2P Mesh Messaging', 'Adaptive Compression', 'High-Fidelity UI'],
    technologies: ['Flutter', 'Dart', 'SQLite', 'Firebase'],
    testimonial: {
      quote: 'The Meganods mobile stack is the most resilient architecture we have deployed in our 20-year history.',
      author: 'Robert Davila',
      role: 'CTO, Horizon Telecom',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&h=150&auto=format&fit=crop'
    },
    gallery: []
  },
  {
    id: 'neural-retail-hub',
    title: 'Neural Retail Hub',
    tagline: 'AI-infused luxury retail personalization platform',
    slug: 'neural-retail-hub',
    category: 'eCommerce',
    client: 'Velvet Mode',
    duration: '7 Months',
    team: '8 Specialists',
    year: '2024',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop',
    description: 'An AI-infused luxury retail platform that personalizes the browsing experience through neural recommendation models and dynamic catalog curation.',
    challenge: 'Lower conversion rates on high-ticket luxury items due to non-personalized browsing journeys.',
    solution: 'Implemented a neural recommendation hub that analyzes browsing patterns to curate highly specific visual galleries.',
    order: 9,
    results: [
      { metric: '55%', label: 'Conversion Boost' },
      { metric: '$500+', label: 'Average Order' },
      { metric: 'Global', label: 'Shipping Sync' }
    ],
    features: ['AI Curation', 'Kinetic Product HUD', 'Predictive Inventory', 'Global Hub Sync'],
    technologies: ['Next.js', 'Shopify Plus', 'Tensorflow.js', 'Tailwind'],
    testimonial: {
      quote: 'Our digital sales have tripled since the Meganods modernization project went live.',
      author: 'Valentina Rossi',
      role: 'Creative Director, Velvet Mode',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&auto=format&fit=crop'
    },
    gallery: []
  }
];
