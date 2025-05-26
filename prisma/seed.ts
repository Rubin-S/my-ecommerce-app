// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");
  await prisma.product.deleteMany(); // Clear existing products

  await prisma.product.create({
    data: {
      name: "Awesome T-Shirt",
      description: "A really awesome t-shirt for coding.",
      price: 29.99,
      images: ["/images/tshirt1.jpg", "/images/tshirt2.jpg"],
      stock: 100,
    },
  });

  await prisma.product.create({
    data: {
      name: "NextJS Mug",
      description: "The perfect mug for your Next.js powered coffee.",
      price: 15.0,
      images: ["/images/mug.jpg"],
      stock: 50,
    },
  });
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
