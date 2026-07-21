// components/product/RelatedItems.tsx
import { Box, Grid, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { DetailProduct } from "@/types/DetailProduct";
import { IFlashSaleProduct } from "@/types/FlashSaleProduct";
import RelatedProductCard from "./RelatedProductCard";


const RelatedItems = ({ products }: { products: (IFlashSaleProduct | DetailProduct)[] }) => {
  if (products.length === 0) return null;

  return (
    <Box mt="16">
      <HStack mb="6">
        <Box w="1" h="10" bg="red.500" rounded="sm" />
        <Text color="red.500" fontWeight="bold">Related Item</Text>
      </HStack>

      <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap="6">
        {products.map((product) => (
          <Link key={product._id} href={`/product/${product._id}`}>
            <RelatedProductCard product={product} />
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedItems;