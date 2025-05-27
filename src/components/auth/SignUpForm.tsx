// components/auth/SignUpForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Define Zod schema based on your wireframe (isSeller removed)
const formSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is required." })
      .min(2, { message: "First name must be at least 2 characters." }),
    lastName: z
      .string()
      .min(1, { message: "Last name is required." })
      .min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions.",
    }),
    subscribeToNewsletter: z.boolean().default(false).catch(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof formSchema>;

interface SignUpFormProps {
  isModal?: boolean;
}

export function SignUpForm({ isModal }: SignUpFormProps) {
  const router = useRouter();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      // isSeller: false, // Removed
      agreeToTerms: false,
      subscribeToNewsletter: false,
    },
  });

  const onSubmit: Parameters<typeof form.handleSubmit>[0] = async (values) => {
    console.log("Form values submitted (without isSeller):", values);
    try {
      // Values sent to API will not include 'isSeller' if it's removed from schema
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Registration failed. Please try again.");
        return;
      }

      toast.success("Registration successful! Please login.");
      if (isModal) {
        router.back();
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div
      className={`${
        isModal
          ? ""
          : "max-w-4xl mx-auto my-8 p-4 md:p-8 rounded-lg shadow-xl bg-white"
      }`}
    >
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className={isModal ? "hidden md:block" : ""}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Sign up
          </h1>
          <p className="text-gray-600 mb-6">
            Join our community of happy customers!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-slate-200 h-24 md:h-32 rounded-lg flex items-center justify-center text-slate-400"
              >
                {/* Testimonial {i} Placeholder */}
              </div>
            ))}
          </div>
        </div>

        <div className={isModal ? "p-6" : ""}>
          {!isModal && (
            <h1 className="text-3xl font-bold mb-6 md:hidden text-center text-gray-800">
              Sign up
            </h1>
          )}
          {isModal && (
            <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center md:hidden">
              Sign up
            </h1>
          )}

          <Form<SignUpFormValues> {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                <FormField<SignUpFormValues>
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField<SignUpFormValues>
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField<SignUpFormValues>
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
              <FormField<SignUpFormValues>
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField<SignUpFormValues>
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* isSeller FormField removed */}
              <FormField<SignUpFormValues>
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="agreeToTerms"
                      />
                    </FormControl>
                    <div className="grid gap-1.5 leading-none">
                      <FormLabel
                        htmlFor="agreeToTerms"
                        className="font-normal text-sm text-gray-700"
                      >
                        Agree to Terms & Conditions
                      </FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField<SignUpFormValues>
                control={form.control}
                name="subscribeToNewsletter"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="subscribeToNewsletter"
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="subscribeToNewsletter"
                      className="font-normal text-sm text-gray-700"
                    >
                      Subscribe to weekly newsletter
                    </FormLabel>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
