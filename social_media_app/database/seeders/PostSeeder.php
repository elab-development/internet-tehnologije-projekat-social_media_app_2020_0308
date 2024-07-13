<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Post;
use Carbon\Carbon;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Kreiraj 50 postova sa različitim datumima i vremenima
        for ($i = 0; $i < 50; $i++) {
            Post::factory()->create([
                'created_at' => Carbon::now()->subDays(rand(1, 30))->subHours(rand(0, 23))->subMinutes(rand(0, 59)),
            ]);
        }
    }
}
