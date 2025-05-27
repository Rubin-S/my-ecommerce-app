// app/signup/page.tsx
import { SignUpForm } from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <div>
      {/* You can add any full-page specific headers or wrappers here if needed */}
      <SignUpForm isModal={false} />
    </div>
  );
}
