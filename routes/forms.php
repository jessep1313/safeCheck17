<?php

use App\Http\Controllers\FormController;
use App\Http\Controllers\InspectFormFieldController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->prefix('formularios')
    ->as('form.')
    ->group(function () {

        Route::get('/', [FormController::class, 'index'])->name('home');

        Route::post('/', [FormController::class, 'store'])->name('store');

        Route::delete('/{id}', [FormController::class, 'destroy'])->name('delete');

        Route::get('/{folio}/puntos', [InspectFormFieldController::class, 'fields'])->name('fields');

        Route::post('/{folio}/puntos', [InspectFormFieldController::class, 'store'])->name('fields.store');

        Route::put('/{id}/puntos', [InspectFormFieldController::class, 'update'])->name('fields.update');

        Route::delete('/{id}/puntos', [InspectFormFieldController::class, 'destroy'])->name('fields.delete');

    });