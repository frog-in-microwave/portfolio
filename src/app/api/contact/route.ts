import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, topic, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // In production, forward to Resend, SendGrid, Discord webhook, or database
    console.log(`[Contact Submission] from ${name} (${email}) regarding [${topic}]: ${message.slice(0, 80)}...`);

    return NextResponse.json({
      success: true,
      message: 'Transmission received. Alex will respond within 24 hours.',
      receivedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: 'Failed to dispatch transmission' }, { status: 500 });
  }
}
