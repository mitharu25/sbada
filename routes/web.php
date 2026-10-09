<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeDashboardController;
use App\Http\Controllers\AnalyticsController;

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

// Login Route
Route::inertia('/login', 'login/loginPage')->name('login');

// protected routes
Route::middleware(['auth'])->group(function () {
    Route::get('/', [HomeDashboardController::class, 'index'])
        ->name('homeDashboard');

    // Analytics Dashboard Routes
    Route::controller(AnalyticsController::class)
        ->prefix('analytics')
        ->group(function () {
            Route::get('/sales', 'sales')->name('sales');
            Route::get('/product', 'product')->name('product');
        });
});
