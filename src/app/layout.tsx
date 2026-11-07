import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yousef Abdallah • Full-Stack Web Developer & AI Engineer',
  description:
    'Portfolio of Yousef Abdallah — Computer Engineering student and Full-Stack Developer with hands-on experience in Next.js, React, React Native, Node.js, Express, GraphQL, PostgreSQL, Prisma, GCP Cloud Run, and Terraform.',
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
    title: 'Yousef Abdallah • Full-Stack Web Developer & AI Engineer',
    description:
      'Computer Engineering student and Full-Stack Developer crafting colorful, responsive web & mobile platforms with Next.js, React, GCP, and GraphQL.',
    type: 'website',
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23F59E0B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m18 16 4-4-4-4'/><path d='m6 8-4 4 4 4'/><path d='m14.5 4-5 16'/></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#090D16] text-slate-100 antialiased selection:bg-amber-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
