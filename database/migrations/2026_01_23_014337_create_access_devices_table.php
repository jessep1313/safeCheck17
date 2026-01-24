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
        Schema::create('access_devices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('access_id')->constrained('accesses')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('type', 100);
            $table->string('brand', 100);
            $table->string('model', 100);
            $table->integer('quantity')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('access_devices');
    }
};
