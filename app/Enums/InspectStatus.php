<?php

namespace App\Enums;

enum InspectStatus: string
{
  case Pending = 'Pendiente';
  case Approved = 'Aprobado';
  case Rejected = 'Rechazado';
}