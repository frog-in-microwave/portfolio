'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  content: string | React.ReactNode;
}

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: 'sys-init',
      type: 'system',
      content: `yousef-cli [Version 1.0.0 (x86_64-apple-darwin)]\nType "help" to display available CLI commands, or "skills" to view technical proficiencies.`,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim().toLowerCase();
    const args = cmd.split(' ');
    const primary = args[0];

    const userLine: TerminalLine = {
      id: Date.now().toString(),
      type: 'input',
      content: rawCommand,
    };

    let responseLine: TerminalLine;

    switch (primary) {
      case 'help':
        responseLine = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `Available Commands:
  • help           - Show this help manual
  • whoami         - Display candidate profile summary
  • skills         - Technical competencies & frameworks
  • experience     - Work history & internship milestones
  • education      - Academic degrees & university background
  • contact        - Direct communication channels & phone
  • cat resume.md  - Print markdown resume summary
  • clear          - Clear terminal history
  • exit           - Close the terminal session`,
        };
        break;

      case 'whoami':
        responseLine = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `${portfolioData.profile.name} — ${portfolioData.profile.role}
Location: ${portfolioData.profile.location}
Phone: ${portfolioData.profile.phone}
Email: ${portfolioData.profile.email}
Bio: ${portfolioData.profile.bio}`,
        };
        break;

      case 'skills':
        responseLine = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `[Frontend & Mobile]:
  - React, Next.js, React Native, Expo, TypeScript, JavaScript, HTML & CSS, Tailwind

[Backend & APIs]:
  - Node.js, Express.js, GraphQL, Firebase Data Connect, MVC Architecture

[Cloud, Databases & DevOps]:
  - Google Cloud Platform (GCP), Cloud Run, Cloud Build
  - Terraform (Infrastructure as Code)
  - PostgreSQL, Prisma ORM, MongoDB (MERN Stack), Git

[Languages]:
  - Python, C++, Java, WordPress`,
        };
        break;

      case 'experience':
        responseLine = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: portfolioData.experience
            .map(
              (exp) =>
                `• ${exp.role} @ ${exp.company} (${exp.period}, ${exp.location})
    - ${exp.achievements.join('\n    - ')}`
            )
            .join('\n\n'),
        };
        break;

      case 'education':
        responseLine = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `• Computer Engineering (09/2025 - 06/2028)
  Lebanese International University - Saida (Lebanon)

• Codebrave Python and Web-Dev Program
  Codebrave`,
        };
        break;

      case 'contact':
        responseLine = {
          id: (Date.now() + 1).toString(),
          type: 'output',
          content: `Email:    ${portfolioData.profile.email}
Phone:    ${portfolioData.profile.phone}
LinkedIn: ${portfolioData.profile.linkedin}
GitHub:   ${portfolioData.profile.github}`,
        };
        break;

      case 'cat':
        if (args[1] === 'resume.md' || args[1] === 'cv.md') {
          responseLine = {
            id: (Date.now() + 1).toString(),
            type: 'output',
            content: `# Yousef Abdallah - Full-Stack Developer & AI Engineer
Email: ${portfolioData.profile.email} | Phone: ${portfolioData.profile.phone}

## Education
- Computer Engineering @ Lebanese International University - Saida (09/2025 - 06/2028)
- Codebrave Python and Web-Dev Program

## Professional Experience
- Full-Stack Developer Intern @ Codebrave (01/2026 - 04/2026)
  • Contributed to student management portal
  • GCP Cloud Run, Cloud Build & Terraform IaC
  • PostgreSQL, Prisma, Firebase Data Connect & GraphQL
- Full-Stack Developer Intern @ The Agile Labs (01/2026 - 04/2026)
  • Web & Mobile Apps with MERN Stack & React Native
- WordPress Intern @ CONCAT Tech (04/2025 - 08/2025)`,
          };
        } else {
          responseLine = {
            id: (Date.now() + 1).toString(),
            type: 'error',
            content: `cat: ${args[1] || 'file'}: No such file or directory. Try: cat resume.md`,
          };
        }
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'exit':
        onClose();
        return;

      default:
        responseLine = {
          id: (Date.now() + 1).toString(),
          type: 'error',
          content: `zsh: command not found: ${primary}. Type "help" for a list of valid commands.`,
        };
        break;
    }

    setHistory((prev) => [...prev, userLine, responseLine]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!inputValue.trim()) return;
      setCommandHistory((prev) => [...prev, inputValue]);
      setHistoryIndex(-1);
      handleCommand(inputValue);
      setInputValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputValue(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInputValue(commandHistory[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputValue('');
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <div
        className={`relative bg-[#070b12] border border-cyan-800/50 rounded-xl shadow-2xl flex flex-col z-10 font-mono transition-all duration-300 ${
          isMaximized ? 'w-full h-full rounded-none' : 'w-full max-w-3xl h-[550px]'
        }`}
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 transition-opacity cursor-pointer"
            />
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 transition-opacity cursor-pointer"
            />
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 transition-opacity cursor-pointer"
            />
            <span className="ml-3 text-xs text-slate-400 font-semibold flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>yousef@workstation: ~ (zsh)</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:text-white transition-colors"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button onClick={onClose} className="p-1 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Screen */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed text-slate-300">
          {history.map((line) => (
            <div key={line.id}>
              {line.type === 'input' && (
                <div className="flex items-center gap-2 text-cyan-300">
                  <span className="text-emerald-400">yousef@workstation</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-indigo-400">~</span>
                  <span className="text-slate-400">$</span>
                  <span>{line.content}</span>
                </div>
              )}
              {line.type === 'system' && (
                <div className="text-slate-500 whitespace-pre-wrap">{line.content}</div>
              )}
              {line.type === 'output' && (
                <div className="text-slate-300 whitespace-pre-wrap pl-2 border-l-2 border-cyan-500/30">
                  {line.content}
                </div>
              )}
              {line.type === 'error' && (
                <div className="text-rose-400 whitespace-pre-wrap pl-2 border-l-2 border-rose-500/40">
                  {line.content}
                </div>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 text-cyan-300 pt-1">
            <span className="text-emerald-400">yousef@workstation</span>
            <span className="text-slate-500">:</span>
            <span className="text-indigo-400">~</span>
            <span className="text-slate-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-slate-100 focus:outline-none font-mono text-xs caret-cyan-400"
              autoFocus
              spellCheck={false}
            />
          </div>

          <div ref={terminalEndRef} />
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-1.5 bg-slate-950 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>Shortcuts: Press 'Enter' to run • Up/Down for command history</span>
          <span>Press ESC or ⌘K to close</span>
        </div>
      </div>
    </div>
  );
};
