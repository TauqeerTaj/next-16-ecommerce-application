export interface RelatedProduct {
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
    originalPrice?: number;
    discountPercent?: number;
    rating: number;
    reviewCount: number;
    showAddToCart?: boolean;
}