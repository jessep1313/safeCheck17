<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlanAction;
use App\Http\Requests\StorePlanActionDefinition;
use App\Http\Requests\StorePlanActionEvidence;
use App\Models\ActionPlan;
use App\Models\ActionPlanEvidence;
use App\Models\IncidenceAllView;
use App\Models\StorageTemp;
use App\Models\Tour;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class IncidenceControlController extends Controller
{
    public function index(request $request)
    {
        $currentPage = $request->input("page", 1);
        $perPage = $request->input("per_page", 15);
        $sort = $request->input("sort", "desc");
        $sortBy = $request->input("sort_by", "created_at");
        $search = $request->input("search", "");
        $status = $request->input("status", []);
        $type = $request->input("type", []);
        $users = User::select(['id', 'name'])->get();

        $paginator = IncidenceAllView::select(['id', 'uuid', 'type', 'created_at', 'comments', 'evidences'])
            ->orderBy($sortBy, $sort)
            ->searchValues($search)
            ->filterStatus($status)
            ->filterType($type)
            ->paginate($perPage)
            ->withQueryString()
            ->through(function ($row) {

                $plan = null;

                if ($row->planActions()->exists()) {
                    $plan = $row
                        ->planActions()
                        ->select(["uuid", "status", 'id', 'finished_at'])
                        ->latest()
                        ->first();
                }
                $plan = $plan ? $plan->toArray() : null;
                if ($plan && $plan['finished_at']) {
                    $plan['finished_at'] = Carbon::parse($plan[ 'finished_at'])->format('d/m/Y, h:i a');
                }

                return [
                    ...$row->toArray(),
                    'created_at' => Carbon::parse($row->created_at)->format('d/m/Y, h:i a'),
                    'action_plan' => $plan,
                ];
            });

        return Inertia::render("controlIncidences/home", [
            "title" => "Incidencias de inspección",
            "paginator" => $paginator,
            "filter" => [
                "per_page" => $perPage,
                "page" => $currentPage,
                "sort" => $sort,
                "sort_by" => $sortBy,
                "search" => $search,
                "status" => $status,
                "type" => $type,
            ],
            "users" => $users,
        ]);
    }

    /**
     * LINK ROUNDS VIEW
     */

    public function rounds(request $request)
    {
        $currentPage = $request->input("page", 1);
        $perPage = $request->input("per_page", 10);
        $sort = $request->input("sort", "desc");
        $sortBy = $request->input("sort_by", "created_at");
        $search = $request->input("search", "");

        $paginator = Tour::with('responsed', 'createdBy')
            ->incidences()
            ->orderBy($sortBy, $sort)
            ->paginate(page: $currentPage, perPage: $perPage)
            ->withQueryString()
            ->through(fn($row) => [
                'id' => $row->id,
                'uuid' => $row->uuid,
                'status' => $row->status,
                'responsed' => $row->responsed->name,
                'responsed_id' => $row->responsed->id,
                'created_by' => $row->createdBy->name,
                'created_by_id' => $row->createdBy->id,
                'comments' => $row->comments,
                'duration' => $row->duration,
                'created_at' => $row->created_at->format('d/m/Y H:i a'),
                'finished_at' => $row->finished_at ? $row->finished_at->format('d/m/Y H:i a') : "No finalizado",
            ]);

        return Inertia::render("controlIncidences/tours", [
            "title" => "Incidencias de recorridos",
            "paginator" => $paginator,
            "filter" => [
                "per_page" => $perPage,
                "page" => $currentPage,
                "sort" => $sort,
                "sort_by" => $sortBy,
                "search" => $search,
            ],
        ]);
    }


    // SECTION PLAN DE ACCION

    public function plan(string $uuid)
    {
        $plan = ActionPlan::latest()
            ->where("uuid_incidence", $uuid)
            ->firstOrFail();

        return Inertia::render("controlIncidences/plan-action/plan", [
            "plan" => $plan,
            "uuid" => $uuid
        ]);
    }

    public function evidence(string $uuid)
    {
        $plan = ActionPlan::latest()
            ->where('uuid_incidence', $uuid)
            ->firstOrFail();
        $evidences = $plan
            ->evidences()
            ->latest()
            ->get()
            ->map(fn($row) => [
                "id" => $row->id,
                "path" => "/storage/{$row->path}"
            ]);

        return Inertia::render("controlIncidences/plan-action/evidence", [
            "uuid" => $uuid,
            "plan" => $plan,
            "evidences" => $evidences,
        ]);
    }

    public function storePlanAction(StorePlanAction $request)
    {
        $incidence = IncidenceAllView::where("uuid", $request->uuid)->first();
        ActionPlan::create([
            "uuid" => Str::uuid(),
            "uuid_incidence" => $request->uuid,
            "user_id" => $request->user_id,
            "created_by_id" => Auth::id(),
            "incidence_type" => $incidence->type,
        ]);
        return redirect()->route("incidences-control.action-plan.plan", ["uuid" => $request->uuid]);
    }

    public function storePlanActionDefinition(StorePlanActionDefinition $request, string $uuid)
    {
        $plan = ActionPlan::latest()
            ->where("uuid_incidence", $uuid)
            ->firstOrFail();
        $plan->update([
            "plan" => $request->definition
        ]);

        return redirect()->route('incidences-control.action-plan.evidence', ["uuid" => $uuid]);
    }

    public function storePlanActionEvidence(StorePlanActionEvidence $request, string $uuid)
    {
        $imagePath = $this->moveToStorageTemp($request->evidence);
        $plan = ActionPlan::latest()
            ->where('uuid_incidence', $uuid)
            ->firstOrFail();

        $plan->evidences()->create([
            "path" => $imagePath,
        ]);
        return redirect()->route('incidences-control.action-plan.evidence', ["uuid" => $uuid]);
    }

    private function moveToStorageTemp(string $filename)
    {
        $img = StorageTemp::where("filename", $filename)->first();
        if (!$img) {
            Log::error("No se encontro el archivo en temp", ["filename" => $filename]);
            return null;
        }

        $tempFullPath = "temp/{$img->filename}";
        $newFullPath = "plan-action/{$img->filename}";

        if (!Storage::disk("public")->exists($tempFullPath)) {
            Log::error("No se encontro el archivo en temp", ["file_data" => $img]);
            return null;
        }

        $moved = Storage::disk("public")->move($tempFullPath, $newFullPath);
        if (!$moved) {
            Log::error("No se pudo mover el archivo: ", ["file_data" => $img, "from" => $tempFullPath, "to" => $newFullPath]);
            return null;
        }

        return $newFullPath;
    }

    public function destroyEvidence(string $id)
    {
        $img = ActionPlanEvidence::findOrFail($id);
        Storage::disk("public")->delete($img->path);
        $img->delete();
        return redirect()->back();
    }

    public function exportPdf (Request $request) {

    }

    public function exportExcel () {}
}