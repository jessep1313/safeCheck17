<?php

use App\Models\VehicleType;
use Illuminate\Support\Facades\Route;

Route::prefix('utils')->as('utils.')->group(function () {

    Route::get('catalog/{certification_id}/vehicle-types', function (string $certification_id) {

        $vehicles = VehicleType::availableByCertificate($certification_id)
            ->select(['id', 'name'])
            ->orderBy('name', 'asc')
            ->get();

        return response()->json($vehicles);
    })->name('catalog.available-vehicles');

});