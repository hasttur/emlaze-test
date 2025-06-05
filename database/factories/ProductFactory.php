<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    public function definition(): array
    {
        // Establecer Faker en español
        $faker = \Faker\Factory::create('es_ES');

        $quantity = $faker->randomFloat(0, 1, 100);
        $price = $faker->randomFloat(2, 1, 9999);
        $total = $quantity * $price;

        return [
            'sku' => $faker->unique()->numberBetween(100000, 999999),
            'name' => $faker->words(3, true),
            'description' => $faker->sentence(),
            'quantity' => $quantity,
            'price' => $price,
            'total' => $total,
        ];
    }
}
