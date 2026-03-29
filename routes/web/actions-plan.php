<?php
use App\Http\Controllers\ActionPlanController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('plan-de-accion')->as('plan.')->group(function () {
    Route::post('/{id}/iniciar', [ActionPlanController::class, 'start'])->name('start');
    Route::post('/{id}/completar', [ActionPlanController::class, 'finish'])->name('finish');
    Route::delete('/{id}/cancelar', [ActionPlanController::class, 'cancel'])->name('cancel');
    Route::get('/{uuid}', [ActionPlanController::class, 'show'])->name('show');
});