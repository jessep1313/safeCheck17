<?php

namespace App\Enums;

enum InspectionType: string
{
    case Entry = 'Entrada';
    case Output = 'Salida';
    case Storage = 'Almacen';
}