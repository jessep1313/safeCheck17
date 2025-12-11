<?php

namespace App\Observers;

use App\Enums\AuditType;
use App\Models\Audit;
use App\Models\Inspection;
use Str;

class AuditObserver
{
    public function created(Audit $audit): void
    {
        switch ($audit->type) {
            case AuditType::INSPECTION:
                $this->createInspectionQuestions($audit);
                break;
            case AuditType::ROUNDED:
                break;
            default:
        }

    }

    public function creating(Audit $audit): void
    {
        $audit->created_by_id = auth()->id();
    }

    private function createInspectionQuestions(Audit $audit)
    {
        $questions = [
            "¿Se realizo una correcta inspección?",
            "¿Cubre los 360 grados de CCTV?",
            "¿Se utilizo la herramienta?",
            "¿Se reporto alguna incidencia?"
        ];
        $inspectionsId = Inspection::notAudit()->limit(5)->pluck('id')->toArray();
        foreach ($inspectionsId as $inspectionId) {

            // Se crea la auditoria de inspección
            $inspectionAudit = $audit->inspections()->create([
                'inspection_id' => $inspectionId,
                'created_by_id' => auth()->id(),
                'uuid' => Str::uuid(),
            ]);

            // Se agregan las preguntas de inspección
            foreach ($questions as $question) {
                $inspectionAudit->questions()->create([
                    'question' => $question
                ]);
            }
        }
    }
}
