<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Kreiranje dva admin korisnika
        User::factory()->state([
            'uloga' => 'admin',
        ])->count(2)->create();

        // Kreiranje dva korisnika sa ulogom korisnik
        User::factory()->state([
            'uloga' => 'korisnik',
        ])->count(2)->create();
    }
}
