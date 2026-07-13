"use client"
import Link from "next/link"
import {
    Badge,
    Box,
    Button,
    Carousel,
    HStack,
    Icon,
    IconButton,
    Image,
    Span,
    Stack,
    Text,
} from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import ProductCard from "@/src/components/flash-sales/ProductCard";
import CountDownTimer from "@/src/components/flash-sales/CountDownTimer";
import { IFlashSaleProduct } from "@/types/FlashSaleProduct";

interface FlashSalesProps {
    products: IFlashSaleProduct[]
}

const FlashSaleCarousel = ({ products }: FlashSalesProps) => {
    if (products.length === 0) {
        return (
            <Box p="8" textAlign="center" color="gray.500">
                No flash sales available
            </Box>
        )
    }

    return (
        <>
            <div className="mb-5">
                <span className="border-l-15 border-red-500 py-2 mr-2 rounded-sm"></span>
                <span className="text-red-500 font-bold">Today&apos;s</span>
            </div>
            <Stack gap="4">
                <Carousel.Root slideCount={products.length} slidesPerPage={4} gap="4" loop autoplay={{ delay: 3000 }}>
                    <HStack justify="space-between" align="center">
                        <Stack gap="48" direction={"row"}>
                            <Text fontSize="2xl" fontWeight="bold">
                                Flash Sales
                            </Text>
                            <HStack gap="2" align="center">
                                <CountDownTimer />
                            </HStack>
                        </Stack>
                        <HStack>
                            <Carousel.PrevTrigger asChild>
                                <IconButton size="sm" variant="subtle" rounded="full">
                                    <LuChevronLeft />
                                </IconButton>
                            </Carousel.PrevTrigger>
                            <Carousel.NextTrigger asChild>
                                <IconButton size="sm" variant="subtle" rounded="full">
                                    <LuChevronRight />
                                </IconButton>
                            </Carousel.NextTrigger>
                        </HStack>
                    </HStack>
                    <Carousel.ItemGroup>
                        {products.map((product, index) => (
                            <Carousel.Item key={product._id} index={index}>
                                <ProductCard data={product} />
                            </Carousel.Item>
                        ))}
                    </Carousel.ItemGroup>
                </Carousel.Root>
            </Stack>
            <div className="text-center mt-15">
                <Link href="/flash-sales">
                    <Button size="lg" className="bg-red-500 text-white">View All Products</Button>
                </Link>
            </div>
        </>
    )
}

export default FlashSaleCarousel