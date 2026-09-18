import { usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';
import Sidebar from '@/components/layout/DashboardLayout';
import {
    DollarSign,
    ShoppingCart,
    ShoppingBag,
    TrendingUp,
    BadgeDollarSign,
} from 'lucide-react';

export default function HomeDashboard() {
    const { dashboardData } = usePage<PageProps>().props;

    return (
        <Sidebar>
            <div className="p-0">
                {/* Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {/* Total Revenue */}
                    <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-[16px] text-neutral-800">
                                    Total Revenue
                                </p>

                                <h2 className="mt-3 text-[30px] leading-none font-semibold text-neutral-950">
                                    ${Number(dashboardData.total_revenue)}
                                </h2>
                            </div>

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
                                <DollarSign
                                    size={28}
                                    strokeWidth={2}
                                    className="text-green-600"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex items-center gap-1 text-[16px]">
                            <TrendingUp
                                size={19}
                                strokeWidth={2}
                                className="text-green-600"
                            />
                            <span className="text-green-600">15.2%</span>
                            <span className="text-neutral-500">
                                vs last month
                            </span>
                        </div>
                    </div>

                    {/* Total Sales */}
                    <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-[16px] text-neutral-800">
                                    Total Sales
                                </p>

                                <h2 className="mt-3 text-[30px] leading-none font-semibold text-neutral-950">
                                    {dashboardData.total_orders}
                                </h2>
                            </div>

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
                                <ShoppingCart
                                    size={28}
                                    strokeWidth={2}
                                    className="text-green-600"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex items-center gap-1 text-[16px]">
                            <TrendingUp
                                size={19}
                                strokeWidth={2}
                                className="text-green-600"
                            />
                            <span className="text-green-600">10.8%</span>
                            <span className="text-neutral-500">
                                vs last month
                            </span>
                        </div>
                    </div>

                    {/* Total Items Sold */}
                    <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-[16px] text-neutral-800">
                                    Total Items Sold
                                </p>

                                <h2 className="mt-3 text-[30px] leading-none font-semibold text-neutral-950">
                                    {dashboardData.total_sales}
                                </h2>
                            </div>

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
                                <ShoppingBag
                                    size={28}
                                    strokeWidth={2}
                                    className="text-green-600"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex items-center gap-1 text-[16px]">
                            <TrendingUp
                                size={19}
                                strokeWidth={2}
                                className="text-green-600"
                            />
                            <span className="text-green-600">17.5%</span>
                            <span className="text-neutral-500">
                                vs last month
                            </span>
                        </div>
                    </div>

                    {/* Average Sales Value */}
                    <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-[16px] text-neutral-800">
                                    Average Sales Value
                                </p>

                                <h2 className="mt-3 text-[30px] leading-none font-semibold text-neutral-950">
                                    ${Number(dashboardData.average_sales)}
                                </h2>
                            </div>

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
                                <BadgeDollarSign
                                    size={28}
                                    strokeWidth={2}
                                    className="text-green-600"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex items-center gap-1 text-[16px]">
                            <TrendingUp
                                size={19}
                                strokeWidth={2}
                                className="text-green-600"
                            />
                            <span className="text-green-600">8.5%</span>
                            <span className="text-neutral-500">
                                vs last month
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}
