// lib/mockData/sellers.ts

export interface MockSeller {
  id: string;
  name: string;
  storeName?: string; // Optional
  imageUrl: string; // Could be a logo or profile picture
  tagline?: string;
  // Add other relevant fields like rating, number of products, etc.
}

export const mockSellers: MockSeller[] = [
  {
    id: "s1",
    name: "Alice Wonderland",
    storeName: "Wonder Goods",
    imageUrl: "https://via.placeholder.com/200x200/FFE0E0/A08080?text=Alice+W.",
    tagline: "Curated unique items daily.",
  },
  {
    id: "s2",
    name: "Bob The Builder",
    storeName: "Bob's Best Buys",
    imageUrl: "https://via.placeholder.com/200x200/E0FFE0/80A080?text=Bob+B.",
    tagline: "Quality you can trust.",
  },
  {
    id: "s3",
    name: "Charlie Chocolatier",
    storeName: "Sweet Treats Inc.",
    imageUrl:
      "https://via.placeholder.com/200x200/E0E0FF/8080A0?text=Charlie+C.",
    tagline: "Deliciousness delivered.",
  },
  {
    id: "s4",
    name: "Diana Prince",
    storeName: "Warrior Wares",
    imageUrl: "https://via.placeholder.com/200x200/FFFFE0/A0A080?text=Diana+P.",
    tagline: "For the modern hero.",
  },
];
