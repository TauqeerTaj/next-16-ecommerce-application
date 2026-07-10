// src/components/providers/ChakraProvider.tsx
'use client'

import { ChakraProvider as ChakraUIProvider, createSystem, defaultConfig } from '@chakra-ui/react'

const system = createSystem(defaultConfig, {
  preflight: false,
})

export default function ChakraProvider({ children }: { children: React.ReactNode }) {
  return <ChakraUIProvider value={system}>{children}</ChakraUIProvider>
}