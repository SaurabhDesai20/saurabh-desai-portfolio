import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const submissionTime = new Date();
    const body = await request.json();
    const { name, email, phone, message } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: 'saurabhdesai2006@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #0f172a;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 40px auto;
                background: #1e293b;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(34, 211, 238, 0.2);
              }
              .header {
                background: linear-gradient(135deg, #0e7490 0%, #0891b2 100%);
                padding: 40px 30px;
                text-align: center;
                color: white;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 700;
              }
              .content {
                padding: 40px 30px;
              }
              .field {
                margin-bottom: 25px;
                padding: 20px;
                background: rgba(30, 41, 59, 0.6);
                border-radius: 10px;
                border-left: 4px solid #22d3ee;
                backdrop-filter: blur(10px);
              }
              .field-label {
                color: #22d3ee;
                font-weight: 600;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 8px;
              }
              .field-value {
                color: #e2e8f0;
                font-size: 16px;
                word-break: break-word;
              }
              .footer {
                background: #0f172a;
                padding: 30px;
                text-align: center;
                color: #94a3b8;
                font-size: 14px;
                border-top: 1px solid rgba(34, 211, 238, 0.1);
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📧 New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="field-label">Name</div>
                  <div class="field-value">${name}</div>
                </div>
                <div class="field">
                  <div class="field-label">Email Address</div>
                  <div class="field-value"><a href="mailto:${email}" style="color: #22d3ee; text-decoration: none;">${email}</a></div>
                </div>
                <div class="field">
                  <div class="field-label">Phone Number</div>
                  <div class="field-value">${phone || 'Not provided'}</div>
                </div>
                <div class="field">
                  <div class="field-label">Message</div>
                  <div class="field-value">${message || 'No message provided'}</div>
                </div>
              </div>
              <div class="footer">
                <p>Received on ${submissionTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric'
                })}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}