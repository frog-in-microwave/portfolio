'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  User, 
  RotateCcw,
  Compass
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

/**
 * AiCopilotModal Component - Mobile-First Redesign
 * 
 * Design Features:
 * - Mobile-first bottom sheet drawer on mobile (`h-[92vh] rounded-t-3xl`), transitioning to an elegant floating dialog on desktop (`max-w-xl h-[640px]`).
 * - Modern dark glass theme aligned with the portfolio: amber & rose highlights, crisp borders, dark blue base (`#0B0F19`).
 * - Smooth simulated streaming tokens with typing feedback.
 * - Quick suggestion pills with smooth horizontal swiping.
 * - Swipe-down drag affordance bar on mobile.
 */
export const AiCopilotModal: React.FC<AiCopilotModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I'm Yousef's AI assistant. Ask me anything about his full-stack builds, cloud infrastructure with GCP & Terraform, or internship accomplishments!`,
      timestamp: 'Just now',
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const quickPrompts = [
    "What did Yousef build at Codebrave?",
    "What is Yousef's core tech stack?",
    "Tell me about the Miami Sunshine Store",
    "Tell me about the Tomato Disease Classifier",
    "How can I contact Yousef?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      document.body.style.overflow = 'hidden';
      // Auto-focus input on desktop
      if (window.innerWidth >= 640) {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, messages, isTyping]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const lower = text.toLowerCase();
    let fullResponse = '';

    if (lower.includes('codebrave') || lower.includes('internship') || lower.includes('work') || lower.includes('intern')) {
      fullResponse = `At Codebrave, Yousef was a Full-Stack Developer Intern working on a comprehensive training portal for students, teachers, and trainers.\n\nKey accomplishments:\n• Engineered GCP Cloud Run deployments with Cloud Build CI/CD triggers.\n• Orchestrated infrastructure using Terraform (IaC).\n• Migrated relational workflows from PostgreSQL/Prisma to Firebase Data Connect for GraphQL capabilities.`;
    } else if (lower.includes('agile labs') || lower.includes('agile')) {
      fullResponse = `At The Agile Labs, Yousef developed web and mobile applications using the MERN stack (MongoDB, Express.js, React, Node.js) and React Native, adhering to strict MVC architectural patterns within an Agile/Scrum team.`;
    } else if (lower.includes('skill') || lower.includes('stack') || lower.includes('technology') || lower.includes('technologies')) {
      fullResponse = `Yousef's core engineering stack includes:\n\n• Frontend & Mobile: Next.js 16 (App Router), React 19, React Native, TypeScript, Tailwind CSS\n• Backend & APIs: Node.js, Express.js, GraphQL, REST APIs\n• Databases: PostgreSQL, Prisma ORM, MongoDB\n• Cloud & DevOps: Google Cloud Platform (Cloud Run, Cloud Build), Terraform (IaC), Docker, Git & CI/CD\n• Languages: Python, C++, Java, TypeScript/JavaScript`;
    } else if (lower.includes('education') || lower.includes('university') || lower.includes('degree') || lower.includes('liu') || lower.includes('saida')) {
      fullResponse = `Yousef is pursuing a Bachelor of Engineering in Computer Engineering at the Lebanese International University (LIU) in Saida (2025 – 2028). He also graduated from the Codebrave Python & Web Development Program.`;
    } else if (lower.includes('project') || lower.includes('build') || lower.includes('miami') || lower.includes('tomato') || lower.includes('store') || lower.includes('classifier')) {
      fullResponse = `Yousef has developed two featured systems:\n\n1. Miami Sunshine Summer Store: Full-stack neo-brutalist MERN e-commerce platform with Redux Toolkit, JWT auth, infinite scroll pagination, and Stripe Checkout Sessions.\n2. Leaf Diagnostics: Tomato Disease Classifier: Custom deep PyTorch CNN achieving 95.1% validation accuracy across 6 classes, paired with a FastAPI REST backend and responsive web app.`;
    } else if (lower.includes('contact') || lower.includes('email') || lower.includes('hire') || lower.includes('reach') || lower.includes('phone')) {
      fullResponse = `You can get in touch with Yousef directly:\n\n• Email: yousef.abdallah.lbx@gmail.com\n• Phone: +961 70646225\n• Location: Beirut / Saida, Lebanon (Open to Remote globally)\n• Form: Use the Contact section on this portfolio!`;
    } else {
      const match = portfolioData.aiCopilotKnowledge.find(
        (k) => lower.includes(k.question.toLowerCase().slice(0, 15))
      );
      if (match) {
        fullResponse = match.answer;
      } else {
        fullResponse = `Yousef is a Computer Engineering student and Full-Stack / AI Systems Developer specializing in Next.js, React Native, Node.js, GCP Cloud Run, and Terraform. Feel free to ask about his Codebrave internship, featured projects, or contact details!`;
      }
    }

    let currentIdx = 0;
    const chunkSize = 4;
    const interval = setInterval(() => {
      currentIdx += chunkSize;
      const partial = fullResponse.slice(0, currentIdx);

      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg && lastMsg.id === 'streaming-temp') {
          return [...prev.slice(0, -1), { ...lastMsg, text: partial }];
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
    }, 18);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: `Conversation restarted. What would you like to know about Yousef?`,
        timestamp: 'Just now',
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
        aria-hidden="true"
      />

      {/* Modal / Mobile Bottom Sheet */}
      <div className="relative w-full sm:max-w-xl h-[88vh] sm:h-[640px] max-h-[92vh] bg-[#0A0E1A] border border-white/10 sm:border-amber-400/20 rounded-t-[28px] sm:rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden">
        
        {/* Mobile Pull Handle Indicator */}
        <div className="sm:hidden w-full flex items-center justify-center pt-2.5 pb-1 cursor-grab">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0D1424]/90 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-violet-600 p-[1.5px] shadow-sm">
              <div className="w-full h-full bg-[#0D1424] rounded-[14px] flex items-center justify-center text-amber-400">
                <Bot className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-white text-sm sm:text-base tracking-tight">
                  Yousef's AI Assistant
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-md bg-amber-400/15 text-amber-300 border border-amber-400/30">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Ask anything about background &amp; skills
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
              title="Reset conversation"
              aria-label="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
              title="Close modal"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Messages Container */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 sm:gap-3 ${
                  isUser ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-xl shrink-0 flex items-center justify-center text-xs shadow-sm mt-0.5 ${
                    isUser
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-[#141C2E] border border-white/10 text-amber-400'
                  }`}
                >
                  {isUser ? <User className="w-3.5 h-3.5 text-slate-950" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-medium rounded-tr-none shadow-md shadow-amber-500/10'
                      : 'bg-[#111726] text-slate-200 border border-white/10 rounded-tl-none shadow-md'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <div className={`text-[10px] mt-1.5 font-mono ${
                    isUser ? 'text-slate-900/60 text-right' : 'text-slate-500 text-right'
                  }`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && messages[messages.length - 1]?.sender === 'user' && (
            <div className="flex items-center gap-2 text-amber-300 font-mono text-xs pl-9">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>Synthesizing response...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-3.5 py-2.5 border-t border-white/10 bg-[#0c1220] overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 shrink-0 uppercase">
              <Compass className="w-3 h-3 text-amber-400" />
              <span>Try:</span>
            </span>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                disabled={isTyping}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-medium text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer shrink-0 disabled:opacity-40"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#0D1424] border-t border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about Yousef's experience..."
              className="flex-1 bg-[#070A12] border border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 text-slate-950 disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 active:scale-95 transition-all cursor-pointer font-extrabold shrink-0 shadow-md shadow-amber-500/20"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
