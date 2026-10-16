import type { LucideIcon } from 'lucide-react';
import {
    DollarSign,
    Minus,
    ShoppingBag,
    ShoppingCart,
    TrendingDown,
    TrendingUp,
    Package,
} from 'lucide-react';

const getTrend = (value: number) => {
    if (value > 0) return { icon: TrendingUp, color: 'text-green-600' };
    if (value < 0) return { icon: TrendingDown, color: 'text-red-600' };
    return { icon: Minus, color: 'text-neutral-500' };
};

interface StatCardProps {
    title: string;
    value: string;
    change: number;
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
}

function StatCard({
    title,
    value,
    change,
    icon: Icon,
    iconBg,
    iconColor,
}: StatCardProps) {
    const trend = getTrend(change);
    const TrendIcon = trend.icon;

    return (
        <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm">
            {/* Baris atas: teks kiri, ikon kanan */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-[16px] text-neutral-800">{title}</p>
                    <h2 className="mt-3 text-[30px] leading-none font-semibold text-neutral-950">
                        {value}
                    </h2>
                </div>

                <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}
                >
                    <Icon size={28} strokeWidth={2} className={iconColor} />
                </div>
            </div>

            {/* Baris bawah: tren di bawah kartu */}
            <div className="mt-4 flex items-center gap-1 text-[16px]">
                <TrendIcon size={19} strokeWidth={2} className={trend.color} />
                <span className={trend.color}>{change.toFixed(1)}%</span>
                <span className="text-neutral-500">vs last month</span>
            </div>
        </div>
    );
}

interface SalesCardsProps {
    totalAmount: number;
}

export default function SalesCards({ totalAmount }: SalesCardsProps) {
    return (
        <>
            <StatCard
                title="Item Sold"
                value={Number(totalAmount).toString()}
                change={20}
                icon={Package}
                iconBg="bg-green-50"
                iconColor="text-green-600"
            />
            <StatCard
                title="Total Sales"
                value="120"
                change={-5}
                icon={ShoppingCart}
                iconBg="bg-blue-50"
                iconColor="text-blue-600"
            />
            <StatCard
                title="Items Sold"
                value="342"
                change={0}
                icon={ShoppingBag}
                iconBg="bg-orange-50"
                iconColor="text-orange-600"
            />
        </>
    );
}
