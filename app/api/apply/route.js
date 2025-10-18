import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const coverletter = formData.get("coverletter");
    const cv = formData.get("cv");

    let attachment = null;
    if (cv && cv.name) {
      const arrayBuffer = await cv.arrayBuffer();
      attachment = {
        filename: cv.name,
        content: Buffer.from(arrayBuffer),
      };
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

    // 💌 Modern HTML Email Template
    const htmlContent = `
      <div style="background-color:#f4f6f8;padding:40px 0;font-family:'Segoe UI',sans-serif;">
        <div style="max-width:600px;margin:auto;background:white;border-radius:10px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,0.08);">
          <div style="background:linear-gradient(90deg,#007bff,#00bcd4);padding:20px;text-align:center;">
            <h2 style="color:white;margin:0;font-size:22px;">New Job Application Received</h2>
          </div>
          <div style="padding:30px;">
            <p style="font-size:16px;color:#333;">Dear HR Team,</p>
            <p style="font-size:15px;color:#555;line-height:1.6;">
              You have received a new job application through your website. Below are the applicant details:
            </p>

            <table style="width:100%;border-collapse:collapse;margin:20px 0;">
              <tr>
                <td style="padding:8px 0;color:#007bff;font-weight:bold;width:150px;">Full Name:</td>
                <td style="padding:8px 0;color:#333;">${name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#007bff;font-weight:bold;">Email:</td>
                <td style="padding:8px 0;color:#333;">${email}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#007bff;font-weight:bold;">Phone:</td>
                <td style="padding:8px 0;color:#333;">${phone}</td>
              </tr>
            </table>

            <div style="margin-top:25px;">
              <h3 style="color:#007bff;margin-bottom:8px;">Cover Letter / Statement</h3>
              <p style="color:#444;line-height:1.6;white-space:pre-wrap;background:#f9f9f9;padding:12px 16px;border-radius:6px;border-left:4px solid #007bff;">
                ${coverletter}
              </p>
            </div>

            <div style="margin-top:30px;">
              <p style="color:#888;font-size:13px;">An attachment (CV/Resume) is included if uploaded.</p>
            </div>
          </div>

          <div style="background:#f1f1f1;padding:15px;text-align:center;font-size:13px;color:#666;">
            © ${new Date().getFullYear()} BPO Company Careers | Auto-generated email from Job Application Portal
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Job Portal" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `📄 New Job Application - ${name}`,
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