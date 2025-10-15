<?php

use App\Http\Controllers\CertificateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TruckController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::post('upload', [UploadController::class, 'store'])->name('upload.store');

Route::delete('upload/{key}', [UploadController::class, 'destroy'])->name('upload.destroy');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/inspeccion-interactiva', function () {
        return Inertia::render('inspect/truck-interactive', []);
    })->name('interactive-inspection');

    // Catalogo de usuarios
    Route::get('/catalogos/usuarios', [UserController::class, 'index'])->name('users.home');
    Route::post('/catalogos/usuarios', [UserController::class, 'store'])->name('users.store');
    Route::put('/catalogos/usuarios/{id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/catalogos/usuarios/{id}', [UserController::class, 'destroy'])->name('users.destroy');

    // Catalogo de camiones
    Route::get('/catalogos/tipos-de-camiones', [TruckController::class, 'index'])->name('trucks.home');
    Route::post('/catalogos/tipos-de-camiones', [TruckController::class, 'store'])->name('trucks.store');

    // Catalogo de certificados
    Route::get('/catalogos/certificados', [CertificateController::class, 'index'])->name('certificates.home');
    Route::post('/catalogos/certificados', [CertificateController::class, 'store'])->name('certificates.store');
    Route::put('/catalogos/certificados/{id}', [CertificateController::class, 'update'])->name('certificates.update');
    Route::delete('/catalogos/certificados/{id}', [CertificateController::class, 'destroy'])->name('certificates.destroy');

});

require __DIR__ . '/utils.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/forms.php';
require __DIR__ . '/inspect.php';
require __DIR__ . '/auth.php';