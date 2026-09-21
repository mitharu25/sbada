import { usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';
import Sidebar from '@/components/layout/DashboardLayout';
import {
    DollarSign,
    ShoppingCart,
    ShoppingBag,
    TrendingUp,
    BadgeDollarSign,
    TrendingDown,
    Minus,
} from 'lucide-react';

export default function HomeDashboard() {
    // Destructure the props from the Inertia page
    const {
        dashboardData,
        revenueChange,
        salesChange,
        itemsSoldChange,
        averageSalesChange,
    } = usePage<PageProps>().props;

    // Function to determine the trend icon and color based on the value
    const getTrend = (value: number) => {
        if (value > 0) {
            return {
                icon: TrendingUp,
                color: 'text-green-600',
            };
        }

        if (value < 0) {
            return {
                icon: TrendingDown,
                color: 'text-red-600',
            };
        }

        return {
            icon: Minus,
            color: 'text-neutral-500',
        };
    };

    const revenueTrend = getTrend(Number(revenueChange));
    const RevenueIcon = revenueTrend.icon;
    const salesTrend = getTrend(Number(salesChange));
    const SalesIcon = salesTrend.icon;
    const itemsSoldTrend = getTrend(Number(itemsSoldChange));
    const ItemsSoldIcon = itemsSoldTrend.icon;
    const averageSalesTrend = getTrend(Number(averageSalesChange));
    const AverageSalesIcon = averageSalesTrend.icon;

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
                                    $
                                    {Number(
                                        dashboardData.total_revenue,
                                    ).toFixed(2)}
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
                            <RevenueIcon
                                size={19}
                                strokeWidth={2}
                                className={revenueTrend.color}
                            />
                            <span className={revenueTrend.color}>
                                {Number(revenueChange).toFixed(1)}%
                            </span>
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
                            <SalesIcon
                                size={19}
                                strokeWidth={2}
                                className={salesTrend.color}
                            />
                            <span className={salesTrend.color}>
                                {Number(salesChange).toFixed(1)}%
                            </span>
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
                            <ItemsSoldIcon
                                size={19}
                                strokeWidth={2}
                                className={itemsSoldTrend.color}
                            />
                            <span className={itemsSoldTrend.color}>
                                {Number(itemsSoldChange).toFixed(1)}%
                            </span>
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
                                    $
                                    {Number(
                                        dashboardData.average_sales,
                                    ).toFixed(2)}
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
                            <AverageSalesIcon
                                size={19}
                                strokeWidth={2}
                                className={averageSalesTrend.color}
                            />
                            <span className={averageSalesTrend.color}>
                                {Number(averageSalesChange).toFixed(1)}%
                            </span>
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
