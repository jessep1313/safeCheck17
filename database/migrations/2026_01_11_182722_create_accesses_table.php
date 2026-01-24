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
        Schema::create('accesses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_by_id')->nullable()->constrained('users')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('building_id')->nullable()->constrained()->nullOnDelete()->cascadeOnDelete();
            $table->foreignId('booth_id')->nullable()->constrained()->nullOnDelete()->cascadeOnUpdate();
            $table->uuid('uuid')->unique()->nullable();
            $table->string('name', 125);
            $table->String('who_visits', 125)->nullable();
            $table->string('contractor', )->nullable();
            $table->string('type',100)->default('Visitante');
            $table->string('motive', 150);
            $table->string('identification', 125)->nullable();
            $table->boolean('finish')->default(false);
            $table->dateTime('expires')->nullable();
            $table->dateTime('check_out')->nullable();
            $table->dateTime('check_in')->nullable();
            $table->boolean('has_vehicle')->default(false);
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accesses');
    }
};
