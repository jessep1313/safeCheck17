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
        Schema::create('action_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->nullable()->constrained("users")->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId("created_by_id")->nullable()->constrained("users")->nullOnDelete()->cascadeOnUpdate();
            $table->uuid("uuid")->unique()->index();
            $table->uuid("uuid_incidence")->index();
            $table->enum("incidence_type", ["Inspeccion", "Recorrido", "Otro"])->default("Otro");
            $table->text("plan")->nullable();
            $table->enum("status", ["Pendiente", "En proceso", "Finalizado", "Cancelado"])->default("Pendiente");
            $table->timestamp("finished_at")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('action_plans');
    }
};
