<?php

use App\Http\Controllers\AccessControlController;
use Illuminate\Support\Facades\Route;

Route::prefix('control-de-acceso')
    ->as('access-control.')
    ->group(function () {

        Route::get('/', [AccessControlController::class, 'index'])->name('home');
        Route::get('/nuevo-acceso', [AccessControlController::class, 'create'])->name('create');
        Route::get('/{uuid}', [AccessControlController::class, 'show'])->name('show');

        Route::post('/', [AccessControlController::class, 'store'])->name('store');

    });