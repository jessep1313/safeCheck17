<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UploadController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::post('upload', [UploadController::class, 'store'])->name('upload.store');


Route::delete('upload/{key}', [UploadController::class, 'destroy'])->name('upload.destroy');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/inspeccion-interactiva', function () {
        return Inertia::render('inspect/truck-interactive', []);
    })->name('interactive-inspection');


});

require __DIR__ . '/utils.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/forms.php';
require __DIR__ . '/inspect.php';
require __DIR__ . '/auth.php';