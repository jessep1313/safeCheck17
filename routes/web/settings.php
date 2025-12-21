<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SessionController;
use App\Http\Controllers\TourSettingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->prefix("settings")->as("settings.")->group(function () {
    Route::redirect('/', '/settings/profile');

    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('password', [PasswordController::class, 'edit'])->name('password.edit');

    Route::put('password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('password.update');

    Route::get('appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');

    Route::get('sessions', [SessionController::class, 'index'])->name('sessions.index');

    Route::delete('sessions/{id}', [SessionController::class, 'destroy'])->name('sessions.destroy');

    Route::prefix("recorridos")
    ->as("tour.")
    ->group(function () {
        Route::get('/', [TourSettingController::class, "index"])->name("index");
        Route::post("/", [TourSettingController::class, "store"])->name("store");
        Route::post("/reorder", [TourSettingController::class,"reorder"])->name("reorder");
        Route::put('/{id}', [TourSettingController::class, "update"])->name("update");
        Route::delete("/{id}", [TourSettingController::class, "destroy"])->name("destroy");
    });
});
