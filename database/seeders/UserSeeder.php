<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'nickname'         => 'Tester',
            'business_company' => 'Company Tester',
            'photo' => 'default.png',
            'email'        => 'tester@gmail.com',
            'password'     => Hash::make('123'),
        ]);

        User::factory()->count(10)->create();
    }
}
