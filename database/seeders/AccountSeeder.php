<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Account;
use Illuminate\Support\Facades\Hash;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Account::create([
            'name'         => 'Admin',
            'phone_number' => '08000000000',
            'name_company' => 'Admin Company',
            'email'        => 'admin@gmail.com',
            'password'     => Hash::make('123'),
        ]);

        // Generate 10 akun random
        Account::factory(10)->create();
    }
}
