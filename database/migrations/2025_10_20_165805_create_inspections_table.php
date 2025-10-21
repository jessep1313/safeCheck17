<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inspections', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->onDelete('set null')
                ->onUpdate('cascade');
            $table
                ->foreignId('certification_id')
                ->nullable()
                ->constrained('certifications')
                ->onDelete('set null')
                ->onUpdate('cascade');
            $table
                ->foreignId('vehicle_type_id')
                ->nullable()
                ->constrained('vehicle_types')
                ->onDelete('set null')
                ->onUpdate('cascade');
            $table
                ->foreignId('driver_id')
                ->nullable()
                ->constrained('users')
                ->onDelete('set null')
                ->onUpdate('cascade');
            $table
                ->foreignId('guard_id')
                ->nullable()
                ->constrained('users')
                ->onDelete('set null')
                ->onUpdate('cascade');
            $table
                ->foreignId('inspect_form_id')
                ->nullable()
                ->constrained('inspect_forms')
                ->onDelete('set null')
                ->onUpdate('cascade');
            $table->uuid('uuid')->default(DB::raw('(UUID())'))->unique();
            $table->integer('trailer_quantity')->default(1);
            $table->string('company_transport', 100)->nullable();
            $table->string('company_property', 100)->nullable();
            $table->enum('type', ['Entrada', 'Salida', 'Almacen'])->default('Entrada');
            $table->string('plate_number', 20)->nullable();
            $table->enum('status', ['Pendiente', 'Aprobado', 'Rechazado'])->default('Pendiente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspections');
    }
};