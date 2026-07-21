import { DetailProductColor } from "./DetailProductColor";

export interface IFlashSaleProduct {
  _id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  discount: number;
  images: string[];
  imageUrl: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  active: boolean;
  order: number;
  reviewCount: number;
  rating: number;
  category: string;
}