import { formatCurrency } from "@/lib/api";

interface TopSellingListProps {
    topProducts: { id: string; name: string; image: string; sold: number; revenue: number }[];
}

export default function TopSellingList({ topProducts }: TopSellingListProps) {
    return (
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                </div>
                <div>
                    <h4 className="text-lg font-extrabold text-gray-900">Menu Terlaris</h4>
                    <p className="text-xs font-medium text-gray-400">Most ordered items</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scroll">
                {topProducts.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                        <span className="text-4xl mb-2">🍽️</span>
                        <p className="text-sm font-bold text-gray-400">No sale data yet.</p>
                    </div>
                ) : (
                    topProducts.map((p, i) => (
                        <div key={p.id} className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50/50 hover:bg-gray-100 transition-colors group cursor-default">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 overflow-hidden shrink-0 shadow-sm">
                                    {p.image ? <img src={p.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-lg">☕</div>}
                                </div>
                                <div className={`absolute -top-2 -left-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-sm
            ${i === 0 ? 'bg-yellow-400 text-yellow-900' :
                                        i === 1 ? 'bg-gray-300 text-gray-800' :
                                            i === 2 ? 'bg-orange-300 text-orange-900' : 'bg-gray-100 text-gray-500'}`}>
                                    {i + 1}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-900 truncate text-sm">{p.name}</p>
                                <p className="text-[10px] text-gray-500 font-bold">{p.sold} orders sold</p>
                            </div>
                            <div className="text-right">
                                <p className="font-black text-[#4A3728] text-sm">{formatCurrency(p.revenue)}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
