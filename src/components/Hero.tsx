import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Bot, 
  Cpu, 
  Database, 
  GitBranch,
  Play,
  RotateCw
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface HeroProps {
  onOpenCopilot: () => void;
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCopilot, onOpenTerminal }) => {
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Mini live simulator state
  const [simRunning, setSimRunning] = useState(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [tokensGenerated, setTokensGenerated] = useState(0);

  const phrases = [
    "Autonomous Multi-Agent Architectures",
    "High-Performance Full-Stack Applications",
    "Sub-50ms Enterprise RAG & Vector Systems",
    "Fault-Tolerant Microservices & Cloud Infra"
  ];

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = phrases[typingIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText.length < currentPhrase.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
      }, 70);
    } else if (!isDeleting && displayedText.length === currentPhrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
      }, 35);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setTypingIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, typingIndex]);

  // Run pipeline simulator
  const runSimulation = () => {
    if (simRunning) return;
    setSimRunning(true);
    setSimStep(1);
    setTokensGenerated(0);

    // Step 1: User Request Ingestion & Semantic Guardrails
    setTimeout(() => {
      setSimStep(2); // Step 2: Hybrid Dense/Sparse Vector Search
    }, 600);

    setTimeout(() => {
      setSimStep(3); // Step 3: Agentic Reasoning Loop (LangGraph)
    }, 1200);

    setTimeout(() => {
      setSimStep(4); // Step 4: Streaming LLM Token Generation
      // Stream tokens
      let count = 0;
      const interval = setInterval(() => {
        count += 28;
        setTokensGenerated(count);
        if (count >= 196) {
          clearInterval(interval);
          setSimStep(5); // Complete
          setSimRunning(false);
        }
      }, 60);
    }, 1800);
  };

  return (
    <section id="about" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-purple-600/15 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-600/10 blur-[90px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-800/40 text-xs text-slate-300 shadow-sm shadow-cyan-950">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-slate-200">
                {portfolioData.profile.statusBadge}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">Intelligent Systems</span> & Scalable Web Platforms
              </h1>
              
              {/* Typewriter Banner */}
              <div className="h-10 sm:h-12 flex items-center">
                <span className="text-slate-400 text-lg sm:text-xl font-mono mr-2">&gt;</span>
                <span className="text-xl sm:text-2xl font-mono font-medium text-cyan-300">
                  {displayedText}
                </span>
                <span className="w-2.5 h-6 bg-cyan-400 ml-1 inline-block animate-pulse" />
              </div>
            </div>

            {/* Bio paragraph */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {portfolioData.profile.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Featured Work</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </a>

              <button
                onClick={onOpenCopilot}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl glass-panel hover:bg-slate-800/80 border border-slate-700/80 text-cyan-300 font-semibold text-sm hover:border-cyan-500/40 transition-all cursor-pointer shadow-md shadow-black/40"
              >
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>Ask Portfolio Copilot</span>
              </button>

              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono transition-colors"
                title="Launch Developer CLI"
              >
                <Terminal className="w-4 h-4 text-slate-400" />
                <span>Launch CLI</span>
              </button>
            </div>

            {/* Core Stats Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {portfolioData.profile.stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Live Interactive Architecture / Pipeline Sandbox */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl glass-panel p-6 border border-slate-700/60 shadow-2xl shadow-black/60 overflow-hidden">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">
                    ai-pipeline.daemon // v2.6
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                  <Activity className="w-3 h-3 animate-spin" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Card Body: Interactive Demonstration */}
              <div className="py-5 space-y-4 font-mono text-xs">
                
                <div className="flex items-center justify-between text-slate-400">
                  <span>Interactive Pipeline Execution:</span>
                  <button
                    onClick={runSimulation}
                    disabled={simRunning}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {simRunning ? (
                      <RotateCw className="w-3 h-3 animate-spin" />
                    ) : (
                      <Play className="w-3 h-3" />
                    )}
                    <span>{simRunning ? 'Executing...' : 'Run Trace'}</span>
                  </button>
                </div>

                {/* Pipeline Flow Stages */}
                <div className="space-y-2.5">
                  {/* Stage 1 */}
                  <div className={`p-2.5 rounded-lg border transition-all duration-300 ${
                    simStep >= 1 ? 'bg-cyan-950/40 border-cyan-600/50 text-cyan-200' : 'bg-slate-900/40 border-slate-800 text-slate-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-cyan-400" />
                        <span className="font-semibold">01. API Gateway & Schema Validation</span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {simStep >= 1 ? '2.4ms • P99' : 'idle'}
                      </span>
                    </div>
                  </div>

                  {/* Stage 2 */}
                  <div className={`p-2.5 rounded-lg border transition-all duration-300 ${
                    simStep >= 2 ? 'bg-purple-950/40 border-purple-600/50 text-purple-200' : 'bg-slate-900/40 border-slate-800 text-slate-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-purple-400" />
                        <span className="font-semibold">02. Hybrid Vector + BM25 Reranker</span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {simStep >= 2 ? 'Milvus HNSW (18ms)' : 'idle'}
                      </span>
                    </div>
                  </div>

                  {/* Stage 3 */}
                  <div className={`p-2.5 rounded-lg border transition-all duration-300 ${
                    simStep >= 3 ? 'bg-indigo-950/40 border-indigo-600/50 text-indigo-200' : 'bg-slate-900/40 border-slate-800 text-slate-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GitBranch className="w-4 h-4 text-indigo-400" />
                        <span className="font-semibold">03. LangGraph Agent Reasoning DAG</span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {simStep >= 3 ? 'Verified State' : 'idle'}
                      </span>
                    </div>
                  </div>

                  {/* Stage 4 */}
                  <div className={`p-2.5 rounded-lg border transition-all duration-300 ${
                    simStep >= 4 ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-200' : 'bg-slate-900/40 border-slate-800 text-slate-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-emerald-400" />
                        <span className="font-semibold">04. Reactive WebSocket Token Stream</span>
                      </div>
                      <span className="text-[11px] text-emerald-300">
                        {simStep >= 4 ? `${tokensGenerated} tokens` : 'idle'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Live Console Output Box */}
                <div className="mt-4 p-3 rounded-lg bg-black/60 border border-slate-800/80 font-mono text-[11px] text-slate-300 space-y-1">
                  <div className="text-cyan-400 flex items-center justify-between">
                    <span>&gt; telemetry.stream()</span>
                    <span className="text-slate-500">HTTP/2 SSE</span>
                  </div>
                  <div className="text-slate-400 truncate">
                    {simStep === 0 && 'Click "Run Trace" to simulate an end-to-end full-stack AI request...'}
                    {simStep === 1 && 'Ingesting payload -> verifying JWT & rate limiter tokens...'}
                    {simStep === 2 && 'Querying 2.4M embeddings in Milvus -> applying reciprocal rank fusion...'}
                    {simStep === 3 && 'Branching LangGraph subagents -> executing parallel verification...'}
                    {simStep === 4 && `Streaming response chunks: ${tokensGenerated} tokens emitted @ 165 tok/s...`}
                    {simStep === 5 && 'Trace 0x8F92 complete: Status 200 OK • Total duration: 38ms'}
                  </div>
                </div>

              </div>

              {/* Bottom Mini Specs */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Stack: React • FastAPI • Milvus</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> 0ms Drop Rate
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
