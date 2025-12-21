<?php

namespace App\Exports;

use App\Models\TourQuestion;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithProperties;

class ExportTourExcel implements WithHeadings,WithProperties,FromCollection, ShouldAutoSize 
{
    private int $id;

    public function __construct(int $id) {
        $this->id = $id;
    }

    /**
    * @return \Illuminate\Support\Collection
    */

    public function collection()
    {
        $tour = TourQuestion::where('tour_id', $this->id)->orderBy('position', 'asc')->get();
        return $tour->map(function ($tour) {
            return [
                'number' => $tour->position,
                'question' => $tour->question,
                'result' => $tour->answered ? ($tour->result ? 'VERDADERO' : 'FALSO') : 'S/N',
                'comments' => $tour->answered && !$tour->result ? strip_tags($tour->comments) : '',
            ];
        });
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

    public function headings (): array {
        return [
            'Número',
            'Pregunta',
            'OK',
            'Observaciones',
        ];
    }
}
