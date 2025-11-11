<?php

namespace App\Enums;

enum Step: string
{
    case Prepare = 'prepare';
    case Data = 'data';
    case Questions = 'questions';
    case Summary = 'summary';

    public static function positions($val)
    {
        return match ($val) {
            self::Prepare => 0,
            self::Data => 1,
            self::Questions => 2,
            self::Summary => 3
        };
    }

    public static function label($val)
    {
        return match ($val) {
            self::Prepare => 'Preparación',
            self::Data => 'Datos de inspección',
            self::Questions => 'Puntos de inspección',
            self::Summary => 'Resumen'
        };
    }
}
