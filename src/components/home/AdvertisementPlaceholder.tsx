// components/home/AdvertisementPlaceholder.tsx
import React from "react";
import { cn } from "@/lib/utils"; // Assuming you have cn from Shadcn/ui setup

interface AdvertisementPlaceholderProps {
  isLarge?: boolean;
  className?: string;
  text?: string;
}

const AdvertisementPlaceholder: React.FC<AdvertisementPlaceholderProps> = ({
  isLarge = false,
  className,
  text = "Advertisement",
}) => {
  return (
    <div
      className={cn(
        "bg-slate-200 border border-slate-300 rounded-lg flex items-center justify-center text-slate-500",
        isLarge
          ? "min-h-[200px] md:min-h-[300px] lg:min-h-[400px]"
          : "min-h-[100px] md:min-h-[150px]",
        className
      )}
      aria-label="Advertisement placeholder"
    >
      <p className="text-lg font-medium">{text}</p>
    </div>
  );
};

export default AdvertisementPlaceholder;
