import { useState } from "react";
import { type ViewType } from "@/types";
import Sidebar from "@/components/layout/Sidebar";
import POSView from "@/components/pos/POSView";
import InventoryView from "@/components/inventory/InventoryView";
import AnalyticsView from "@/components/analytics/AnalyticsView";

// Hooks
import { useAppContext } from "@/hooks/useAppContext";
import { useCart } from "@/hooks/useCart";
import { useInventory } from "@/hooks/useInventory";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function App() {
    const [activeView, setActiveView] = useState<ViewType>("pos");

    // Core Data Hook
    const {
        products,
        orders,
        loading: dataLoading,
        dbStatus,
        refreshData
    } = useAppContext();

    // Cart Hook
    const {
        cart,
        addToCart,
        updateQty,
        clearCart,
        checkout,
        cartCount,
        cartTotal,
        loading: cartLoading
    } = useCart(products, refreshData);

    // Inventory Hook
    const {
        loading: inventoryLoading,
        showModal,
        setShowModal,
        editingProduct,
        setEditingProduct,
        formData,
        setFormData,
        handleSaveMenu,
        handleEditProduct,
        handleDeleteMenu,
        resetForm
    } = useInventory(refreshData);

    // Analytics Hook
    const {
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
    } = useAnalytics(orders, products);

    const nav = (target: ViewType) => {
        setActiveView(target);
        if (target === "inventory" || target === "report") {
            refreshData();
        }
    };

    const isLoading = dataLoading || cartLoading || inventoryLoading;

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar
                activeView={activeView}
                nav={nav}
                dbStatus={dbStatus}
            />

            <main className="flex-1 flex flex-col bg-[#F9FAFB] overflow-hidden relative">
                {activeView === "pos" && (
                    <POSView
                        products={products}
                        cart={cart}
                        addToCart={addToCart}
                        updateQty={updateQty}
                        clearCart={clearCart}
                        checkout={checkout}
                        handleEditProduct={handleEditProduct}
                        cartCount={cartCount}
                        cartTotal={cartTotal}
                        loading={isLoading}
                    />
                )}

                {activeView === "inventory" && (
                    <InventoryView
                        products={products}
                        handleEditProduct={handleEditProduct}
                        handleDeleteMenu={handleDeleteMenu}
                        handleSaveMenu={handleSaveMenu}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        editingProduct={editingProduct}
                        setEditingProduct={setEditingProduct}
                        formData={formData}
                        setFormData={setFormData}
                        resetForm={resetForm}
                        loading={isLoading}
                    />
                )}

                {activeView === "report" && (
                    <AnalyticsView
                        dailyRevenue={dailyRevenue}
                        dailyGrowth={dailyGrowth}
                        filterDate={filterDate}
                        setFilterDate={setFilterDate}
                        filteredDailyOrdersCount={filteredDailyOrders.length}
                        monthlyRevenue={monthlyRevenue}
                        monthlyGrowth={monthlyGrowth}
                        monthlyOrderCount={monthlyOrderCount}
                        filterMonth={filterMonth}
                        setFilterMonth={setFilterMonth}
                        filterYear={filterYear}
                        setFilterYear={setFilterYear}
                        chartData={chartData}
                        topProducts={topProducts}
                    />
                )}
            </main>
        </div>
    );
}
