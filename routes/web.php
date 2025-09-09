<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/inspeccion-interactiva', function () {
        return Inertia::render('inspect/truck-interactive', []);
    })->name('interactive-inspection');

});

require __DIR__ . '/settings.php';
require __DIR__ . '/forms.php';
require __DIR__ . '/inspect.php';
require __DIR__ . '/auth.php';