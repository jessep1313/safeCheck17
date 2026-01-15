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
            $table->string('contractor', )->nullable();
            $table->string('type',100)->default('Visitante');
            $table->string('motive', 150);
            $table->boolean('finish')->default(false);
            $table->dateTime('expires')->nullable();
            $table->dateTime('check_out')->nullable();
            $table->dateTime('check_in')->nullable();
            $table->timestamps();
        });

        Schema::create('access_moves', function (Blueprint $table) {
            $table->id();
            $table->foreignId('access_id')->constrained('accesses')->cascadeOnDelete()->cascadeOnDelete();
            $table->boolean('is_entry');
            $table->timestamps();
        });

        Schema::create('access_tools', function (Blueprint $table) {
            $table->id();
            $table->foreignId('access_id')->constrained('accesses')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('name', 100);
            $table->integer('quantity')->default(1);
        });

        Schema::create('access_devices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('access_id')->constrained('accesses')->cascadeOnDelete()->cascadeOnUpdate();
            $table->enum('type', ['Celular', 'Laptop', 'Computadora', 'Modem', 'Router', 'Tablet', 'Otro'])->default('Otro');
            $table->string('device', 150)->nullable();
            $table->string('model')->nullable();
            $table->string('serie')->nullable();
            $table->integer('quanity')->default(1);
            $table->timestamps();
        });

        Schema::create('access_vehicles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('access_id')->constrained('accesses')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('model', 125);
            $table->string('plate', 40);
            $table->string('vin', 17)->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accesses');
        Schema::dropIfExists('access_moves');
        Schema::dropIfExists('access_tools');
        Schema::dropIfExists('access_devices');
        Schema::dropIfExists('access_vehicles');
    }
};
