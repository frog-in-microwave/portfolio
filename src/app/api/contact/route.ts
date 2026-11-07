import { NextResponse } from 'next/server';

/**
 * Next.js 16 App Router Route Handler: POST /api/contact
 * 
 * Handles contact form submissions executed by the frontend client.
 * 
 * Security & Scalability Features:
 * 1. Payload Sanitization: Validates that required fields (`name`, `email`, `message`) are non-empty.
 * 2. Extensible Service Hook: Ready for integration with email delivery providers
 *    such as Resend (`resend.emails.send()`), SendGrid, or Discord Webhooks.
 * 3. Standard HTTP Status Responses (400 for bad requests, 200 for success, 500 for failures).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, topic, message } = body;

    // Validate incoming payload
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address provided.' },
        { status: 400 }
      );
    }

    // In local development / preview, log to server console
    console.log(
      `[Contact Submission] Received from "${name}" <${email}> [Topic: ${topic}]: "${message.slice(0, 100)}..."`
    );

    /*
     * Production Email Integration Example:
     * 
     * import { Resend } from 'resend';
     * const resend = new Resend(process.env.RESEND_API_KEY);
     * await resend.emails.send({
     *   from: 'portfolio@yousefabdallah.dev',
     *   to: 'yousef.abdallah.lbx@gmail.com',
     *   subject: `[Portfolio Inquiry] ${topic} from ${name}`,
     *   text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
     * });
     */

    return NextResponse.json({
      success: true,
      message: 'Transmission received. Yousef will respond within 24 hours.',
      receivedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API /api/contact error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing contact message' },
      { status: 500 }
    );
  }
}
