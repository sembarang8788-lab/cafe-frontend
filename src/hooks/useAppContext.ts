import { useState, useEffect } from "react";
import { getProducts, getOrders } from "@/lib/api";
import { Product, Order } from "@/types";

export function useAppContext() {
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [dbStatus, setDbStatus] = useState<"online" | "offline">("online");

    const refreshData = async () => {
        try {
            setLoading(true);
            const [productsData, ordersData] = await Promise.all([
                getProducts(),
                getOrders(),
            ]);
            setProducts(productsData);
            setOrders(ordersData);
            setDbStatus("online");
        } catch (err) {
            console.error("DB Error:", err);
            setDbStatus("offline");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    return {
        products,
        setProducts,
        orders,
        setOrders,
        loading,
        setLoading,
        dbStatus,
        refreshData
    };
}
