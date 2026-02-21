<?php

use App\Http\Controllers\IncidenceControlController;
use Illuminate\Support\Facades\Route;

Route::prefix('control-de-incidencias')
    ->middleware('auth')
    ->as('incidences-control.')
    ->group(function () {

        Route::get('/', [IncidenceControlController::class, 'index'])->name('home');

        Route::prefix('/{uuid}/plan-de-accion')->as('action-plan.')->group(function () {

            Route::get('/plan', [IncidenceControlController::class, 'plan'])->name('plan');
            Route::get('/evidencias', [IncidenceControlController::class, 'evidence'])->name('evidence');

            Route::post('/plan', [IncidenceControlController::class, 'storePlanActionDefinition'])->name('store.definition');
            Route::post('/evidencias', [IncidenceControlController::class, 'storePlanActionEvidence'])->name('store.evidence');
            Route::post('/create-plan-action', [IncidenceControlController::class, 'storePlanAction'])->name('create-plan-action');

        });
        
        Route::delete('/evidencias/{id}', [IncidenceControlController::class, 'destroyEvidence'])->name('destroy.evidence');
    });