<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class AuditReportView extends Model
{
    protected $table = "audit_reports_view";
    public $timestamps = false;

    public function scopeSearchValue(Builder $query, ?string $value = "") {
        if(!$value) {
            return $query;
        }
        return $query->where(function($q) use ($value) {
            $q->where("uuid", "like", "%$value%")
            ->orWhere("type", "like", "%$value%")
            ->orWhere("user_audit", "like", "%$value%");
        });
    }
}
