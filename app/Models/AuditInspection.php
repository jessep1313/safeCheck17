<?php

namespace App\Models;

use App\Enums\AuditInspectionStatus;
use Illuminate\Database\Eloquent\Model;

class AuditInspection extends Model
{
    protected $fillable = [
        'audit_id',
        'inspection_id',
        'created_by_id',
        'uuid',
        'status',
        'comments'
    ];

    protected $casts = [
        'status' => AuditInspectionStatus::class
    ];

    public function audit () {
        return $this->belongsTo(Audit::class);
    }

    public function inspection () {
        return $this->belongsTo(Inspection::class);
    }

    public function createdBy () {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    public function questions () {
        return $this->hasMany(AuditInspectionQuestion::class);
    }

}
