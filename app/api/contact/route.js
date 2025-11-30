import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // ✉️ Configure SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 🌟 Modern Email Template
    const htmlContent = `
      <div style="background-color:#f4f6f8;padding:40px 0;font-family:'Segoe UI',sans-serif;">
        <div style="max-width:600px;margin:auto;background:white;border-radius:10px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,0.08);">
          <div style="background:linear-gradient(90deg,#007bff,#00bcd4);padding:20px;text-align:center;">
            <h2 style="color:white;margin:0;font-size:22px;">New Contact Form Message</h2>
          </div>
          <div style="padding:30px;">
            <p style="font-size:16px;color:#333;">Hello Team,</p>
            <p style="font-size:15px;color:#555;line-height:1.6;">
              You’ve received a new message from EchoForge BPO contact form. Here are the details:
            </p>

            <table style="width:100%;border-collapse:collapse;margin:20px 0;">
              <tr>
                <td style="padding:8px 0;color:#007bff;font-weight:bold;width:120px;">Name:</td>
                <td style="padding:8px 0;color:#333;">${name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#007bff;font-weight:bold;">Email:</td>
                <td style="padding:8px 0;color:#333;">${email}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#007bff;font-weight:bold;">Subject:</td>
                <td style="padding:8px 0;color:#333;">${subject}</td>
              </tr>
            </table>

            <div style="margin-top:25px;">
              <h3 style="color:#007bff;margin-bottom:8px;">Message</h3>
              <p style="color:#444;line-height:1.6;white-space:pre-wrap;background:#f9f9f9;padding:12px 16px;border-radius:6px;border-left:4px solid #007bff;">
                ${message}
              </p>
            </div>

            <div style="margin-top:30px;text-align:center;">
              <a href="mailto:${email}" style="display:inline-block;background:#007bff;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-size:14px;margin-top:15px;">
                Reply to ${name}
              </a>
            </div>
          </div>

          <div style="background:#f1f1f1;padding:15px;text-align:center;font-size:13px;color:#666;">
            © ${new Date().getFullYear()} EchoForge BPO | Contact Form Notification
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `📩 New Message from EchoForge BPO`,
      html: htmlContent,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ success: false, message: "Failed to send message." }, { status: 500 });
  }
}
