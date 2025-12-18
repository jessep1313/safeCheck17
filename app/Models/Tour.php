<?php

namespace App\Models;

use App\Enums\InspectStatus;
use Illuminate\Database\Eloquent\Builder;
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

    protected static function boot()
    {
        parent::boot();
        static::created(function ($model) {
            $model->created_by_id = auth()->id();
            $model->save();
        });
    }

    protected $casts = [
        'finished_at' => 'datetime',
        'status' => InspectStatus::class
    ];

    public function scopeIncidences(Builder $query)
    {
        return $query->where('status', InspectStatus::Rejected);
    }
    public function scopeNotIncidences(Builder $query)
    {
        return $query->where('status', InspectStatus::Approved);
    }

    public function responsed()
    {
        return $this->belongsTo(User::class, 'responsed_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    public function evidences()
    {
        return $this->hasMany(TourEvidence::class);
    }
}
