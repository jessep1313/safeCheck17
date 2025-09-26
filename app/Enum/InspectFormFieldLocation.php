<?php

namespace App\Enum;

enum InspectFormFieldLocation: string
{
    case VEHICLE = 'vehicle';
    case BOX = 'box';
    case ALL = 'all';

    public function label () {
        return match($this) {
            self::VEHICLE => 'Vehiculo',
            self::BOX => 'Caja/Remolque',
            self::ALL => 'Unidad completa'
        };
    }

    public function description () {
        return match($this) {
            self::VEHICLE => 'Todo lo que es parte del vehículo principal y no tenga nada que ver con la caja o remolque.',
            self::BOX => 'Caja del camión/camioneta, incluso el o los remolques que lleve. Si es camioneta hablamos de la caja o almacen.',
            self::ALL => 'Tanto el vehículo como su almacenamiento (caja, remolque). Hablamos del camión o camioneta en general.'
        };
    }
}
