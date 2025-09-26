<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use App\Models\InspectForm;
use App\Models\VehicleType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Nette\Utils\Random;

class FormController extends Controller
{
    public function index(Request $request)
    {
        $currentPage = $request->input('page', 1);
        $perPage = $request->input('per_page', 15);
        $sort = $request->input('sort', 'asc');
        $sortBy = $request->input('sort_by', 'created_at');
        $search = $request->input('search', "");

        $certificates = Certification::select('id', 'name')->get();
        $vehicleTypes = VehicleType::select('id', 'name')->get();

        $paginator = InspectForm::with(['certificate', 'vehicleType'])
            ->orderBy($sortBy, $sort)
            ->searchValues($search)
            ->withCount('fields')
            ->paginate(page: $currentPage, perPage: $perPage)
            ->withQueryString()
            ->through(fn($form) => [
                "id" => $form->id,
                "folio" => $form->folio,
                "vehicleType" => $form->vehicleType?->name,
                "certificate" => $form->certificate?->name,
                "fields" => $form->fields_count,
                "created_at" => $form->created_at->format('d/m/y, h:ia'),
            ]);

        return Inertia::render('form/home', [
            'certificates' => $certificates,
            'vehicleTypes' => $vehicleTypes,
            'paginator' => $paginator,
            'filter' => [
                'per_page' => $perPage,
                'page' => $currentPage,
                'sort' => $sort,
                'sort_by' => $sortBy,
                'search' => $search
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'certification_type' => 'required|exists:certifications,id',
            'vehicle_type' => 'required|exists:vehicle_types,id',
            'preload_fields' => 'boolean'
        ]);

        $existingForm = InspectForm::where('certification_id', $request->input('certification_type'))
            ->where('vehicle_type_id', $request->input('vehicle_type'))
            ->first();

        if ($existingForm) {
            return back()->withErrors([
                'certification_type' => 'Ya existe un formulario para esta combinación de certificado y tipo de vehículo.'
            ]);
        }

        try {

            $record = InspectForm::create([
                'certification_id' => $request->input('certification_type'),
                'vehicle_type_id' => $request->input('vehicle_type'),
                'preload_fields' => $request->input('preload_fields', true),
                'folio' => Random::generate(10)
            ]);

            Log::info("Se agrego un formulario", [
                'record' => $record
            ]);

            return redirect()->route('form.fields', ['folio' => $record->folio]);

        } catch (\Exception $e) {
            Log::error("No se pudo crear el formulario", [
                'error' => $e->getMessage(),
                'body' => $request->all()
            ]);
            return redirect()->back();
        }
    }

    public function destroy(string $id)
    {
        try {
            $storage = Storage::disk('public');
            $record = InspectForm::findOrFail($id);
            $fieldsDirectory = '/field/'. $record->folio;
            if($storage->exists($fieldsDirectory)) {
                $storage->deleteDirectory($fieldsDirectory);
            }

            $record->delete();
            Log::info("Se ha eliminado un formulario", [
                'record' => $record
            ]);
        } catch (\Exception $e) {
            Log::error("Ocurrio un error al eliminar el formulario.", [
                "error" => $e->getMessage()
            ]);
        }
    }
}
