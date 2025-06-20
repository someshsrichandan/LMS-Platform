import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins"
import { resend } from "./resend";



export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    socialProviders: {
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET
        },
    },
    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp }) {
                await resend.emails.send({
                    from: 'LMS Platform <onboarding@resend.dev>',
                    to: [email],
                    subject: 'LMS Platform - Verify Your Email',
                    html: `<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4; color: #333;">
  <table role="presentation" style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <tr>
      <td style="padding: 40px 30px; text-align: center;">
        <h1 style="font-size: 28px; font-weight: bold; color: #1a73e8; margin: 0 0 20px;">Welcome to LMS Platform!</h1>
        <p style="font-size: 16px; line-height: 1.5; color: #555; margin: 0 0 20px;">Hi there,</p>
        <p style="font-size: 16px; line-height: 1.5; color: #555; margin: 0 0 20px;">Thank you for signing up on our platform. Please use the following OTP to verify your email address:</p>
        <div style="background-color: #e8f0fe; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h2 style="font-size: 24px; font-weight: bold; color: #1a73e8; margin: 0; letter-spacing: 2px;">${otp}</h2>
        </div>
        <p style="font-size: 14px; line-height: 1.5; color: #777; margin: 0 0 20px;">This OTP is valid for <strong>10 minutes</strong>.</p>
        <p style="font-size: 14px; line-height: 1.5; color: #777; margin: 0 0 30px;">If you did not request this, please ignore this email.</p>
        <p style="font-size: 16px; line-height: 1.5; color: #555; margin: 0;">Best regards,<br>LMS Platfor</p>
        <p style="font-size: 14px; color: #777; margin: 20px 0 0;">Made by Somesh</p>
        <a href="https://www.linkedin.com/in/someshsrichandan/" target="_blank" style="display: inline-block; margin-top: 10px;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" style="width: 24px; height: 24px; vertical-align: middle;">
        </a>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee;">
        <p style="margin: 0;">&copy; 2025 LMS Platform. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>`,
                })
            }
        })
    ]
});