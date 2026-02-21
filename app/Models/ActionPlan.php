<?php

namespace App\Models;

use App\Enums\AuditType;
use App\Enums\PlanActionStatus;
use Illuminate\Database\Eloquent\Model;

class ActionPlan extends Model
{
    protected $fillable = [
        "uuid",
        "uuid_incidence",
        "incidence_type",
        "plan",
        "user_id",
        "created_by_id",
        "status",
        "finished_at",
    ];
 
    protected $casts = [
        "finished_at" => "datetime",
        "status" => PlanActionStatus::class,
        "incidence_type" => AuditType::class,
    ]; 

    public function evidences () {
        return $this->hasMany(ActionPlanEvidence::class, "action_plan_id");
    }

    public function createdBy () {
        return $this->belongsTo(User::class, "created_by_id");
    }

    public function user () {
        return $this->belongsTo(User::class, "user_id");
    }
}
