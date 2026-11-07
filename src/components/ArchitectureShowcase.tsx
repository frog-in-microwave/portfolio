import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Database, 
  Server, 
  Terminal, 
  Shield, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Cloud,
  Workflow
} from 'lucide-react';

interface ArchLayer {
  id: string;
  number: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  technologies: string[];
  designDecisions: string[];
  latencyBenchmark: string;
  codeSnippet: string;
}

export const ArchitectureShowcase: React.FC = () => {
  const [activeLayerId, setActiveLayerId] = useState<string>('agent');

  const layers: ArchLayer[] = [
    {
      id: 'client',
      number: '01',
      title: 'Reactive Client & UI Layer',
      category: 'Frontend Engineering',
      icon: Terminal,
      description: 'Zero-latency streaming client powered by React 19 Server Components, WebSockets, and optimistic client-side state.',
      technologies: ['React 19', 'TypeScript', 'Next.js 15', 'Tailwind CSS', 'WebSockets', 'Zustand'],
      designDecisions: [
        'Progressive stream decoding of server-sent tokens without blocking DOM reflows',
        'Strict TypeScript interfaces generated directly from backend OpenAPI schemas',
        'Optimistic cache updates with rollback recovery on socket interruptions',
      ],
      latencyBenchmark: 'P95 UI Render: 12ms',
      codeSnippet: `// Streaming LLM Response Receiver (React 19)
export function useStreamingInference(sessionId: string) {
  const [streamData, setStreamData] = useState<string>("");
  
  useEffect(() => {
    const ws = new WebSocket(\`\${API_GATEWAY}/stream/\${sessionId}\`);
    ws.onmessage = (event) => {
      const chunk = JSON.parse(event.data);
      if (chunk.type === "token") {
        setStreamData(prev => prev + chunk.text);
      }
    };
    return () => ws.close();
  }, [sessionId]);

  return { streamData };
}`,
    },
    {
      id: 'gateway',
      number: '02',
      title: 'Edge Gateway & Distributed Routing',
      category: 'Distributed Systems',
      icon: Server,
      description: 'High-throughput async gateway enforcing token bucket rate-limiting, JWT authentication, and zero-trust perimeter defense.',
      technologies: ['Python FastAPI', 'Go (Golang)', 'Envoy / NGINX', 'Redis Pub/Sub', 'JWT / OAuth2'],
      designDecisions: [
        'Non-blocking async I/O handling 65,000+ simultaneous connections per cluster node',
        'Redis distributed sliding window algorithm preventing DDoS & API abuse',
        'Centralized request correlation IDs for end-to-end distributed tracing',
      ],
      latencyBenchmark: 'Gateway Ingestion: 2.1ms',
      codeSnippet: `// High-concurrency Go / FastAPI edge filter
@app.middleware("http")
async def distributed_rate_limiter(request: Request, call_next):
    client_ip = request.headers.get("x-forwarded-for", request.client.host)
    token_valid = await redis_cluster.evalsha(RATE_LIMIT_SHA, 1, client_ip)
    if not token_valid:
        return JSONResponse(status_code=429, content={"error": "Rate limit exceeded"})
    
    response = await call_next(request)
    response.headers["X-Trace-Id"] = request.state.trace_id
    return response`,
    },
    {
      id: 'agent',
      number: '03',
      title: 'Agentic Orchestration & Reasoning DAG',
      category: 'Autonomous AI',
      icon: Workflow,
      description: 'Cyclic state machines coordinating multi-agent task execution, tool selection, self-reflection, and guardrails.',
      technologies: ['LangGraph', 'Python Asyncio', 'Semantic Guardrails', 'Instructor / Pydantic', 'Milvus Memory'],
      designDecisions: [
        'LangGraph state graphs with human-in-the-loop checkpoints before any destructive tool calls',
        'Dynamic tool selection with strict JSON schema validation via Pydantic',
        'Self-correction loops evaluating output factuality against retrieved context',
      ],
      latencyBenchmark: 'Reasoning Step: 140ms',
      codeSnippet: `// LangGraph Multi-Agent Verification Graph
class AgentWorkflowState(TypedDict):
    task: str
    code_diff: str
    tests_passed: bool
    iterations: int

workflow = StateGraph(AgentWorkflowState)
workflow.add_node("architect", plan_solution)
workflow.add_node("coder", generate_patch)
workflow.add_node("evaluator", run_sandbox_tests)

workflow.add_conditional_edges(
    "evaluator",
    should_retry,
    {"retry": "coder", "complete": END}
)`,
    },
    {
      id: 'storage',
      number: '04',
      title: 'Hybrid Vector & Semantic Memory',
      category: 'Data & Retrieval',
      icon: Database,
      description: 'Dual-tier retrieval pipeline unifying dense HNSW vector search with lexical BM25 and Redis semantic caching.',
      technologies: ['Milvus', 'Pinecone', 'PostgreSQL (pgvector)', 'Redis Semantic Cache', 'Cohere Rerank'],
      designDecisions: [
        'Semantic caching in Redis: identical meaning prompts return in under 3ms with zero LLM cost',
        'Reciprocal Rank Fusion (RRF) merging lexical and dense embedding scores',
        'Hierarchical document chunking retaining parent-document context for accurate citations',
      ],
      latencyBenchmark: 'Hybrid Query: 28ms',
      codeSnippet: `// Hybrid Dense + Lexical Fusion Search
async def hybrid_retrieve(query: str, top_k: int = 5):
    # Check semantic cache first (O(1))
    cached = await redis_semantic_cache.get(query, threshold=0.96)
    if cached:
        return cached

    # Parallel retrieval
    dense_task = milvus_client.search_embeddings(query, k=top_k * 2)
    bm25_task = es_client.search_bm25(query, k=top_k * 2)
    dense_hits, lexical_hits = await asyncio.gather(dense_task, bm25_task)

    # Reciprocal Rank Fusion & Cohere Neural Reranker
    reranked = apply_rrf(dense_hits, lexical_hits)
    return reranked[:top_k]`,
    },
    {
      id: 'cloud',
      number: '05',
      title: 'Cloud Infrastructure & MLOps Observability',
      category: 'Cloud & Infrastructure',
      icon: Cloud,
      description: 'Resilient Kubernetes infrastructure with automated CI/CD, spot-instance autoscaling, and real-time OpenTelemetry tracing.',
      technologies: ['Kubernetes', 'Docker', 'AWS ECS/EKS', 'ArgoCD', 'ClickHouse', 'OpenTelemetry'],
      designDecisions: [
        'Zero-downtime rolling updates with automatic health check canary deployments',
        'Cost-efficient GPU cluster scaling on spot instances saving 65% in cloud infrastructure costs',
        'Structured distributed traces logging token counts, latencies, and prompt diffs into ClickHouse',
      ],
      latencyBenchmark: '99.98% Service SLA',
      codeSnippet: `// Kubernetes Horizontal Pod Autoscaler for Inference Workers
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: inference-worker-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: inference-daemon
  minReplicas: 3
  maxReplicas: 24
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 75`,
    },
  ];

  const activeLayer = layers.find((l) => l.id === activeLayerId) || layers[0];

  return (
    <section id="architecture" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-xs font-mono text-cyan-400">
            <Layers className="w-3.5 h-3.5" />
            <span>FULL-STACK SYSTEM DESIGN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            How I Architect Production AI & Web Systems
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A battle-tested reference architecture connecting client responsiveness, distributed microservices, multi-agent reasoning, and resilient data storage.
          </p>
        </div>

        {/* Architecture Interactive Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Layer Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {layers.map((layer) => {
              const Icon = layer.icon;
              const isSelected = layer.id === activeLayerId;

              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayerId(layer.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-950/40'
                      : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${
                      isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {layer.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold tracking-tight ${
                          isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                        }`}>
                          {layer.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-mono">
                        {layer.category}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 transition-transform ${
                    isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Deep Dive for Selected Layer */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
                    <span>LAYER {activeLayer.number}</span>
                    <span>•</span>
                    <span>{activeLayer.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {activeLayer.title}
                  </h3>
                </div>

                <div className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{activeLayer.latencyBenchmark}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm sm:text-base my-5 leading-relaxed">
                {activeLayer.description}
              </p>

              {/* Key Architectural Decisions */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Key Design Decisions:
                </h4>
                <div className="space-y-2">
                  {activeLayer.designDecisions.map((decision, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{decision}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Badges */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2.5">
                  Technologies Deployed:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeLayer.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-800/80 border border-slate-700 text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Code / Config Preview */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#06090e]">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                  <span>production_spec.{activeLayer.id === 'client' ? 'tsx' : activeLayer.id === 'cloud' ? 'yaml' : 'py'}</span>
                  <span className="text-cyan-400">Production Snippet</span>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{activeLayer.codeSnippet}</code>
                </pre>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
