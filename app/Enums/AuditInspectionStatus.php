<?php

namespace App\Enums;

enum AuditInspectionStatus: string
{
    case PENDING = 'Pendiente';
    case FINISHED = 'Finalizado';
}
