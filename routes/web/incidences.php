<?php

use App\Http\Controllers\IncidenceControlController;
use Illuminate\Support\Facades\Route;

Route::prefix('control-de-incidencias')
    ->as('incidences-control.')
    ->group(function () {

        Route::get('/', [IncidenceControlController::class, 'index'])->name('home');

    });