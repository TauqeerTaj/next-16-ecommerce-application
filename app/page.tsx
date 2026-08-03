import CategoriesSidebar from "@/src/components/home/CategoriesSidebar";
import ProductCarousel from "@/src/components/home/ProductCarousel";
import FlashSales from "@/src/components/home/flash-sale/Main";
import AuthWrapper from "@/src/components/home/AuthWrapper";
import CategoryCarousel from "@/src/components/home/category/CategoryCarousel";
import categoryList from "@/utils/categoryList";

export default function Home() {
  return (
    <AuthWrapper>
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
        <div className="px-8">
          {/* Category Section */}
          <CategoryCarousel categories={categoryList} />
        </div>
        <hr className="my-10 mx-8 border-gray-200" />
      </main>
    </AuthWrapper>
  );
}
