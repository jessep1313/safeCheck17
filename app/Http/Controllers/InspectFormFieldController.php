<?php

namespace App\Http\Controllers;

use App\Http\Requests\FieldStoreRequest;
use App\Http\Requests\FieldUpdateRequest;
use App\Models\InspectForm;
use App\Models\InspectFormField;
use App\Models\StorageTemp;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class InspectFormFieldController extends Controller
{

    // LINK fields

    public function fields(string $folio)
    {

        $inspectForm = InspectForm::firstWhere('folio', $folio);

        if (!$inspectForm) {
            return abort(404, "No se encontro el formulario de inspección");
        }

        $fields = $inspectForm
            ->fields()
            ->select('id', 'label', 'description', 'img_src', 'location')
            ->get()
            ->map(fn($field) => [
                'id' => $field->id,
                'label' => $field->label,
                'location' => $field->location->label(),
                'description' => $field->description,
                'img_src' => $field->getImgSrcPublic()
            ]);

        return Inertia::render('form/fields', [
            'fields' => $fields,
            'folio' => $folio
        ]);

    }

    // LINK store

    public function store(FieldStoreRequest $request, string $folio)
    {
        try {
            $imgSrc = $request->input('img_src');
            $body = $request->except('img_src');

            $inspectForm = InspectForm::firstWhere('folio', $folio);
            if (!$inspectForm) {
                return abort(404, 'Formulario de inspección no encontrado');
            }

            $newPath = $this->tempToFolder($imgSrc, $folio);
            $body["img_src"] = $newPath;
            $field = $inspectForm->fields()->create($body);

            Log::info("Body a insertar", [
                "data" => $body
            ]);

            Log::info("Se creo un inspect-form-field", [
                "record" => $field,
                "inspectForm" => $inspectForm,
            ]);

            return redirect()->back();
        } catch (\Exception $e) {
            Log::error("No se pudo crear el field", [
                "error" => $e->getMessage(),
                "request" => $request->all()
            ]);
            return redirect()->back();
        }
    }

    // LINK Update

    public function update(FieldUpdateRequest $request, string $id)
    {
        try {
            $record = InspectFormField::with('inspectForm')->findOrFail($id);
            $imgSrc = $request->input('img_src');
            $data = $request->except('img_src');

            if ($imgSrc !== $record->img_src) {
                $storage = Storage::disk('public');
                if ($storage->exists($imgSrc)) {
                    $storage->delete($imgSrc);
                }
                Log::info("Se ha eliminado la imagen para ser actualizada", [
                    "record" => $record
                ]);

                $newPath = $this->tempToFolder($imgSrc, $record->inspectForm->folio);
                $data["img_src"] = $newPath;
            }

            $record = $record->update($data);

            Log::info("Se actualizo el punto de inspección", [
                "record" => $record
            ]);
        } catch (\Exception $e) {
            Log::error("No se pudo actualizar el punto de inspección", [
                "request" => $request->all(),
                "error" => $e->getMessage()
            ]);
            return redirect()->back();
        }
    }

    // LINK Eliminar

    public function destroy(string $id)
    {
        $inspectFormField = InspectFormField::findOrFail($id);
        try {
            $storage = Storage::disk('public');

            if ($storage->exists($inspectFormField->img_src)) {
                $storage->delete($inspectFormField->img_src);
            } else {
                Log::warning("No se encontro una imagen para eliminar del punto de inspección.", [
                    "path" => $inspectFormField->img_src
                ]);
            }

            $inspectFormField->delete();

            Log::info("Se ha eliminado el punto de inspección", [
                "record" => $inspectFormField
            ]);
        } catch (\Exception $e) {
            Log::error("No se pudo eliminar el punto de inspección", [
                "record" => $inspectFormField,
                "id" => $id,
                "error" => $e->getMessage()
            ]);
            return redirect()->back();
        }
    }

    // NOTE Mover de temporal a folder

    private function tempToFolder($imgSrc, $folio)
    {
        $tempData = StorageTemp::firstWhere('path', $imgSrc);
        if (!$tempData) {
            throw new \Exception("Archivo temporal no encontrado");
        }
        Log::info("Archivo temporal encontrado", [
            "temp" => $tempData
        ]);

        $fileContents = Storage::disk("temp")->get($tempData->filename);
        $newPath = "field/$folio/" . $tempData->filename;
        Storage::disk('public')->put($newPath, $fileContents);

        Log::info("Nuevo path para imagen $newPath");
        return $newPath;
    }
}
