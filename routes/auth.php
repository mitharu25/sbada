<?php

use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

Route::post('/login', function (Request $request) {

    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {

        $request->session()->regenerate();

        return redirect('/');
    }

    return back()->withErrors([
        'email' => 'Email atau password salah.',
    ]);
})->name('auth.login');

Route::post('/logout', function (Request $request) {

    Auth::logout();

    $request->session()->invalidate();

    $request->session()->regenerateToken();

    return redirect('/login');
})->name('logout');

Route::post('/register', [RegisterController::class, 'store']);

// Route::post('/register', function (Request $request) {

//     $validated = $request->validate([
//         'name' => ['required', 'max:255'],
//         'name_company' => ['required', 'max:255'],
//         'address' => ['required', 'max:255'],
//         'phone_number' => ['required', 'max:255'],
//         'email' => ['required', 'email', 'unique:accounts,email'],
//         'password' => ['required', 'min:6'],
//     ]);

//     DB::transaction(function () use ($validated) {

//         $account = Account::create([
//             'name' => $validated['name'],
//             'name_company' => $validated['name_company'],
//             'phone_number' => $validated['phone_number'],
//             'email' => $validated['email'],
//             'password' => Hash::make($validated['password']),
//         ]);

//         $account->infoCompany()->create([
//             'name_company' => $validated['name_company'],
//             'slug_name' => Str::slug($validated['name_company'] . '-' . rand(10, 99)),
//             'address' => $validated['address'],
//         ]);

//         Auth::login($account);
//     });

//     return redirect()->route('homeDashboard');
// })->name('register');