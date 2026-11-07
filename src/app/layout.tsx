import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Alex Vance | Full Stack Web Developer & AI Systems Engineer',
  description:
    'Portfolio of a Senior Full Stack Web Developer & AI Engineer specializing in React, Next.js, distributed microservices, LangGraph multi-agent workflows, and enterprise RAG systems.',
  keywords: [
    'Full Stack Developer',
    'AI Engineer',
    'Next.js',
    'React',
    'TypeScript',
    'LangGraph',
    'RAG',
    'FastAPI',
    'Distributed Systems',
    'Machine Learning',
  ],
  authors: [{ name: 'Alex Vance' }],
  openGraph: {
    title: 'Alex Vance | Full Stack Web Developer & AI Systems Engineer',
    description:
      'Architecting Intelligent Systems & Scalable Web Platforms. Bridging modern full-stack engineering with production LLM & Agent architectures.',
    type: 'website',
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2306b6d4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m18 16 4-4-4-4'/><path d='m6 8-4 4 4 4'/><path d='m14.5 4-5 16'/></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#080B11] text-slate-100 antialiased overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-300">
        {children}
      </body>
    </html>
  );
}
