<?php

use App\Http\Controllers\AccessControlController;
use Illuminate\Support\Facades\Route;

Route::prefix('control-de-acceso')
    ->as('access-control.')
    ->group(function () {

        Route::get('/', [AccessControlController::class, 'index'])->name('home');

    });