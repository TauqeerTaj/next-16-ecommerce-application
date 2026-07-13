import { getFlashSales } from "@/lib/db_requests/getFlashSales";
import FlashSaleCarousel from "./FlashSaleCarousel";


const FlashSales = async () => {
  const products = await getFlashSales();
  return <FlashSaleCarousel products={products} />;
};

export default FlashSales;