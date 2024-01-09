<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;
use App\Models\Post;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
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
            'text' => $this->faker->sentence(),
            'dateAndTime' => $this->faker->timestamp(),
            'numberOfLikes' => $this->faker->numberBetween($min = 0, $max = 3000),
            'user_id' => User::factory(), 
            'post_id' => Post::factory(), 
        ];
    }
}
