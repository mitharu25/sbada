<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function sales(Request $request)
    {
        // Mengambil ID user yang sedang login
        $idUser = Auth::id();

        // Query dasar: hanya penjualan dari produk milik user yang login
        $userSales = fn() => Sale::whereHas(
            'product',
            fn($q) => $q->where('id_user', $idUser)
        );

        // Menentukan bulan yang dipilih
        // Jika tidak ada / formatnya salah, pakai bulan terbaru yang punya data
        // (atau bulan sekarang jika user belum punya data sama sekali)
        $month = $request->query('month');

        if (!is_string($month) || !preg_match('/^\d{4}-(0[1-9]|1[0-2])$/', $month)) {
            $month = $userSales()
                ->selectRaw("to_char(MAX(sale_date), 'YYYY-MM') as m")
                ->value('m') ?? now()->format('Y-m');
        }

        // Rentang tanggal awal dan akhir bulan yang dipilih
        $start = Carbon::createFromFormat('!Y-m', $month)->startOfMonth();
        $end   = $start->copy()->endOfMonth();

        // 1. Section Cards: total amount pada bulan terpilih
        $totalAmount = (int) $userSales()->sum('amount');

        // 2. Section ..

        // 3. Section "Sales Per Day": jumlah transaksi per hari pada bulan terpilih
        $counts = $userSales()
            ->selectRaw('CAST(sale_date AS DATE) as date, COUNT(id_sale) as total')
            ->whereBetween('sale_date', [$start, $end])
            ->groupByRaw('CAST(sale_date AS DATE)')
            ->pluck('total', 'date');

        // Isi seluruh tanggal dalam bulan; tanggal tanpa penjualan bernilai 0
        $salesPerDay = [];
        for ($day = 1; $day <= $start->daysInMonth; $day++) {
            $date = $start->copy()->day($day)->format('Y-m-d');

            $salesPerDay[] = [
                'date'  => $date,
                'total' => (int) ($counts[$date] ?? 0),
            ];
        }

        // Daftar bulan yang punya data penjualan (PostgreSQL: to_char)
        $availableMonths = $userSales()
            ->selectRaw("DISTINCT to_char(sale_date, 'YYYY-MM') as month")
            ->orderByDesc('month')
            ->pluck('month');

        // 4. Kirim data ke Inertia
        return Inertia::render('analyticsDashboard/sales', [
            'salesPerDay'     => $salesPerDay,
            'availableMonths' => $availableMonths,
            'selectedMonth'   => $month,
            'totalAmount'     => $totalAmount,
        ]);
    }

    public function product()
    {
        return Inertia::render('analyticsDashboard/product');
    }
}
