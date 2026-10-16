import Sidebar from '@/components/layout/DashboardLayout';
import SalesPerDayChart, {
    type SalesPerDay,
} from './salesDashboard/SalesPerCountDayChart';
import SalesCards from './salesDashboard/salesCards';

interface Props {
    salesPerDay: SalesPerDay[];
    availableMonths: string[];
    selectedMonth: string;
    totalAmount: number;
}

export default function Sales({
    salesPerDay,
    availableMonths,
    selectedMonth,
    totalAmount,
}: Props) {
    return (
        <Sidebar>
            {/* KPI cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                <SalesCards totalAmount={totalAmount} />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="lg:col-span-1">
                    <h1 className="text-2xl font-semibold">Table</h1>
                </div>
                <div className="lg:col-span-1">
                    <h1 className="text-2xl font-semibold">Round Chart</h1>
                </div>
            </div>
            {/* Sales Count Per Day Graph */}
            <div className="grid grid-cols-1 gap-4">
                <SalesPerDayChart
                    salesPerDay={salesPerDay}
                    availableMonths={availableMonths}
                    selectedMonth={selectedMonth}
                />
            </div>
        </Sidebar>
    );
}
