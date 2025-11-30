<?php

use App\Http\Controllers\TourController;
use Illuminate\Support\Facades\Route;

Route::prefix('/recorridos')->as('tours.')->group(function () {

    Route::get('/', [TourController::class, 'index'])->name('home');
    Route::get('/inicialiazador', [TourController::class, 'initialize'])->name('initialize');

})->middleware(['auth', 'verified']);
