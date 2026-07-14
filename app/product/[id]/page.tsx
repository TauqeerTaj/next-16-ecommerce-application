import connectDB from "@/lib/db/db";
// import ProductModel from "@/models/Product";
import FlashSale from "@/models/FlashSale"
import ProductDetail from "@/src/components/product/ProductDetail";
// import RelatedItems from "@/components/product/RelatedItems";
import { IFlashSaleProduct } from "@/types/FlashSaleProduct";
// import { RelatedProduct } from "@/types/RelatedProduct";
import { Box } from "@chakra-ui/react";
import { notFound } from "next/navigation";

async function getProduct(id: string): Promise<IFlashSaleProduct | null> {
    await connectDB();
    const product = await FlashSale.findById(id).lean();
    if (!product) return null;
    return JSON.parse(JSON.stringify(product));
}

// async function getRelatedProducts(category: string, excludeId: string): Promise<RelatedProduct[]> {
//     await connectDB();
//     const related = await ProductModel.find({
//         category,
//         _id: { $ne: excludeId },
//     })
//         .limit(4)
//         .lean();
//     return JSON.parse(JSON.stringify(related));
// }

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    // const relatedProducts = await getRelatedProducts(product.category, product._id);

    return (
        <Box maxW="1200px" mx="auto" px={{ base: "4", md: "8" }} py="6">
            <ProductDetail product={product} />
            {/* <RelatedItems products={relatedProducts} /> */}
        </Box>
    );
}