<?php

use App\Http\Controllers\InspectionDigitalController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->group(function () {

        Route::get('/inspeccion-digital', [InspectionDigitalController::class, 'create'])->name('digital-inspection');

        Route::get('/inspecciones-realizadas', [InspectionDigitalController::class, 'index'])->name('inspection-list');

    });