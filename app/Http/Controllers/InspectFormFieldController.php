<?php

namespace App\Http\Controllers;

use App\Models\InspectForm;
use App\Models\InspectFormField;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InspectFormFieldController extends Controller
{
    public function fields(string $folio)
    {

        $inspectForm = InspectForm::firstWhere('folio', $folio);
        if (!$inspectForm) {
            return abort(404, "No se encontro el formulario de inspección");
        }
        $fields = $inspectForm
            ->fields()
            ->select('id', 'label', 'description', 'img_src')
            ->get();

        return Inertia::render('form/fields', [
            'fields' => $fields
        ]);
    }
}
