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
        Schema::create('inspect_forms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_type_id')
                ->constrained('vehicle_types')
                ->references('id')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('certification_id')
                ->constrained('certifications')
                ->references('id')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->boolean('preload_fields')->default(true);
            $table->string('folio', 12)->unique();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();

            // Unique constraint to prevent duplicate certification-vehicle_type combinations
            $table->unique(['certification_id', 'vehicle_type_id'], 'unique_cert_vehicle_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspect_forms');
    }
};
