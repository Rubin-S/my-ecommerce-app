// components/home/ProductShowcaseSection.tsx
import React from "react";
import ProductCard from "./ProductCard";
import SellerCard from "./SellerCard"; // Assuming SellerCard might need similar square/compact treatment if used here for "Top Sellers"
import { MockProduct } from "@/lib/mockData/products";
import { MockSeller } from "@/lib/mockData/sellers";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

interface ProductShowcaseSectionProps {
  title: string;
  items: (MockProduct | MockSeller)[];
  itemType: "product" | "seller";
  largeAd?: React.ReactNode; // This will be the square ad
  className?: string;
  orientation?: "left" | "right";
  viewAllLink?: string;
}

const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({
  title,
  items,
  itemType,
  largeAd,
  className,
  orientation = "right",
  viewAllLink,
}) => {
  const displayItems = items.slice(0, 4); // Expecting 4 items for a 2x2 grid

  const adOrderClass = orientation === "left" ? "lg:order-1" : "lg:order-2";
  const itemsOrderClass = orientation === "left" ? "lg:order-2" : "lg:order-1";

  return (
    <section className={cn("py-6 md:py-8", className)}>
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          {title}
        </h2>
        {viewAllLink && (
          <Button variant="outline" size="sm" asChild>
            <Link href={viewAllLink}>View All</Link>
          </Button>
        )}
      </div>
      {/* Main grid: 1 column on mobile, 2 columns (half-half) on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-stretch">
        {/* Items Section (should be roughly square if it contains a 2x2 grid of square cards) */}
        <div
          className={cn(
            "grid grid-cols-2 gap-2 sm:gap-3 md:gap-4", // 2 columns for items, creating 2x2 with 4 items
            itemsOrderClass
            // To make this item grid itself aim for square, its container (this div)
            // would need an aspect-square if its parent (lg:grid-cols-2) doesn't enforce height.
            // Since items-stretch is on parent, height is determined by the square ad.
          )}
        >
          {displayItems.map((item) =>
            itemType === "product" ? (
              <ProductCard key={item.id} product={item as MockProduct} />
            ) : (
              // If SellerCard is used, it also needs to be designed to fit this square grid cell
              <SellerCard key={item.id} seller={item as MockSeller} />
            )
          )}
        </div>

        {/* Advertisement Section (square ad) */}
        {largeAd && (
          <div
            className={cn(
              "flex items-center justify-center",
              adOrderClass,
              "mt-4 lg:mt-0"
            )}
          >
            {/* The AdvertisementPlaceholder component is already styled with aspect-square */}
            {largeAd}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
