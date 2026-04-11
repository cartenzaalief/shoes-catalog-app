import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/public/navbar/Navbar";
import { getAllCategoriesWithSubcategories } from "@/lib/dal/categories";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jeka Rizky Jaya",
  description: "Your shoes catalog",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getAllCategoriesWithSubcategories();

  return (
    <html lang="en">
      <body className={geist.className}>
        <Navbar categories={categories} />
        <main>{children}</main>
      </body>
    </html>
  );
}
