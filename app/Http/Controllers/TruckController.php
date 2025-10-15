<?php

namespace App\Http\Controllers;

use App\Models\VehicleType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TruckController extends Controller
{
    public function index(request $request)
    {
        $search = $request->input('search', "");
        $perPage = $request->input('per_page', 15);
        $page = $request->input('page', 1);
        $sortBy = $request->input('sort_by', 'created_at');
        $sort = $request->input('sort', 'desc');

        $paginator = VehicleType::whereLike('name', "%{$search}%")
            ->orderBy($sortBy, $sort)
            ->paginate($perPage)
            ->withQueryString()
            ->through(fn($record) => [
                'id' => $record->id,
                'name' => $record->name,
                'created_at' => $record->created_at->format('d/m/y, h:ia'),
                'updated_at' => $record->created_at->format('d/m/y, h:ia'),
            ]);

        return Inertia::render(
            'catalog/trucks/home',
            [
                "paginator" => $paginator,
                "filter" => [
                    "per_page" => $perPage,
                    "page" => $page,
                    "sort" => $sort,
                    "sort_by" => $sortBy,
                    "search" => $search
                ]
            ]
        );
    }

    public function store(request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:90', 'min: 1']
        ]);
    }

    public function update(request $request, string $id)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:90', 'min: 1']
        ]);
    }

    public function destroy(string $id)
    {
    }
}