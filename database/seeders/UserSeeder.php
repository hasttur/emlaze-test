<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Juan Pérez',
                'email' => 'juanperez@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'María Gómez',
                'email' => 'mariagomez@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Carlos Sánchez',
                'email' => 'carlossanchez@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Ana Martínez',
                'email' => 'anamartinez@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Luis Rodríguez',
                'email' => 'luisrodriguez@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Sofía Díaz',
                'email' => 'sofiadiaz@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Miguel Torres',
                'email' => 'migueltorres@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Laura Fernández',
                'email' => 'laurafernandez@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Pedro Morales',
                'email' => 'pedromorales@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Elena Ruiz',
                'email' => 'elenaruiz@example.com',
                'password' => Hash::make('password123'),
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
