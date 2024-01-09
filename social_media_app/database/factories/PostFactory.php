<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'name' => $this->faker->word()." ".$this->faker->word(),
            'image' => $this->faker->imageUrl(),
            'description' => $this->faker->paragraph(),
            'location' => $this->faker->city().", ".$this->faker->streetAddress(),
            'dateAndTime' => $this->faker->dateTimeBetween('-20 days', 'now'),
            'numberOfLikes' => $this->faker->numberBetween($min = 0, $max = 30000),
            'numberOfComments' => $this->faker->numberBetween($min = 0, $max = 4000),
            'user_id' => User::factory(), 
        ];
    }
}
