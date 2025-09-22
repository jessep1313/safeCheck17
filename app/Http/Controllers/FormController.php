<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use App\Models\InspectForm;
use App\Models\VehicleType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Number;
use Inertia\Inertia;
use Nette\Utils\Random;

class FormController extends Controller
{
    public function index()
    {
        $certificates = Certification::select('id', 'name')->get();
        $vehicleTypes = VehicleType::select('id', 'name')->get();

        $inspectForms = InspectForm::with(['certificate', 'vehicleType'])
            ->get()
            ->map(fn($form) => [
                "id" => $form->id,
                "folio" => $form->folio,
                "vehicleType" => $form->vehicleType?->name,
                "certificate" => $form->certificate?->name,
                "fields" => $form->fields->count(),
                "created_at" => $form->created_at->format('d/m/y, h:ia')
            ]);

        return Inertia::render('form/home', [
            'certificates' => $certificates,
            'vehicleTypes' => $vehicleTypes,
            'inspectForms' => $inspectForms
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'certification_type' => 'required|exists:certifications,id',
            'vehicle_type' => 'required|exists:vehicle_types,id',
        ]);

        try {

            $record = InspectForm::create([
                'certification_id' => $request->input('certification_type'),
                'vehicle_type_id' => $request->input('vehicle_type'),
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
            $record = InspectForm::findOrFail($id);
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
