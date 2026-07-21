import connectDB from "@/lib/db/db";
import { DetailProduct } from "@/types/DetailProduct";
import { IFlashSaleProduct } from "@/types/FlashSaleProduct";
import FlashSale from "@/models/FlashSale"

interface ProductDetailResponse {
    product: IFlashSaleProduct | DetailProduct | null;
    relatedItems?: (IFlashSaleProduct | DetailProduct)[];
}

export async function getProductDetail(id: string, type: string): Promise<ProductDetailResponse> {
    await connectDB();

    switch (type) {
        case "flash-sale": {

            const product = await FlashSale.findById(id).lean();
            if (!product) return { product: null };
            const relatedItems = await FlashSale.find({ category: product.category, _id: { $ne: id } }).lean().limit(4);
            return { product: JSON.parse(JSON.stringify(product)) as IFlashSaleProduct, relatedItems: JSON.parse(JSON.stringify(relatedItems)) };
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
            return { product: null, relatedItems: [] };
    }
}