import Link from "next/link";
import ProductCard from "@/src/components/home/flash-sale/ProductCard";
import { getFlashSales } from "@/lib/db_requests/getFlashSales";

interface FlashSaleProduct {
  _id: string;
  name: string;
  imageUrl: string;
  discount: number;
  originalPrice: number;
  price: number;
  rating: number;
  reviewCount: number;
  order: number;
  active: boolean;
}

export const metadata = {
  title: "Flash Sales | YourStore",
  description: "Browse all current flash sale deals before they're gone.",
};

export default async function FlashSalesPage() {
  const products = await getFlashSales();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-black">Flash Sales</span>
      </nav>

      <div className="flex items-center gap-2 mb-8">
        <span className="border-l-8 border-red-500 h-6 rounded-sm" />
        <h1 className="text-2xl font-bold">Flash Sales</h1>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No flash sale products available right now.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product:FlashSaleProduct) => (
            <ProductCard key={product._id} data={product} />
          ))}
        </div>
      )}
    </main>
  );
}