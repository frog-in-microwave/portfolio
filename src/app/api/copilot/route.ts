import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Invalid prompt provided' }, { status: 400 });
    }

    const lower = prompt.toLowerCase();
    let answer = `Alex combines deep full-stack engineering rigour with production AI capabilities. With 5+ years building distributed backends, ultra-fast React/Next.js frontends, and intelligent LLM pipelines, he delivers systems that are scalable, maintainable, and cost-effective.`;

    if (lower.includes('langgraph') || lower.includes('agent') || lower.includes('ai experience')) {
      answer = `Alex has extensive production experience architecting autonomous multi-agent workflows. At Synthetix AI, he engineered multi-agent LangGraph state machines that cut enterprise research cycles by 65%. In his featured project "AgentForge", he built DAG-based agent systems with cyclic self-correction loops, sandboxed code execution, and WebSocket streaming to a reactive Next.js client.`;
    } else if (lower.includes('from scratch') || lower.includes('full-stack') || lower.includes('frontend') || lower.includes('web app') || lower.includes('next')) {
      answer = `Yes, absolutely. Alex has built 24+ production web applications end-to-end. On the frontend, he specializes in Next.js 15, React 19, TypeScript, Tailwind CSS, and WebSockets. On the backend, he delivers high-concurrency microservices using Python (FastAPI), Go, and Node.js, backed by PostgreSQL, Redis, and Kafka.`;
    } else if (lower.includes('rag') || lower.includes('vector') || lower.includes('milvus') || lower.includes('pinecone') || lower.includes('retrieval')) {
      answer = `Alex advocates for hybrid retrieval architectures rather than naive vector search. In his "Synapse Search" project, he unified dense embeddings with sparse lexical BM25 indexing via Reciprocal Rank Fusion (RRF), coupled with Cohere neural reranking. He also implemented a two-tier Redis semantic cache that reduced 38% of identical semantic queries to sub-3ms latency with zero LLM API cost.`;
    } else if (lower.includes('hire') || lower.includes('available') || lower.includes('contact') || lower.includes('rate') || lower.includes('consulting') || lower.includes('interview')) {
      answer = `Alex is currently available for high-impact Senior/Lead Full Stack & AI Engineering roles as well as select technical advisory contracts. You can contact him directly via email at alex.vance.dev@gmail.com, or through the Contact form on this page. He typically responds within 24 hours!`;
    } else if (lower.includes('backend') || lower.includes('cloud') || lower.includes('devops') || lower.includes('kubernetes')) {
      answer = `Alex's core backend and systems stack consists of Python (FastAPI, Asyncio), Go (Golang) for high-concurrency telemetry, and Node.js. For cloud and MLOps, he utilizes Docker, Kubernetes, AWS (ECS, Lambda, S3, CloudFront), GitHub Actions CI/CD pipelines, and OpenTelemetry / ClickHouse for low-overhead distributed tracing.`;
    }

    return NextResponse.json({ answer, timestamp: new Date().toISOString() });
  } catch {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
