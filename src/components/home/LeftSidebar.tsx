// components/home/LeftSidebar.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, Users, Building, Menu, X } from "lucide-react";
import { mockSellers } from "@/lib/mockData/sellers";
import { cn } from "@/lib/utils";

const COLLAPSED_WIDTH = "56px"; // Tailwind w-14
const EXPANDED_WIDTH = "260px";
const SIDEBAR_HEIGHT = "320px"; // Tailwind h-80. Adjust as needed. This is the capsule's height.
const SCROLL_VISIBILITY_THRESHOLD = 50; // Hide after scrolling down this much

export default function LeftSidebar() {
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);
  const [isHoverExpanded, setIsHoverExpanded] = useState(false);
  let hoverTimeout: NodeJS.Timeout | null = null;

  const [isScrollVisible, setIsScrollVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

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
    if (!isScrollVisible) return; // Don't expand if hidden by scroll
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
  // Sidebar should be considered "present" for layout if scroll visible, even if collapsed
  const isPresentOnScreen = isScrollVisible;

  return (
    <motion.aside
      initial={{ x: `-${EXPANDED_WIDTH}`, opacity: 0 }} // Start off-screen
      animate={{
        x: isPresentOnScreen ? "0px" : `-${EXPANDED_WIDTH}`, // Slide in/out based on scroll
        width: isEffectivelyExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
        opacity: isPresentOnScreen ? 1 : 0,
      }}
      style={{ height: SIDEBAR_HEIGHT }} // Apply fixed height
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      className={cn(
        "fixed left-4 top-1/2 -translate-y-1/2 z-30", // z-30 so it's below modals (z-50) and bottom nav (z-50)
        "bg-white/80 backdrop-blur-md shadow-xl flex flex-col overflow-hidden",
        isEffectivelyExpanded ? "rounded-l-2xl" : "rounded-full" // This will make it a vertical pill when collapsed, and a wide pill when expanded
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Toggle button always visible at the top of the capsule */}
      <div
        className={cn(
          "p-2 flex shrink-0",
          isEffectivelyExpanded ? "justify-end pr-3" : "justify-center"
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
              key="expanded-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: 0.1, duration: 0.2 },
              }}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.15 } }}
              className="h-full overflow-y-auto space-y-3 px-3 pb-2" // Padding for scroll content
            >
              {/* Search Section */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="sidebar-search-expanded"
                  placeholder="Search..."
                  className="pl-8 h-8 text-xs"
                />
              </div>
              {/* Community/Sellers Section */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 mb-1 px-1 uppercase">
                  Community
                </h3>
                <div className="space-y-0.5">
                  {mockSellers.slice(0, 3).map(
                    (
                      seller // Show fewer items due to height
                    ) => (
                      <Link
                        key={seller.id}
                        href={`/seller/${seller.id}`}
                        className="flex items-center space-x-2 p-1 rounded-md hover:bg-slate-200/70 transition-colors duration-150 group"
                      >
                        <Avatar className="h-5 w-5">
                          <AvatarImage
                            src={seller.imageUrl}
                            alt={seller.name}
                          />
                          <AvatarFallback className="text-xs">
                            {seller.name.substring(0, 1).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-gray-700 group-hover:text-purple-600 truncate">
                          {seller.storeName || seller.name}
                        </span>
                      </Link>
                    )
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-1 text-xs justify-start h-auto py-1 px-1"
                    asChild
                  >
                    <Link href="/sellers">All Sellers</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed-left"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.1, duration: 0.2 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="flex flex-col items-center justify-center space-y-3 h-full pt-2" // Centered icons
            >
              <Link
                href="/search"
                className="p-1.5 rounded-md hover:bg-slate-200/70"
                aria-label="Search"
              >
                <Search size={18} className="text-gray-600" />
              </Link>
              <Link
                href="#community"
                className="p-1.5 rounded-md hover:bg-slate-200/70"
                aria-label="Community"
              >
                <Users size={18} className="text-gray-600" />
              </Link>
              <Link
                href="/sellers"
                className="p-1.5 rounded-md hover:bg-slate-200/70"
                aria-label="Sellers"
              >
                <Building size={18} className="text-gray-600" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
