import ProductDetail from "@/src/components/product-Detail/ProductDetail";
import { getProductDetail } from "@/lib/db_requests/getProductDetail";
import RelatedItems from "@/src/components/product-Detail/RelatedItems/RelatedItem";
import { Box } from "@chakra-ui/react";
import { notFound } from "next/navigation";


export default async function ProductDetailPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ type: string }>;
}) {
    const { id } = await params;
    const { type } = await searchParams;
    const { product, relatedItems } = await getProductDetail(id, type);

    if (!product) {
        notFound();
    }

    // const relatedProducts = await getRelatedProducts(product.category, product._id);

    return (
        <Box maxW="1200px" mx="auto" px={{ base: "4", md: "8" }} py="6">
            <ProductDetail product={product} />
            <RelatedItems products={relatedItems || []} />
        </Box>
    );
}