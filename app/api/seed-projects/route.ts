import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc } from 'firebase/firestore';

const projects = [
  {
    title: 'Neural Finance Bridge',
    category: 'DeFi & AI',
    client: 'Apex Capital',
    duration: '8 Months',
    team: '12 Specialists',
    year: '2024',
    heroImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop',
    description: 'A decentralized liquidity bridge powered by predictive neural models to optimize cross-chain asset transfers.',
    challenge: 'High latency and slippage in multi-chain environments leading to capital inefficiency.',
    solution: 'Implemented an AI-driven routing engine that predicts liquidity shifts and executes swaps at sub-100ms speeds.',
    order: 1,
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
    title: 'Kinetic Logistics Mesh',
    category: 'Logistics & IoT',
    client: 'SwiftLog Global',
    duration: '12 Months',
    team: '18 Specialists',
    year: '2024',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop',
    description: 'A global logistics tracking mesh utilizing hyper-local IoT nodes and real-time visualization HUDs.',
    challenge: 'Fragmentation in global supply chain data resulting in 15% annual inventory loss.',
    solution: 'Developed a unified control plane using high-frequency IoT data and kinetic UI dashboards.',
    order: 2,
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
    title: 'Cyber-Shield Protocol',
    category: 'Cybersecurity',
    client: 'Defense One',
    duration: '15 Months',
    team: '25 Specialists',
    year: '2023',
    heroImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
    description: 'An advanced threat detection system utilizing zero-trust architecture and automated response nodes.',
    challenge: 'Increasing frequency of sub-millisecond automated brute-force attacks on core systems.',
    solution: 'Engineered a multi-layered defense protocol that uses behavioral analysis to terminate threats before breach.',
    order: 3,
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
    title: 'Eco-Grid Intelligence',
    category: 'Sustainability',
    client: 'GreenWave Energy',
    duration: '10 Months',
    team: '10 Specialists',
    year: '2024',
    heroImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000&auto=format&fit=crop',
    description: 'An intelligent energy grid management system that optimizes renewable distribution across urban sectors.',
    challenge: 'Energy waste due to inefficient peak-load distribution from renewable sources.',
    solution: 'Designed a self-healing energy mesh that redirects surplus power to high-demand nodes in real-time.',
    order: 4,
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
    title: 'Horizon Mobile Mesh',
    category: 'Communication',
    client: 'Horizon Telecom',
    duration: '9 Months',
    team: '14 Specialists',
    year: '2024',
    heroImage: 'https://images.unsplash.com/photo-1512428559083-a4051eba336f?q=80&w=2000&auto=format&fit=crop',
    description: 'A revolutionary cross-platform communication app designed for 100% uptime in low-connectivity areas.',
    challenge: 'Poor mobile application performance in emerging markets with intermittent network nodes.',
    solution: 'Built a local-first architecture using Flutter with synchronized offline data mesh capabilities.',
    order: 5,
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
    title: 'Neural Retail Hub',
    category: 'eCommerce',
    client: 'Velvet Mode',
    duration: '7 Months',
    team: '8 Specialists',
    year: '2024',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop',
    description: 'An AI-infused luxury retail platform that personalizes the browsing experience through eye-tracking simulation.',
    challenge: 'Lower conversion rates on high-ticket luxury items due to non-personalized browsing journeys.',
    solution: 'Implemented a neural recommendation hub that analyzes browsing patterns to curate highly specific visual galleries.',
    order: 6,
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

export async function GET() {
  try {
    const colRef = collection(db, 'projects');
    const existing = await getDocs(colRef);
    
    // Clear existing
    for (const d of existing.docs) {
      await deleteDoc(doc(db, 'projects', d.id));
    }

    // Add new
    for (const p of projects) {
      const slug = p.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
      await addDoc(colRef, {
        ...p,
        slug,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }

    return NextResponse.json({ success: true, message: 'PROJECT_REGISTRY_SYNCHRONIZED' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
