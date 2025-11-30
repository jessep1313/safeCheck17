<?php

namespace App\Models;

use App\Enums\InspectStatus;
use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{
    protected $fillable = [
        'uuid',
        'responsed_id',
        'created_by_id',
        'comments',
        'status',
        'duration',
        'signature',
        'finished_at',
    ];

    protected $casts = [
        'finished_at' => 'datetime',
        'status' => InspectStatus::class
    ];

    public function responsable()
    {
        return $this->belongsTo(User::class, 'responsed_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }
}
