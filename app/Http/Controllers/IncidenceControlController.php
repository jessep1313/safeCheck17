<?php

namespace App\Http\Controllers;

use App\Models\Inspection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IncidenceControlController extends Controller
{
    public function index()
    {
        return redirect()->route("incidences-control.inspections");
    }

    public function inspections (request $request) {

        $currentPage = $request->input("page",1);
        $perPage = $request->input("per_page",15);
        $sort = $request->input("sort","desc");
        $sortBy = $request->input("sort_by","created_at");
        $search = $request->input("search","");


        $paginator = Inspection::with('evidences')
            ->incidences()
            ->orderBy($sortBy, $sort)
            ->searchValues($search)
            ->paginate($perPage)
            ->withQueryString()
            ->through(fn ($row) => [
                "id" => $row->id,
                "uuid" => $row->uuid,
                "evidences" => $row->evidences()
                    ->get()
                    ->map(fn ($evidence) => $evidence->getFullPathAttribute()),
                "description" => null,
                "action_plan" => null,
                "updated_at" => $row->updated_at->format("d/M/Y, h:i a"),
            ]);

        $breadcrumbs = [
            ["title" => "Dashboard", "href" => "/"],
            ["title" => "Control de incidencias", "href" => "/control-de-incidencias"],
            ["title" => "Inspecciones", "href" => "/control-de-incidencias/inspecciones"],
        ];
        return Inertia::render("controlIncidences/home", [
            "title" => "Incidencias de inspección",
            "breadcrumbs" => $breadcrumbs,
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

    /**
     * LINK ROUNDS VIEW
     */

    public function rounds(request $request) {
        $currentPage = $request->input("page",1);
        $perPage = $request->input("per_page",10);
        $sort = $request->input("sort","desc");
        $sortBy = $request->input("sort_by", "created_at");
        $search = $request->input("search","");

        $paginator = Inspection::incidences()
            ->orderBy($sortBy, $sort)
            ->searchValues($search)
            ->paginate($perPage)
            ->withQueryString()
            ->through(fn ($row) => [
                "id" => $row->id,
                "uuid" => $row->uuid,
                "problem" => $row->getProblemPoint(),
                "description" => null,
                "action_plan" => null,
                "updated_at" => $row->updated_at->format("d/M/Y, h:i a"),
            ]);

        $breadcrumbs = [
            ["title" => "Dashboard", "href" => "/"],
            ["title" => "Control de incidencias", "href" => "/control-de-incidencias"],
            ["title" => "Recorridos", "href" => "/control-de-incidencias/recorridos"],
        ];
        return Inertia::render("controlIncidences/home", [
            "title" => "Incidencias de recorridos",
            "breadcrumbs"=> $breadcrumbs,
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
}