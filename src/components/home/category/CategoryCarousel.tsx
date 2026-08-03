"use client"
import Link from "next/link"
import {
    Box,
    Carousel,
    HStack,
    IconButton,
    Stack,
    Text,
} from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import CategoryCard from "./CategoryCard";

interface Category {
    id: number;
    name: string;
    icon: string;
}

interface CategoryProps {
    categories: Category[];
}

const CategoryCarousel = ({ categories }: CategoryProps) => {
    if (categories.length === 0) {
        return (
            <Box p="8" textAlign="center" color="gray.500">
                No categories available
            </Box>
        )
    }

    return (
        <>
            <div className="mb-5">
                <span className="border-l-15 border-red-500 py-2 mr-2 rounded-sm"></span>
                <span className="text-red-500 font-bold">Categorie&apos;s</span>
            </div>
            <Stack gap="4">
                <Carousel.Root slideCount={categories.length} slidesPerPage={6} gap="4" loop autoplay={{ delay: 3000 }}>
                    <HStack justify="space-between" align="center">
                        <Stack gap="48" direction={"row"}>
                            <Text fontSize="2xl" fontWeight="bold">
                                Browse By Category
                            </Text>
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
                    <Carousel.ItemGroup className="mt-10">
                        {categories.map((category, index) => (
                            <Carousel.Item key={category.id} index={index}>
                                <CategoryCard data={category} />
                            </Carousel.Item>
                        ))}
                    </Carousel.ItemGroup>
                </Carousel.Root>
            </Stack>
        </>
    )
}

export default CategoryCarousel