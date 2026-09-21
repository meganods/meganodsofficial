export interface TechnologyDetail {
  id: number
  slug: string
  title: string
  subtitle: string
  category: string
  description: string
  image: string
  accentColor: string
  glowColor: string
  badge: string
  metrics: {
    label: string
    value: string
    subtext: string
  }[]
  overview: string[]
  coreCapabilities: {
    title: string
    description: string
    tags: string[]
  }[]
  architectureLayers: {
    layer: string
    name: string
    description: string
    technologies: string[]
  }[]
  useCases: {
    title: string
    industry: string
    summary: string
    result: string
  }[]
  techStack: string[]
  faqs: {
    question: string
    answer: string
  }[]
}

export const TECHNOLOGIES_DATA: TechnologyDetail[] = [
  {
    id: 1,
    slug: 'neural-ai-cognitive-systems',
    title: 'Neural AI & Cognitive Systems',
    subtitle: 'Autonomous AI architectures, fine-tuned LLM agents, and real-time inference pipelines.',
    category: 'Artificial Intelligence & Neural Compute',
    description: 'Meganods architects state-of-the-art cognitive AI networks that combine foundational Large Language Models, autonomous agent swarms, and hardware-accelerated deep neural networks to automate complex operational workflows with ultra-low latency.',
    image: '/tech-slider/ai-neural.jpg',
    accentColor: 'from-blue-600 via-indigo-600 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.35)',
    badge: 'Autonomous Neural Engine',
    metrics: [
      { label: 'Inference Latency', value: '< 18ms', subtext: 'Global edge-accelerated TTFT' },
      { label: 'Context Processing', value: '2M+ Tokens', subtext: 'Multi-modal context windows' },
      { label: 'Agent Coordination', value: '500+ Swarms', subtext: 'Concurrent autonomous task agents' },
      { label: 'Uptime & Reliability', value: '99.99%', subtext: 'Redundant neural model failover' },
    ],
    overview: [
      'Our Neural AI & Cognitive Systems framework transforms raw enterprise data into actionable intelligence. By blending sparse-mixture-of-experts (MoE) neural models with vectorized knowledge embeddings, we empower businesses with self-learning autonomous assistants.',
      'From conversational intelligence and multi-modal sensory analysis to automated code generation and decision synthesis, our neural pipelines are fine-tuned on dedicated GPU clusters for maximum throughput and pinpoint accuracy.',
    ],
    coreCapabilities: [
      {
        title: 'Multi-Agent Autonomous Swarms',
        description: 'Hierarchical agent architectures where specialized autonomous agents collaborate to break down, execute, and verify complex multi-step objectives in real time.',
        tags: ['LangGraph', 'Agentic Workflows', 'AutoGPT Matrix', 'Tool Calling'],
      },
      {
        title: 'Domain-Specific LLM Fine-Tuning',
        description: 'Custom parameter-efficient fine-tuning (LoRA, QLoRA, and full-weight checkpoints) tailored to proprietary enterprise data and internal business rules.',
        tags: ['PyTorch', 'Hugging Face', 'DeepSpeed', 'LoRA / QLoRA'],
      },
      {
        title: 'High-Density RAG & Vector Mesh',
        description: 'Hybrid sparse-dense retrieval pipelines with sub-millisecond semantic search across millions of unstructured documents, audio, and visual assets.',
        tags: ['Pinecone', 'Qdrant', 'Milvus', 'Hybrid Retrieval'],
      },
      {
        title: 'Cognitive Vision & Multimodal Perception',
        description: 'Real-time spatial video stream analysis, document OCR extraction, and visual anomaly detection powered by vision transformers (ViT).',
        tags: ['Vision Transformers', 'YOLOv10', 'CLIP', 'OpenCV'],
      },
    ],
    architectureLayers: [
      {
        layer: 'Layer 01',
        name: 'Sensory & Ingestion Ingress',
        description: 'High-throughput Kafka streaming queues and WebSockets ingesting text, telemetry, audio, and high-framerate visual feeds.',
        technologies: ['Apache Kafka', 'gRPC', 'WebSocket Streams', 'FastAPI'],
      },
      {
        layer: 'Layer 02',
        name: 'Neural Inference & Orchestration',
        description: 'TensorRT-LLM and vLLM acceleration clusters managing model quantization, dynamic batching, and KV-cache optimizations.',
        technologies: ['vLLM', 'TensorRT-LLM', 'NVIDIA Triton', 'Ray Train'],
      },
      {
        layer: 'Layer 03',
        name: 'Semantic Memory & Vector Fabric',
        description: 'Distributed vector databases holding temporal embeddings, user memory contexts, and enterprise knowledge bases.',
        technologies: ['Vector DB', 'Redis Cache', 'PostgreSQL pgvector', 'Graph RAG'],
      },
      {
        layer: 'Layer 04',
        name: 'Safety Guardrails & Governance',
        description: 'Deterministic hallucination suppression, PII redacting, and compliance enforcement running before any response is dispatched.',
        technologies: ['NeMo Guardrails', 'Llama Guard', 'Audit Telemetry', 'Zero-Leakage Sandbox'],
      },
    ],
    useCases: [
      {
        title: 'Autonomous Enterprise Knowledge Synthesis',
        industry: 'FinTech & Banking',
        summary: 'Deployed an autonomous intelligence agent analyzing 40,000+ daily regulatory filings and market reports with automated risk scoring.',
        result: 'Reduced manual compliance auditing time by 87% with zero safety breaches.',
      },
      {
        title: 'Predictive Customer Engagement Swarms',
        industry: 'E-Commerce & SaaS',
        summary: 'Integrated multi-lingual cognitive customer support agents handling dynamic returns, catalog recommendations, and dispute mediation.',
        result: 'Achieved a 94.2% first-contact autonomous resolution rate across 12 countries.',
      },
      {
        title: 'Real-Time Medical Document Extraction',
        industry: 'Healthcare Technology',
        summary: 'Architected a vision-language OCR pipeline extracting patient history and diagnosis telemetry from fragmented electronic health records.',
        result: '99.4% field extraction precision with instant HIPAA-compliant masking.',
      },
    ],
    techStack: [
      'Python',
      'PyTorch',
      'vLLM',
      'TensorRT',
      'OpenAI / Anthropic APIs',
      'Ollama / Llama-3',
      'Pinecone',
      'LangChain / LangGraph',
      'Ray Cluster',
      'Docker & Kubernetes',
    ],
    faqs: [
      {
        question: 'How do you ensure data privacy and prevent proprietary leakage?',
        answer: 'We deploy air-gapped private models on your dedicated virtual private cloud (VPC) with zero external telemetry, client-side encryption, and strict role-based access control.',
      },
      {
        question: 'Can these AI models integrate with our existing ERP and CRM systems?',
        answer: 'Yes. Our cognitive systems interface seamlessly via standard REST, GraphQL, and gRPC endpoints, supported by webhooks and enterprise middleware connectors.',
      },
    ],
  },
  {
    id: 2,
    slug: 'distributed-cloud-edge-mesh',
    title: 'Distributed Cloud & Edge Mesh',
    subtitle: 'Ultra-low latency microservices, automated Kubernetes orchestration, and serverless edge nodes.',
    category: 'Cloud Infrastructure & Edge Systems',
    description: 'Meganods designs and manages globally distributed cloud architectures that decentralize computing power to the network edge, ensuring sub-50ms global response times and automated fault-tolerant failover.',
    image: '/tech-slider/cloud-mesh.jpg',
    accentColor: 'from-cyan-500 via-teal-500 to-blue-600',
    glowColor: 'rgba(20, 184, 166, 0.35)',
    badge: 'Global Edge Fabric',
    metrics: [
      { label: 'Global Edge PoPs', value: '300+ Locations', subtext: 'Distributed CDN & Anycast routing' },
      { label: 'P99 Latency', value: '< 24ms', subtext: 'Edge compute response time' },
      { label: 'Scaling Velocity', value: '0 to 100k QPS', subtext: 'In under 3.5 seconds' },
      { label: 'Downtime SLA', value: '99.999%', subtext: 'Multi-region active-active mesh' },
    ],
    overview: [
      'In today’s hyper-connected landscape, centralized computing creates latency bottlenecks. Our Distributed Cloud & Edge Mesh architecture redistributes business logic, static assets, and dynamic database replicas across 300+ edge points of presence worldwide.',
      'Using automated Kubernetes operators, Terraform infrastructure-as-code, and intelligent geo-DNS routing, your applications dynamically scale during traffic spikes and self-heal automatically if an entire cloud region goes offline.',
    ],
    coreCapabilities: [
      {
        title: 'Multi-Cloud Kubernetes Orchestration',
        description: 'Unified cluster management across AWS, Google Cloud, Azure, and bare-metal environments with seamless workload portability.',
        tags: ['Kubernetes', 'K3s', 'Helm', 'ArgoCD', 'Istio Service Mesh'],
      },
      {
        title: 'Edge Compute & Serverless Workers',
        description: 'Executing compute-heavy logic directly in the user’s local geographical region, bypassing lengthy round-trips to primary origin databases.',
        tags: ['Cloudflare Workers', 'AWS Lambda@Edge', 'Vercel Edge', 'Fly.io'],
      },
      {
        title: 'Globally Distributed Distributed Databases',
        description: 'Multi-master active-active database clusters offering continuous write consistency and instant read caching across the globe.',
        tags: ['CockroachDB', 'PlanetScale', 'Amazon Aurora Global', 'Redis Cluster'],
      },
      {
        title: 'GitOps & Zero-Downtime CI/CD Pipelines',
        description: 'Automated declarative deployments with canary rollout strategies, blue-green switching, and instant rollback triggers.',
        tags: ['Terraform', 'GitHub Actions', 'ArgoCD', 'Prometheus & Grafana'],
      },
    ],
    architectureLayers: [
      {
        layer: 'Layer 01',
        name: 'Anycast DNS & Global Routing',
        description: 'Intelligent traffic steering routing requests to the closest operational edge data center with automated DDoS filtering.',
        technologies: ['BGP Anycast', 'Cloudflare Edge', 'Route53', 'TLS 1.3 Termination'],
      },
      {
        layer: 'Layer 02',
        name: 'Serverless Edge Execution',
        description: 'V8 isolate runtimes running authentication, edge caching, and lightweight API transformations in under 5 milliseconds.',
        technologies: ['V8 Isolates', 'WASM', 'Edge Functions', 'Edge KV Storage'],
      },
      {
        layer: 'Layer 03',
        name: 'Service Mesh & Container Fleet',
        description: 'Istio-managed container pods with automated mTLS encryption, rate limiting, and dynamic traffic splitting.',
        technologies: ['Istio', 'Envoy Proxy', 'Kubernetes Pods', 'Calico CNI'],
      },
      {
        layer: 'Layer 04',
        name: 'Distributed Persistence & Storage',
        description: 'Decentralized object storage and transactional databases synchronized via Raft consensus protocols.',
        technologies: ['Raft Consensus', 'Distributed S3', 'CockroachDB', 'ScyllaDB'],
      },
    ],
    useCases: [
      {
        title: 'High-Volume Streaming Telemetry Platform',
        industry: 'IoT & Smart Mobility',
        summary: 'Deployed an edge ingestion pipeline handling 1.2 billion daily GPS and vehicle sensor pings across North America and Europe.',
        result: 'Reduced infrastructure cloud compute costs by 42% while slicing p99 latency to 19ms.',
      },
      {
        title: 'Global High-Frequency Trading Portal',
        industry: 'FinTech',
        summary: 'Architected a multi-region active-active trading API cluster with synchronous geo-replicated transaction ledgers.',
        result: 'Guaranteed 0% transaction collision rate and sustained 100% uptime through black-swan market events.',
      },
    ],
    techStack: [
      'Kubernetes',
      'Docker',
      'Terraform',
      'Go (Golang)',
      'Rust',
      'AWS / GCP / Azure',
      'Istio & Envoy',
      'Prometheus & Grafana',
      'ArgoCD',
      'Cloudflare Workers',
    ],
    faqs: [
      {
        question: 'How do you prevent data desynchronization across multi-region databases?',
        answer: 'We utilize Raft-based distributed consensus protocols alongside CRDTs (Conflict-free Replicated Data Types) and strict serialization isolation levels.',
      },
      {
        question: 'What happens during a localized cloud region outage?',
        answer: 'Our Anycast routing and automated health check orchestrator reroutes all inbound traffic to neighboring healthy regions in under 2 seconds without user session dropouts.',
      },
    ],
  },
  {
    id: 3,
    slug: 'zero-trust-cyber-shield',
    title: 'Zero-Trust Cyber Shield',
    subtitle: 'Quantum-resistant cryptographic protocols, continuous threat telemetry, and identity perimeter defense.',
    category: 'Cybersecurity & Cryptographic Matrix',
    description: 'Meganods implements hardened zero-trust security fabrics that eliminate implicit trust, enforce continuous cryptographic verification, and proactively defend against advanced persistent threats (APTs) and zero-day vulnerabilities.',
    image: '/tech-slider/cyber-matrix.jpg',
    accentColor: 'from-violet-600 via-purple-600 to-indigo-600',
    glowColor: 'rgba(147, 51, 234, 0.35)',
    badge: 'Military-Grade SecOps',
    metrics: [
      { label: 'Threat Interception', value: '100% Real-Time', subtext: 'AI-driven heuristic anomaly detection' },
      { label: 'Encryption Standard', value: 'Post-Quantum', subtext: 'Kyber & Dilithium cryptography ready' },
      { label: 'Zero-Trust Verification', value: 'Every Packet', subtext: 'Continuous micro-segmentation' },
      { label: 'Compliance Grade', value: 'SOC2 / ISO 27001', subtext: 'Automated audit continuous compliance' },
    ],
    overview: [
      'In a zero-trust model, the old perimeter firewall concept is obsolete. Every request—whether originating from outside the network or from an internal microservice—must be cryptographically authenticated, authorized, and continuously monitored.',
      'Our cybersecurity matrix combines hardware security modules (HSMs), AI-driven behavioural threat telemetry, and post-quantum encryption standards to safeguard enterprise data against evolving quantum threats and ransomware.',
    ],
    coreCapabilities: [
      {
        title: 'Micro-Segmentation & mTLS Fabric',
        description: 'Isolating every microservice into micro-perimeters secured by short-lived x509 cryptographic certificates and SPIFFE identities.',
        tags: ['SPIFFE / SPIRE', 'mTLS', 'WireGuard', 'eBPF Security'],
      },
      {
        title: 'Post-Quantum Cryptography (PQC)',
        description: 'Implementing NIST-approved quantum-resistant lattice encryption algorithms to protect long-term encrypted secrets from future decryption.',
        tags: ['ML-KEM (Kyber)', 'ML-DSA (Dilithium)', 'AES-256-GCM', 'ECDSA Secp256k1'],
      },
      {
        title: 'Automated SOC Telemetry & SIEM Intelligence',
        description: 'Real-time telemetry aggregation with machine-learning heuristics analyzing billions of logs per second for abnormal access vectors.',
        tags: ['Elastic SIEM', 'Wazuh', 'CrowdStrike', 'Falco eBPF'],
      },
      {
        title: 'Identity Governance & Passwordless IAM',
        description: 'FIDO2 / WebAuthn biometric authentication with dynamic contextual risk scoring and granular OAuth 2.1 scopes.',
        tags: ['FIDO2', 'WebAuthn', 'Passkeys', 'OpenID Connect', 'Keycloak'],
      },
    ],
    architectureLayers: [
      {
        layer: 'Layer 01',
        name: 'Edge WAF & DDoS Mitigator',
        description: 'Layer 7 adaptive Web Application Firewall blocking SQL injection, XSS, automated scraping bots, and volumetric attacks.',
        technologies: ['Cloudflare Magic Transit', 'ModSecurity', 'Rate Limiting', 'IP Reputation'],
      },
      {
        layer: 'Layer 02',
        name: 'Identity & Access Gateways',
        description: 'Context-aware access proxy checking device posture, user geolocation, and biometric verification on every request.',
        technologies: ['OIDC', 'Okta / Keycloak', 'FIDO2', 'Device Health Probes'],
      },
      {
        layer: 'Layer 03',
        name: 'Runtime Kernel & Container Defense',
        description: 'Kernel-level eBPF probes inspecting system calls and killing unauthorized processes before damage occurs.',
        technologies: ['Falco', 'Tetragon', 'eBPF', 'AppArmor & SELinux'],
      },
      {
        layer: 'Layer 04',
        name: 'Hardware-Enforced Cryptographic Vault',
        description: 'Dedicated HSMs and HashiCorp Vault managing rotating encryption keys, zero-knowledge secrets, and audit trails.',
        technologies: ['HashiCorp Vault', 'AWS KMS', 'Hardware HSMs', 'Sealed Secrets'],
      },
    ],
    useCases: [
      {
        title: 'Zero-Trust Modernization for Financial Core',
        industry: 'FinTech & Wealth Management',
        summary: 'Transformed a legacy banking monolithic network into a zero-trust micro-segmented environment with post-quantum token encryption.',
        result: 'Eliminated lateral attack surfaces and achieved 100% compliance across SOC2 Type II and PCI-DSS audits.',
      },
    ],
    techStack: [
      'eBPF',
      'HashiCorp Vault',
      'WireGuard',
      'SPIRE / SPIFFE',
      'Falco',
      'Elastic SIEM',
      'Rust Security Modules',
      'OpenSSL 3.x / BoringSSL',
      'Keycloak',
    ],
    faqs: [
      {
        question: 'Does zero-trust security impact application latency?',
        answer: 'Our optimized eBPF kernel-level routing and hardware-accelerated cryptographic handshakes introduce less than 0.8ms of overhead per request.',
      },
      {
        question: 'Can you assist with compliance certifications like HIPAA, GDPR, or SOC2?',
        answer: 'Yes. Our architectures come pre-configured with automated audit logs, encrypted backups, and continuous compliance reporting engines.',
      },
    ],
  },
  {
    id: 4,
    slug: 'spatial-robotics-vision-ai',
    title: 'Spatial Robotics & Vision AI',
    subtitle: 'Hardware-accelerated perception models, spatial SLAM tracking, and automated intelligent machinery.',
    category: 'Robotics, IoT & Spatial Compute',
    description: 'Meganods builds embedded intelligent vision systems and spatial robotics controllers that enable autonomous hardware to perceive, navigate, and interact with physical environments with millimeter precision.',
    image: '/tech-slider/autonomous-robot.jpg',
    accentColor: 'from-amber-500 via-orange-500 to-indigo-600',
    glowColor: 'rgba(249, 115, 22, 0.35)',
    badge: 'Hardware & Spatial Robotics',
    metrics: [
      { label: 'Spatial Tracking Accuracy', value: '< 1.2mm', subtext: 'LiDAR & visual SLAM localization' },
      { label: 'Perception Inference', value: '120 FPS', subtext: 'On-device GPU edge inference' },
      { label: 'Actuation Response', value: '< 5ms', subtext: 'Real-time CAN-bus motor control' },
      { label: 'Sensor Fusion', value: '16+ Streams', subtext: 'Cameras, LiDAR, IMU, and Sonar' },
    ],
    overview: [
      'Connecting software to the physical realm requires real-time deterministic execution. Our Spatial Robotics & Vision AI division engineers embedded software stacks that fuse multi-sensor feeds into unified 3D spatial maps.',
      'From autonomous guided vehicles (AGVs) in smart logistics warehouses to robotic inspection arms in precision manufacturing, our systems leverage ROS2, NVIDIA Jetson hardware acceleration, and edge neural networks for autonomous navigation.',
    ],
    coreCapabilities: [
      {
        title: '3D Spatial Mapping & Visual SLAM',
        description: 'Simultaneous Localization and Mapping fusing stereo cameras, LiDAR point clouds, and inertial measurement units (IMUs).',
        tags: ['ROS2', 'ORB-SLAM3', 'RTAB-Map', 'Point Cloud Library (PCL)'],
      },
      {
        title: 'On-Device Edge Neural Acceleration',
        description: 'Deploying quantized neural networks to NVIDIA Jetson and edge TPUs for real-time obstacle avoidance and object classification.',
        tags: ['NVIDIA Jetson Orin', 'TensorRT Embedded', 'DeepStream', 'CUDA'],
      },
      {
        title: 'Real-Time Actuation & Motor Kinematics',
        description: 'Inverse kinematics solvers and deterministic micro-controller code running on RTOS for instant mechanical trajectory planning.',
        tags: ['FreeRTOS', 'CAN Bus', 'MoveIt 2', 'Micro-ROS'],
      },
      {
        title: 'Autonomous Fleet Telemetry & Swarm Control',
        description: 'Centralized fleet dispatch software managing charging cycles, task allocation, and collision-free pathfinding across 100+ robots.',
        tags: ['MQTT', 'Fleet Management APIs', 'WebRTC Tele-operation', 'Kafka'],
      },
    ],
    architectureLayers: [
      {
        layer: 'Layer 01',
        name: 'Sensor Capture & Hardware Ingress',
        description: 'High-speed camera interfaces, LiDAR point streams, and IMU telemetry synchronized with microsecond precision.',
        technologies: ['GigE Vision', 'MIPI CSI-2', 'Ouster LiDAR', 'Bosch IMU'],
      },
      {
        layer: 'Layer 02',
        name: 'Embedded Inference & Perception',
        description: 'Onboard NVIDIA Orin GPU executing visual segmentation, depth estimation, and pedestrian tracking at 120 FPS.',
        technologies: ['NVIDIA Orin', 'TensorRT', 'YOLO-Pose', 'Stereo Depth'],
      },
      {
        layer: 'Layer 03',
        name: 'Planning & Motion Kinematics',
        description: 'Trajectory planners calculating collision-free velocity curves and inverse kinematics trajectories.',
        technologies: ['Nav2', 'MoveIt 2', 'Behavior Trees', 'Costmap 2D/3D'],
      },
      {
        layer: 'Layer 04',
        name: 'Cloud Telemetry & Fleet Oversight',
        description: 'Secure WebRTC video streams and MQTT telemetry uplinks for remote operator intervention and predictive diagnostics.',
        technologies: ['WebRTC', 'MQTT Mesh', 'TimescaleDB', 'Digital Twin Visualizers'],
      },
    ],
    useCases: [
      {
        title: 'Autonomous Logistics Warehouse Fleet',
        industry: 'Supply Chain & Manufacturing',
        summary: 'Engineered the embedded navigation and obstacle avoidance system for a fleet of 45 autonomous mobile robots (AMRs).',
        result: 'Boosted material transfer speed by 310% while achieving zero workplace accidents over 18 months.',
      },
    ],
    techStack: [
      'C++ (C++20)',
      'Python',
      'ROS2 (Humble / Iron)',
      'NVIDIA Jetson / CUDA',
      'FreeRTOS',
      'OpenCV & Open3D',
      'Gazebo Simulation',
      'MQTT / WebRTC',
    ],
    faqs: [
      {
        question: 'Can your vision models operate in low-light or outdoor environments?',
        answer: 'Yes. We integrate thermal imaging, infrared illumination, and active LiDAR sensors to ensure robust spatial perception in complete darkness or harsh weather.',
      },
      {
        question: 'Do you provide simulation environments before deploying to physical hardware?',
        answer: 'We build photorealistic digital twins in NVIDIA Isaac Sim and Gazebo to test kinematics, path planning, and edge cases before deploying to real physical robots.',
      },
    ],
  },
  {
    id: 5,
    slug: 'hyper-scale-web-mobile-frameworks',
    title: 'Hyper-Scale Web & Mobile Frameworks',
    subtitle: 'Sub-second rendering pipelines, reactive component state machines, and cross-platform native SDKs.',
    category: 'Engineering Architecture & UI/UX Systems',
    description: 'Meganods crafts blazing-fast, visually captivating web and mobile platforms built with modern React/Next.js frameworks, WebAssembly modules, and native mobile runtimes engineered for millions of concurrent users.',
    image: '/tech-slider/ai-neural.jpg',
    accentColor: 'from-blue-600 via-sky-500 to-indigo-500',
    glowColor: 'rgba(37, 99, 235, 0.35)',
    badge: 'Hyper-Scale Frontend Engineering',
    metrics: [
      { label: 'Core Web Vitals', value: '100 / 100', subtext: 'Perfect Lighthouse performance score' },
      { label: 'Initial Page Load', value: '< 280ms', subtext: 'Server-side streaming & edge hydration' },
      { label: 'Interaction Latency', value: '< 16ms', subtext: 'Smooth 60/120 FPS animations' },
      { label: 'Cross-Platform Code Reuse', value: '92%', subtext: 'Shared React Native & Next.js core' },
    ],
    overview: [
      'In digital consumer experiences, every millisecond directly affects conversion and user retention. Our frontend engineering practice combines Next.js App Router, React Server Components (RSC), WebAssembly (WASM), and GPU-accelerated motion libraries.',
      'We build design systems that scale effortlessly from high-density desktop trading dashboards to sleek iOS and Android native apps with fluid gesture physics and instant offline synchronization.',
    ],
    coreCapabilities: [
      {
        title: 'React Server Components & Partial Prerendering',
        description: 'Zero-bundle-size server components streaming dynamic content instantly with instant edge static shell delivery.',
        tags: ['Next.js 16', 'React 19', 'Server Actions', 'PPR & Streaming'],
      },
      {
        title: 'Design Systems & Dynamic Motion Engines',
        description: 'Pixel-perfect, accessible component libraries powered by Tailwind CSS, Radix UI primitives, and Framer Motion spring physics.',
        tags: ['Tailwind CSS', 'Framer Motion', 'Radix UI', 'Shadcn UI', 'Design Tokens'],
      },
      {
        title: 'Cross-Platform Mobile Engineering',
        description: 'Single-codebase native iOS & Android applications with native performance, offline-first SQLite caches, and push notification matrices.',
        tags: ['React Native', 'Expo', 'Swift / Kotlin Modules', 'WatermelonDB'],
      },
      {
        title: 'High-Performance WebAssembly (WASM) Modules',
        description: 'Compiling Rust and C++ algorithms directly into browser binaries for real-time 3D graphics, cryptographic signing, and audio processing.',
        tags: ['Rust WASM', 'WebGPU', 'Three.js / WebGL', 'Offscreen Canvas'],
      },
    ],
    architectureLayers: [
      {
        layer: 'Layer 01',
        name: 'Edge CDN & Asset Optimization',
        description: 'Automatic WebP/AVIF image transcoding, HTTP/3 multiplexing, and global edge cache purging on every deploy.',
        technologies: ['Next/Image', 'AVIF / WebP', 'HTTP/3 Quic', 'Vercel Edge CDN'],
      },
      {
        layer: 'Layer 02',
        name: 'Hydration & State Management',
        description: 'Minimal client runtime footprint with fine-grained reactive state stores (Zustand, TanStack Query) and optimistic UI mutations.',
        technologies: ['Zustand', 'TanStack Query', 'Optimistic UI', 'Turbopack'],
      },
      {
        layer: 'Layer 03',
        name: 'Real-Time Event Channels',
        description: 'Bi-directional WebSockets and Server-Sent Events (SSE) pushing real-time collaborative updates without page refreshes.',
        technologies: ['Server-Sent Events', 'WebSockets', 'WebRTC Data', 'Pusher'],
      },
      {
        layer: 'Layer 04',
        name: 'Continuous Telemetry & RUM Tracking',
        description: 'Real-User Monitoring (RUM) capturing FID, INP, and CLS performance metrics on real devices across the world.',
        technologies: ['Vercel Analytics', 'Sentry Performance', 'PostHog', 'OpenTelemetry'],
      },
    ],
    useCases: [
      {
        title: 'Ultra-Fast FinTech Mobile & Web Portal',
        industry: 'Banking & Financial Markets',
        summary: 'Re-architected the customer web portal and mobile trading apps for a high-growth neobank with 3.5 million active users.',
        result: 'Achieved sub-300ms page load times globally and increased checkout conversion by 28.4%.',
      },
    ],
    techStack: [
      'Next.js / React',
      'TypeScript',
      'Tailwind CSS',
      'React Native / Expo',
      'Rust (WASM)',
      'Framer Motion',
      'GraphQL / tRPC',
      'Jest & Playwright',
      'Turborepo',
    ],
    faqs: [
      {
        question: 'How do you guarantee 60fps / 120fps smooth animations on low-end mobile devices?',
        answer: 'We leverage GPU-accelerated CSS transforms (`transform3d`, `will-change`), offload heavy math to Web Workers or WASM, and enforce strict layout thrashing guards.',
      },
      {
        question: 'Can the design system be customized to our exact brand guidelines?',
        answer: 'Absolutely. We build modular, white-label design systems with CSS custom property tokens that allow instant retheming and seamless dark/light mode switching.',
      },
    ],
  },
]
