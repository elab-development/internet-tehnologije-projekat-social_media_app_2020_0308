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
            $table ->string('name', 60)->change();
            $table ->string('image', 600)->change();
        });

        Schema::table('comments', function (Blueprint $table) {
            $table ->string('text', 500)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table ->string('name', 10)->change();
            $table ->string('image', 10)->change();
        });

        Schema::table('comments', function (Blueprint $table) {
            $table ->string('text', 80)->change();
        });
    }
};
