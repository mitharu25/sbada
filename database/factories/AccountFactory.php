<?php

namespace Database\Factories;

use App\Models\Account;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends Factory<Account>
 */
class AccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'         => fake()->name(),
            'phone_number' => fake()->phoneNumber(),
            'name_company' => fake()->company(),
            'email'        => fake()->unique()->safeEmail(),
            'password'     => Hash::make('password'),
        ];
    }
}
