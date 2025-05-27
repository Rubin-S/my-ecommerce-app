// app/forgot-password/page.tsx
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { Suspense } from "react";

export default function ForgotPasswordPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading form...</div>}>
        <ForgotPasswordForm />
      </Suspense>
    </div>
  );
}
