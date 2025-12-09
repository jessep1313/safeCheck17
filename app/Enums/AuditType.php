<?php

namespace App\Enums;

enum AuditType: string
{
    case INSPECTION = 'Inspeccion';
    case ROUNDED = 'Recorrido';
    case OTHER = 'Otro';
}
