import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    AreaChart,
} from "recharts";
import { formatCurrency } from "@/lib/api";

interface RevenueChartProps {
    data: { day: string; revenue: number }[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
    return (
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#4A3728]/10 rounded-lg text-[#4A3728]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                    </div>
                    <div>
                        <h4 className="text-lg font-extrabold text-gray-900">Revenue Trends</h4>
                        <p className="text-xs font-medium text-gray-400">Monthly performance trend</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4A3728" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#4A3728" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                        <XAxis
                            dataKey="day"
                            tick={{ fontSize: 10, fontWeight: "600", fill: "#9CA3AF" }}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                            interval={4}
                        />

                        <YAxis
                            tick={{ fontSize: 11, fontWeight: "600", fill: "#9CA3AF" }}
                            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                            axisLine={false}
                            tickLine={false}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{ stroke: '#4A3728', strokeWidth: 2, strokeDasharray: '4 4' }}
                            formatter={(value: any) => [formatCurrency(Number(value) || 0), "Revenue"]}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#4A3728"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
