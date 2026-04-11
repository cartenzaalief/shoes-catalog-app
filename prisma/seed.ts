import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding...");

  // ----------------------------------------------------------------
  // Clean existing data (order matters due to foreign keys)
  // ----------------------------------------------------------------
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subcategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.carouselSlide.deleteMany();
  await prisma.partner.deleteMany();

  // ----------------------------------------------------------------
  // Categories
  // ----------------------------------------------------------------
  const men = await prisma.category.create({
    data: { name: "Men's", slug: "men" },
  });

  const women = await prisma.category.create({
    data: { name: "Women's", slug: "women" },
  });

  const kids = await prisma.category.create({
    data: { name: "Kids", slug: "kids" },
  });

  // ----------------------------------------------------------------
  // Subcategories
  // ----------------------------------------------------------------
  const menSneakers = await prisma.subcategory.create({
    data: {
      name: "Sneakers",
      slug: "sneakers",
      displayOrder: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
      categoryId: men.id,
    },
  });

  const menFormal = await prisma.subcategory.create({
    data: {
      name: "Formal",
      slug: "formal",
      displayOrder: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600",
      categoryId: men.id,
    },
  });

  const menSandals = await prisma.subcategory.create({
    data: {
      name: "Sandals",
      slug: "sandals",
      displayOrder: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600",
      categoryId: men.id,
    },
  });

  const womenHeels = await prisma.subcategory.create({
    data: {
      name: "Heels",
      slug: "heels",
      displayOrder: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600",
      categoryId: women.id,
    },
  });

  const womenFlats = await prisma.subcategory.create({
    data: {
      name: "Flats",
      slug: "flats",
      displayOrder: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=600",
      categoryId: women.id,
    },
  });

  const womenSneakers = await prisma.subcategory.create({
    data: {
      name: "Sneakers",
      slug: "sneakers",
      displayOrder: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600",
      categoryId: women.id,
    },
  });

  const kidsBoots = await prisma.subcategory.create({
    data: {
      name: "Boots",
      slug: "boots",
      displayOrder: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600",
      categoryId: kids.id,
    },
  });

  const kidsSneakers = await prisma.subcategory.create({
    data: {
      name: "Sneakers",
      slug: "sneakers",
      displayOrder: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=600",
      categoryId: kids.id,
    },
  });

  // ----------------------------------------------------------------
  // Products
  // ----------------------------------------------------------------
  const products = [
    // Men Sneakers
    {
      name: "AirStride Pro",
      slug: "airstride-pro",
      description:
        "Lightweight everyday sneaker with superior cushioning and breathable mesh upper. Perfect for long walks and casual wear.",
      subcategoryId: menSneakers.id,
      isNewArrival: true,
      newArrivalOrder: 1,
      images: [
        {
          url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
          alt: "AirStride Pro front view",
          position: 0,
        },
        {
          url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800",
          alt: "AirStride Pro side view",
          position: 1,
        },
        {
          url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
          alt: "AirStride Pro sole",
          position: 2,
        },
      ],
    },
    {
      name: "UrbanWalk X1",
      slug: "urbanwalk-x1",
      description:
        "Street-ready sneaker with a bold silhouette and durable rubber outsole. Built for the city.",
      subcategoryId: menSneakers.id,
      isNewArrival: true,
      newArrivalOrder: 2,
      images: [
        {
          url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800",
          alt: "UrbanWalk X1",
          position: 0,
        },
        {
          url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
          alt: "UrbanWalk X1 side",
          position: 1,
        },
      ],
    },
    {
      name: "CloudStep Lite",
      slug: "cloudstep-lite",
      description:
        "Ultra-light foam sole sneaker designed for all-day comfort. Minimal design, maximum feel.",
      subcategoryId: menSneakers.id,
      isNewArrival: false,
      images: [
        {
          url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
          alt: "CloudStep Lite",
          position: 0,
        },
      ],
    },
    // Men Formal
    {
      name: "Oxford Elite",
      slug: "oxford-elite",
      description:
        "Classic full-brogue oxford crafted from genuine leather. A timeless piece for formal occasions.",
      subcategoryId: menFormal.id,
      isNewArrival: true,
      newArrivalOrder: 3,
      images: [
        {
          url: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800",
          alt: "Oxford Elite",
          position: 0,
        },
        {
          url: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800",
          alt: "Oxford Elite side",
          position: 1,
        },
      ],
    },
    {
      name: "Derby Classic",
      slug: "derby-classic",
      description:
        "Refined derby shoe in smooth calfskin leather. Versatile enough for office and evening wear.",
      subcategoryId: menFormal.id,
      isNewArrival: false,
      images: [
        {
          url: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800",
          alt: "Derby Classic",
          position: 0,
        },
      ],
    },
    // Men Sandals
    {
      name: "SunTrail Sandal",
      slug: "suntrail-sandal",
      description:
        "Rugged outdoor sandal with adjustable straps and EVA footbed for all-terrain comfort.",
      subcategoryId: menSandals.id,
      isNewArrival: false,
      images: [
        {
          url: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800",
          alt: "SunTrail Sandal",
          position: 0,
        },
      ],
    },
    // Women Heels
    {
      name: "Stiletto Grace",
      slug: "stiletto-grace",
      description:
        "Elegant stiletto heel in suede finish. A statement piece for every wardrobe.",
      subcategoryId: womenHeels.id,
      isNewArrival: true,
      newArrivalOrder: 4,
      images: [
        {
          url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
          alt: "Stiletto Grace",
          position: 0,
        },
        {
          url: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800",
          alt: "Stiletto Grace angle",
          position: 1,
        },
      ],
    },
    {
      name: "Block Heel Luxe",
      slug: "block-heel-luxe",
      description:
        "Comfortable block heel with cushioned insole. Style meets wearability.",
      subcategoryId: womenHeels.id,
      isNewArrival: false,
      images: [
        {
          url: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800",
          alt: "Block Heel Luxe",
          position: 0,
        },
      ],
    },
    // Women Flats
    {
      name: "Ballet Petal",
      slug: "ballet-petal",
      description:
        "Soft leather ballet flat with a pointed toe. Effortlessly chic for any occasion.",
      subcategoryId: womenFlats.id,
      isNewArrival: true,
      newArrivalOrder: 5,
      images: [
        {
          url: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800",
          alt: "Ballet Petal",
          position: 0,
        },
      ],
    },
    // Women Sneakers
    {
      name: "PastelRun 90s",
      slug: "pastelrun-90s",
      description:
        "Retro-inspired chunky sneaker with pastel colorway. Y2K aesthetic with modern comfort.",
      subcategoryId: womenSneakers.id,
      isNewArrival: true,
      newArrivalOrder: 6,
      images: [
        {
          url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800",
          alt: "PastelRun 90s",
          position: 0,
        },
        {
          url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
          alt: "PastelRun 90s side",
          position: 1,
        },
      ],
    },
    // Kids Boots
    {
      name: "TinyTrek Boot",
      slug: "tinytrek-boot",
      description:
        "Waterproof kids boot with easy-pull tab and cushioned collar. Adventure-ready for little feet.",
      subcategoryId: kidsBoots.id,
      isNewArrival: true,
      newArrivalOrder: 7,
      images: [
        {
          url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800",
          alt: "TinyTrek Boot",
          position: 0,
        },
      ],
    },
    // Kids Sneakers
    {
      name: "KickJump Star",
      slug: "kickjump-star",
      description:
        "Velcro sneaker with light-up sole. Kids love them, parents approve them.",
      subcategoryId: kidsSneakers.id,
      isNewArrival: true,
      newArrivalOrder: 8,
      images: [
        {
          url: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=800",
          alt: "KickJump Star",
          position: 0,
        },
        {
          url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800",
          alt: "KickJump Star side",
          position: 1,
        },
      ],
    },
  ];

  for (const { images, ...productData } of products) {
    await prisma.product.create({
      data: {
        ...productData,
        isActive: true,
        images: { create: images },
      },
    });
  }

  // ----------------------------------------------------------------
  // Carousel Slides
  // ----------------------------------------------------------------
  await prisma.carouselSlide.createMany({
    data: [
      {
        title: "New Season Arrivals",
        subtitle: "Fresh styles for every occasion",
        desktopImageUrl:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600",
        mobileImageUrl:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
        buttonText: "Shop Now",
        buttonLink: "/men",
        displayOrder: 1,
        isActive: true,
      },
      {
        title: "Women's Collection",
        subtitle: "Elegance in every step",
        desktopImageUrl:
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1600",
        mobileImageUrl:
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
        buttonText: "Explore",
        buttonLink: "/women",
        displayOrder: 2,
        isActive: true,
      },
      {
        title: "Kids Need Adventure",
        subtitle: "Durable shoes built for play",
        desktopImageUrl:
          "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=1600",
        mobileImageUrl:
          "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=800",
        buttonText: "Shop Kids",
        buttonLink: "/kids",
        displayOrder: 3,
        isActive: true,
      },
    ],
  });

  // ----------------------------------------------------------------
  // Partners
  // ----------------------------------------------------------------
  await prisma.partner.createMany({
    data: [
      {
        name: "Nike",
        logoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
        displayOrder: 1,
        isActive: true,
      },
      {
        name: "Adidas",
        logoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
        displayOrder: 2,
        isActive: true,
      },
      {
        name: "Puma",
        logoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/0/0a/Puma_AG_Rudolf_Dassler_Sport_logo.svg",
        displayOrder: 3,
        isActive: true,
      },
      {
        name: "New Balance",
        logoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/e/ea/New_Balance_logo.svg",
        displayOrder: 4,
        isActive: true,
      },
      {
        name: "Vans",
        logoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/9/91/Vans-brand-logo.svg",
        displayOrder: 5,
        isActive: true,
      },
      {
        name: "Converse",
        logoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/3/30/Converse_logo.svg",
        displayOrder: 6,
        isActive: true,
      },
    ],
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
