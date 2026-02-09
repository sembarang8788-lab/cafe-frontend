import { Product } from "@/types";

interface ProductModalProps {
    editingProduct: Product | null;
    formData: {
        name: string;
        price: string;
        stock: string;
        category: string;
        image_url: string;
    };
    setFormData: (data: any) => void;
    handleSaveMenu: () => Promise<void>;
    setShowModal: (show: boolean) => void;
    setEditingProduct: (product: Product | null) => void;
    resetForm: () => void;
    loading: boolean;
}

export default function ProductModal({
    editingProduct,
    formData,
    setFormData,
    handleSaveMenu,
    setShowModal,
    setEditingProduct,
    resetForm,
    loading
}: ProductModalProps) {
    return (
        <div className="fixed inset-0 bg-[#4A3728]/40 backdrop-blur-md flex items-center justify-center z-[100]">
            <div className="bg-white w-[500px] rounded-[40px] p-10 shadow-2xl animate-scaleIn">
                <div className="mb-8">
                    <h3 className="text-2xl font-black text-gray-900">{editingProduct ? 'Edit Product' : 'New Product'}</h3>
                    <p className="text-gray-400 font-medium">{editingProduct ? 'Update product details and stock' : 'Enter details for the new menu item'}</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Product Title</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Signature Arabica Blend"
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-semibold text-gray-800 placeholder:text-gray-300"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Price (IDR)</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="0"
                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-[#4A3728]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Initial Stock</label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                placeholder="10"
                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                        <div className="grid grid-cols-2 gap-4">
                            {["makanan", "minuman"].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFormData({ ...formData, category: cat })}
                                    className={`py-4 rounded-2xl font-bold text-sm border transition-all ${formData.category === cat
                                        ? "bg-[#4A3728] text-white border-[#4A3728]"
                                        : "bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-300"
                                        }`}
                                >
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Cover Image URL</label>
                        <input
                            type="text"
                            value={formData.image_url}
                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-xs text-gray-500"
                        />
                    </div>
                </div>

                <div className="flex gap-4 mt-10">
                    <button
                        onClick={() => {
                            setShowModal(false);
                            setEditingProduct(null);
                            resetForm();
                        }}
                        className="flex-1 py-4 text-gray-400 font-bold hover:bg-gray-50 rounded-2xl transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveMenu}
                        disabled={loading}
                        className="flex-[2] px-10 py-4 bg-[#4A3728] text-white font-bold rounded-2xl shadow-xl shadow-amber-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {loading ? "Saving..." : (editingProduct ? "Update Item" : "Add Item")}
                    </button>
                </div>
            </div>
        </div>
    );
}
