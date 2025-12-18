<?php

use App\Http\Controllers\AuditController;

Route::prefix('auditorias/')->as('audit.')->middleware('auth')->group(function () {

    Route::get('/', [AuditController::class, 'index'])->name('home');

    Route::post('/', [AuditController::class, 'storeInspection'])->name('inspection.store');

    Route::get('/inspeccion/{uuid}/pregunta', [AuditController::class, 'inspectionQuestion'])->name('inspection.question');

    Route::post('/inspeciton/{id}/pregunta/{value}', [AuditController::class, 'storeInspectQuestion'])->name('inspection.question.save');

    Route::get('/{id}/inspection/descargar', [AuditController::class, 'exportAuditInspection'])->name('inspection.download');

});