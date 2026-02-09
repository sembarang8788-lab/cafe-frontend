import { formatCurrency } from "@/lib/api";

interface StatsGridProps {
    dailyRevenue: number;
    dailyGrowth: string | null;
    filterDate: string;
    setFilterDate: (date: string) => void;
    filteredDailyOrdersCount: number;
    monthlyRevenue: number;
    monthlyGrowth: string | null;
    monthlyOrderCount: number;
    filterMonth: number;
    setFilterMonth: (month: number) => void;
    filterYear: number;
    setFilterYear: (year: number) => void;
}

export default function StatsGrid({
    dailyRevenue,
    dailyGrowth,
    filterDate,
    setFilterDate,
    filteredDailyOrdersCount,
    monthlyRevenue,
    monthlyGrowth,
    monthlyOrderCount,
    filterMonth,
    setFilterMonth,
    filterYear,
    setFilterYear
}: StatsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Daily Revenue Card */}
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                    <svg className="w-24 h-24 text-[#4A3728]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05 1.18 1.91 2.53 1.91 1.35 0 2.53-.86 2.53-1.9s-1.18-1.91-2.53-1.91c-2.53 0-5.12-2-5.12-4.59 0-2.45 1.8-4.14 4.09-4.49V2h2.67v1.88c1.71.36 3.16 1.46 3.27 3.4h-1.96c-.1-1.05-1.18-1.91-2.53-1.91-1.35 0-2.53.86-2.53 1.9s1.18 1.91 2.53 1.91c2.53 0 5.12 2 5.12 4.59 0 2.45-1.8 4.14-4.09 4.49z" />
                    </svg>
                </div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-2 text-gray-400">
                        <p className="text-[10px] font-black uppercase tracking-widest">Daily Revenue</p>
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="text-[10px] font-bold bg-transparent border-none outline-none focus:ring-0 cursor-pointer"
                        />
                    </div>
                    <h3 className="text-4xl font-black text-[#4A3728] tracking-tight">{formatCurrency(dailyRevenue)}</h3>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <span className="text-[10px] font-medium text-gray-400">Selected: {new Date(filterDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                        {dailyGrowth !== null && (
                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${Number(dailyGrowth) >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {Number(dailyGrowth) >= 0 ? '+' : ''}{dailyGrowth}%
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Total Orders Card */}
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                    <svg className="w-24 h-24 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                    </svg>
                </div>
                <div className="relative z-10">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Orders</p>
                    <h3 className="text-4xl font-black text-gray-900 tracking-tight">{filteredDailyOrdersCount}</h3>
                    <div className="flex items-center gap-1 mt-3">
                        <span className="text-[10px] font-medium text-gray-400">Transactions on selected date</span>
                    </div>
                </div>
            </div>

            {/* Monthly Revenue Card */}
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                    <svg className="w-24 h-24 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                    </svg>
                </div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-2 text-gray-400">
                        <p className="text-[10px] font-black uppercase tracking-widest">Monthly Revenue</p>
                        <div className="flex gap-1">
                            <select
                                value={filterMonth}
                                onChange={(e) => setFilterMonth(Number(e.target.value))}
                                className="text-[10px] font-bold bg-transparent border-none outline-none focus:ring-0 cursor-pointer"
                            >
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>{new Date(2000, i).toLocaleString('id-ID', { month: 'short' })}</option>
                                ))}
                            </select>
                            <select
                                value={filterYear}
                                onChange={(e) => setFilterYear(Number(e.target.value))}
                                className="text-[10px] font-bold bg-transparent border-none outline-none focus:ring-0 cursor-pointer"
                            >
                                {Array.from({ length: new Date().getFullYear() - 2020 + 2 }, (_, i) => 2020 + i).map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-[#4A3728] tracking-tight">{formatCurrency(monthlyRevenue)}</h3>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full">{monthlyOrderCount} orders</span>
                        {monthlyGrowth !== null && (
                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${Number(monthlyGrowth) >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {Number(monthlyGrowth) >= 0 ? '+' : ''}{monthlyGrowth}%
                            </span>
                        )}
                        <span className="text-[10px] font-medium text-gray-400">{monthlyGrowth !== null ? 'vs last month' : 'This month'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
