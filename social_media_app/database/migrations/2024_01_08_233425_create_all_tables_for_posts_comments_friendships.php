<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('name',10);
            $table->string('image',10);
            $table->string('description',80);
            $table->string('location',180);
            $table->date('dateAndTime');
            $table->timestamps();
        });

        Schema::create('friendships', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->string('name',10);
            $table->string('text',80);
            $table->date('dateAndTime');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
        Schema::dropIfExists('friendships');
        Schema::dropIfExists('comments');
    }
};
