import { useState, useEffect } from "react";
import { Order, Product } from "@/types";

export function useAnalytics(orders: Order[], products: Product[]) {
    const [filterDate, setFilterDate] = useState(new Date().toISOString().slice(0, 10));
    const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1);
    const [filterYear, setFilterYear] = useState(new Date().getFullYear());

    const [chartData, setChartData] = useState<{ day: string; revenue: number }[]>([]);
    const [topProducts, setTopProducts] = useState<{ id: string; name: string; image: string; sold: number; revenue: number }[]>([]);

    const updateStats = () => {
        // 1. Chart Data - Show entire selected month
        const daysInMonth = new Date(filterYear, filterMonth, 0).getDate();
        const newChartData = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${filterYear}-${String(filterMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const sum = orders
                .filter((o) => o.created_at && o.created_at.startsWith(dateStr))
                .reduce((s, o) => s + Number(o.total_amount || 0), 0);

            newChartData.push({
                day: day.toString(),
                revenue: sum
            });
        }
        setChartData(newChartData);

        // 2. Top Selling Products - Only from selected month
        const selectedMonthStr = `${filterYear}-${String(filterMonth).padStart(2, '0')}`;
        const monthlyOrders = orders.filter(o => o.created_at?.startsWith(selectedMonthStr));

        const productStats: Record<string, { qty: number; revenue: number }> = {};
        monthlyOrders.forEach(order => {
            const items = order.order_items || order.items || [];
            items.forEach(item => {
                if (!productStats[item.product_id]) {
                    productStats[item.product_id] = { qty: 0, revenue: 0 };
                }
                productStats[item.product_id].qty += item.quantity;
                productStats[item.product_id].revenue += item.price * item.quantity;
            });
        });

        const sortedProducts = Object.entries(productStats)
            .map(([id, stats]) => {
                const product = products.find(p => p.id === id);
                return {
                    id,
                    name: product?.name || 'Unknown Item',
                    image: product?.image_url || '',
                    sold: stats.qty,
                    revenue: stats.revenue
                };
            })
            .filter(p => p.name !== 'Unknown Item')
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 5);

        setTopProducts(sortedProducts);
    };

    useEffect(() => {
        if (orders.length > 0 && products.length > 0) {
            updateStats();
        }
    }, [filterMonth, filterYear, orders, products]);

    // Derived Stats
    const filteredDailyOrders = orders.filter((o) => o.created_at?.startsWith(filterDate));
    const dailyRevenue = filteredDailyOrders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

    const selectedDate = new Date(filterDate);
    const yesterday = new Date(selectedDate);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);
    const yesterdayRevenue = orders
        .filter((o) => o.created_at?.startsWith(yesterdayStr))
        .reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
    const dailyGrowth = yesterdayRevenue > 0 ? ((dailyRevenue - yesterdayRevenue) / yesterdayRevenue * 100).toFixed(1) : null;

    const selectedMonthStr = `${filterYear}-${String(filterMonth).padStart(2, '0')}`;
    const filteredMonthlyOrders = orders.filter((o) => o.created_at?.startsWith(selectedMonthStr));
    const monthlyRevenue = filteredMonthlyOrders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
    const monthlyOrderCount = filteredMonthlyOrders.length;

    const prevMonthDate = new Date(filterYear, filterMonth - 2, 1);
    const prevMonthStr = `${prevMonthDate.getFullYear()}-${String(prevMonthDate.getMonth() + 1).padStart(2, '0')}`;
    const prevMonthOrders = orders.filter((o) => o.created_at?.startsWith(prevMonthStr));
    const prevMonthlyRevenue = prevMonthOrders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
    const monthlyGrowth = prevMonthlyRevenue > 0 ? ((monthlyRevenue - prevMonthlyRevenue) / prevMonthlyRevenue * 100).toFixed(1) : null;

    return {
        filterDate,
        setFilterDate,
        filterMonth,
        setFilterMonth,
        filterYear,
        setFilterYear,
        chartData,
        topProducts,
        dailyRevenue,
        dailyGrowth,
        filteredDailyOrders,
        monthlyRevenue,
        monthlyOrderCount,
        monthlyGrowth
    };
}
