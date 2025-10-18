import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const cv = formData.get("cv");
    const jobTitle = formData.get("jobTitle");

    let attachment = null;
    let cvMessage = "No CV attached.";
    if (cv && cv.name) {
      const arrayBuffer = await cv.arrayBuffer();
      attachment = { filename: cv.name, content: Buffer.from(arrayBuffer) };
      cvMessage = "CV/Resume attached.";
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlContent = `
      <div style="font-family:Arial,sans-serif;padding:20px;">
        <h2>New Job Application Received</h2>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>CV:</strong> ${cvMessage}</p>
      </div>
    `;

    const mailOptions = {
      from: `"Job Portal" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `📄 New Application - ${jobTitle}`,
      html: htmlContent,
      attachments: attachment ? [attachment] : [],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Application sent successfully!" });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ success: false, message: "Failed to send application." }, { status: 500 });
  }
}
