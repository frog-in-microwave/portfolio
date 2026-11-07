'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  User, 
  RotateCcw, 
  Check, 
  CornerDownLeft,
  MessageSquareCode
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AiCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiCopilotModal: React.FC<AiCopilotModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I am Alex Vance's AI Portfolio Copilot. I'm equipped with full knowledge of Alex's 5+ years of full-stack engineering, production AI agents, RAG architectures, and project deployments. How can I assist your team today?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = [
    "Tell me about Alex's AI & LangGraph experience",
    "Can Alex build full-stack web apps from scratch?",
    "What is Alex's approach to RAG & Milvus vector search?",
    "Is Alex available for hire / contracting?",
    "What backend & cloud stacks does Alex use?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, messages, isTyping]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Response generation matching knowledge base
  const generateResponse = (prompt: string): string => {
    const lower = prompt.toLowerCase();

    if (lower.includes('langgraph') || lower.includes('agent') || lower.includes('ai experience')) {
      return `Alex has extensive production experience architecting autonomous multi-agent workflows. At Synthetix AI, he engineered multi-agent LangGraph state machines that cut enterprise research cycles by 65%. In his featured project "AgentForge", he built DAG-based agent systems with cyclic self-correction loops, sandboxed code execution, and WebSocket streaming to a React client.`;
    }

    if (lower.includes('from scratch') || lower.includes('full-stack') || lower.includes('frontend') || lower.includes('web app')) {
      return `Yes, absolutely. Alex has built 24+ production web applications end-to-end. On the frontend, he specializes in React 19, Next.js 15, TypeScript, Tailwind CSS, and WebSockets. On the backend, he delivers high-concurrency microservices using Python (FastAPI), Go, and Node.js, backed by PostgreSQL, Redis, and Kafka.`;
    }

    if (lower.includes('rag') || lower.includes('vector') || lower.includes('milvus') || lower.includes('pinecone') || lower.includes('retrieval')) {
      return `Alex advocates for hybrid retrieval architectures rather than naive vector search. In his "Synapse Search" project, he unified dense embeddings with sparse lexical BM25 indexing via Reciprocal Rank Fusion (RRF), coupled with Cohere neural reranking. He also implemented a two-tier Redis semantic cache that reduced 38% of identical semantic queries to sub-3ms latency with zero LLM API cost.`;
    }

    if (lower.includes('hire') || lower.includes('available') || lower.includes('contact') || lower.includes('rate') || lower.includes('consulting') || lower.includes('interview')) {
      return `Alex is currently available for high-impact Senior/Lead Full Stack & AI Engineering roles as well as select technical advisory contracts. You can contact him directly via email at alex.vance.dev@gmail.com, or through the Contact form on this page. He typically responds within 24 hours!`;
    }

    if (lower.includes('backend') || lower.includes('cloud') || lower.includes('devops') || lower.includes('kubernetes')) {
      return `Alex's core backend and systems stack consists of Python (FastAPI, Asyncio), Go (Golang) for high-concurrency telemetry, and Node.js. For cloud and MLOps, he utilizes Docker, Kubernetes, AWS (ECS, Lambda, S3, CloudFront), GitHub Actions CI/CD pipelines, and OpenTelemetry / ClickHouse for low-overhead distributed tracing.`;
    }

    // Default fallback
    return `Alex combines deep full-stack engineering rigour with production AI capabilities. With 5+ years building distributed backends, ultra-fast React frontends, and intelligent LLM pipelines, he delivers systems that are scalable, maintainable, and cost-effective. Would you like to review his projects, explore his system architecture, or discuss a role?`;
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const fullResponse = generateResponse(query);

    // Simulate streaming response
    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx += 4;
      const partial = fullResponse.slice(0, currentIdx);

      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.sender === 'assistant' && last.id === 'streaming-temp') {
          return [
            ...prev.slice(0, -1),
            { ...last, text: partial },
          ];
        } else {
          return [
            ...prev,
            {
              id: 'streaming-temp',
              sender: 'assistant',
              text: partial,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ];
        }
      });

      if (currentIdx >= fullResponse.length) {
        clearInterval(interval);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === 'streaming-temp' ? { ...msg, id: Date.now().toString(), text: fullResponse } : msg
          )
        );
        setIsTyping(false);
      }
    }, 20);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: `Conversation reset. Feel free to ask anything about Alex's engineering experience, architectures, or availability!`,
        timestamp: 'Just now',
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl h-[620px] bg-[#0c111c] border border-cyan-800/40 rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <Bot className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-semibold text-white text-sm">
                  Alex Vance AI Copilot
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                  RAG Assistant
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Trained on technical profile & architecture specs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReset}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-cyan-950 border border-cyan-700/50 text-cyan-300'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none shadow-md'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div className="text-[10px] text-slate-400 mt-1.5 text-right font-mono">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && messages[messages.length - 1]?.sender === 'user' && (
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs pl-10">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Synthesizing response from portfolio knowledge base...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/60 overflow-x-auto">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Suggested:</span>
            {quickPrompts.slice(0, 3).map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-900/90 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about Alex's engineering background or tech stack..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 disabled:opacity-40 transition-all cursor-pointer font-bold shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
