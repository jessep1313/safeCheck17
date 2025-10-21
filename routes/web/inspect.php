<?php

use App\Http\Controllers\InspectionDigitalController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->prefix('inspecciones')
    ->as('inspections.')
    ->group(function () {

        Route::get('/', [InspectionDigitalController::class, 'index'])->name('home');

        Route::get('/crear', [InspectionDigitalController::class, 'create'])->name('digital-inspection');
        Route::post('/crear', [InspectionDigitalController::class, 'store'])->name('store');


        Route::prefix('/crear/{uuid}')->group(function () {
            Route::get('/preparar', [InspectionDigitalController::class, 'stepPrepare'])->name('step-prepare');
            Route::post('/preparar', [InspectionDigitalController::class, 'savePrepare'])->name('save-prepare');

            Route::get('/datos-inspeccion', [InspectionDigitalController::class, 'stepData'])->name('step-data');
            Route::post('/datos-inspeccion', [InspectionDigitalController::class, 'saveData'])->name('save-data');

            Route::get('/preguntas', [InspectionDigitalController::class, 'stepQuestions'])->name('step-questions');
            Route::post('/preguntas', [InspectionDigitalController::class, 'saveQuestions'])->name('save-questions');

            Route::get('/resumen', [InspectionDigitalController::class, 'stepSummary'])->name('step-summary');
            Route::post('/resumen', [InspectionDigitalController::class, 'finishInspection'])->name('save-finish');

        });

    });