// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Your Prisma client
import bcrypt from "bcrypt";
import * as z from "zod";
import { Role } from "@prisma/client"; // Import your Role enum

// Define Zod schema for input validation (isSeller removed)
const userRegistrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  // agreeToTerms is validated on client, if needed server-side, add here
  subscribeToNewsletter: z.boolean().optional().default(false),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = userRegistrationSchema.safeParse(body);

    if (!validation.success) {
      // Log the detailed validation errors for server-side debugging
      console.error(
        "Registration validation errors:",
        validation.error.flatten()
      );
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, password, subscribeToNewsletter } =
      validation.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 } // 409 Conflict
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Always assign BUYER role on initial registration
    const userRole = Role.BUYER;

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`, // Or handle name differently
        email,
        password: hashedPassword,
        role: userRole,
        // You might want to add a field in your Prisma schema for newsletterSubscription
        // newsletterSubscribed: subscribeToNewsletter,
        // emailVerified: null, // Optional: set if you have email verification flow
        // image: null, // Default image or leave null
      },
    });

    // Exclude password from the returned user object
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: "User registered successfully", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTRATION_ERROR: ", error);
    return NextResponse.json(
      { message: "An unexpected error occurred on the server." },
      { status: 500 }
    );
  }
}
