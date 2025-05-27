// Can be in the same file or a shared schema file
// components/auth/LoginForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation'; // useSearchParams to get callbackUrl
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
import Link from 'next/link'; // For "Forgot password?"

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address.").min(1, "Email is required."),
  password: z.string().min(1, "Password is required."),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  isModal?: boolean;
}

export function LoginForm({ isModal }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/'; // Redirect to home or previous page

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      const result = await signIn('credentials', {
        redirect: false, // Handle redirect manually to show toasts/errors
        email: values.email,
        password: values.password,
        // callbackUrl: callbackUrl // next-auth handles this internally if redirect is true
      });

      if (result?.error) {
        toast.error(result.error === "CredentialsSignin" ? "Invalid email or password." : result.error);
      } else if (result?.ok) {
        toast.success("Login successful!");
        router.push(callbackUrl); // Navigate to the callbackUrl or home
        router.refresh(); // Refresh server components, good after auth change
        if(isModal) { // If it was a modal, router.push above would navigate away
            // Potentially, if you wanted to close modal and stay on page, logic would be different
            // But usually login redirects.
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected login error occurred.");
    }
  }

  return (
    <div className={`p-6 ${isModal ? '' : 'max-w-md mx-auto my-8 rounded-lg shadow-xl bg-white md:p-8'}`}>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
        Login to Karooz
      </h1>
      <Form<LoginFormValues> {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField<LoginFormValues>
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField<LoginFormValues>
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-sm text-right">
            <Link href="/forgot-password" legacyBehavior={false} className="font-medium text-purple-600 hover:text-purple-500">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
      {!isModal && ( // Only show "Don't have an account?" on the full page version
        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup" legacyBehavior={false} className="font-medium text-purple-600 hover:text-purple-500">
            Sign up
          </Link>
        </p>
      )}
    </div>
  );
}