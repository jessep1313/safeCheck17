<?php

namespace App\Exports;

use App\Models\Inspection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithProperties;

class InspectionPoints implements WithHeadings,WithProperties,FromCollection, ShouldAutoSize 
{
    /**
    * @return \Illuminate\Support\Collection
    */

    private int $inspectId;

     function __construct(int $inspectId) {
        $this->inspectId = $inspectId;
    }

    public function properties(): array {
        return [
            'creator' => 'SafeCheck',
            'title' => 'Reporte de inspección',
            'description' => "Resultado de puntos de inspección",
            'subject' => "Inspección",
            "company" => "Puntos de inspección"
        ];
    }

    public function collection()
    {
        return Inspection::findOrFail($this->inspectId)
            ->points()
            ->orderBy('number', 'asc')
            ->get()
            ->map(fn ($record) => [
            'number' => $record->number,
            'label' => $record->field->label,
            'result' => $record->answered ? ($record->result ? "VERDADERO" : "FALSO") : "S/N",
            'comments' => strip_tags($record->comments),
        ]);
    }

    public function headings(): array {
        return [
            "Número",
            "Concepto",
            "OK",
            "Observaciones",
        ];
    }
}
