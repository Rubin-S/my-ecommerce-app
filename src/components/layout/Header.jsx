// components/layout/BottomNavbar.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { useSession } from "next-auth/react"; // For checking auth status
import { useRouter } from "next/navigation"; // For navigation
import { Button } from "@/components/ui/button"; // Shadcn button for trigger
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // For login/signup options

const BottomNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const navbarHeightThreshold = 70;

  const { data: session, status } = useSession(); // Get session status
  const router = useRouter();

  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > navbarHeightThreshold) {
      setIsVisible(false);
    } else if (
      scrollTop < lastScrollTop ||
      scrollTop <= navbarHeightThreshold
    ) {
      setIsVisible(true);
    }
    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  }, [lastScrollTop, navbarHeightThreshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const [isSellerMode, setIsSellerMode] = useState(false);

  const renderProfileSection = () => {
    if (status === "loading") {
      return (
        <div className="p-2 rounded-full text-gray-400 animate-pulse">
          <User size={20} />
        </div>
      );
    }

    if (status === "authenticated") {
      return (
        <Link
          href="/profile"
          className="p-2 rounded-full hover:bg-gray-200 text-gray-700"
          aria-label="Profile"
        >
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-5 h-5 rounded-full"
            />
          ) : (
            <User size={20} />
          )}
        </Link>
      );
    }

    // Unauthenticated
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="p-2 rounded-full hover:bg-gray-200 text-gray-700"
            aria-label="User menu"
          >
            <User size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mb-2">
          {" "}
          {/* align="end" to open to the left, mb-2 for spacing from nav */}
          <DropdownMenuItem onClick={() => router.push("/login")}>
            Login
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/signup")}>
            Sign Up
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out 
                  ${isVisible ? "translate-y-0" : "translate-y-full"}`}
      aria-label="Main bottom navigation"
    >
      <div className="max-w-2xl mx-auto mb-3 md:mb-4 px-2">
        <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-full px-4 sm:px-6 py-3 flex items-center justify-between space-x-2 sm:space-x-3">
          <button
            onClick={() => setIsSellerMode(!isSellerMode)}
            className="px-2 sm:px-3 py-1.5 border border-gray-300 rounded-full text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none whitespace-nowrap"
          >
            {isSellerMode ? "For Sellers" : "For Buyers"}
          </button>
          <Link
            href="/"
            className="text-lg sm:text-xl font-bold text-purple-600 hover:opacity-80 whitespace-nowrap"
          >
            Logo
          </Link>
          <div className="hidden sm:flex items-center space-x-2 md:space-x-4">
            <Link
              href="/blogs"
              className="text-xs md:text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap"
            >
              Blogs
            </Link>
            <Link
              href="/legal"
              className="text-xs md:text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap"
            >
              Legal & Policy
            </Link>
            <Link
              href="/support"
              className="text-xs md:text-sm text-gray-600 hover:text-purple-600 whitespace-nowrap"
            >
              Help & Support
            </Link>
          </div>
          {renderProfileSection()} {/* Profile icon/menu logic */}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavbar;
