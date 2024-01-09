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
        Schema::table('posts', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->references('id')->on('users')->onDelete('set null');
        });

        Schema::table('friendships', function (Blueprint $table) {
            $table->foreignId('user_one_id')->nullable()->references('id')->on('users')->onDelete('set null');
            $table->foreignId('user_two_id')->nullable()->references('id')->on('users')->onDelete('set null');
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->references('id')->on('users')->onDelete('set null');
            $table->foreignId('post_id')->nullable()->references('id')->on('posts')->onDelete('set null'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropForeign('user_id');
        });

        Schema::table('friendships', function (Blueprint $table) {
            $table->dropForeign('user_one_id');
            $table->dropForeign('user_two_id');
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->dropForeign('user_id');
            $table->dropForeign('post_id');
        });
    }
};
