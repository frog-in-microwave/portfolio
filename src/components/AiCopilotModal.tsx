'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  User, 
  RotateCcw
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
      text: `Hello! I am Yousef Abdallah's AI Portfolio Copilot. I have complete knowledge of Yousef's Computer Engineering background, his internships at Codebrave and The Agile Labs, and his full-stack & cloud skillset. How can I assist you?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = [
    "What did Yousef build at Codebrave?",
    "What is Yousef's experience at The Agile Labs?",
    "What are Yousef's core skills and technologies?",
    "Tell me about Yousef's university education",
    "How can I contact or hire Yousef?",
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

  const generateResponse = (prompt: string): string => {
    const lower = prompt.toLowerCase();

    if (lower.includes('codebrave') || lower.includes('cloud run') || lower.includes('terraform') || lower.includes('gcp')) {
      return `At Codebrave (01/2026 - 04/2026 in Beirut), Yousef worked as a Full-Stack Developer Intern contributing to a comprehensive student and training management system. He worked with GCP, Cloud Run, and Cloud Build for containerized deployment, used Terraform for Infrastructure as Code (IaC), and worked with PostgreSQL and Prisma before migrating to Firebase Data Connect to leverage its GraphQL capabilities.`;
    }

    if (lower.includes('agile labs') || lower.includes('mern') || lower.includes('react native') || lower.includes('mobile')) {
      return `At The Agile Labs (01/2026 - 04/2026), Yousef built mobile and web applications with the MERN stack (MongoDB, Express.js, React, Node.js) and React Native. He worked in high-velocity Agile sprints, structured code cleanly using the Model-View-Controller (MVC) architecture, and used Git for version control.`;
    }

    if (lower.includes('skill') || lower.includes('tech stack') || lower.includes('language') || lower.includes('framework')) {
      return `Yousef's skills include:
- Frontend & Mobile: React, Next.js, React Native, TypeScript, JavaScript, HTML5 & CSS, Expo
- Backend & APIs: Node.js, Express.js, GraphQL, Firebase Data Connect, MVC
- Cloud & Databases: GCP, Cloud Run, Cloud Build, Terraform (IaC), PostgreSQL, Prisma ORM, MongoDB, Git
- Languages & Tools: Python, C++, Java, WordPress`;
    }

    if (lower.includes('education') || lower.includes('university') || lower.includes('degree') || lower.includes('liu')) {
      return `Yousef is pursuing a degree in Computer Engineering at the Lebanese International University (LIU) in Saida (09/2025 - 06/2028). He also completed the Codebrave Python and Web-Dev Program.`;
    }

    if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('phone') || lower.includes('interview')) {
      return `You can reach Yousef directly at:
- Email: yousef.abdallah.lbx@gmail.com
- Phone: +961 70646225
- Or by submitting the Contact form right below on this page. Yousef typically responds promptly!`;
    }

    return `Yousef Abdallah is a Computer Engineering student and Full-Stack Developer with hands-on experience in Next.js, React, React Native, Node.js, GraphQL, PostgreSQL, Prisma, GCP, and Terraform. Would you like to know more about his work at Codebrave, The Agile Labs, or his contact information?`;
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

    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx += 5;
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
        text: `Conversation reset. Feel free to ask anything about Yousef's engineering experience or background!`,
        timestamp: 'Just now',
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

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
                  Yousef Abdallah AI Copilot
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                  Assistant
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Trained on resume & technical background
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
              <span>Analyzing portfolio profile...</span>
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
              placeholder="Ask anything about Yousef's experience, stack, or internships..."
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
