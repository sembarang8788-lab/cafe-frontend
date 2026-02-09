import { CartItem } from "@/types";
import { formatCurrency } from "@/lib/api";

interface CartProps {
    cart: CartItem[];
    cartCount: number;
    cartTotal: number;
    updateQty: (id: string, delta: number) => void;
    checkout: () => Promise<void>;
    clearCart: () => void;
    loading: boolean;
}

export default function Cart({
    cart,
    cartCount,
    cartTotal,
    updateQty,
    checkout,
    clearCart,
    loading
}: CartProps) {
    return (
        <div className="w-[420px] bg-white border-l border-gray-100 flex flex-col shadow-2xl z-10">
            <div className="p-8 flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-extrabold text-gray-900">Current Order</h3>
                    <span className="bg-[#4A3728] text-white text-[10px] font-bold px-2 py-1 rounded-md">
                        {cartCount} ITEMS
                    </span>
                </div>

                <div className="flex-1 overflow-y-auto custom-scroll space-y-4 pr-2">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-30">
                            <div className="text-6xl mb-4">🛒</div>
                            <p className="font-bold text-sm tracking-widest uppercase">Cart is Empty</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 bg-gray-50/80 p-4 rounded-2xl border border-gray-100 group">
                                <div className="w-12 h-12 rounded-xl bg-white flex-shrink-0 flex items-center justify-center font-bold text-[#4A3728] shadow-sm border border-gray-100">
                                    {item.qty}x
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-gray-900 truncate">{item.name}</p>
                                    <p className="text-xs font-bold text-gray-400">{formatCurrency(item.price)}</p>
                                </div>
                                <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-inner border border-gray-100">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); updateQty(item.id, -1); }}
                                        className="w-8 h-8 flex items-center justify-center hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors font-bold"
                                    >
                                        -
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); updateQty(item.id, 1); }}
                                        className="w-8 h-8 flex items-center justify-center hover:bg-green-50 hover:text-green-500 rounded-lg transition-colors font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="p-8 bg-gray-50/50 border-t border-gray-100">
                <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-gray-400 font-medium">
                        <span>Order Subtotal</span>
                        <span className="text-gray-900 font-bold">{formatCurrency(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-gray-900 font-extrabold text-lg">Grand Total</span>
                        <span className="text-2xl font-black text-[#4A3728]">{formatCurrency(cartTotal)}</span>
                    </div>
                </div>

                <button
                    onClick={checkout}
                    disabled={loading || cart.length === 0}
                    className="w-full bg-[#4A3728] text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl shadow-amber-950/20 active:scale-[0.98] disabled:opacity-50"
                >
                    {loading ? "Processing..." : "Complete Transaction"}
                </button>
                <button
                    onClick={clearCart}
                    className="w-full mt-4 py-2 text-gray-400 text-xs font-bold hover:text-red-500 uppercase tracking-widest transition-colors"
                >
                    Discard All Items
                </button>
            </div>
        </div>
    );
}
