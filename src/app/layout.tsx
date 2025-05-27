// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNavbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Karooz - Sign Up", // Or your general title
  description: "Join Karooz, your dropshipping marketplace.",
};

export default function RootLayout({
  children,
  authModal, // <-- Add this prop for the slot
}: Readonly<{
  children: React.ReactNode;
  authModal: React.ReactNode; // <-- Define the type for the slot
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          {" "}
          {/* Wrap content with AuthProvider */}
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
            {children}
          </main>
          <Footer />
          <BottomNavbar />
          {authModal} {/* <-- Render the modal slot here */}
        </AuthProvider>
      </body>
    </html>
  );
}
