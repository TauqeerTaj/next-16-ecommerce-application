export interface IFlashSaleProduct {
  _id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  imageUrl: string;
  active: boolean;
  order: number;
  reviewCount: number;
  rating: number;
}