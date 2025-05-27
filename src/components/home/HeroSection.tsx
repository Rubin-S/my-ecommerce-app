// components/home/HeroSection.tsx
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { mockTodaysDealProduct } from "@/lib/mockData/products"; // Assuming you have a specific deal product
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  // You can add more props like description, image, CTA link, etc.
}

const HeroSection: React.FC<HeroSectionProps> = ({ title }) => {
  const deal = mockTodaysDealProduct; // Using the mock deal

  return (
    <section className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 p-6 sm:p-8 md:p-12 rounded-xl shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-2">
            {title}
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            {deal.name}
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-3 line-clamp-3">
            {deal.description ||
              "Check out our amazing deal of the day. Limited time offer, don't miss out!"}
          </p>
          <div className="flex items-baseline gap-2 mb-6">
            {deal.dealPrice && (
              <p className="text-3xl font-bold text-red-600">
                {deal.dealPrice}
              </p>
            )}
            <p
              className={`text-xl text-gray-500 ${
                deal.dealPrice ? "line-through" : "font-bold"
              }`}
            >
              {deal.price}
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              size="lg"
              asChild
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Link href={`/product/${deal.id}`}>Shop Deal</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/deals">View All Deals</Link>
            </Button>
          </div>
        </div>
        <div className="order-1 md:order-2 aspect-[4/3] md:aspect-[16/9] relative rounded-lg overflow-hidden group">
          <Image
            src={deal.imageUrl}
            alt={deal.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
