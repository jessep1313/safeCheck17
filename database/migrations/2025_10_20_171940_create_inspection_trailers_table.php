<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inspection_trailers', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId('inspection_id')
                ->constrained('inspections')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->string('vin', 36)->nullable();
            $table->string('plate', 36)->nullable();
            $table->string('seal', 36)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_trucks');
    }
};