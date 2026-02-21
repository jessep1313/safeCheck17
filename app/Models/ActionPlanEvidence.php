<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActionPlanEvidence extends Model
{
    protected $fillable = [
        "action_plan_id",
        "path",
    ];

    public function actionPlan () {
        return $this->belongsTo(ActionPlan::class, "action_plan_id");
    }
}
