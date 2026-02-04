<?php

namespace App\Exports;

use App\Models\Access;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ExportAccessControlList implements FromCollection, ShouldAutoSize, WithHeadings
{
    public function __construct(
        public $checkInDate1,
        public $checkInDate2,
    ) {}

    public function collection()
    {
        return Access::with(['userBy', 'vehicles', 'building', 'booth'])
        ->dateCheckIn($this->checkInDate1, $this->checkInDate2)
        ->get()
        ->map(fn ($access) => [
            'building' => $access->building->name,
            'booth' => $access->booth->name,
            'name' => $access->name,
            'created_at' => $access->created_at ? $access->created_at->format('d/m/Y, h:i a') : '---',
            'motive' => $access->motive,
            'authorized_by' => $access->userBy->name,
            'vehicle' => $access->vehicles->pluck('plate')->join(','),
            'check_out' => $access->check_out ? $access->check_out->format('d/m/Y, h:i a') : '---',
        ]);
    }

    public function headings(): array
    {
        return [
            'EDIFICIO',
            'CASETA',
            'NOMBRE',
            'INGRESO EL',
            'ASUNTO',
            'AUTORIZO EL INGRESO',
            'VEHICULO',
            'SALIO EL',
        ];
    }
}
