// components/home/ProductCard.tsx
import Link from "next/link";
import Image from "next/image";
import { MockProduct } from "@/lib/mockData/products";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: MockProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="w-full overflow-hidden h-full flex flex-col">
      <Link href={`/product/${product.id}`} className="block group">
        {" "}
        {/* Removed <a>, legacyBehavior, passHref. Added classes here. */}
        <CardHeader className="p-0 relative aspect-square overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            priority={
              product.id === "p1" || product.id === "p2" || product.id === "p3"
            }
          />
          {product.dealPrice && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              DEAL
            </Badge>
          )}
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        {/* This Link wraps CardTitle directly. CardTitle is not an 'a' tag. */}
        <Link href={`/product/${product.id}`} className="hover:underline">
          <CardTitle className="text-base font-semibold leading-tight mb-1 line-clamp-2">
            {product.name}
          </CardTitle>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-baseline gap-1.5">
          {product.dealPrice ? (
            <>
              <p className="text-lg font-bold text-red-600">
                {product.dealPrice}
              </p>
              <p className="text-sm text-gray-500 line-through">
                {product.price}
              </p>
            </>
          ) : (
            <p className="text-lg font-bold text-gray-800">{product.price}</p>
          )}
        </div>
        <Button size="sm" variant="outline" className="w-full sm:w-auto">
          <ShoppingCart size={16} className="mr-2" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
