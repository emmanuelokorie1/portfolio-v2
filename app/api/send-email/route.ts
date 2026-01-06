import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let name, email, message, subject;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      name = formData.get("name") as string;
      email = formData.get("email") as string;
      message = formData.get("message") as string;
      subject = formData.get("subject") as string;
    } else {
      const body = await request.json();
      name = body.name;
      email = body.email;
      message = body.message;
      subject = body.subject;
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_SENT_TO || process.env.EMAIL_USER, // Default to user if sent_to not set
        subject: subject || `New Message from ${name}`,
        text: message,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Message</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f5; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        .header { background-color: #18181b; color: #ffffff; padding: 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
        .content { padding: 32px; }
        .metadata { background-color: #f8fafc; border-radius: 6px; padding: 16px; margin-bottom: 24px; border: 1px solid #e2e8f0; }
        .metadata p { margin: 8px 0; font-size: 14px; color: #475569; }
        .metadata strong { color: #1e293b; width: 80px; display: inline-block; }
        .message-box { background-color: #ffffff; border-left: 4px solid #3b82f6; padding: 16px; margin-top: 8px; white-space: pre-wrap; color: #334155; }
        .footer { background-color: #f4f4f5; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        @media only screen and (max-width: 600px) {
            .container { margin: 0; border-radius: 0; }
            .content { padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Portfolio Inquiry</h1>
        </div>
        <div class="content">
            <div class="metadata">
                <p><strong>Subject:</strong> ${subject || "No Subject"}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
            </div>
            
            <p style="margin-bottom: 8px; font-weight: 600; color: #1e293b;">Message:</p>
            <div class="message-box">
                ${message}
            </div>
        </div>
        <div class="footer">
            <p>This email was sent from your portfolio website.</p>
        </div>
    </div>
</body>
</html>
        `
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
