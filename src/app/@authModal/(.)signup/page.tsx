// app/@authModal/(.)signup/page.tsx
"use client";
import { SignUpForm } from "@/components/auth/SignUpForm";
import {
  Dialog,
  DialogContent,
  DialogHeader, // Import
  DialogTitle, // Import
  // DialogDescription // Optional
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Import
import { useRouter } from "next/navigation";

export default function SignUpModal() {
  const router = useRouter();

  return (
    <Dialog
      open={true} // Modal is controlled by the route
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          router.back(); // Navigate back to "close" the modal
        }
      }}
    >
      <DialogContent className="max-w-md md:max-w-4xl p-0 overflow-y-auto max-h-[90vh]">
        {" "}
        {/* Added overflow & max-height */}
        <DialogHeader className="sr-only">
          {" "}
          {/* Or use VisuallyHidden on DialogTitle only */}
          <DialogTitle>Sign Up</DialogTitle>
          {/* <DialogDescription>Create your Karooz account.</DialogDescription> */}
        </DialogHeader>
        {/* The SignUpForm itself contains the visible title and content */}
        <SignUpForm isModal={true} />
      </DialogContent>
    </Dialog>
  );
}
