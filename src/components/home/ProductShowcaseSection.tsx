// components/home/ProductShowcaseSection.tsx
import React from "react";
import ProductCard from "./ProductCard";
import SellerCard from "./SellerCard";
import { MockProduct } from "@/lib/mockData/products";
import { MockSeller } from "@/lib/mockData/sellers";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button"; // Assuming you have a Button component
import Link from "next/link";

interface ProductShowcaseSectionProps {
  title: string;
  items: (MockProduct | MockSeller)[]; // Array of products or sellers
  itemType: "product" | "seller";
  largeAd?: React.ReactNode;
  className?: string;
  orientation?: "left" | "right"; // 'left' means ad on left, items on right. 'right' is ad on right.
  viewAllLink?: string; // Optional link for a "View All" button
}

const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({
  title,
  items,
  itemType,
  largeAd,
  className,
  orientation = "right", // Default: items on left, ad on right
  viewAllLink,
}) => {
  // Take the first 4 items to display in a 2x2 grid
  const displayItems = items.slice(0, 4);

  const adOrderClass = orientation === "left" ? "lg:order-1" : "lg:order-2";
  const itemsOrderClass = orientation === "left" ? "lg:order-2" : "lg:order-1";

  return (
    <section className={cn("py-8", className)}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {title}
        </h2>
        {viewAllLink && (
          <Button variant="outline" size="sm" asChild>
            <Link href={viewAllLink}>View All</Link>
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Items Section (takes 2/3 width on lg screens) */}
        <div
          className={cn(
            "lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6", // Always 2 columns on sm and up for a 2x2 feel
            itemsOrderClass
          )}
        >
          {displayItems.map((item) =>
            itemType === "product" ? (
              <ProductCard key={item.id} product={item as MockProduct} />
            ) : (
              <SellerCard key={item.id} seller={item as MockSeller} />
            )
          )}
        </div>

        {/* Advertisement Section (takes 1/3 width on lg screens) */}
        {largeAd && (
          <div
            className={cn(
              "flex items-center justify-center",
              adOrderClass,
              "mt-6 lg:mt-0"
            )}
          >
            {/* Ensure ad placeholder itself can stretch or has a defined aspect ratio */}
            <div className="w-full h-full min-h-[200px] lg:min-h-0">
              {" "}
              {/* Wrapper for ad */}
              {largeAd}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
