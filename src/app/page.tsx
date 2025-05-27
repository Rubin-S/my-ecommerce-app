// app/page.tsx
import LeftSidebar from "@/components/home/LeftSidebar";
import RightSidebar from "@/components/home/RightSidebar";
import HeroSection from "@/components/home/HeroSection";
import ProductShowcaseSection from "@/components/home/ProductShowcaseSection";
import AdvertisementPlaceholder from "@/components/home/AdvertisementPlaceholder"; // Updated to be square

import { mockProducts } from "@/lib/mockData/products";
import { mockSellers } from "@/lib/mockData/sellers";

export default function HomePage() {
  // Ensure you have at least 4 items for a 2x2 grid in each section, or handle fewer items gracefully
  const dealsProducts = mockProducts.slice(0, 4);
  const trendingProducts =
    mockProducts.length >= 4
      ? mockProducts.slice(0, 4)
      : mockProducts.slice(0, Math.min(mockProducts.length, 4));
  const topSellersData =
    mockSellers.length >= 4
      ? mockSellers.slice(0, 4)
      : mockSellers.slice(0, Math.min(mockSellers.length, 4));

  // The AdvertisementPlaceholder component is now styled with aspect-square
  const adForDeals = <AdvertisementPlaceholder text="Special Offer Ad" />;
  const adForTrending = <AdvertisementPlaceholder text="Trending Ad" />;
  const adForSellers = <AdvertisementPlaceholder text="Featured Seller Ad" />;

  return (
    <div className="relative min-h-screen">
      <LeftSidebar />
      <RightSidebar />

      <main
        className={`mx-auto space-y-10 transition-all duration-300 ease-in-out
                    py-8 
                    px-4 sm:px-6 
                    lg:ml-[64px] lg:mr-[64px]`} // Assuming COLLAPSED_SIDEBAR_WIDTH is 64px
      >
        <div className="max-w-none lg:max-w-7xl mx-auto">
          <HeroSection title="Today's Feature" />
          <ProductShowcaseSection
            title="Deals You Can't Miss"
            items={dealsProducts}
            itemType="product"
            largeAd={adForDeals}
            orientation="right"
            viewAllLink="/deals"
          />
          <ProductShowcaseSection
            title="Trending Products"
            items={trendingProducts}
            itemType="product"
            largeAd={adForTrending}
            orientation="left"
            viewAllLink="/products/trending"
          />
          <ProductShowcaseSection
            title="Top Sellers This Week"
            items={topSellersData}
            itemType="seller"
            largeAd={adForSellers}
            orientation="right"
            viewAllLink="/sellers/top"
          />
        </div>
      </main>
    </div>
  );
}
