<?php

use App\Http\Controllers\UtilsController;
use App\Models\VehicleType;
use Illuminate\Support\Facades\Route;

Route::prefix('utils')->as('utils.')->group(function () {

    Route::get('catalog/{certification_id}/vehicle-types', [UtilsController::class, 'vehicleTypesAvailables'])->name('catalog.available-vehicles');

    Route::get('catalog/{certification_id}/vehicle-types-options', [UtilsController::class, 'vehicleTypeByCertificate'])->name('catalog.types-of-cert');

});