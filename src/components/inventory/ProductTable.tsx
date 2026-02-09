import { Product } from "@/types";
import { formatCurrency } from "@/lib/api";

interface ProductTableProps {
    products: Product[];
    handleEditProduct: (product: Product) => void;
    handleDeleteMenu: (id: string) => void;
}

export default function ProductTable({ products, handleEditProduct, handleDeleteMenu }: ProductTableProps) {
    return (
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Menu Details</th>
                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Unit Price</th>
                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {products.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                                        {item.image_url ? (
                                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center opacity-20 text-xl">☕</div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-900">{item.name}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                            ID: {item.id.slice(0, 8)}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-6 text-right font-black text-[#4A3728] text-lg">
                                {formatCurrency(item.price)}
                            </td>
                            <td className="px-8 py-6 text-center">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${item.stock < 10 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                                    }`}>
                                    {item.stock} Unit In Stock
                                </span>
                            </td>
                            <td className="px-8 py-6 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handleEditProduct(item)}
                                        className="p-2 hover:bg-gray-50 text-gray-300 hover:text-[#4A3728] rounded-xl transition-all"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteMenu(item.id)}
                                        className="p-2 hover:bg-red-50 text-gray-300 hover:text-red-500 rounded-xl transition-all"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
