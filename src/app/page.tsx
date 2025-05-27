// app/page.tsx
// No LeftSidebar/RightSidebar imports needed here if they are globally part of layout,
// OR if they are included, they don't dictate main content margin in the same way.
// For this example, assuming they are part of the page component:
import LeftSidebar from "@/components/home/LeftSidebar";
import RightSidebar from "@/components/home/RightSidebar";
import HeroSection from "@/components/home/HeroSection";
import ProductShowcaseSection from "@/components/home/ProductShowcaseSection";
import AdvertisementPlaceholder from "@/components/home/AdvertisementPlaceholder";
import { mockProducts } from "@/lib/mockData/products";
import { mockSellers } from "@/lib/mockData/sellers";

export default function HomePage() {
  const dealsProducts = mockProducts.slice(0, 4);
  const trendingProducts =
    mockProducts.length >= 4 ? mockProducts.slice(0, 4) : mockProducts;
  const topSellersData =
    mockSellers.length >= 4 ? mockSellers.slice(0, 4) : mockSellers;

  const adForDeals = (
    <AdvertisementPlaceholder
      isLarge={true}
      className="h-full w-full"
      text="Special Offer Ad"
    />
  );
  const adForTrending = (
    <AdvertisementPlaceholder
      isLarge={true}
      className="h-full w-full"
      text="Trending Ad"
    />
  );
  const adForSellers = (
    <AdvertisementPlaceholder
      isLarge={true}
      className="h-full w-full"
      text="Featured Seller Ad"
    />
  );

  return (
    <div className="relative min-h-screen">
      {" "}
      {/* Container for fixed elements and main content */}
      <LeftSidebar />
      <RightSidebar />
      {/* Main content can now take more of the available width, 
          its own padding will define distance from viewport edges.
          The sidebars will float over this padding area or outside it. */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
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
      </main>
    </div>
  );
}
