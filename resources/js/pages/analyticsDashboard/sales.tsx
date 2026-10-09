import Sidebar from '@/components/layout/DashboardLayout';
import { router } from '@inertiajs/react';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface SalesPerDay {
    date: string; // "2026-10-09"
    total: number;
}

interface Props {
    salesPerDay: SalesPerDay[];
    availableMonths: string[]; // ["2026-10", "2026-09", ...]
    selectedMonth: string;
}

const formatMonth = (ym: string) =>
    new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
        new Date(`${ym}-01`),
    );

export default function Sales({
    salesPerDay,
    availableMonths,
    selectedMonth,
}: Props) {
    // Pastikan bulan terpilih tetap muncul di dropdown walau belum ada datanya
    const months = availableMonths.includes(selectedMonth)
        ? availableMonths
        : [selectedMonth, ...availableMonths];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.get(
            '/analytics/sales',
            { month: e.target.value },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    return (
        <Sidebar>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                {/* Kiri: 75% */}
                <div className="rounded-2xl border border-neutral-100 bg-white p-3 shadow-sm lg:col-span-3">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-semibold">
                            Sales Count Per Day - {formatMonth(selectedMonth)}
                        </h1>

                        <select
                            value={selectedMonth}
                            onChange={handleChange}
                            className="rounded-md border-2 border-neutral-300 px-3 py-2"
                        >
                            {months.map((m) => (
                                <option key={m} value={m}>
                                    {formatMonth(m)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ width: '100%', height: 400 }}>
                        <ResponsiveContainer>
                            <LineChart
                                data={salesPerDay}
                                margin={{
                                    top: 10,
                                    right: 20,
                                    left: 10,
                                    bottom: 20,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(d: string) => d.slice(8)}
                                    label={{
                                        value: 'Date (Day of Month)',
                                        position: 'insideBottom',
                                        offset: -10,
                                        fill: '#000',
                                    }}
                                />
                                <YAxis
                                    allowDecimals={false}
                                    label={{
                                        value: 'Amount',
                                        angle: -90,
                                        position: 'insideLeft',
                                        fill: '#000',
                                    }}
                                />
                                <Tooltip
                                    labelFormatter={(d: string) => `${d}`}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    name="Total Sales"
                                    stroke="#2563eb"
                                    strokeWidth={2}
                                    dot={{ r: 3 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Kanan: 25%, dikosongkan dulu */}
                <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm lg:col-span-1">
                    {/* kosong */}
                </div>
            </div>
        </Sidebar>
    );
}
