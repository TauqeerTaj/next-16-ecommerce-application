"use client";

import { useState } from "react";
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuHeart, LuMinus, LuPlus, LuTruck, LuRefreshCw, LuStar } from "react-icons/lu";
// import Breadcrumb from "./Breadcrumb";
// import { Product } from "@/types/Product";
import { IFlashSaleProduct } from "@/types/FlashSaleProduct";


const ProductDetail = ({ product }: { product: IFlashSaleProduct }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    Math.min(2, product.sizes.length - 1 ) 
  );
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQty = () => setQuantity((q) => q + 1);

  const handleBuyNow = () => {
    // wire up to cart/checkout logic
    console.log({
      productId: product._id,
      color: product.colors[selectedColor],
      size: product.sizes[selectedSize],
      quantity,
    });
  };

  return (
    <Box>
      {/* <Breadcrumb category={product.category} productName={product.name} /> */}

      <Stack direction={{ base: "column", md: "row" }} gap="8" align="stretch" h="450px">
        {/* Thumbnails */}
        <Stack direction={{ base: "row", md: "column" }} gap="3" order={{ base: 2, md: 1 }} h="full" align="flex-start">
          {product.images.map((img, idx) => (
            <Box
              key={idx}
              as="button"
              onClick={() => setSelectedImage(idx)}
              w="104px"
              h="104px"
              overflow="hidden"
              flexShrink={0}
              cursor="pointer"
              bg="gray.50"
              p="2"
            >
              <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} objectFit="cover" />
            </Box>
          ))}
        </Stack>

        {/* Main image */}
        <Box
          flex="1"
          order={{ base: 1, md: 2 }}
          bg="gray.50"
          rounded="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="full"
        >
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            maxH="100%"
            objectFit="contain"
          />
        </Box>

        {/* Info panel */}
        <Stack flex="1" order="3" gap="2" h="full" overflowY="none">
          <Text fontSize="xl" fontWeight="semibold">
            {product.name}
          </Text>

          <HStack gap="2">
            <HStack gap="1" color="yellow.400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} as={LuStar} fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
              ))}
            </HStack>
            <Text fontSize="sm" color="gray.500">({product.reviewCount} Reviews)</Text>
            <Text fontSize="sm" color={product.active ? "green.500" : "red.500"}>
              {product.active ? "In Stock" : "Out of Stock"}
            </Text>
          </HStack>

          <Text fontSize="2xl" fontWeight="bold">
            ${product.price.toFixed(2)}
          </Text>

          <Text fontSize="sm" color="gray.600" borderBottomWidth="1px" pb="4">
            {product.description}
          </Text>

          {/* Colours */}
          <Box display="flex" flexDirection="row" alignItems="center">
            <Text fontSize="sm" mb="2" mr="4">Colours:</Text>
            <HStack gap="2" mb="2">
              {product.colors.map((color, idx) => (
                <Box
                  key={color.name}
                  as="button"
                  onClick={() => setSelectedColor(idx)}
                  w="15px"
                  h="15px"
                  rounded="full"
                  bg={color.hex}
                  outline={selectedColor === idx ? "2px solid black" : "none"}
                  outlineOffset="2px"
                  aria-label={color.name}
                  className="cursor-pointer"
                />
              ))}
            </HStack>
          </Box>

          {/* Size */}
          <Box display="flex" flexDirection="row" alignItems="center" mb="2">
            <Text fontSize="sm" mb="2" mr="4">Size:</Text>
            <HStack gap="2">
              {product.sizes.map((size, idx) => (
                <Button
                  key={size}
                  size="sm"
                  variant={selectedSize === idx ? "solid" : "outline"}
                  colorPalette={selectedSize === idx ? "red" : "gray"}
                  onClick={() => setSelectedSize(idx)}
                  w="30px"
                  h="30px"
                >
                  {size}
                </Button>
              ))}
            </HStack>
          </Box>

          {/* Quantity + Buy Now + Wishlist */}
          <HStack gap="4">
            <HStack borderWidth="1px" rounded="md" overflow="hidden">
              <IconButton aria-label="Decrease quantity" variant="ghost" onClick={decreaseQty} rounded="none">
                <LuMinus />
              </IconButton>
              <Box px="4" minW="40px" textAlign="center">
                {quantity}
              </Box>
              <IconButton aria-label="Increase quantity" variant="ghost" onClick={increaseQty} rounded="none" bg="red.500" color="white" _hover={{ bg: "red.600" }}>
                <LuPlus />
              </IconButton>
            </HStack>

            <Button colorPalette="red" px="10" onClick={handleBuyNow}>
              Buy Now
            </Button>

            <IconButton
              aria-label="Add to wishlist"
              variant="outline"
              onClick={() => setWishlisted((w) => !w)}
            >
              <LuHeart fill={wishlisted ? "currentColor" : "none"} />
            </IconButton>
          </HStack>

          {/* Delivery info */}
          <Box borderWidth="1px" rounded="md" mt="2">
            <HStack p="3" borderBottomWidth="1px" gap="4" align="flex-start">
              <Icon as={LuTruck} boxSize="6" mt="1" />
              <Box>
                <Text fontWeight="medium" fontSize="sm">Free Delivery</Text>
                <Text fontSize="xs" color="gray.500" textDecoration="underline" cursor="pointer">
                  Enter your postal code for Delivery Availability
                </Text>
              </Box>
            </HStack>
            <HStack p="3" gap="4" align="flex-start">
              <Icon as={LuRefreshCw} boxSize="6" mt="1" />
              <Box>
                <Text fontWeight="medium" fontSize="sm">Return Delivery</Text>
                <Text fontSize="xs" color="gray.500">
                  Free 30 Days Delivery Returns.{" "}
                  <Text as="span" textDecoration="underline" cursor="pointer">Details</Text>
                </Text>
              </Box>
            </HStack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductDetail;