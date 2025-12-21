<?php

use App\Http\Controllers\TourController;
use Illuminate\Support\Facades\Route;

Route::prefix('/recorridos')->as('tours.')->group(function () {

    Route::get('/', [TourController::class, 'index'])->name('home');
    Route::get('/inicialiazador', [TourController::class, 'initialize'])->name('initialize');
    Route::get('/{uuid}', [TourController::class, 'show'])->name('show');
    Route::get('/{uuid}/timer', [TourController::class, 'timer'])->name('timer');
    Route::get('/{uuid}/comment', [TourController::class, 'comment'])->name('comment');
    Route::get('/{uuid}/evidencias', [TourController::class, 'evidences'])->name('evidences');

    Route::get('/{uuid}/question', [TourController::class, 'questions'])->name('question');
    Route::post('/{id}/{answer}/question', [TourController::class, 'saveQuestion'])->name('question.save');

    Route::post('/{uuid}/incidence', [TourController::class, 'incidence'])->name('incidence');
    Route::post('/{uuid}/incidence/comment', [TourController::class, 'saveComment'])->name('save.comment');
    Route::post('/{uuid}/incidence/evidences', [TourController::class, 'saveEvidence'])->name('save.evidences');

    Route::post('/{uuid}/finish', [TourController::class, 'finish'])->name('finish');
    Route::post('/store', [TourController::class, 'store'])->name('store');

    Route::get('/{uuid}/export/pdf', [TourController::class, 'exportToPDF'])->name('export.pdf');
    Route::get('/{uuid}/export/excel', [TourController::class, 'exportToExcel'])->name('export.excel');

})->middleware(['auth', 'verified']);
