<?php

namespace App\Http\Controllers;

use App\Models\VehicleType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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

        try {
            $record = VehicleType::create(['name' => $request->name]);
            Log::info('Se ha creado un tipo de unidad', [
                'request' => $request->all(),
                'record' => $record
            ]);
        } catch (\Exception $e) {
            Log::error('Error al agregar el tipo de unidad', [
                'request' => $request->all(),
                'error' => $e->getMessage()
            ]);
        }
        return redirect()->back();
    }

    public function update(request $request, string $id)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:90', 'min: 1']
        ]);

        $record = VehicleType::findOrFail($id);

        try {
            $record->name = $request->name;
            $record->save();
            Log::info('Se ha actualizado un tipo de unidad', [
                'request_id' => $id,
                'record',
                'request' => $request->all()
            ]);
        } catch (\Exception $e) {
            Log::error('Error al actualizar el tipo de unidad', [
                'request' => $request->all(),
                'record' => $record,
                'error' => $e->getMessage()
            ]);
        }

        return redirect()->back();
    }

    public function destroy(string $id)
    {
        $record = VehicleType::findOrFail($id);
        try {
            if ($record->inspectForm()->count() > 0) {
                throw new \Exception('Este tipo de unidad esta asignado a formularios');
            }
            $record->delete();
            Log::info('Se ha eliminado el tipo de unidad', [
                'record_id' => $id,
                'record' => $record
            ]);
        } catch (\Exception $e) {
            Log::error('No se pudo eliminar el tipo de unidad', [
                'record_id' => $id,
                'record' => $record,
                'error' => $e->getMessage(),
            ]);
        }
        return redirect()->back();
    }
}