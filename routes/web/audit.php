<?php

use App\Http\Controllers\AuditController;

Route::prefix('auditorias/')
->as('audit.')
->group(function() {
    Route::get('/', [AuditController::class,'index'])->name('home');
    Route::post('/', [AuditController::class, 'storeInspection'])->name('inspection.store');
})
->middleware('auth');