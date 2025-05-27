// components/home/SellerCard.tsx
import Link from "next/link";
import Image from "next/image";
import { MockSeller } from "@/lib/mockData/sellers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from '../ui/button'; // Not used in this version's main structure

interface SellerCardProps {
  seller: MockSeller;
}

const SellerCard: React.FC<SellerCardProps> = ({ seller }) => {
  return (
    <Card className="w-full overflow-hidden">
      <Link href={`/seller/${seller.id}`} className="block group">
        {" "}
        {/* Removed <a>, legacyBehavior, passHref. Added classes here. */}
        <CardHeader className="flex flex-row items-center space-x-4 p-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border">
            <Image
              src={seller.imageUrl}
              alt={seller.name}
              fill
              sizes="64px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <CardTitle className="text-base font-semibold group-hover:underline">
              {seller.storeName || seller.name}
            </CardTitle>
            {seller.storeName && seller.name !== seller.storeName && (
              <CardDescription className="text-xs">
                {seller.name}
              </CardDescription>
            )}
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-600 line-clamp-2 h-10">
          {seller.tagline ||
            `Discover amazing products from ${
              seller.storeName || seller.name
            }.`}
        </p>
      </CardContent>
      {/* Optional Footer with Button example: */}
      <CardFooter className="p-4">
        <Button variant="outline" size="sm" className="w-full asChild">
          <Link href={`/seller/${seller.id}`}>Visit Store</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SellerCard;
