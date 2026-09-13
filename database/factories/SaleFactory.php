<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class SaleFactory extends Factory
{
    public function definition(): array
    {
        $product = Product::inRandomOrder()->first();

        $amount = fake()->numberBetween(1, 50);

        return [
            'id_product' => $product->id_product,
            'amount' => $amount,
            'unit_price' => $product->price_product,
            'total_price' => $amount * $product->price_product,
            'sale_date' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
