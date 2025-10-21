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
        Schema::create('inspection_points', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId('inspection_id')
                ->constrained('inspections')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table
                ->foreignId('inspect_form_field_id')
                ->constrained('inspect_form_fields')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->string('evidence', 150)->nullable();
            $table->boolean('result')->default(0);
            $table->boolean('answered')->default(0);
            $table->text('comments')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_points');
    }
};