// app/@authModal/(.)login/page.tsx
"use client";
import { LoginForm } from "@/components/auth/LoginForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function LoginModal() {
  const router = useRouter();

  return (
    <Dialog
      open={true}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          router.back(); // Navigate back to "close" the modal
        }
      }}
    >
      <DialogContent className="max-w-md p-0 overflow-y-auto max-h-[90vh]">
        <DialogHeader className="sr-only">
          {" "}
          {/* Or use VisuallyHidden on DialogTitle only */}
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
          <LoginForm isModal={true} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
