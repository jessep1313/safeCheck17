<?php

namespace Database\Seeders;

use App\Models\TourDefaultQuestion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class TourDefaultQuestionSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questions = ["Lobby / Recepción", "Oficinas administrativas", "Salas de juntas", "Áreas de trabajo operativo", "Archivo / resguardo de documentos", "Almacén", "Área de carga y descarga", "Patio de maniobras", "Andenes", "Área de producción (si aplica)", "Cuarto de sistemas / servidores", "Área de seguridad / caseta de vigilancia", "Estacionamiento", "Baños", "Comedor / cafetería", "Áreas comunes", "Cuartos de mantenimiento", "Áreas restringidas", "Caseta de vigilancia", "Accesos", "Perímetro"];
        
        for($i = 0; $i < count($questions); $i ++) {
            $position = $i + 1;
            $newQuestion = TourDefaultQuestion::createOrFirst(
                ['position' => $position, 'question' => $questions[$i]],
                ['position' => $position, 'question' => $questions[$i]]
            );
            if($newQuestion) {
                Log::info("Se ha creado un ajuste de pregunta de recorrido");
            }else{
                Log::warning("Pregunta de ajuste no guardada");
            }
        }
    }
}
