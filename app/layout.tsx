import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { Toaster } from "react-hot-toast";
import Providers from "@/src/components/providers/SessionProvider";
import NavigationLoader from "@/src/components/NavigationLoader";
import ReduxProvider from "@/src/components/providers/ReduxProvider";

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
      <ReduxProvider>
        <Providers>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <NavigationLoader />
            <Header />
            {children}
            <Footer />
            <Toaster position="bottom-right" />
          </body>
        </Providers>
      </ReduxProvider>
    </html>
  );
}
