// components/product/RelatedItems.tsx
import { Box, Grid, HStack, Text } from "@chakra-ui/react";
import { DetailProduct } from "@/types/DetailProduct";
import { IFlashSaleProduct } from "@/types/FlashSaleProduct";
import RelatedProductCard from "./RelatedProductCard";


const RelatedItems = ({ products, type }: { products: (IFlashSaleProduct | DetailProduct)[], type: string }) => {
  if (products.length === 0) return null;

  return (
    <Box mt="16">
      <HStack mb="6">
        <Box w="4" h="9" bg="red.500" rounded="sm" />
        <Text color="red.500" fontWeight="bold">Related Item</Text>
      </HStack>

      <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap="6">
        {products.map((product) => (
            <RelatedProductCard product={product} type={type} key={product._id}/>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedItems;