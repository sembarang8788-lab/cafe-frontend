import { useState } from "react";
import { createOrderAndReduceStock } from "@/lib/api";
import { Product, CartItem, OrderItem } from "@/types";

export function useCart(products: Product[], refreshData: () => Promise<void>) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);

    const addToCart = (id: string) => {
        const product = products.find((p) => p.id === id);
        if (!product || product.stock <= 0) return;

        setCart((prev) => {
            const existing = prev.find((c) => c.id === id);
            if (existing) {
                if (existing.qty >= product.stock) return prev;
                return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c));
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const updateQty = (id: string, delta: number) => {
        const product = products.find((p) => p.id === id);
        setCart((prev) => {
            return prev
                .map((item) => {
                    if (item.id === id) {
                        let newQty = item.qty + delta;
                        if (product && newQty > product.stock) newQty = product.stock;
                        return { ...item, qty: newQty };
                    }
                    return item;
                })
                .filter((item) => item.qty > 0);
        });
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

    const checkout = async () => {
        if (cart.length === 0) return;

        try {
            setLoading(true);
            const items: OrderItem[] = cart.map((item) => ({
                product_id: item.id,
                quantity: item.qty,
                price: item.price,
            }));

            await createOrderAndReduceStock(items, cartTotal);
            setCart([]);
            await refreshData();
            alert("Transaction Completed Successfully!");
        } catch (err: unknown) {
            alert("Error: " + (err instanceof Error ? err.message : "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    return {
        cart,
        setCart,
        addToCart,
        updateQty,
        clearCart,
        cartTotal,
        cartCount,
        checkout,
        loading
    };
}
