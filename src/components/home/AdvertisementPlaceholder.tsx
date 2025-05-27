// components/home/AdvertisementPlaceholder.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface AdvertisementPlaceholderProps {
  className?: string;
  text?: string;
}

const AdvertisementPlaceholder: React.FC<AdvertisementPlaceholderProps> = ({
  className,
  text = "Advertisement",
}) => {
  return (
    <div
      className={cn(
        "bg-slate-200 border border-slate-300 rounded-lg flex items-center justify-center text-slate-500",
        "w-full aspect-square", // Make it square and fill width of its container
        className
      )}
      aria-label="Advertisement placeholder"
    >
      <p className="text-lg font-medium p-4 text-center">{text}</p>
    </div>
  );
};

export default AdvertisementPlaceholder;
