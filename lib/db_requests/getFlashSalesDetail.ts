import connectDB from "@/lib/db/db";
import FlashSale from "@/models/FlashSale";


export async function getFlashSalesDetail() {

  await connectDB();
  
  const flashSales = await FlashSale.find({ active: true }).sort({ order: 1 });

  return JSON.parse(JSON.stringify(flashSales));
}