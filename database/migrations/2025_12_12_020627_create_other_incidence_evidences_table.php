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
        Schema::create('other_incidence_evidences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('other_incidence_id')->constrained('other_incidences')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('150');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('other_incidence_evidences');
    }
};
