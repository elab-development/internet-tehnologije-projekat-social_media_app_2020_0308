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
            $table->integer('numberOfLikes');
            $table->integer('numberOfComments');
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->integer('numberOfLikes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table ->dropColumn('numberOfLikes');
            $table ->dropColumn('numberOfComments');
        });

        Schema::table('comments', function (Blueprint $table) {
            $table ->dropColumn('numberOfLikes');
        });
    }
};
