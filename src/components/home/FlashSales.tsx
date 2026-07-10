"use client"

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
import { FaHeart, FaEye, FaStar } from "react-icons/fa"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import { useState, useEffect } from "react"

interface Product {
  _id: string
  name: string
  imageUrl: string
  discount: number
  originalPrice: number
  price: number
  rating: number
  reviewCount: number
  order: number
  active: boolean
}

interface ProductCardProps {
  data: Product
}

const ProductCard = ({ data }: ProductCardProps) => {

  return (
    <Stack gap="3" position="relative">
      <Box
        position="relative"
        rounded="l2"
        overflow="hidden"
        background="#f5f5f5"
        _hover={{
          "& .add-to-cart-btn": {
            opacity: 1,
            transform: "translateY(0)",
          },
        }}
      >
        <Image
          src={data.imageUrl}
          alt={data.name}
          w="full"
          h="250px"
          objectFit="none"
          draggable={false}
        />
        
        {/* Discount Badge */}
        <Badge
          pos="absolute"
          top="2"
          insetStart="2"
          bg="red.500"
          color="white"
          px="2"
          py="1"
          rounded="sm"
          fontSize="sm"
          fontWeight="bold"
        >
          -{data.discount}%
        </Badge>

        {/* Wishlist and Quick View Icons */}
        <HStack pos="absolute" top="2" insetEnd="2" gap="2" flexDirection="column">
          <IconButton
            size="sm"
            variant="solid"
            bg="white"
            color="gray.600"
            borderRadius="full"
            _hover={{ bg: "gray.100" }}
          >
            <FaHeart />
          </IconButton>
          <IconButton
            size="sm"
            variant="solid"
            bg="white"
            color="gray.600"
            borderRadius="full"
            _hover={{ bg: "gray.100" }}
          >
            <FaEye />
          </IconButton>
        </HStack>

        {/* Add To Cart Button - Shows on Hover */}
        <Button
          className="add-to-cart-btn"
          pos="absolute"
          bottom="2"
          left="2"
          right="2"
          bg="black"
          color="white"
          size="sm"
          opacity={0}
          transform="translateY(10px)"
          transition="all 0.2s ease"
          _hover={{ bg: "gray.800" }}
        >
          Add To Cart
        </Button>
      </Box>

      <Stack gap="1">
        <Text fontWeight="bold" fontSize="md">
          {data.name}
        </Text>
        <HStack gap="2" align="baseline">
          <Text color="red.500" fontWeight="bold" fontSize="lg">
            ${data.price.toFixed(2)}
          </Text>
          <Text color="gray.400" textDecoration="line-through" fontSize="sm">
            ${data.originalPrice.toFixed(2)}
          </Text>
        </HStack>
        <HStack gap="1" align="center">
          <HStack gap="1">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                color={i < Math.floor(data.rating) ? "orange.400" : "gray.300"}
                fontSize="xs"
              >
                <FaStar />
              </Icon>
            ))}
          </HStack>
          <Text color="gray.500" fontSize="xs">
            ({data.reviewCount})
          </Text>
        </HStack>
      </Stack>
    </Stack>
  )
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 12, minutes: 30, seconds: 45 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev
        seconds -= 1
        if (seconds < 0) {
          seconds = 59
          minutes -= 1
        }
        if (minutes < 0) {
          minutes = 59
          hours -= 1
        }
        if (hours < 0) {
          hours = 23
          days -= 1
        }
        if (days < 0) {
          clearInterval(timer)
          return { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }
        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (time: number) => time.toString().padStart(2, "0")

  return (
    <HStack gap="1" fontSize="sm">
      <Stack align="center" justify="center">
        <Text>Days</Text>
        <Box color="black" px="2" rounded="sm" fontSize="lg" fontWeight="bold">
          {formatTime(timeLeft.days)}
        </Box>
      </Stack>
      <Span alignSelf="flex-end" fontSize="lg" fontWeight="bold" color="red.500">:</Span>
      <Stack>
        <Text>Hours</Text>
        <Box color="black" px="2" rounded="sm" fontSize="lg" fontWeight="bold">
          {formatTime(timeLeft.hours)}
        </Box>
      </Stack>
      <Span alignSelf="flex-end" fontSize="lg" fontWeight="bold" color="red.500">:</Span>
      <Stack>
        <Text>Minutes</Text>
        <Box color="black" px="2" rounded="sm" fontSize="lg" fontWeight="bold">
          {formatTime(timeLeft.minutes)}
        </Box>
      </Stack>
      <Span alignSelf="flex-end" fontSize="lg" fontWeight="bold" color="red.500">:</Span>
      <Stack>
        <Text>Seconds</Text>
        <Box color="black" px="2" rounded="sm" fontSize="lg" fontWeight="bold">
          {formatTime(timeLeft.seconds)}
        </Box>
      </Stack>
    </HStack>
  )
}

function FlashSales() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/flash-sales")
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        console.error("Error fetching flash sales:", err)
        setError("Failed to fetch flash sales")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <Box p="8" display="flex" justifyContent="center">
        <Box className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </Box>
    )
  }

  if (error) {
    return (
      <Box p="8" textAlign="center" color="red.500">
        {error}
      </Box>
    )
  }

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
      <span className="text-red-500 font-bold">Today's</span>
    </div>
    <Stack gap="4">
      <Carousel.Root slideCount={products.length} slidesPerPage={4} gap="4" loop autoplay={{ delay: 3000 }}>
        <HStack justify="space-between" align="center">
          <Stack gap="48" direction={"row"}>
            <Text fontSize="2xl" fontWeight="bold">
              Flash Sales
            </Text>
            <HStack gap="2" align="center">
              <CountdownTimer />
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
      <Button size="lg" className="bg-red-500 text-white">View All Products</Button>
    </div>
    </>
  )
}

export default FlashSales