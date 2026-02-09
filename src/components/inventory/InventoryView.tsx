import { Product } from "@/types";
import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";

interface InventoryViewProps {
    products: Product[];
    handleEditProduct: (product: Product) => void;
    handleDeleteMenu: (id: string) => void;
    handleSaveMenu: () => Promise<void>;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    editingProduct: Product | null;
    setEditingProduct: (product: Product | null) => void;
    formData: any;
    setFormData: (data: any) => void;
    resetForm: () => void;
    loading: boolean;
}

export default function InventoryView({
    products,
    handleEditProduct,
    handleDeleteMenu,
    handleSaveMenu,
    showModal,
    setShowModal,
    editingProduct,
    setEditingProduct,
    formData,
    setFormData,
    resetForm,
    loading
}: InventoryViewProps) {
    return (
        <section className="flex-1 p-10 overflow-y-auto custom-scroll animate-fadeIn">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Stock Inventory</h2>
                        <p className="text-gray-400 font-medium">Manage your menu offerings and stock levels</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-[#4A3728] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-amber-950/20 hover:bg-black transition-all flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Item
                    </button>
                </div>

                <ProductTable
                    products={products}
                    handleEditProduct={handleEditProduct}
                    handleDeleteMenu={handleDeleteMenu}
                />
            </div>

            {showModal && (
                <ProductModal
                    editingProduct={editingProduct}
                    formData={formData}
                    setFormData={setFormData}
                    handleSaveMenu={handleSaveMenu}
                    setShowModal={setShowModal}
                    setEditingProduct={setEditingProduct}
                    resetForm={resetForm}
                    loading={loading}
                />
            )}
        </section>
    );
}
