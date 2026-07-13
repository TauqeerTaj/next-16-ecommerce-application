import mongoose, { Schema, Model } from "mongoose";
import { IFlashSaleProduct } from "@/types/FlashSaleProduct";

const FlashSaleSchema = new Schema<IFlashSaleProduct>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    originalPrice: {
      type: Number,
      required: [true, "Original price is required"],
    },
    discount: {
      type: Number,
      required: [true, "Discount is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      required: [true, "Order is required"],
    },
  },
  { timestamps: true }
);

const FlashSale: Model<IFlashSaleProduct> =
  mongoose.models.FlashSale || mongoose.model<IFlashSaleProduct>("FlashSale", FlashSaleSchema);

export default FlashSale;
