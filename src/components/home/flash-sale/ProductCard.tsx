import Link from "next/link";
import { FaHeart, FaEye, FaStar } from "react-icons/fa";
import { IFlashSaleProduct } from "@/types/FlashSaleProduct";


export default function ProductCard({ data }: { data: IFlashSaleProduct }) {
  return (
    <div className="group flex flex-col gap-3">
      <div className="relative rounded-lg overflow-hidden bg-[#f5f5f5]">
        <img
          src={data.imageUrl}
          alt={data.name}
          className="w-full h-[250px] object-none"
          draggable={false}
        />

        <span className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-sm">
          -{data.discount}%
        </span>

        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-600 hover:bg-gray-100 cursor-pointer">
            <FaHeart size={14} />
          </button>
          <Link
            href={`/product/${data._id}?type=flash-sale`}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            <FaEye size={14} />
          </Link>
        </div>

        <button className="absolute bottom-2 left-2 right-2 bg-black text-white text-sm py-2 rounded-md opacity-0 translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-gray-800 cursor-pointer">
          Add To Cart
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-bold text-base">{data.name}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-red-500 font-bold text-lg">${data.price.toFixed(2)}</span>
          <span className="text-gray-400 line-through text-sm">${data.originalPrice.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={12}
                className={i < Math.floor(data.rating) ? "text-orange-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-gray-500 text-xs">({data.reviewCount})</span>
        </div>
      </div>
    </div>
  );
}