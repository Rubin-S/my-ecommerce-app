// app/login/page.tsx
import { LoginForm } from "@/components/auth/LoginForm"; // We'll create this next
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div>
      {/* You can add any full-page specific headers or wrappers here if needed */}
      {/* Suspense can be useful if LoginForm fetches anything or has heavy components */}
      <Suspense fallback={<div>Loading login form...</div>}>
        <LoginForm isModal={false} />
      </Suspense>
    </div>
  );
}
