import { ViewType } from "@/types";

interface SidebarProps {
    activeView: ViewType;
    nav: (target: ViewType) => void;
    dbStatus: "online" | "offline";
}

export default function Sidebar({ activeView, nav, dbStatus }: SidebarProps) {
    return (
        <aside className="w-72 bg-white border-r border-gray-100 flex flex-col z-20">
            <div className="p-8">
                <h1 className="text-2xl font-extrabold text-[#4A3728] tracking-tight flex items-center gap-3">
                    <span className="p-2 bg-[#4A3728] text-white rounded-lg shadow-inner">☕</span>
                    Cak Yusop
                </h1>
                <div className="mt-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        Premium Management
                    </span>
                </div>
            </div>

            <nav className="flex-1 px-6 space-y-2 mt-4">
                <button
                    onClick={() => nav("pos")}
                    className={`sidebar-link w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl font-semibold ${activeView === "pos" ? "active" : "text-gray-500"
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Point of Sale
                </button>
                <button
                    onClick={() => nav("inventory")}
                    className={`sidebar-link w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl font-semibold ${activeView === "inventory" ? "active" : "text-gray-500"
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 11m8 4V4.5" />
                    </svg>
                    Inventory
                </button>
                <button
                    onClick={() => nav("report")}
                    className={`sidebar-link w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl font-semibold ${activeView === "report" ? "active" : "text-gray-500"
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Analytics
                </button>
            </nav>

            <div className="p-6">
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                            System Health
                        </span>
                        <div className={`w-2 h-2 rounded-full ${dbStatus === "online" ? "bg-green-500" : "bg-red-500 animate-ping"}`}></div>
                    </div>
                    <p className="text-xs font-bold text-gray-700">
                        {dbStatus === "online" ? "Service Operational" : "System Offline"}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-[10px] text-gray-400 font-medium">V 2.1.0 • Cak Yusop POS</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
