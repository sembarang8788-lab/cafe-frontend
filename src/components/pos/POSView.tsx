import { useState } from "react";
import { Product, CartItem } from "@/types";
import ProductCard from "./ProductCard";
import Cart from "./Cart";

interface POSViewProps {
    products: Product[];
    cart: CartItem[];
    addToCart: (id: string) => void;
    updateQty: (id: string, delta: number) => void;
    clearCart: () => void;
    checkout: () => Promise<void>;
    handleEditProduct: (product: Product) => void;
    cartCount: number;
    cartTotal: number;
    loading: boolean;
}

export default function POSView({
    products,
    cart,
    addToCart,
    updateQty,
    clearCart,
    checkout,
    handleEditProduct,
    cartCount,
    cartTotal,
    loading
}: POSViewProps) {
    const [posCategory, setPosCategory] = useState<"all" | "makanan" | "minuman">("all");

    return (
        <section className="flex-1 flex overflow-hidden animate-fadeIn">
            <div className="flex-1 p-10 overflow-y-auto custom-scroll">
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Main Menu</h2>
                        <p className="text-gray-400 mt-1 font-medium">Select items to process customer orders</p>
                    </div>
                    <div className="flex gap-2">
                        {["all", "makanan", "minuman"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setPosCategory(cat as "all" | "makanan" | "minuman")}
                                className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all border ${posCategory === cat
                                    ? "bg-[#4A3728] text-white border-[#4A3728]"
                                    : "bg-white text-gray-500 border-gray-100 hover:border-[#4A3728]"
                                    }`}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {products
                        .filter((p) => posCategory === "all" || p.category === posCategory)
                        .map((item) => (
                            <ProductCard
                                key={item.id}
                                item={item}
                                onAddToCart={addToCart}
                                onEditProduct={handleEditProduct}
                            />
                        ))}
                </div>
            </div>

            <Cart
                cart={cart}
                cartCount={cartCount}
                cartTotal={cartTotal}
                updateQty={updateQty}
                checkout={checkout}
                clearCart={clearCart}
                loading={loading}
            />
        </section>
    );
}
