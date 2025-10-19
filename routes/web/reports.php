<?php

use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

Route::prefix('reportes')
    ->as('reports.')
    ->group(function () {
        Route::get('/', [ReportController::class, 'index'])->name('home');
    });