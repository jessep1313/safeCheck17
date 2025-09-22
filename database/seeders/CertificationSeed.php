<?php

namespace Database\Seeders;

use App\Models\Certification;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class CertificationSeed extends Seeder
{
    public function run(): void
    {
        $types = ['OEA', 'CTPAT'];

        foreach ($types as $type) {
            try {
                $certification = Certification::firstOrCreate(['name' => $type], ['name' => $type]);
                Log::info("$type, insertado/encontrado correctamente", [
                    'record' => $certification
                ]);
            } catch (\Exception $e) {
                Log::error("$type, fallo al insertar", [
                    "error" => $e->getMessage()
                ]);
            }
        }
    }
}
