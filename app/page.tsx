"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CategoriesSidebar from "@/src/components/home/CategoriesSidebar";
import ProductCarousel from "@/src/components/home/ProductCarousel";
import FlashSales from "@/src/components/home/FlashSales";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  // Redirect to login if not authenticated
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // User is authenticated, show home page
  return (
    <main className="min-h-screen bg-white max-w-7xl mx-auto">
      <div className="flex mb-32">
        {/* Left Sidebar */}
        <CategoriesSidebar />

        {/* Right Content */}
        <div className="flex-1">
          {/* Product Carousel */}
          <ProductCarousel />
        </div>
      </div>
      <div className="px-8">
        {/* Flash Sales Section */}
        <FlashSales />
      </div>
      <hr className="my-10 mx-8 border-gray-200" />
    </main>
  );
}
