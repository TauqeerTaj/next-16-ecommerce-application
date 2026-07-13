"use client"

import { useState, useEffect } from "react";
import { HStack, Stack, Text, Box, Span } from "@chakra-ui/react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (endTime: string | Date): TimeLeft => {
  const difference = new Date(endTime).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const CountDownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [endTime, setEndTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashSaleTime = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/admin/flash-sale-time");
        const data = await res.json();

        // API returns an array directly, e.g. [{ startTime, endTime, ... }]
        const flashSale = Array.isArray(data) ? data[0] : data;

        if (flashSale?.endTime) {
          setEndTime(flashSale.endTime);
          setTimeLeft(calculateTimeLeft(flashSale.endTime));
        }
      } catch (error) {
        console.error("Error fetching flash sale time:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSaleTime();
  }, []);

  useEffect(() => {
    if (!endTime) return;

    const timer = setInterval(() => {
      const updated = calculateTimeLeft(endTime);
      setTimeLeft(updated);

      if (updated.days === 0 && updated.hours === 0 && updated.minutes === 0 && updated.seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  if (loading) return null;
  if (!endTime) return null;

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

export default CountDownTimer