<?php

use App\Http\Controllers\UserGroupController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('grupos-y-roles')->as('groups.')->group(function () {
    Route::get('/', [UserGroupController::class, 'index'])->name('home');
    Route::get('/nuevo-grupo', [UserGroupController::class, 'create'])->name('create');
    Route::get('/{id}/editar-grupo', [UserGroupController::class, 'edit'])->name('edit');

    Route::post('/', [UserGroupController::class, 'store'])->name('store');
    Route::put('/{id}', [UserGroupController::class, 'update'])->name('update');
    Route::delete('/{id}', [UserGroupController::class, 'delete'])->name('delete');
});