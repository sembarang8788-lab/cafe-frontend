import { Product } from "@/types";
import { formatCurrency } from "@/lib/api";

interface ProductCardProps {
    item: Product;
    onAddToCart: (id: string) => void;
    onEditProduct: (product: Product) => void;
}

export default function ProductCard({ item, onAddToCart, onEditProduct }: ProductCardProps) {
    return (
        <div
            onClick={() => onAddToCart(item.id)}
            className={`card-premium group p-5 rounded-[32px] cursor-pointer relative ${item.stock <= 0 ? "opacity-40 grayscale pointer-events-none" : ""
                }`}
        >
            <div className="h-44 w-full bg-gray-50 rounded-[24px] mb-5 overflow-hidden border border-gray-100">
                {item.image_url ? (
                    <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">☕</div>
                )}
            </div>
            <div className="flex justify-between items-start mb-1">
                <h4 className="font-extrabold text-gray-900 group-hover:text-[#4A3728] transition-colors line-clamp-1">
                    {item.name}
                </h4>
                <span className={`text-[10px] font-black uppercase ${item.stock < 5 ? "text-red-500" : "text-gray-400"}`}>
                    Stock: {item.stock}
                </span>
            </div>
            <p className="text-xl font-black text-[#4A3728]">{formatCurrency(item.price)}</p>

            <div className="absolute bottom-5 right-5 w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                <svg className="w-5 h-5 text-[#4A3728]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onEditProduct(item);
                }}
                className="absolute top-5 right-5 w-10 h-10 bg-white/90 backdrop-blur-md border border-gray-100 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all hover:bg-[#4A3728] hover:text-white"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            </button>
        </div>
    );
}
