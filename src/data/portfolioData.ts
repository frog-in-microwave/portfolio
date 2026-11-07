export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'ai' | 'fullstack' | 'systems';
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  problem: string;
  solution: string;
  architectureHighlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 1 - 100
  icon?: string;
  highlight?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  relation: string;
}

export const portfolioData = {
  profile: {
    name: "Alex Vance",
    role: "Full Stack Web Developer & AI Engineer",
    secondaryTitle: "Distributed Systems • RAG & Agentic AI • Modern Web Architectures",
    location: "San Francisco, CA / Remote",
    statusBadge: "Available for High-Impact Roles & AI Consulting",
    isAvailable: true,
    bio: "Bridging modern full-stack web scalability with production-grade AI & LLM architectures. Over 5 years of engineering experience delivering enterprise web applications, real-time distributed backends, autonomous agent workflows, and low-latency retrieval systems.",
    aboutLong: [
      "I operate at the intersection of robust full-stack software engineering and state-of-the-art machine learning. Whether designing fault-tolerant microservices handling millions of events or architecting multi-agent reasoning loops with LangGraph and vector search, I prioritize performance, maintainability, and user delight.",
      "My foundational philosophy is that AI is only as powerful as the systems and interfaces that deliver it. I build fast, accessible, and reactive frontend experiences backed by bulletproof, cloud-native backend infrastructure.",
    ],
    email: "alex.vance.dev@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    resumeUrl: "#",
    stats: [
      { label: "Production Apps Deployed", value: "24+" },
      { label: "Years Engineering", value: "5+" },
      { label: "Daily AI Requests Handled", value: "1.8M+" },
      { label: "Production Uptime", value: "99.98%" },
    ],
  },

  skills: {
    ai: {
      title: "AI & Machine Learning",
      description: "Production LLM systems, agent orchestration, retrieval-augmented generation, and fine-tuning.",
      skills: [
        { name: "Autonomous Agents & LangGraph", level: 95, highlight: "State machines, human-in-the-loop, tool use" },
        { name: "RAG & Vector Retrieval", level: 96, highlight: "Hybrid search, reranking, chunking strategies" },
        { name: "Vector DBs (Milvus, Pinecone, Chroma)", level: 92, highlight: "HNSW indexing, metadata filtering" },
        { name: "PyTorch & Transformers", level: 86, highlight: "Model fine-tuning, LoRA/PEFT, evaluation" },
        { name: "OpenAI / Claude / Gemini APIs", level: 98, highlight: "Structured outputs, function calling, streaming" },
        { name: "vLLM & Triton Inference", level: 84, highlight: "PagedAttention, low-latency model serving" },
      ],
    },
    frontend: {
      title: "Frontend Engineering",
      description: "High-performance reactive interfaces with modern React, TypeScript, and micro-frontend patterns.",
      skills: [
        { name: "React 19 & Next.js 15", level: 98, highlight: "App router, Server Components, SSR, ISR" },
        { name: "TypeScript (Strict)", level: 96, highlight: "Type-safe architectures, generics, zod schemas" },
        { name: "Tailwind CSS & Design Systems", level: 95, highlight: "Accessible UI, micro-animations, theme tokens" },
        { name: "State (Zustand, TanStack Query)", level: 94, highlight: "Optimistic updates, cache invalidation" },
        { name: "WebSockets & Streaming UI", level: 92, highlight: "Real-time AI tokens, collaborative canvases" },
        { name: "Performance & Core Web Vitals", level: 90, highlight: "Code-splitting, 100/100 Lighthouse targets" },
      ],
    },
    backend: {
      title: "Backend & Systems",
      description: "Reliable, high-throughput microservices, real-time message streaming, and distributed data stores.",
      skills: [
        { name: "Python (FastAPI, Asyncio)", level: 96, highlight: "Asynchronous APIs, background workers" },
        { name: "Node.js & Go (Golang)", level: 91, highlight: "High-concurrency daemons, REST & GraphQL" },
        { name: "PostgreSQL & Prisma / Drizzle", level: 93, highlight: "Relational modeling, indexing, ACID transactions" },
        { name: "Redis & In-Memory Caching", level: 92, highlight: "Pub/Sub, rate limiting, semantic caching" },
        { name: "Kafka & Event-Driven Systems", level: 85, highlight: "Distributed queueing, idempotency" },
        { name: "API Security & OAuth2 / JWT", level: 94, highlight: "RBAC, token rotation, rate-limiting shields" },
      ],
    },
    devops: {
      title: "Cloud, DevOps & MLOps",
      description: "Container orchestration, CI/CD automation, cloud deployment, and observability pipelines.",
      skills: [
        { name: "Docker & Containerization", level: 95, highlight: "Multi-stage builds, minimal production images" },
        { name: "Kubernetes & Helm", level: 82, highlight: "Cluster management, auto-scaling, ingress" },
        { name: "AWS & GCP Cloud Architecture", level: 90, highlight: "ECS, Lambda, S3, CloudFront, Cloud Run" },
        { name: "CI/CD (GitHub Actions, ArgoCD)", level: 93, highlight: "Automated linting, testing, canary rollouts" },
        { name: "LLM Observability (LangSmith, OpenTelemetry)", level: 89, highlight: "Trace tracking, latency & token cost metrics" },
      ],
    },
  },

  projects: [
    {
      id: "agent-forge",
      title: "AgentForge Platform",
      tagline: "Autonomous Multi-Agent Workflow Orchestrator & Execution Engine",
      description: "An enterprise platform that coordinates multi-agent systems for automated codebase refactoring, security auditing, and dynamic synthesis with human-in-the-loop validation.",
      category: "ai",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      tags: ["LangGraph", "FastAPI", "React 19", "Milvus", "Docker", "WebSockets"],
      metrics: [
        { label: "Refactor Speedup", value: "6.2x" },
        { label: "Tokens Processed", value: "45M+" },
        { label: "Accuracy Score", value: "94.8%" },
      ],
      problem: "Software teams waste 20+ hours weekly on repetitive cross-repository dependency refactors, boilerplate code migration, and compliance audits.",
      solution: "Engineered a distributed DAG-based agent orchestrator using LangGraph and FastAPI, streaming step-by-step reasoning tokens to a reactive Next.js dashboard via WebSockets.",
      architectureHighlights: [
        "Dynamic multi-agent state machines with cyclic verification loops",
        "Deterministic sandboxed code execution in ephemeral micro-containers",
        "Semantic memory retrieval indexed across 12,000+ files using Milvus HNSW",
      ],
      githubUrl: "https://github.com/example/agent-forge",
      liveUrl: "https://agentforge.example.com",
      featured: true,
    },
    {
      id: "synapse-rag",
      title: "Synapse Search & RAG",
      tagline: "Sub-50ms Enterprise Hybrid Retrieval & Semantic Synthesis Engine",
      description: "High-throughput retrieval-augmented generation engine combining dense vector embeddings with sparse BM25 indexing and cross-encoder neural reranking.",
      category: "ai",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
      tags: ["Python", "OpenAI Embeddings", "BM25", "Redis Cache", "TypeScript", "FastAPI"],
      metrics: [
        { label: "P99 Query Latency", value: "< 42ms" },
        { label: "Hallucination Reduction", value: "78%" },
        { label: "Indexed Documents", value: "2.4M" },
      ],
      problem: "Standard naive vector search frequently returned irrelevant chunks on domain-specific acronyms, causing LLM hallucinations in production customer support.",
      solution: "Constructed a reciprocal rank fusion (RRF) pipeline that unifies BM25 lexical search with OpenAI dense embeddings, followed by a Cohere neural reranking tier.",
      architectureHighlights: [
        "Two-tier semantic caching layer using Redis vector similarity to serve 38% of queries instantaneously",
        "Context-aware hierarchical document chunking with parent-document lookups",
        "Streaming response generation with markdown citations linked to source PDFs",
      ],
      githubUrl: "https://github.com/example/synapse-rag",
      liveUrl: "https://synapserag.example.com",
      featured: true,
    },
    {
      id: "omni-pulse",
      title: "OmniPulse Cloud",
      tagline: "Real-Time Distributed Telemetry & Anomaly Detection Platform",
      description: "Full-stack observability suite monitoring microservice fleets with streaming telemetry, real-time alerts, and predictive system anomaly detection.",
      category: "fullstack",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      tags: ["Go (Golang)", "React", "Kafka", "TimescaleDB", "Tailwind CSS", "WebSockets"],
      metrics: [
        { label: "Events Ingested / Sec", value: "85,000" },
        { label: "Dashboard Refresh", value: "16ms" },
        { label: "Uptime Guaranteed", value: "99.99%" },
      ],
      problem: "Traditional logging solutions experienced 15-30 second ingestion lags, delaying incident response during high-traffic load spikes.",
      solution: "Built a high-performance Go ingestion layer connected to Kafka queues, storing metrics in TimescaleDB and streaming continuous canvas charts to a React client.",
      architectureHighlights: [
        "Zero-allocation message deserialization in Go handling 85k events/sec per node",
        "Client-side Canvas 2D charts with hardware-accelerated time-series rendering",
        "Isolation forest ML models predicting memory leaks 30 minutes before OOM events",
      ],
      githubUrl: "https://github.com/example/omnipulse",
      liveUrl: "https://omnipulse.example.com",
      featured: true,
    },
    {
      id: "hyper-commerce",
      title: "Aether Next-Gen Commerce",
      tagline: "Global E-Commerce Microservices with Real-Time AI Recommenders",
      description: "End-to-end multi-tenant e-commerce platform featuring instantaneous search, AI-driven dynamic bundling, and fault-tolerant checkout processing.",
      category: "fullstack",
      image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80",
      tags: ["Next.js 15", "Node.js", "PostgreSQL", "Stripe Connect", "Redis", "Tailwind"],
      metrics: [
        { label: "Conversion Lift", value: "+23.4%" },
        { label: "Lighthouse Performance", value: "99/100" },
        { label: "Checkout Failure Rate", value: "0.01%" },
      ],
      problem: "Legacy monolithic storefront suffered slow TTFB (850ms) and rigid product recommendations that failed to adapt to in-session consumer behaviors.",
      solution: "Migrated to Next.js 15 Server Components with an edge-cached Node microservice layer and real-time embedding-based product recommendations.",
      architectureHighlights: [
        "Distributed lock mechanism in Redis preventing inventory oversell under flash-sale concurrency",
        "Optimistic UI updates for cart modifications with rollback safety",
        "Edge-rendered dynamic SEO pages with sub-80ms First Contentful Paint globally",
      ],
      githubUrl: "https://github.com/example/aether-commerce",
      liveUrl: "https://aethercommerce.example.com",
      featured: false,
    },
    {
      id: "vision-craft",
      title: "VisionCraft Studio",
      tagline: "In-Browser WebGPU Generative Canvas & Neural Inpainting Suite",
      description: "Creative web studio integrating WebGPU shaders, interactive canvas controls, and cloud generative diffusion pipelines for concept artists.",
      category: "ai",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
      tags: ["WebGPU", "React", "TypeScript", "FastAPI", "Stable Diffusion", "WebSockets"],
      metrics: [
        { label: "Render Frame Rate", value: "60 FPS" },
        { label: "Active Creators", value: "14,000+" },
        { label: "Latency per Brushstroke", value: "< 8ms" },
      ],
      problem: "Generative AI web tools often had clunky form-based interfaces with no spatial control or real-time feedback for professional designers.",
      solution: "Developed an infinite-canvas workspace in React and WebGPU with layer masking, prompt brush inpainting, and asynchronous streaming tile generation.",
      architectureHighlights: [
        "Custom WebGPU brush shader engine for instant zero-lag spatial masks",
        "Asynchronous WebSocket streaming of progressive denoising diffusion steps",
        "Autoscaling GPU cluster runner deployed on Kubernetes with spot instances",
      ],
      githubUrl: "https://github.com/example/visioncraft",
      liveUrl: "https://visioncraft.example.com",
      featured: false,
    },
    {
      id: "prompt-pulse",
      title: "PromptPulse SDK & Observability",
      tagline: "Production LLM Monitoring, Prompt Versioning & Cost Optimization",
      description: "Developer tooling ecosystem providing automated regression evaluations, token cost heatmaps, and semantic guardrails for production LLM calls.",
      category: "systems",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      tags: ["TypeScript", "Python SDK", "ClickHouse", "Next.js", "Docker"],
      metrics: [
        { label: "Token Cost Saved", value: "34%" },
        { label: "SDK Overhead", value: "< 1.5ms" },
        { label: "GitHub Stars", value: "1,200+" },
      ],
      problem: "Enterprises deploying LLMs suffered from silent regression errors during prompt edits and unexpected token expenditure spikes.",
      solution: "Built a zero-latency telemetry SDK in TypeScript and Python that intercepts LLM calls, evaluates semantic drift, and alerts on anomalies.",
      architectureHighlights: [
        "Non-blocking background batch telemetry flush to ClickHouse columnar database",
        "Automated semantic drift regression tester using synthetic test suites",
        "Pre-inference prompt optimization token compactor reducing costs by 34%",
      ],
      githubUrl: "https://github.com/example/prompt-pulse",
      liveUrl: "https://promptpulse.example.com",
      featured: false,
    },
  ] as Project[],

  experience: [
    {
      period: "2024 - Present",
      role: "Senior Full Stack & AI Systems Engineer",
      company: "Synthetix AI Systems",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-Time",
      description: "Lead architect for enterprise multi-agent workflows and real-time generative interfaces, directing cross-functional teams across backend systems and reactive frontends.",
      achievements: [
        "Architected an autonomous multi-agent RAG engine that decreased internal enterprise research cycle times by 65%.",
        "Spearheaded the migration of frontend architectures to React 19 Server Components, reducing bundle size by 42% and boosting Core Web Vitals to 98+.",
        "Engineered streaming vector search pipelines processing 1.8M daily semantic requests with sub-50ms P95 latency.",
        "Mentored a team of 7 engineers in modern TypeScript patterns, LLM evaluation pipelines, and microservice decoupling.",
      ],
      technologies: ["React 19", "TypeScript", "LangGraph", "FastAPI", "Milvus", "Kafka", "Docker", "AWS"],
    },
    {
      period: "2022 - 2024",
      role: "Full Stack Software Engineer",
      company: "DataScale Cloud Infrastructure",
      location: "Remote",
      type: "Full-Time",
      description: "Designed and scaled high-traffic telemetry dashboards, microservices, and distributed data pipelines for cloud-native enterprise customers.",
      achievements: [
        "Engineered real-time telemetry streaming dashboard in React, Go, and WebSockets serving 20,000+ simultaneous engineering users.",
        "Built resilient database schema migrations and Redis caching strategies that cut database CPU utilization by 40%.",
        "Implemented automated CI/CD pipeline tests reducing release regression rates by 85%.",
      ],
      technologies: ["React", "TypeScript", "Go (Golang)", "Node.js", "PostgreSQL", "Redis", "Kubernetes"],
    },
    {
      period: "2020 - 2022",
      role: "Software Engineer",
      company: "Novus Web Labs",
      location: "Austin, TX",
      type: "Full-Time",
      description: "Developed responsive web applications, payment integrations, and cloud REST APIs for high-growth SaaS startups.",
      achievements: [
        "Delivered 12+ end-to-end client web applications with 100% on-time milestone delivery.",
        "Integrated Stripe payment billing engines and automated invoicing systems processing $3M+ in annual transaction volume.",
        "Optimized frontend webpack bundles and implemented responsive mobile layouts.",
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL", "Tailwind CSS"],
    },
  ] as Experience[],

  testimonials: [
    {
      name: "Marcus Sterling",
      role: "VP of Engineering",
      company: "Synthetix AI",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
      content: "Alex is that rare 1% engineer who operates flawlessly across the entire spectrum—from deep neural retrieval pipelines down to pixel-perfect, hyper-responsive React interfaces. He consistently delivers production code that is clean, well-tested, and built for scale.",
      relation: "Direct Engineering Manager",
    },
    {
      name: "Dr. Elena Rostova",
      role: "Principal AI Research Scientist",
      company: "Cortex Intelligence",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80",
      content: "Translating cutting-edge LLM research into production-grade systems is exceptionally hard. Alex's deep understanding of latency, vector indexing, and asynchronous system orchestration made our multi-agent launch an overwhelming success.",
      relation: "Collaborated on Agent Orchestration",
    },
    {
      name: "David Chen",
      role: "Co-Founder & CTO",
      company: "OmniPulse",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
      content: "Alex built our core telemetry streaming engine in Go and React that handles tens of thousands of real-time events without breaking a sweat. If you need someone who can ship end-to-end with high velocity and zero hand-holding, hire him.",
      relation: "Led Core Frontend & Ingestion Stack",
    },
  ] as Testimonial[],

  aiCopilotKnowledge: [
    {
      question: "What is Alex's core expertise?",
      answer: "Alex is a Full Stack Web Developer & AI Engineer with 5+ years of experience. He specializes in building scalable modern web applications (React 19, Next.js, TypeScript), high-throughput distributed backends (Python/FastAPI, Go, Node.js), and production AI systems (LangGraph, RAG, Vector Search, Milvus, PyTorch).",
    },
    {
      question: "What kind of roles or contracts is Alex open to?",
      answer: "Alex is currently considering Senior / Lead Full Stack Engineering roles, AI Systems Engineer positions, and select high-impact technical consulting engagements involving LLM applications, RAG pipelines, or full-stack architecture modernization.",
    },
    {
      question: "Can Alex build a full product end-to-end from scratch?",
      answer: "Yes, absolutely! Alex has designed and shipped multiple complete products from ground zero: UI/UX design systems, frontend client applications, REST/WebSocket APIs, relational & vector database architecture, CI/CD automation, and cloud deployments.",
    },
    {
      question: "What is Alex's approach to AI and LLM engineering?",
      answer: "Alex advocates for pragmatic, latency-conscious, and deterministic AI systems. Rather than treating LLMs as magic black boxes, he emphasizes hybrid retrieval (BM25 + Dense embeddings), state-machine orchestration (LangGraph), semantic caching (Redis), strict JSON schemas, and continuous observability.",
    },
    {
      question: "How can I contact or hire Alex?",
      answer: "You can reach out directly via email at alex.vance.dev@gmail.com, connect on LinkedIn, or use the interactive Contact form on this portfolio. Alex typically responds within 24 business hours.",
    },
  ],
};
