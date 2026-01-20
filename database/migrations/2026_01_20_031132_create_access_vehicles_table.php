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
        Schema::create('access_vehicles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('access_id')->constrained('accesses')->onDelete('cascade')->onUpdate('cascade');
            $table->string('plate', 20);
            $table->string('model', 70);
            $table->string('color', 45);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('access_vehicles');
    }
};
