import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // Save to database
    await db.contactMessage.create({
      data: { name, email, message },
    });

    // Send email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const { Resend } = await import('resend');
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'mahajankalash8@gmail.com',
        replyTo: email,
        subject: `New message from ${name} — Portfolio Contact`,
        html: `
          <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 16px; margin-bottom: 24px;">
              <h2 style="margin: 0; font-size: 20px; color: #0f172a;">New Contact Message</h2>
              <p style="margin: 4px 0 0; color: #64748b; font-size: 14px;">From your portfolio website</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; font-size: 14px; color: #64748b; width: 100px; vertical-align: top;">Name</td>
                <td style="padding: 8px 0; font-size: 14px; color: #0f172a; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; color: #64748b; vertical-align: top;">Email</td>
                <td style="padding: 8px 0; font-size: 14px; color: #0f172a;">
                  <a href="mailto:${email}" style="color: #0d9488; text-decoration: none;">${email}</a>
                </td>
              </tr>
            </table>

            <div style="background: #f8fafc; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
              <p style="margin: 0; font-size: 14px; color: #0f172a; line-height: 1.7; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </div>

            <p style="margin-top: 32px; font-size: 12px; color: #94a3b8;">
              This message was sent from your portfolio contact form.
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
