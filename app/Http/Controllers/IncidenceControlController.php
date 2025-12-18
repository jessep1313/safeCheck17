<?php

namespace App\Http\Controllers;

use App\Models\IncidenceAllView;
use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class IncidenceControlController extends Controller
{
    public function index(request $request)
    {
        $currentPage = $request->input("page",1);
        $perPage = $request->input("per_page",15);
        $sort = $request->input("sort","desc");
        $sortBy = $request->input("sort_by","created_at");
        $search = $request->input("search","");


        $paginator = IncidenceAllView::select(['id', 'uuid', 'type', 'created_at', 'comments', 'evidences'])
            ->orderBy($sortBy, $sort)
            ->searchValues($search)
            ->paginate($perPage)
            ->withQueryString()
            ->through(fn ($row) => [
                ...$row->toArray(),
                'created_at' => Carbon::parse($row->created_at)->format('d/m/Y, h:i a'),
            ]);
        
        return Inertia::render("controlIncidences/home", [
            "title" => "Incidencias de inspección",
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
}