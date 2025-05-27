// lib/mockData/products.ts

export interface MockProduct {
  id: string;
  name: string;
  imageUrl: string;
  description: string; 
  price: string;
  dealPrice?: string; // Optional for items on deal
  // You can add other relevant fields like category, rating, etc.
}

export const mockProducts: MockProduct[] = [
  {
    id: "p1",
    name: "Modern Wireless Headphones",
    imageUrl:
      "https://via.placeholder.com/300x300/E0E0E0/B0B0B0?text=Headphones",
    price: "$129.99",
    description: "Experience high-quality sound with our latest wireless headphones.",
    dealPrice: "$99.99",
  },
  {
    id: "p2",
    name: "Smart Fitness Tracker",
    imageUrl: "https://via.placeholder.com/300x300/D0D0D0/A0A0A0?text=Tracker",
    price: "$79.50",
    description: "Stay fit and healthy with our advanced smart fitness tracker.",
  },
  {
    id: "p3",
    name: "Eco-Friendly Water Bottle",
    imageUrl: "https://via.placeholder.com/300x300/C0C0C0/909090?text=Bottle",
    price: "$25.00",
    description: "Stay hydrated with our stylish and eco-friendly water bottle.",
  },
  {
    id: "p4",
    name: "Vintage Leather Backpack",
    imageUrl: "https://via.placeholder.com/300x300/B0B0B0/808080?text=Backpack",
    price: "$180.00",
    description: "Carry your essentials in style with our vintage leather backpack.",
  },
  {
    id: "p5",
    name: "Organic Green Tea Set",
    imageUrl: "https://via.placeholder.com/300x300/A0A0A0/707070?text=Tea+Set",
    price: "$45.99",
    description: "Enjoy a refreshing cup of organic green tea with our premium set.",
  },
  {
    id: "p6",
    name: "Portable Bluetooth Speaker",
    imageUrl: "https://via.placeholder.com/300x300/909090/606060?text=Speaker",
    price: "$59.99",
    description: "Take your music anywhere with our compact Bluetooth speaker.",
  },
];

// Example for a single prominent deal item if needed for "Today's Deal"
export const mockTodaysDealProduct: MockProduct = {
  id: "deal01",
  name: "Exclusive Deal: Ergonomic Office Chair",
  imageUrl:
    "https://via.placeholder.com/600x400/E0E0E0/B0B0B0?text=Office+Chair+Deal",
  price: "$299.00",
  dealPrice: "$199.00",
  description: "Experience ultimate comfort with our new ergonomic office chair, limited time offer!"
};
