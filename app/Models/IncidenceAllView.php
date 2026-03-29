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

    protected function scopeFilterType(Builder $query, ?array $type = [])
    {
        if ($type && count($type) > 0) {
            $query = $query->whereIn("type", $type);
        }
        return $query;
    }

    protected function scopeFilterStatus(Builder $query, ?array $status = [])
    {
        if ($status && count($status) > 0) {
            $statuses = array_filter($status, fn($s) => $s !== "Ninguno");
            $hasNinguno = in_array("Ninguno", $status); // ✅

            if (count($statuses) > 0 && $hasNinguno) {
                // Ambos: con plan en esos estados O sin plan
                $query->where(function ($q) use ($statuses) {
                    $q->whereHas("planActions", fn($q) => $q->whereIn("status", $statuses))
                        ->orWhereDoesntHave("planActions");
                });
            } elseif (count($statuses) > 0) {
                $query->whereHas("planActions", fn($q) => $q->whereIn("status", $statuses));
            } elseif ($hasNinguno) {
                $query->whereDoesntHave("planActions");
            }
        }

        return $query;
    }

    function planActions()
    {
        return $this->hasMany(ActionPlan::class, "uuid_incidence", "uuid");
    }
}
