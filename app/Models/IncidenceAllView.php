<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class IncidenceAllView extends Model
{
    //
    protected $table = "incidences_view";
    protected $casts = [
        "evidences" => "array"
    ];

    protected function scopeSearchValues(Builder $query, ?string $search = "")
    {
        if (!$search) {
            return $query;
        }

        return $query->where(function ($q) use ($search) {
            $q->where('uuid', 'like', "%$search%")
                ->orWhere('type', 'like', "%$search%")
                ->orWhere('comments', 'like', "%$search%");
        });
    }
}
