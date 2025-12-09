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
        Schema::create('audit_inspection_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('audit_inspection_id')->constrained('audit_inspections')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('question', 100);
            $table->boolean('answared')->default(false);
            $table->boolean('result')->default(false);
            $table->text('comments')->nullable();
            $table->timestamps();
        });
    }

    /**     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_inspection_questions');
    }
};
