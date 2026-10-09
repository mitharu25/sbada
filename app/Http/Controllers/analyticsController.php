<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnalyticsController extends Controller
{
    public function sales(Request $request)
    {
        $month = $request->query('month', now()->format('Y-m'));

        if (!preg_match('/^\d{4}-(0[1-9]|1[0-2])$/', $month)) {
            $month = now()->format('Y-m');
        }

        $start = Carbon::createFromFormat('!Y-m', $month)->startOfMonth();
        $end   = $start->copy()->endOfMonth();

        $idUser = Auth::id(); // otomatis memakai primaryKey 'id_user'

        // Query dasar: hanya penjualan dari produk milik user yang login
        $userSales = fn() => Sale::whereHas(
            'product',
            fn($q) => $q->where('id_user', $idUser)
        );

        // Jumlah id_sale per tanggal pada bulan terpilih
        $counts = $userSales()
            ->selectRaw('CAST(sale_date AS DATE) as date, COUNT(id_sale) as total')
            ->whereBetween('sale_date', [$start->toDateString(), $end->toDateString()])
            ->groupByRaw('CAST(sale_date AS DATE)')
            ->pluck('total', 'date');

        // Isi tanggal tanpa penjualan dengan 0
        $salesPerDay = [];
        for ($day = 1; $day <= $start->daysInMonth; $day++) {
            $date = $start->copy()->day($day)->format('Y-m-d');

            $salesPerDay[] = [
                'date'  => $date,
                'total' => (int) ($counts[$date] ?? 0),
            ];
        }
        // Daftar bulan-tahun untuk dropdown (PostgreSQL: to_char)
        $availableMonths = $userSales()
            ->selectRaw("DISTINCT to_char(sale_date, 'YYYY-MM') as month")
            ->orderByDesc('month')
            ->pluck('month');

        return Inertia::render('analyticsDashboard/sales', [
            'salesPerDay'     => $salesPerDay,
            'availableMonths' => $availableMonths,
            'selectedMonth'   => $month,
        ]);
    }

    public function product()
    {
        return Inertia::render('analyticsDashboard/product');
    }
}
