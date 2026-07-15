import connectDB from "@/lib/db/db";
import { DetailProduct } from "@/types/DetailProduct";
import { IFlashSaleProduct } from "@/types/FlashSaleProduct";
import FlashSale from "@/models/FlashSale"


export async function getProductDetail(id: string, type: string): Promise<DetailProduct | IFlashSaleProduct> {
    await connectDB();

    switch (type) {
        case "flash-sale": {

            const product = await FlashSale.findById(id).lean();
            if (!product) return null as unknown as IFlashSaleProduct;
            return JSON.parse(JSON.stringify(product)) as IFlashSaleProduct;
        }
        // case "product": {
        //   const doc = await Product.findById(id).lean();
        //   return doc ? normalizeProduct(doc) : null;
        // }
        // case "best-selling": {
        //   const doc = await BestSellingProduct.findById(id).lean();
        //   return doc ? normalizeBestSelling(doc) : null;
        // }
        default:
            return null as unknown as DetailProduct | IFlashSaleProduct;
    }
}