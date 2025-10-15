<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function index(request $request)
    {
        $search = $request->input('search', "");
        $perPage = $request->input('per_page', 15);
        $page = $request->input('page', 1);
        $sortBy = $request->input('sort_by', 'created_at');
        $sort = $request->input('sort', 'desc');

        $paginator = Certification::orderBy($sortBy, $sort)
            ->searchValues($search)
            ->paginate($perPage)
            ->withQueryString()
            ->through(fn($record) => [
                'id' => $record->id,
                'name' => $record->name,
                'created_at' => $record->created_at->format('d/m/y, h:ia'),
                'updated_at' => $record->updated_at->format('d/m/y, h:ia'),
            ]);

        return Inertia::render('catalog/certificaties/home', [
            "paginator" => $paginator,
            "filter" => [
                "per_page" => $perPage,
                "page" => $page,
                "sort" => $sort,
                "sort_by" => $sortBy,
                "search" => $search
            ]
        ]);
    }

    public function store(request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'min:1', 'max:45', 'unique:certifications,name']
        ]);

        try {
            $record = Certification::create(['name' => $request->get('name')]);
            Log::info('Se ha creado un nuevo certificado', [
                'request' => $request->all(),
                'record' => $record,
            ]);
        } catch (Exception $e) {
            Log::error("Error al insertar certificado", [
                'request' => $request->all(),
                'error' => $e->getMessage()
            ]);
        }

        return redirect()->back();
    }

    public function update(request $request, string $id)
    {
        $request->validate([
            'name' => ['required', 'string', 'min:1', 'max:45', 'unique:certifications,name,' . $id]
        ]);

        try {
            $record = Certification::findOrFail($id);
            $record->name = $request->name;
            $record->save();

            Log::info('Se ha actualizado un certificado', [
                'record' => $record,
                'record_id' => $id,
                'request' => $request->all()
            ]);
        } catch (Exception $e) {
            Log::error('Ocurrio un error al actualizar el certificado', [
                'record_id' => $id,
                'request' => $request->all(),
                'error' => $e->getMessage()
            ]);
        }

        return redirect()->back();

    }

    public function destroy(string $id)
    {
        try {
            $record = Certification::findOrFail($id);
            if ($record->inspectForms()->count() > 0) {
                throw new Exception('El Certificado tiene formularios aplicados');
            }
            $record->delete();
        } catch (Exception $e) {
            Log::error('No se pudo eliminar el certificado', [
                'record_id' => $id,
                'error' => $e->getMessage()
            ]);
        }

        return redirect()->back();
    }
}