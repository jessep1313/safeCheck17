<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditInspectionQuestion extends Model
{
    protected $fillable = [
        'audit_inspection_id',
        'question',
        'answared',
        'result',
        'comments'
    ];

    protected $casts = [
        'answared' => 'boolean',
        'result' => 'boolean'
    ];

    public function auditInspection () {
        return $this->belongsTo(AuditInspection::class);
    }
}
