<?php

namespace App\Observers;

use App\Models\Audit;

class AuditObserver
{
    /**
     * Handle the Audit "created" event.
     */
    public function created(Audit $audit): void
    {
        //
    }

    /**
     * Handle the Audit "updated" event.
     */
    public function updated(Audit $audit): void
    {
        //
    }

    /**
     * Handle the Audit "deleted" event.
     */
    public function deleted(Audit $audit): void
    {
        //
    }

    /**
     * Handle the Audit "restored" event.
     */
    public function restored(Audit $audit): void
    {
        //
    }

    /**
     * Handle the Audit "force deleted" event.
     */
    public function forceDeleted(Audit $audit): void
    {
        //
    }

    private function createInspectionQuestions (Audit $audit) {
        $questions = [
            "¿Se realizo una correcta inspección?",
            "¿Cubre los 360 grados de CCTV?",
            "¿Se utilizo la herramienta?",
            "¿Se reporto alguna incidencia?"
        ];
    }
}
