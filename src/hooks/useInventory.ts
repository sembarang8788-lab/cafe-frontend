import { useState } from "react";
import { addProduct, updateProduct, deleteProduct } from "@/lib/api";
import { Product } from "@/types";

export function useInventory(refreshData: () => Promise<void>) {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        stock: "",
        category: "makanan",
        image_url: "",
    });

    const handleSaveMenu = async () => {
        const { name, price, stock, image_url } = formData;
        const p = parseFloat(price);
        const s = parseInt(stock);

        if (!name || isNaN(p)) {
            alert("Fill required fields!");
            return;
        }

        try {
            setLoading(true);
            if (editingProduct) {
                await updateProduct(editingProduct.id, {
                    name,
                    price: p,
                    stock: isNaN(s) ? 0 : s,
                    category: formData.category as "makanan" | "minuman",
                    image_url: image_url || null,
                });
            } else {
                await addProduct({
                    name,
                    price: p,
                    stock: isNaN(s) ? 0 : s,
                    category: formData.category as "makanan" | "minuman",
                    image_url: image_url || null,
                });
            }
            resetForm();
            setShowModal(false);
            await refreshData();
        } catch (err: unknown) {
            console.error("Save Error Details:", err);
            const msg = err instanceof Error ? err.message : "Unknown error occurred";
            alert("Error: " + msg);
        } finally {
            setLoading(false);
        }
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price.toString(),
            stock: product.stock.toString(),
            category: product.category,
            image_url: product.image_url || "",
        });
        setShowModal(true);
    };

    const handleDeleteMenu = async (id: string) => {
        if (confirm("Permanently delete this item?")) {
            try {
                setLoading(true);
                await deleteProduct(id);
                await refreshData();
            } catch (err: unknown) {
                alert("Error: " + (err instanceof Error ? err.message : "Unknown error"));
            } finally {
                setLoading(false);
            }
        }
    };

    const resetForm = () => {
        setFormData({ name: "", price: "", stock: "", category: "makanan", image_url: "" });
        setEditingProduct(null);
    };

    return {
        loading,
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
    };
}
