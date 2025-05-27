// app/api/auth/request-password-reset/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto"; // For generating a secure token
import bcrypt from "bcrypt"; // For hashing the token before storing

// TODO: Configure your email sending service
// import { sendPasswordResetEmail } from '@/lib/email'; // Example import

const HASH_SALT_ROUNDS = 10;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // For security, we don't reveal if the user exists.
    // We proceed as if we're sending an email, even if the user isn't found.
    // The actual email sending would only happen if `user` is found.
    if (user) {
      // Invalidate any existing tokens for this user to prevent multiple active reset links
      await prisma.passwordResetToken.deleteMany({
        where: { userId: user.id },
      });

      const rawToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = await bcrypt.hash(rawToken, HASH_SALT_ROUNDS);
      const tokenExpiry = new Date(Date.now() + 3600000); // Token expires in 1 hour

      await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          token: hashedToken,
          expires: tokenExpiry,
        },
      });

      // Construct reset URL
      const resetUrl = `<span class="math-inline">\{process\.env\.NEXTAUTH\_URL\}/reset\-password?token\=</span>{rawToken}`;

      // --- TODO: Implement actual email sending ---
      // Example: await sendPasswordResetEmail(user.email, user.name || '', resetUrl);
      console.log(`Password Reset URL (for ${user.email}): ${resetUrl}`); // Log for development
      // In a real app, NEVER log the raw token if the email sending might fail or be delayed.
      // Ideally, log success of email dispatch only.
    }

    // Always return a generic success response to prevent email enumeration
    return NextResponse.json(
      {
        message:
          "If your email is registered, you will receive a password reset link.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[REQUEST_PASSWORD_RESET_ERROR]", error);
    // Generic error for the client, specific error logged on server
    return NextResponse.json(
      { message: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
