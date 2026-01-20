<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccessCreateRequest;
use App\Models\Access;
use App\Models\Booth;
use App\Models\Building;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccessControlController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $currentPage = $request->get('page', 1);
        $perPage = $request->get('per_page', 15);
        $sortBy = $request->get('sort_by', 'created_at');
        $sort = $request->get('sort', 'desc');

        $paginator = Access::with(['booth', 'userBy', 'building'])
            ->orderBy($sortBy, $sort)
            ->paginate(perPage: $perPage, page: $currentPage)
            ->through(fn($row) => [
                'id' => $row->id,
                'uuid' => $row->uuid,
                'name' => $row->name,
                'contractor' => $row->contractor,
                'building' => $row->building->name,
                'booth' => $row->booth->name,
                'motive' => $row->motive,
                'vehicles' => 1,
                'tools' => 1,
                'devices' => 1,
                'expires' => $row->expires->format('d/m/Y, h:i a'),
                'created_at' => $row->created_at->format('d/m/Y, h:i a')
            ]);


        return Inertia::render('controlAccess/home', [
            "paginator" => $paginator,
            "filter" => [
                "per_page" => $perPage,
                "page" => $currentPage,
                "sort_by" => $sortBy,
                "sort" => $sort,
                "search" => $search
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('controlAccess/create', [
            "buildings" => Building::select(['id', 'name'])->get(),
            "booths" => Booth::select(['id', 'name'])->get(),
        ]);
    }

    public function show(string $uuid)
    {
        $access = Access::with(['building', 'booth', 'vehicles'])->firstWhere('uuid', $uuid);
        if (!$access) {
            return http_response_code(404);
        }

        $data = $access->toArray();
        $data["created_at"] = $access->created_at->format('d/F/Y');

        return Inertia::render('controlAccess/show', ["data" => $data, "uuid" => $access->uuid, 'accessId' => $access->id, 'vehicles' => $access["vehicles"]]);
    }


    public function store(AccessCreateRequest $request)
    {
        $newAccess = Access::create($request->all());
        return redirect()->route('access-control.show', ['uuid' => $newAccess->uuid]);
    }
}