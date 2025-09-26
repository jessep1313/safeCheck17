<?php

namespace App\Observers;

use App\Enum\InspectFormFieldLocation;
use App\Models\InspectForm;
use App\Models\InspectFormField;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class InspectFormObserver
{
    /**
     * Handle the InspectForm "created" event.
     */
    public function created(InspectForm $inspectForm): void
    {
        if ($inspectForm->preload_fields) {
            $this->createDefaultFields($inspectForm->id, $inspectForm->folio);
        }
    }

    /**
     * Handle the InspectForm "updated" event.
     */
    public function updated(InspectForm $inspectForm): void
    {
        //
    }

    /**
     * Handle the InspectForm "deleted" event.
     */
    public function deleted(InspectForm $inspectForm): void
    {
        //
    }

    /**
     * Handle the InspectForm "restored" event.
     */
    public function restored(InspectForm $inspectForm): void
    {
        //
    }

    /**
     * Handle the InspectForm "force deleted" event.
     */
    public function forceDeleted(InspectForm $inspectForm): void
    {
        //
    }


    // Insertar fields por defecto

    private function createDefaultFields($inspectFormId, $inspectFormFolio)
    {
        $defaultFields = [
            [
                'label' => 'Defensa',
                'description' => 'Asegura que esté firme, sin golpes ni tornillos flojos.',
                'location' => InspectFormFieldLocation::VEHICLE->value, 
                'img-key' => 'defensa'
            ],
            [
                'label' => 'Motor',
                'description' => 'Revisa niveles (aceite/refrigerante), sin fugas ni ruidos anormales.',
                'location' => InspectFormFieldLocation::VEHICLE->value, 
                'img-key' => 'motor'
            ],
            [
                'label' => 'Llantas',
                'description' => 'Presión correcta; sin cortes, cuarteaduras ni desgaste irregular.',
                'location' => InspectFormFieldLocation::VEHICLE->value,
                'img-key' => 'llantas'
            ],
            [
                'label' => 'Piso Interior (Tracto)',
                'description' => 'Limpio y libre de objetos sueltos que estorben.',
                'location' => InspectFormFieldLocation::VEHICLE->value,
                'img-key' => 'piso-cabina'
            ],
            [
                'label' => 'Tanque de Diesel',
                'description' => 'Sin fugas; tapa que selle bien y sin golpes.',
                'location' => InspectFormFieldLocation::VEHICLE->value,
                'img-key' => 'tanque-diesel'
            ],
            [
                'label' => 'Cabina',
                'description' => 'Cinturones, espejos y extintor en buen estado; asientos firmes.',
                'location' => InspectFormFieldLocation::VEHICLE->value,
                'img-key' => 'cabina'
            ],
            [
                'label' => 'Cilindros de Aire',
                'description' => 'Sin fugas auditivas; mangueras y válvulas sin grietas.',
                'location' => InspectFormFieldLocation::VEHICLE->value,
                'img-key' => 'tanque-aire'
            ],
            [
                'label' => 'Diferencial',
                'description' => 'Sin fugas de aceite ni ruidos metálicos al rodar.',
                'location' => InspectFormFieldLocation::VEHICLE->value,
                'img-key' => 'diferencial'
            ],
            [
                'label' => 'Quinta Rueda',
                'description' => 'Engrasada, sin fracturas; perno/seguro operando y buen acople.',
                'location' => InspectFormFieldLocation::VEHICLE->value,
                'img-key' => 'quinta-rueda'
            ],
            [
                'label' => 'Chasis',
                'description' => 'Sin fisuras, corrosión excesiva ni soldaduras rotas.',
                'location' => InspectFormFieldLocation::VEHICLE->value,
                'img-key' => 'chasis'
            ],
            [
                'label' => 'Puertas Interior/Exterior',
                'description' => 'Abren/cierran sin trabas; seguros y empaques funcionando.',
                'location' => InspectFormFieldLocation::VEHICLE->value,
                'img-key' => 'puertas-int-ext'
            ],
            [
                'label' => 'Piso (Caja)',
                'description' => 'Sin perforaciones ni tablas flojas/deformadas.',
                'location' => InspectFormFieldLocation::BOX->value,
                'img-key' => 'piso-caja'
            ],
            [
                'label' => 'Paredes laterales',
                'description' => 'Firmes; sin abolladuras profundas ni filtraciones.',
                'location' => InspectFormFieldLocation::BOX->value,
                'img-key' => 'paredes-laterales'
            ],
            [
                'label' => 'Pared Frontal',
                'description' => 'Recta; sin fisuras ni filtraciones que afecten la carga.',
                'location' => InspectFormFieldLocation::BOX->value,
                'img-key' => 'pared-frontal'
            ],
            [
                'label' => 'Techo (Caja)',
                'description' => 'Sin goteras, fisuras ni reparaciones deficientes.',
                'location' => InspectFormFieldLocation::BOX->value,
                'img-key' => 'techo-caja'
            ],
            [
                'label' => 'Unidad de refrigeración',
                'description' => 'Enciende y enfría; sin fugas de gas/aceite; tablero funciona.',
                'location' => InspectFormFieldLocation::BOX->value,
                'img-key' => 'unidad-refrigeracion'
            ],
            [
                'label' => 'Escape',
                'description' => 'Bien sujeto; sin rupturas ni fugas de humo excesivo.',
                'location' => InspectFormFieldLocation::BOX->value,
                'img-key' => 'escape'
            ],
            [
                'label' => 'Bisagras de seguridad',
                'description' => 'Revisa que estén completas, firmes y sin desgaste excesivo.',
                'location' => InspectFormFieldLocation::BOX->value,
                'img-key' => 'bisagras-seguridad'
            ],
            [
                'label' => 'Seguridad agricola',
                'description' => 'Limpieza de llantas/chasis/caja; sin tierra, semillas ni restos.',
                'location' => InspectFormFieldLocation::ALL->value,
                'img-key' => 'seguridad-agricola'
            ],
        ];

        $dataInsertFields = [];

        foreach ($defaultFields as $field) {

            $defaultPath = "default/field/".$field['img-key'].".jpg";
            $newPath = null;
            Log::info("Copiando imagen para " . $field["label"]);
            if(Storage::disk("public")->exists($defaultPath)) {
                $imgContent = Storage::disk('public')->get($defaultPath);
                $filename = uniqid('file-');
                $newPath = "field/$inspectFormFolio/$filename.jpg";
                Storage::disk('public')->put($newPath, $imgContent);
                Log::info("Imagen copiada para ". $field["label"], [
                    "path" => $newPath,
                    "key" => $field["img-key"]
                ]);
            }else{
                Log::warning("Imagen no encontrada", [
                    "path" => $defaultPath,
                    "key" => $field["img-key"]
                ]);
            }


            $dataInsertFields[] = [
                'inspect_form_id' => $inspectFormId,
                'label' => $field['label'],
                'description' => $field['description'],
                'location' => $field['location'],
                'img_src' => $newPath
            ];
        }

        InspectFormField::insert($dataInsertFields);

    }

}
