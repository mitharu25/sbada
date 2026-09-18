<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use App\Models\Sale;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeDashboardController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

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

        return Inertia::render('homeDashboard', [
            'dashboardData' => $dashboardData,
        ]);
    }
}
