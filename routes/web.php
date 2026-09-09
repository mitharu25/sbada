<?php

use Illuminate\Support\Facades\Route;

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

// Login Route
Route::inertia('/login', 'login/loginPage')->name('login');

// protected routes
Route::middleware(['auth'])->group(function () {
    Route::inertia('/', 'homeDashboard')->name('homeDashboard');
});
