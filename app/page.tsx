"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CategoriesSidebar from "@/src/components/home/CategoriesSidebar";
import ProductCarousel from "@/src/components/home/ProductCarousel";

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
      <div className="flex">
        {/* Left Sidebar */}
        <CategoriesSidebar />

        {/* Right Carousel */}
        <ProductCarousel />
      </div>
    </main>
  );
}
