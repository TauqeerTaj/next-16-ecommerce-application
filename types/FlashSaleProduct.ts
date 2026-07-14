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
  colors: DetailProductColor[];
  sizes: string[];
  active: boolean;
  order: number;
  reviewCount: number;
  rating: number;
}