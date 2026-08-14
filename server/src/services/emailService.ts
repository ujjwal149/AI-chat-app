import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailFrom = process.env.EMAIL_FROM;

if (!emailFrom) {
  throw new Error("EMAIL_FROM is not configured");
}

export const sendVerificationEmail = async (
  email: string,
  otp: string
): Promise<void> => {
  const { error } = await resend.emails.send({
    from: emailFrom,
    to: email,
    subject: "Verify your ChatAI account",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Verify your email</h2>

        <p>Thank you for creating a ChatAI account.</p>

        <p>Your verification code is:</p>

        <h1 style="letter-spacing: 8px;">${otp}</h1>

        <p>This code will expire in 10 minutes.</p>

        <p>
          If you did not create this account, you can safely ignore
          this email.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend email error:", error);
    throw new Error("Unable to send verification email");
  }
};