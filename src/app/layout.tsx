import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yousef Abdallah | Full-Stack Web Developer & AI Systems Engineer',
  description:
    'Portfolio of Yousef Abdallah, Computer Engineering student and Full-Stack Developer with hands-on experience in Next.js, React, React Native, Node.js, Express, GraphQL, PostgreSQL, Prisma, GCP Cloud Run, and Terraform.',
  keywords: [
    'Yousef Abdallah',
    'Full-Stack Developer',
    'AI Engineer',
    'Next.js',
    'React',
    'React Native',
    'TypeScript',
    'Node.js',
    'GraphQL',
    'GCP',
    'Terraform',
    'Prisma',
    'PostgreSQL',
    'Lebanon',
  ],
  authors: [{ name: 'Yousef Abdallah' }],
  openGraph: {
    title: 'Yousef Abdallah | Full-Stack Web Developer & AI Engineer',
    description:
      'Computer Engineering student and Full-Stack Developer specializing in Next.js, React, Node.js, GCP Cloud Run, Terraform, and GraphQL.',
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
