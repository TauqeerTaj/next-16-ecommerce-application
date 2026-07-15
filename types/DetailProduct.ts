import { DetailProductColor } from "./DetailProductColor";

export interface DetailProduct {
    _id: string;
    name: string;
    category: string; // for breadcrumb, e.g. "Gaming"
    images: string[]; // gallery, first is main by default
    imageUrl: string;
    active: boolean;
    order: number;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    price: number;
    originalPrice?: number;
    description: string;
    discount?: number;
    colors: DetailProductColor[];
    sizes: string[];
    sourceType: "flash-sale" | "product" | "best-selling";
}