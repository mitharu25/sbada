<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function store(Request $request)
    {
        // Validation
        $validated = $request->validate([
            'nickname' => ['required', 'max:255'],
            'business_company' => ['required', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:6'],
        ]);

        $user = User::create([
            'nickname' => $validated['nickname'],
            'business_company' => $validated['business_company'],
            'photo' => 'default.png',
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->route('homeDashboard');
    }
}
