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
        Schema::create('inspect_form_fields', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inspect_form_id')
                ->constrained('inspect_forms')
                ->references('id')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->string('label', 125);
            $table->string('description', 255)->nullable();
            $table->string('img_src', 170)->nullable();
            $table->enum('location', ['all', 'box', 'vehicle'])->default('all');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspect_form_fields');
    }
};
