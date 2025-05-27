// components/auth/ForgotPasswordForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email address.")
    .min(1, "Email is required."),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    try {
      form.reset(); // Reset form fields immediately for better UX
      toast.info(
        "If an account with that email exists, a password reset link will be sent."
      );

      const response = await fetch("/api/auth/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        // We generally don't want to reveal if an email exists or not for security.
        // The generic message above is often preferred.
        // However, if the API returns a specific error message you want to show:
        // toast.error(result.message || "Failed to send reset link.");
        console.error("Error sending reset link:", result.message);
        // No further user-facing toast here to avoid email enumeration
        return;
      }

      // Message already shown, no need for success toast here
      // toast.success("Password reset link sent if your email is registered!");
    } catch (error) {
      console.error("Request password reset error:", error);
      // Avoid specific error messages to the user here as well
      // toast.error("An unexpected error occurred.");
    }
  }

  return (
    <div className="max-w-md mx-auto my-10 p-6 md:p-8 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
        Forgot Your Password?
      </h1>
      <p className="text-center text-gray-600 mb-6 text-sm">
        No worries! Enter your email address below and we&apos;ll send you a
        link to reset your password.
      </p>
      <Form<ForgotPasswordFormValues> {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField<ForgotPasswordFormValues>
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </Form>
      <p className="mt-6 text-center text-sm">
        Remembered your password?{" "}
        <Link
          href="/login"
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          Login here
        </Link>
      </p>
    </div>
  );
}
