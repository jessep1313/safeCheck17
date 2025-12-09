<?php

namespace App\Http\Controllers;

use App\Enums\AuditType;
use App\Models\Audit;
use Illuminate\Http\Request;

class AuditController extends Controller
{
    public function storeInspection () {
        Audit::create([
            'type' => AuditType::INSPECTION
        ]);
    }
}
