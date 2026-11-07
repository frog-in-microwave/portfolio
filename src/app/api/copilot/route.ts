import { NextResponse } from 'next/server';

/**
 * Next.js 16 App Router Route Handler: POST /api/copilot
 * 
 * Functions as the server-side backend endpoint for the AI Copilot.
 * In a full production deployment with an LLM provider (like OpenAI or Anthropic),
 * this endpoint would securely hold your `OPENAI_API_KEY` in environment variables
 * and stream tokens directly back to the client using `ReadableStream` or `AI SDK`.
 * 
 * Current Architecture:
 * 1. Validates the incoming JSON payload (`prompt`).
 * 2. Matches against Yousef's verified engineering knowledge base.
 * 3. Returns a structured JSON payload with status codes.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    // Payload validation: ensure prompt exists and is a valid string
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt provided. Please provide a string.' },
        { status: 400 }
      );
    }

    const lower = prompt.toLowerCase();
    let answer = `Yousef Abdallah is a Computer Engineering student and Full-Stack Developer with hands-on experience in Next.js, React, React Native, Node.js, GraphQL, PostgreSQL, Prisma, GCP, and Terraform.`;

    // Semantic rule-based matching based on Yousef's authentic background
    if (lower.includes('codebrave') || lower.includes('cloud run') || lower.includes('terraform') || lower.includes('gcp')) {
      answer = `At Codebrave (01/2026 - 04/2026 in Beirut), Yousef worked as a Full-Stack Developer Intern contributing to a comprehensive student and training management system. He deployed applications to GCP Cloud Run via Cloud Build, managed cloud resources with Terraform (IaC), and migrated database services to Firebase Data Connect to leverage GraphQL capabilities.`;
    } else if (lower.includes('agile labs') || lower.includes('mern') || lower.includes('react native') || lower.includes('mobile')) {
      answer = `At The Agile Labs (01/2026 - 04/2026), Yousef engineered mobile and web applications with the MERN stack (MongoDB, Express, React, Node.js) and React Native, adhering to strict Model-View-Controller (MVC) architectures and Agile sprint workflows.`;
    } else if (lower.includes('skill') || lower.includes('stack') || lower.includes('technology') || lower.includes('language')) {
      answer = `Yousef's technical competencies span Full-Stack & Cloud Engineering:
- Frontend & Mobile: React, Next.js, React Native, TypeScript, JavaScript, HTML5 & CSS, Expo
- Backend & APIs: Node.js, Express.js, GraphQL, Firebase Data Connect, MVC
- Cloud & Databases: GCP Cloud Run, Cloud Build, Terraform (IaC), PostgreSQL, Prisma, MongoDB, Git
- Languages & Tools: Python, C++, Java, WordPress`;
    } else if (lower.includes('education') || lower.includes('university') || lower.includes('liu') || lower.includes('saida')) {
      answer = `Yousef is pursuing a degree in Computer Engineering at the Lebanese International University (LIU) in Saida (09/2025 - 06/2028). He also completed the Codebrave Python and Web-Dev Program.`;
    } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('phone') || lower.includes('interview')) {
      answer = `You can reach Yousef directly via email at yousef.abdallah.lbx@gmail.com, by phone at +961 70646225, or by using the Contact form on this portfolio.`;
    }

    // Return successful response with metadata timestamp
    return NextResponse.json({
      answer,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API /api/copilot error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing copilot query' },
      { status: 500 }
    );
  }
}
