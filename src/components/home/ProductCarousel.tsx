"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Banner {
  _id: string;
  title: string;
  imageUrl: string;
  order: number;
  active: boolean;
}

export default function ProductCarousel() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("/api/banners");
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 relative p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative p-8">
      <Carousel>
        {banners.length > 0 ?
          banners.map((banner) => (
            <div key={banner._id}>
              <Image
                src={banner.imageUrl}
                alt={banner.title}
                width={800}
                height={100}
              />
            </div>
          ))
        : [
            <div
              key="no-banners"
              className="flex items-center justify-center h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
            >
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  No Banners Available
                </h3>
                <p className="text-gray-500">
                  Check back later for exciting offers and promotions!
                </p>
              </div>
            </div>,
          ]
        }
      </Carousel>
    </div>
  );
}
