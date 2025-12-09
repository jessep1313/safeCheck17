<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Audit extends Model
{
    protected $fillable = [
        'created_by_id',
        'type'
    ];

    protected static function boot () {
        parent::boot();

        static::creating(function($model) {
            $model->created_by_id = auth()->id();
        });
    }

    public function createdBy () {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    public function inspections () {
        return $this->hasMany(AuditInspection::class, 'audit_id');
    }
}
