import StatsGrid from "./StatsGrid";
import RevenueChart from "./RevenueChart";
import TopSellingList from "./TopSellingList";

interface AnalyticsViewProps {
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
    chartData: { day: string; revenue: number }[];
    topProducts: { id: string; name: string; image: string; sold: number; revenue: number }[];
}

export default function AnalyticsView({
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
    setFilterYear,
    chartData,
    topProducts
}: AnalyticsViewProps) {
    return (
        <section className="flex-1 p-8 overflow-y-auto custom-scroll animate-fadeIn bg-[#F9FAFB]">
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-extrabold text-[#4A3728] tracking-tight">Analytics Center</h2>
                        <p className="text-gray-400 font-bold mt-1">Real-time business performance insights</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-gray-600">Live Data</span>
                    </div>
                </header>

                <StatsGrid
                    dailyRevenue={dailyRevenue}
                    dailyGrowth={dailyGrowth}
                    filterDate={filterDate}
                    setFilterDate={setFilterDate}
                    filteredDailyOrdersCount={filteredDailyOrdersCount}
                    monthlyRevenue={monthlyRevenue}
                    monthlyGrowth={monthlyGrowth}
                    monthlyOrderCount={monthlyOrderCount}
                    filterMonth={filterMonth}
                    setFilterMonth={setFilterMonth}
                    filterYear={filterYear}
                    setFilterYear={setFilterYear}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[500px]">
                    <RevenueChart data={chartData} />
                    <TopSellingList topProducts={topProducts} />
                </div>
            </div>
        </section>
    );
}
