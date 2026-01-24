<?php

use App\Http\Controllers\AccessControlController;
use App\Http\Controllers\AccessDeviceController;
use App\Http\Controllers\AccessToolController;
use App\Http\Controllers\AccessVehicleController;
use Illuminate\Support\Facades\Route;

Route::prefix('control-de-acceso')
    ->as('access-control.')
    ->group(function () {

        Route::get('/', [AccessControlController::class, 'index'])->name('home');
        Route::get('/nuevo-acceso', [AccessControlController::class, 'create'])->name('create');
        Route::get('/{uuid}', [AccessControlController::class, 'show'])->name('show');
        Route::post('/', [AccessControlController::class, 'store'])->name('store');

        // Vehicles
        Route::as('vehicle.')->group(function () {
            Route::post('/{id}/vehicle', [AccessVehicleController::class, 'store'])->name('store');
            Route::put('/{id}/vehicle', [AccessVehicleController::class, 'update'])->name('update');
            Route::delete('/{id}/vehicle', [AccessVehicleController::class, 'destroy'])->name('delete');
        });

        // Herramientas
        Route::as('tool.')->group(function () {
            Route::post('/{id}/tool', [AccessToolController::class, 'store'])->name('store');
            Route::put('/{id}/tool', [AccessToolController::class, 'update'])->name('update');
            Route::delete('/{id}/tool', [AccessToolController::class, 'destroy'])->name('delete');
        });

        // Dispositivos
        Route::as('device.')->group(function () {
            Route::post('/{id}/device', [AccessDeviceController::class, 'store'])->name('store');
            Route::put('/{id}/device', [AccessDeviceController::class, 'update'])->name('update');
            Route::delete('/{id}/device', [AccessDeviceController::class, 'destroy'])->name('delete');
        });

    });