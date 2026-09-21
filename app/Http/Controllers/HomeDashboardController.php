<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use App\Models\Sale;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class HomeDashboardController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        $thisMonth = Carbon::now()->startOfMonth();
        $lastMonth = Carbon::now()->subMonth()->startOfMonth();

        // Query for 4 cards
        $dashboardData = Sale::whereHas('product', function ($query) use ($userId) {
            $query->where('id_user', $userId);
        })
            ->selectRaw('
                COUNT(*) as total_orders,
                COALESCE(SUM(total_price), 0) as total_revenue,
                SUM(amount) as total_sales,
                COALESCE(AVG(total_price), 0) as average_sales
            ')
            ->first();

        // Query for different month "Total Revenue" card
        $thisMonthRevenue = Sale::whereHas('product', function ($query) use ($userId) {
            $query->where('id_user', $userId);
        })
            ->whereBetween('sale_date', [
                $thisMonth,
                Carbon::now()->endOfMonth()
            ])
            ->sum('total_price');

        $lastMonthRevenue = Sale::whereHas('product', function ($query) use ($userId) {
            $query->where('id_user', $userId);
        })
            ->whereBetween('sale_date', [
                $lastMonth,
                $thisMonth->copy()->subDay()
            ])
            ->sum('total_price');

        $revenueChange = $lastMonthRevenue > 0
            ? (($thisMonthRevenue - $lastMonthRevenue) / $lastMonthRevenue) * 100
            : 0;

        // Query for different month "Total Sales" card
        $thisMonthSales = Sale::whereHas('product', function ($query) use ($userId) {
            $query->where('id_user', $userId);
        })
            ->whereBetween('sale_date', [
                $thisMonth,
                Carbon::now()->endOfMonth()
            ])
            ->sum('amount');

        $lastMonthSales = Sale::whereHas('product', function ($query) use ($userId) {
            $query->where('id_user', $userId);
        })
            ->whereBetween('sale_date', [
                $lastMonth,
                $thisMonth->copy()->subDay()
            ])
            ->sum('amount');

        $salesChange = $lastMonthSales > 0
            ? (($thisMonthSales - $lastMonthSales) / $lastMonthSales) * 100
            : 0;

        // Query for different month "Total Items Sold" card
        $thisMonthItemsSold = Sale::whereHas('product', function ($query) use ($userId) {
            $query->where('id_user', $userId);
        })
            ->whereBetween('sale_date', [
                $thisMonth,
                Carbon::now()->endOfMonth()
            ])
            ->sum('amount');

        $lastMonthItemsSold = Sale::whereHas('product', function ($query) use ($userId) {
            $query->where('id_user', $userId);
        })
            ->whereBetween('sale_date', [
                $lastMonth,
                $thisMonth->copy()->subDay()
            ])
            ->sum('amount');

        $itemsSoldChange = $lastMonthItemsSold > 0
            ? (($thisMonthItemsSold - $lastMonthItemsSold) / $lastMonthItemsSold) * 100
            : 0;

        // Query for different month "Average Sales Value" card
        $thisMonthAverageSales = Sale::whereHas('product', function ($query) use ($userId) {
            $query->where('id_user', $userId);
        })
            ->whereBetween('sale_date', [
                $thisMonth,
                Carbon::now()->endOfMonth()
            ])
            ->avg('total_price');

        $lastMonthAverageSales = Sale::whereHas('product', function ($query) use ($userId) {
            $query->where('id_user', $userId);
        })
            ->whereBetween('sale_date', [
                $lastMonth,
                $thisMonth->copy()->subDay()
            ])
            ->avg('total_price');

        $averageSalesChange = $lastMonthAverageSales > 0
            ? (($thisMonthAverageSales - $lastMonthAverageSales) / $lastMonthAverageSales) * 100
            : 0;

        // Return the data to the Inertia view
        return Inertia::render('homeDashboard', [
            'dashboardData' => $dashboardData,
            'revenueChange' => $revenueChange,
            'salesChange' => $salesChange,
            'itemsSoldChange' => $itemsSoldChange,
            'averageSalesChange' => $averageSalesChange,
        ]);
    }
}
