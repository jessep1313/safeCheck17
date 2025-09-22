<?php

namespace App\Observers;

use App\Models\InspectForm;
use App\Models\InspectFormField;

class InspectFormObserver
{
    /**
     * Handle the InspectForm "created" event.
     */
    public function created(InspectForm $inspectForm): void
    {
        $this->createDefaultFields($inspectForm->id);
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

    private function createDefaultFields($inspectFormId)
    {
        $defaultFields = [
            'Defensa',
            'Motor',
            'Llantas',
            'Piso Interior (Tracto)',
            'Tanque de Diesel',
            'Cabina',
            'Cilindros de Aíre',
            'Diferencial',
            'Quinta Rueda',
            'Chasis',
            'Puertas Interior/Exterior',
            'Piso (Caja)',
            'Paredes laterales',
            'Pared Frontal',
            'Techo (Caja)',
            'Unidad de refrijeración',
            'Escape',
            'Visagras de seguridad'
        ];

        $dataInsertFields = [];

        foreach ($defaultFields as $field) {
            $dataInsertFields[] = [
                'inspect_form_id' => $inspectFormId,
                'label' => $field,
            ];
        }

        InspectFormField::insert($dataInsertFields);

    }

}
