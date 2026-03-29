<?php

namespace App\Http\Controllers;

use App\Enums\PlanActionStatus;
use App\Models\ActionPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActionPlanController extends Controller
{
    // LINK: Tiene que cambiar el estado del plan de acción a IN_PROGRESS
    public function start (string $id) {
        $action = ActionPlan::findOrFail($id);
        $action->status = PlanActionStatus::IN_PROGRESS;
        $action->save();
        return redirect()->back();
    }

    // LINK: Tiene que cambiar el estado del plan de acción a COMPLETED
    public function finish (string $id) {
        $action = ActionPlan::findOrFail($id);
        $action->status = PlanActionStatus::COMPLETED;
        $action->finished_at = now();
        $action->save();
        return redirect()->back();
    }

    // LINK: Tiene que cambiar el estado del plan de acción a CANCELLED
    public function cancel (string $id) {
        $action = ActionPlan::findOrFail($id);
        $action->status = PlanActionStatus::CANCELED;
        $action->finished_at = now();
        $action->save();
        return redirect()->back();
    }

    // LINK: Ver plan de acción
    public function show (string $uuid) {
        $actionPlan = ActionPlan::with(['evidences', 'createdBy', 'user'])
            ->where("uuid", $uuid)
            ->firstOrFail();

        $actionPlan = array_merge($actionPlan->toArray(), [
            "created_at" => $actionPlan->created_at->format('d/m/Y, h:i a'),
            "created_by" => $actionPlan->createdBy->name,
            "assigned_to" => $actionPlan->user->name,
            "evidences" => $actionPlan->evidences->map(function ($evidence) {
                return "/storage/" . $evidence->path;
            }),
        ]);

        unset($actionPlan['user']);

        return Inertia::render("controlIncidences/plan-action/show", [
            "plan" => $actionPlan,
        ]);
    }
}
