<?php

namespace App\Exports;

use App\Models\IncidenceAllView;
use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;

class IncidenceControlExport implements FromCollection, ShouldAutoSize, WithHeadings
{
    public function __construct(
        public $sort,
        public $sortBy,
        public $search,
        public $status,
        public $type,
    ) {
    }

    public function collection()
    {
        return IncidenceAllView::select(['id', 'uuid', 'type', 'created_at', 'comments', 'evidences'])
            ->orderBy($this->sortBy, $this->sort)
            ->searchValues($this->search)
            ->filterStatus($this->status)
            ->filterType($this->type)
            ->get()
            ->map(function ($row) {
                $plan = null;
                if ($row->planActions()->exists()) {
                    $plan = $row->planActions()->select(['uuid', 'status', 'id', 'finished_at'])->latest()->first();
                }

                return [
                    'id' => $row->id,
                    'tipo' => $row->type,
                    'fecha_creacion' => Carbon::parse($row->created_at)->format('d/m/Y, h:i a'),
                    'comentarios' => $row->comments ? strip_tags($row->comments) : 'Sin comentarios',
                    'evidencias' => is_array($row->evidences) ? count($row->evidences) . ' archivo(s)' : 'Sin evidencias',
                    'estado_plan' => $plan ? $plan->status->value : 'Sin plan',
                    'plan_finalizado' => $plan && $plan->finished_at ? Carbon::parse($plan->finished_at)->format('d/m/Y, h:i a') : 'N/A',
                ];
            });
    }

    public function headings(): array
    {
        return [
            'ID',
            'TIPO',
            'FECHA DE CREACIÓN',
            'COMENTARIOS',
            'EVIDENCIAS',
            'ESTADO DEL PLAN',
            'PLAN FINALIZADO',
        ];
    }
}
