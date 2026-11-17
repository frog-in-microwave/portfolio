import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * Next.js 16 App Router Route Handler: POST /api/contact
 * 
 * Production Nodemailer (Gmail SMTP) implementation with fallback logging.
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

    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || 'yousef.abdallah.lbx@gmail.com';
    const gmailUser = process.env.GMAIL_USER || 'yousef.abdallah.lbx@gmail.com';
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    // If App Password is not yet added, fallback to console log
    if (!gmailAppPassword) {
      console.warn(
        '[Contact API] GMAIL_APP_PASSWORD is not set in environment. Message logged to console instead of sending email.'
      );
      console.log(
        `[Contact Submission] Received from "${name}" <${email}> [Topic: ${topic}]: "${message.slice(0, 100)}..."`
      );
      return NextResponse.json({
        success: true,
        message: 'Message logged (email dispatch disabled until GMAIL_APP_PASSWORD is set in .env.local).',
        receivedAt: new Date().toISOString(),
      });
    }

    // Configure Nodemailer Gmail SMTP Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword.replace(/\s+/g, ''), // Strip any accidental spaces
      },
    });

    // Dispatch email with HTML formatting and direct reply-to
    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: recipientEmail,
      replyTo: email, // Clicking "Reply" in your email client will reply directly to the sender!
      subject: `[Portfolio Inquiry] ${topic} — from ${name}`,
      text: `New Portfolio Message\n\nFrom: ${name} (${email})\nTopic: ${topic}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #0f172a;">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 20px;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 800; color: #0f172a;">New Portfolio Inquiry</h2>
            <span style="font-size: 11px; font-family: monospace; background-color: #f1f5f9; padding: 4px 8px; border-radius: 6px; font-weight: 700; color: #475569;">${topic}</span>
          </div>

          <div style="margin-bottom: 16px; font-size: 14px; line-height: 1.6;">
            <p style="margin: 0 0 8px 0;"><strong>Sender Name:</strong> ${name}</p>
            <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${email}</a></p>
          </div>

          <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #f59e0b; border-radius: 8px;">
            <p style="margin: 0 0 6px 0; font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: bold;">Message Content:</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="border-top: 1px solid #e2e8f0; margin-top: 24px; padding-top: 16px; font-size: 12px; color: #94a3b8; text-align: center;">
            <p style="margin: 0;">Hit <strong>Reply</strong> to respond directly to ${email}.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Transmission received and dispatched to inbox.',
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
