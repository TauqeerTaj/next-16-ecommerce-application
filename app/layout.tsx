import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { Toaster } from "react-hot-toast";
import Providers from "@/src/components/providers/SessionProvider";
import NavigationLoader from "@/src/components/NavigationLoader";
import ReduxProvider from "@/src/components/providers/ReduxProvider";
import ChakraProvider from "@/src/components/providers/ChakraProvider";
import EmotionRegistry from "@/src/components/providers/EmotionRegistry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exclusive - E-commerce",
  description:
    "Your premium online shopping destination for fashion and lifestyle products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <Providers>
            <EmotionRegistry>
              <ChakraProvider>
                <Suspense fallback={null}>
                  <NavigationLoader />
                </Suspense>
                <Header />
                {children}
                <Footer />
                <Toaster position="bottom-right" />
              </ChakraProvider>
            </EmotionRegistry>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}