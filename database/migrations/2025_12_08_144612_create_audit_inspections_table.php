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
        Schema::create('audit_inspections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('audit_id')->constrained('audits')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('created_by_id')->nullable()->constrained('users')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('inspection_id')->constrained('inspections')->cascadeOnDelete()->cascadeOnUpdate();
            $table->uuid('uuid');
            $table->enum('status', ['Pendiente', 'Finalizado'])->default('Pendiente');
            $table->text('comments')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_inspections');
    }
};
