// components/home/ProductCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { MockProduct } from "@/lib/mockData/products";
import { Card, CardContent } from "@/components/ui/card"; // Only Card and CardContent for base
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: MockProduct;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  return (
    <motion.div
      className={cn(
        "relative w-full aspect-square overflow-hidden rounded-lg shadow-md group",
        className
      )}
      whileHover={{ scale: 1.05, zIndex: 10 }} // Scale up and bring to front on hover
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={`/product/${product.id}`} className="block w-full h-full">
        {/* Background Image */}
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 25vw, (max-width: 1024px) 12vw, 10vw" // Smaller sizes due to smaller card
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" // Image zooms slightly more
          priority={
            product.id.startsWith("p") && parseInt(product.id.substring(1)) <= 4
          }
        />

        {product.dealPrice && (
          <Badge
            variant="destructive"
            className="absolute top-2 right-2 z-20 text-xs px-1.5 py-0.5"
          >
            DEAL
          </Badge>
        )}

        <motion.div
          className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-300 p-2 sm:p-3 flex flex-col justify-end"
          initial={{ opacity: 0.5 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }} // Content fades in on hover
        >
          <div className="relative z-10 text-white">
            <h3 className="text-xs sm:text-sm font-semibold line-clamp-2 mb-0.5 sm:mb-1 leading-tight">
              {product.name}
            </h3>
            <div className="flex items-baseline gap-1 mb-1 sm:mb-1.5">
              {product.dealPrice ? (
                <>
                  <p className="text-sm sm:text-base font-bold">
                    {product.dealPrice}
                  </p>
                  <p className="text-xs text-slate-300 line-through">
                    {product.price}
                  </p>
                </>
              ) : (
                <p className="text-sm sm:text-base font-bold">
                  {product.price}
                </p>
              )}
            </div>
            <Button
              // size="xs" Using a custom 'xs' size or adapt existing 'sm'
              variant="secondary" // Or primary
              className="w-full text-xs h-7 sm:h-8"
              onClick={(e) => {
                e.preventDefault(); // Prevent link navigation if button is inside Link
                console.log("Add to cart:", product.id);
                // Add to cart logic here
              }}
            >
              <ShoppingCart size={12} className="mr-1 sm:mr-1.5" />
              Add to Cart
            </Button>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};
// You might need to define Button size="xs" in your button variants if it doesn't exist.
// For example, in components/ui/button.tsx:
// size: { default: "h-10 px-4 py-2", sm: "h-9 rounded-md px-3", xs: "h-7 rounded-md px-2 text-xs", lg: "h-11 rounded-md px-8", icon: "h-10 w-10"}

export default ProductCard;
