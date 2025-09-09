<?php

use App\Http\Controllers\FormController;
use Illuminate\Support\Facades\Route;

Route::prefix('formularios')->as('form.')->group(function () {
    Route::get('/', [FormController::class, 'index'])->name('home');
})->middleware('auth');