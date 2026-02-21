<?php

namespace App\Enums;

enum PlanActionStatus: string
{
    case PENDING = "Pendiente";
    case IN_PROGRESS = "En proceso";
    case COMPLETED = "Finalizado";
    case CANCELED = "Cancelado";
}
