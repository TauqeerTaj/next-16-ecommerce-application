
"use client"

import { Box, Button, HStack, IconButton, Image, Text, Icon } from "@chakra-ui/react";
import { LuEye, LuHeart, LuStar } from "react-icons/lu";
import { useState } from "react";
import { IFlashSaleProduct } from "@/types/FlashSaleProduct";
import { DetailProduct } from "@/types/DetailProduct";

const RelatedProductCard = ({ product }: { product: IFlashSaleProduct | DetailProduct }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      position="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box position="relative" bg="gray.50" rounded="md" h="200px" display="flex" alignItems="center" justifyContent="center">
        {product.discount && (
          <Box position="absolute" top="2" left="2" bg="red.500" color="white" fontSize="xs" px="2" py="1" rounded="sm">
            -{product.discount}%
          </Box>
        )}
        <HStack position="absolute" top="2" right="2" gap="1" flexDir="column">
          <IconButton aria-label="Wishlist" size="xs" rounded="full" bg="white" variant="plain" _hover={{ bg: "gray.100" }}>
            <LuHeart />
          </IconButton>
          <IconButton aria-label="Quick view" size="xs" rounded="full" bg="white" variant="plain" _hover={{ bg: "gray.100" }}>
            <LuEye />
          </IconButton>
        </HStack>
        <Image src={product.imageUrl} alt={product.name} maxH="140px" objectFit="contain" />

        {hovered && (
          <Button
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            rounded="none"
            roundedBottom="md"
            bg="black"
            color="white"
            _hover={{ bg: "gray.800" }}
          >
            Add To Cart
          </Button>
        )}
      </Box>

      <Text mt="3" fontSize="sm">{product.name}</Text>
      <HStack gap="2" mt="1">
        <Text fontWeight="semibold" color="red.500">${product.price}</Text>
        {product.originalPrice && (
          <Text fontSize="sm" color="gray.400" textDecoration="line-through">
            ${product.originalPrice}
          </Text>
        )}
      </HStack>
      <HStack gap="1" mt="1">
        <HStack gap="0.5" color="yellow.400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon key={i} as={LuStar} boxSize="3" fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
          ))}
        </HStack>
        <Text fontSize="xs" color="gray.500">({product.reviewCount})</Text>
      </HStack>
    </Box>
  );
};

export default RelatedProductCard