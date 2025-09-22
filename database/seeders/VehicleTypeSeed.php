<?php

namespace Database\Seeders;

use App\Models\VehicleType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class VehicleTypeSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            'Ton estaquita',
            'Torton',
            '3.5',
            'Rabón',
            'Trailer caja refrijerada',
            'Trailer caja 53 pies',
            'Trailer caja 48 pies',
            'Trailer full caja seca 40"',
            'Trailer plataformas 40',
            'Trailer plataformas 48',
            'Trailer plataformas 53',
        ];

        foreach ($types as $type) {
            try {
                $vehicleType = VehicleType::firstOrCreate(['name' => $type], ['name' => $type]);
                Log::info("$type, insertado/encontrado correctamente.", [
                    'record' => $vehicleType
                ]);
            } catch (\Exception $e) {
                Log::error("$type, fallo al insertar.", [
                    'error' => $e->getMessage()
                ]);
            }
        }
    }
}
