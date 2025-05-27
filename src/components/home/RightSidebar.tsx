// components/home/RightSidebar.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Heart,
  ShoppingBag,
  Package,
  Settings,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const COLLAPSED_WIDTH = "56px"; // Tailwind w-14
const EXPANDED_WIDTH = "256px"; // Tailwind w-64
const SIDEBAR_HEIGHT = "320px"; // Tailwind h-80. Adjust as needed.
const SCROLL_VISIBILITY_THRESHOLD = 50; // Hide after scrolling down this much

interface SidebarNavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  requiresAuth?: boolean;
}

export default function RightSidebar() {
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);
  const [isHoverExpanded, setIsHoverExpanded] = useState(false);
  let hoverTimeout: NodeJS.Timeout | null = null;

  const [isScrollVisible, setIsScrollVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const { data: session, status } = useSession();
  const router = useRouter();

  const handlePageScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > SCROLL_VISIBILITY_THRESHOLD) {
      setIsScrollVisible(false); // Scrolling Down
    } else if (
      scrollTop < lastScrollTop ||
      scrollTop <= SCROLL_VISIBILITY_THRESHOLD
    ) {
      setIsScrollVisible(true); // Scrolling Up or at the top
    }
    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  }, [lastScrollTop]);

  useEffect(() => {
    window.addEventListener("scroll", handlePageScroll, { passive: true });
    return () => window.removeEventListener("scroll", handlePageScroll);
  }, [handlePageScroll]);

  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    if (!isScrollVisible) return;
    hoverTimeout = setTimeout(() => {
      if (!isManuallyExpanded) {
        setIsHoverExpanded(true);
      }
    }, 500);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setIsHoverExpanded(false);
  };

  const toggleManualExpand = () => {
    setIsManuallyExpanded(!isManuallyExpanded);
    setIsHoverExpanded(false);
    if (hoverTimeout) clearTimeout(hoverTimeout);
  };

  const isEffectivelyExpanded =
    isScrollVisible && (isManuallyExpanded || isHoverExpanded);
  const isPresentOnScreen = isScrollVisible;

  const navItems: SidebarNavItem[] = [
    { href: "/cart", label: "Cart", icon: ShoppingCart },
    { href: "/wishlist", label: "Wishlist", icon: Heart, requiresAuth: true },
    { href: "/products", label: "Shopping", icon: ShoppingBag },
    {
      href: "/orders",
      label: "Your Orders",
      icon: Package,
      requiresAuth: true,
    },
    {
      href: "/settings/customization",
      label: "Customization",
      icon: Settings,
      requiresAuth: true,
    },
    { href: "/feedback", label: "Feedback", icon: MessageSquare },
  ];

  return (
    <motion.aside
      key={isEffectivelyExpanded ? "expanded-right" : "collapsed-right"}
      initial={{ x: EXPANDED_WIDTH, opacity: 0 }} // Start off-screen to the right
      animate={{
        x: isPresentOnScreen ? "0px" : EXPANDED_WIDTH, // Slide in/out from the right
        width: isEffectivelyExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
        opacity: isPresentOnScreen ? 1 : 0,
      }}
      style={{ height: SIDEBAR_HEIGHT }}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      className={cn(
        "fixed right-4 top-1/2 -translate-y-1/2 z-30",
        "bg-white/80 backdrop-blur-md shadow-xl flex flex-col overflow-hidden",
        // Conditional rounding: 'rounded-full' when collapsed, 'rounded-l-2xl' when expanded
        isEffectivelyExpanded ? "rounded-l-2xl" : "rounded-full"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Toggle button always visible at the top of the capsule */}
      <div
        className={cn(
          "p-2 flex shrink-0",
          isEffectivelyExpanded ? "justify-start pl-3" : "justify-center"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleManualExpand}
          className="text-gray-600 hover:text-purple-600 w-8 h-8"
          aria-label={
            isEffectivelyExpanded ? "Collapse sidebar" : "Expand sidebar"
          }
        >
          {isEffectivelyExpanded ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      {/* Content Area: Icons for collapsed, full content for expanded */}
      <div className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          {isEffectivelyExpanded ? (
            <motion.div
              key="expanded-right-content"
              initial={{ opacity: 0, x: 20 }} // Start from right for content
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: 0.1, duration: 0.2 },
              }}
              exit={{ opacity: 0, x: 20, transition: { duration: 0.15 } }}
              className="h-full overflow-y-auto space-y-1 px-3 pb-2"
            >
              {isEffectivelyExpanded && (
                <h3 className="text-xs font-semibold text-gray-500 mb-1.5 px-1 uppercase tracking-wider">
                  My Hub
                </h3>
              )}
              {navItems.map((item) => {
                if (item.requiresAuth && status !== "authenticated")
                  return null;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center space-x-2.5 p-1.5 rounded-md text-sm font-medium text-gray-600 hover:bg-slate-200/70 hover:text-purple-600 transition-colors duration-150 group"
                  >
                    <item.icon className="h-4 w-4 text-gray-500 group-hover:text-purple-500 shrink-0" />
                    <span className="truncate text-xs">{item.label}</span>
                  </Link>
                );
              })}
              {status !== "authenticated" && status !== "loading" && (
                <div className="mt-3 pt-3 border-t border-slate-200/60">
                  <Button
                    className="w-full mb-1.5 text-xs h-7"
                    size="sm"
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs h-7"
                    onClick={() => router.push("/signup")}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="collapsed-right-content"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.1, duration: 0.2 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="flex flex-col items-center justify-center space-y-3 h-full pt-1" // Centered icons
            >
              {navItems.slice(0, 4).map((item) => {
                // Show fewer icons
                if (item.requiresAuth && status !== "authenticated")
                  return null;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="p-1.5 rounded-md hover:bg-slate-200/70"
                    aria-label={item.label}
                  >
                    <item.icon size={18} className="text-gray-600" />
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
