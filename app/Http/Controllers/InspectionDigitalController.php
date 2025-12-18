<?php

namespace App\Http\Controllers;

use App\Enums\InspectStatus;
use App\Enums\Step;
use App\Exports\InspectionPoints;
use App\Http\Requests\SaveDataRequest;
use App\Http\Requests\SavePrepareRequest;
use App\Models\Certification;
use App\Models\Inspection;
use App\Models\InspectionPoint;
use App\Models\InspectionTrailer;
use App\Models\VehicleType;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class InspectionDigitalController extends Controller
{
    /**
     * -------------------------
     * SECTION VIEWS
     * En esa sección estaremos definiendo las vistas de de inspección. En caso
     * de agregar más de estás se recomienda agregarlas en este apartado
     */

    // LINK Pagina inicial

    public function index(request $request)
    {
        $currentPage = $request->input('page', 1);
        $perPage = $request->input('per_page', 15);
        $sort = $request->input('sort', 'desc');
        $sortBy = $request->input('sort_by', 'created_at');
        $search = $request->input('search', '');

        $paginator = Inspection::with('certification', 'user', 'vehicleType')
            ->orderBy($sortBy, $sort)
            ->searchValues($search)
            ->paginate(page: $currentPage, perPage: $perPage)
            ->withQueryString()
            ->through(fn ($row) => [
                'id' => $row->id,
                'uuid' => $row->uuid,
                'cert' => $row?->certification?->name ?? 'Ninguno',
                'unitType' => $row?->vehicleType?->name ?? 'Ninguno',
                'userBy' => $row?->user?->name ?? 'No encontrado',
                'status' => $row->status,
                'created_at' => $row->created_at->format('d/m/Y, h:i a'),
                'updated_at' => $row->updated_at->format('d/m/Y, h:i a'),
            ]);

        return Inertia::render('inspect/home', [
            'paginator' => $paginator,
            'filter' => [
                'per_page' => $perPage,
                'page' => $currentPage,
                'sort' => $sort,
                'sort_by' => $sortBy,
                'search' => $search,
            ],
        ]);
    }

    // LINK Resumen

    public function show(string $uuid)
    {
        $inspection = Inspection::where('uuid', $uuid)
        ->with(['trailers', 'points', 'vehicleType', 'certification', 'user'])
        ->firstOrFail();

        $problemPoint = $inspection->getProblemPoint();
        $problem = null;

        if($problemPoint) {
            $problem = [
                'id' => $problemPoint->id,
                'comments' => $problemPoint->comments,
                'label' => $problemPoint->field->label,
                'description' => $problemPoint->field->description,
                'evidences' => $inspection->evidences()->get()->map(fn ($record) => "/storage/{$record->path}")
            ];
        }

        $trailersData = $inspection->trailers->map(fn ($record) => [
            'id' => $record->id,
            'plate' => $record->plate,
            'seal' => $record->seal,
            'vin' => $record->vin,
        ]);

        $pointsData = $inspection->points()->orderBy('number', 'asc')->get()->map(fn ($record) => [
            'id' => $record->id,
            'number' => $record->number,
            'approved' => $record->result,
            'label' => $record->field->label,
            'description' => $record->field->description,
            'answered' => $record->answered,
            'problem' => (!$record->result && $record->answered) ? [
                'comment' => $record->comments,
                'evidences' => $problem['evidences']
            ] : null,
        ]);

        $vehicleData = [
            'id' => $inspection->vehicle_type_id,
            'model' => $inspection->vehicleType->name,
            'plate' => $inspection->plate_number,
            'trailers_count' => $inspection->trailer_quantity,
            'trailers' => $trailersData,
        ];

        $successQuestions = $inspection->points()->where('result', 1)->count();
        $totalQuestions = $inspection->points()->count();
        $successPercentage = round(($successQuestions / $totalQuestions) * 100, 2);

        $inspectionData = [
            'id' => $inspection->id,
            'certification' => $inspection->certification->name,
            'type' => $inspection->type->value,
            'created_by' => $inspection->user->name,
            'customer_name' => $inspection->customer_name,
            'guard_name' => $inspection->guard_name,
            'driver_name' => $inspection->driver_name,
            'company_transport' => $inspection->company_transport,
            'company_property' => $inspection->company_property,
            'status' => $inspection->status->value,
            'success_questions' => $successQuestions,
            'total_questions' => $totalQuestions,
            'success_percentage' => $successPercentage,
            'created_at' => $inspection->created_at->format('d/M/Y, h:i a'),
        ];

        return Inertia::render('inspect/show', [
            'uuid' => $uuid,
            'inspection' => $inspectionData,
            'vehicle' => $vehicleData,
            'points' => $pointsData,
            'problem' => $problem,
        ]);
    }

    // LINK Nueva inspección

    public function create()
    {
        return Inertia::render('inspect/create', []);
    }

    // LINK Form Preparación

    public function stepPrepare(string $uuid)
    {
        $inspection = Inspection::firstWhere('uuid', $uuid);
        $certificates = Certification::query()
            ->select('id', 'name')
            ->with([
                'vehicleTypes' => function ($q) {
                    $q->select('vehicle_types.id', 'vehicle_types.name');
                },
            ])
            ->get()
            ->map(fn (Certification $cert) => [
                'value' => (string) $cert->id,
                'label' => $cert->name,
                'childs' => $cert->vehicleTypes
                    ->map(fn (VehicleType $vt) => [
                        'value' => (string) $vt->id,
                        'label' => $vt->name,
                    ])
                    ->values(),
            ])
            ->values();

        return Inertia::render('inspect/create/prepare', [
            'uuid' => $uuid,
            'inspection' => $inspection,
            'certificatesOptions' => $certificates,
            'pageStep' => 'prepare',
        ]);
    }

    // LINK Form datos de inspeccion

    public function stepData(string $uuid)
    {
        $inspection = Inspection::firstWhere('uuid', $uuid);

        if (! $inspection) {
            return http_response_code(404);
        }

        $trailers = $inspection->trailers()->select(['plate', 'vin', 'seal', 'id'])->get();

        return Inertia::render('inspect/create/inspection-data', [
            'inspection' => $inspection,
            'trailers' => $trailers,
            'uuid' => $uuid,
            'pageStep' => 'data',
        ]);
    }

    // LINK Form Preguntas

    public function stepQuestions(string $uuid)
    {
        $inspection = Inspection::firstWhere('uuid', $uuid);

        /**
         * Si ya se encontro un problema anteriormente redirigirlo al comentario
         */
        if ($inspection->getProblemPoint()) {
            return redirect()->route('inspections.problem-comment', ['uuid' => $uuid]);
        }

        /**
         * En caso de que las preguntas ya hayan sido inicializadas redirigir al
         * formulario de preguntas
         */
        if ($inspection->questions_init && $inspection->points->count() > 0) {
            return redirect()->route('inspections.question', ['uuid' => $uuid]);
        }

        return Inertia::render('inspect/create/questions', [
            'inspection' => $inspection,
            'uuid' => $uuid,
            'pageStep' => 'questions',
        ]);
    }

    // LINK Pregunta

    public function stepQuestion(string $uuid)
    {
        $inspection = Inspection::firstWhere('uuid', $uuid);
        if ($inspection->getProblemPoint()) {
            return redirect()->route('inspections.problem-comment', ['uuid' => $uuid]);
        }
        $question = $inspection
            ->points()
            ->with('field')
            ->where('answered', false)
            ->orderBy('number', 'asc')
            ->first();
        $question = [
            'id' => $question->id,
            'number' => $question->number,
            'label' => $question->field->label,
            'description' => $question->field->description,
            'img_src' => '/storage/'.$question->field->img_src,
            'location' => $question->field->location->label(),
        ];

        return Inertia::render('inspect/create/question', [
            'question' => $question,
            'uuid' => $uuid,
            'points' => $inspection->points->count(),
        ]);
    }

    // LINK Problema comentario

    public function problemPointComment(string $uuid)
    {
        $inspection = Inspection::firstWhere(['uuid' => $uuid]);
        if (! $inspection) {
            return \http_response_code(404);
        }

        $inspectionPoint = $inspection->getProblemPoint();
        if (! $inspectionPoint) {
            return \http_response_code(404);
        }

        $question = [
            'id' => $inspectionPoint->id,
            'number' => $inspectionPoint->number,
            'label' => $inspectionPoint->field->label,
            'description' => $inspectionPoint->field->description,
            'img_src' => '/storage/'.$inspectionPoint->field->img_src,
            'location' => $inspectionPoint->field->location->label(),
        ];

        return Inertia::render('inspect/create/problem-comment', [
            'question' => $question,
            'uuid' => $uuid,
        ]);
    }

    // LINK Problema evidencia

    public function problemPointEvidence(string $uuid)
    {
        $inspection = Inspection::firstWhere(['uuid' => $uuid]);

        if (! $inspection) {
            return \http_response_code(404);
        }

        $inspectionPoint = $inspection->getProblemPoint();

        if (! $inspectionPoint) {
            return \http_response_code(404);
        }

        $question = [
            'id' => $inspectionPoint->id,
            'number' => $inspectionPoint->number,
            'label' => $inspectionPoint->field->label,
            'description' => $inspectionPoint->field->description,
            'img_src' => '/storage/'.$inspectionPoint->field->img_src,
            'location' => $inspectionPoint->field->location->label(),
        ];

        return Inertia::render('inspect/create/problem-evidence', [
            'question' => $question,
            'uuid' => $uuid,
        ]);
    }


    /**
     * !SECTION FIN DE VIEWS
     * -------------------------
     */

    /**
     * -------------------------
     * SECTION EVENTOS
     * En esta sección hay que agregar todas las rutas de eventos que no
     * cuenta con una vista, o que normalmente son para interactuar con
     * el server
     */

    // LINK Crear la inspección

    public function store()
    {
        $inspection = Inspection::create();
        $inspection->refresh();
        $uuid = $inspection->uuid;

        return redirect()->route('inspections.step-prepare', ['uuid' => $uuid]);
    }

    // LINK Guardar preparación de la inspección

    public function savePrepare(SavePrepareRequest $request, string $uuid)
    {
        $inspection = Inspection::firstWhere('uuid', $uuid);
        if (! $inspection) {
            return http_response_code(404);
        }

        $inspection->update($request->all());
        $currentQuantityTrailers = $inspection->trailers()->count();
        $trailerQuantity = $request->get('trailer_quantity');
        $trailersAdd = $trailerQuantity - $currentQuantityTrailers;

        if ($trailersAdd > 0) {
            for ($i = 0; $i < $trailersAdd; $i++) {
                $inspection->trailers()->create();
            }
        } else {
            $trailersIdLimit = $inspection
                ->trailers()
                ->limit($trailerQuantity)
                ->latest()
                ->pluck('id')
                ->toArray();

            $inspection->trailers()->whereNotIn('id', $trailersIdLimit)->delete();
        }

        if ($inspection->current_step === Step::Prepare) {
            $inspection->current_step = Step::Data;
            $inspection->save();
        }

        return redirect()->route('inspections.step-data', ['uuid' => $uuid]);
    }

    // LINK Guardar datos de la inspección

    public function saveData(SaveDataRequest $request, string $uuid)
    {
        $inspection = Inspection::firstWhere(['uuid' => $uuid]);
        if (! $inspection) {
            return http_response_code(404);
        }
        $inspectionData = $request->except('trailers');
        $inspection->update($inspectionData);
        $trailers = $request->input('trailers');

        foreach ($trailers as $trailer) {
            $trailerFound = InspectionTrailer::find($trailer['id']);
            $trailerFound->update([
                'plate' => $trailer['plate'],
                'vin' => $trailer['vin'],
                'seil' => $trailer['seil'],
            ]);
        }

        if ($inspection->current_step === Step::Data) {
            $inspection->current_step = Step::Questions;
            $inspection->save();
        }

        return redirect()->route('inspections.step-questions', ['uuid' => $uuid]);
    }

    // LINK Guardar respuestas de la inspección

    public function saveQuestions(string $uuid)
    {
        $inspection = Inspection::firstWhere(['uuid' => $uuid]);
        if (! $inspection) {
            return http_response_code(404);
        }
        $inspection->createForm();
        $inspection->questions_init = true;
        $inspection->save();

        return redirect()->route('inspections.question', ['uuid' => $uuid]);
    }

    // Guardar respuesta

    public function saveResponse(string $uuid, string $pointId, int $result)
    {
        $inspection = Inspection::firstWhere(['uuid' => $uuid]);
        $points = $inspection->points->count();
        $inspectPoint = InspectionPoint::findOrFail($pointId);

        if ($inspection->status == InspectStatus::Rejected) {
            return redirect()->to('inspections.');
        }

        $inspectPoint->update([
            'answered' => true,
            'result' => boolval($result),
        ]);

        if (boolval($result)) {
            if ($inspectPoint->number === $points) {
                $inspection->update([
                    'current_step' => Step::Summary,
                    'status' => InspectStatus::Approved,
                ]);

                return redirect()->route('inspections.show', ['uuid' => $uuid]);
            } else {
                return redirect()->route('inspections.question', ['uuid' => $uuid]);
            }
        } else {
            $inspection->update([
                'status' => InspectStatus::Rejected,
            ]);

            return redirect()->route('inspections.problem-comment', ['uuid' => $uuid]);
        }
    }

    // LINK Guardar comentario

    public function saveComment(string $uuid, Request $request)
    {

        // dd($request->all());

        $request->validate(['comment' => 'required|string|max:355']);
        $inspection = Inspection::firstWhere(['uuid' => $uuid]);

        if (! $inspection || ! $inspection->getProblemPoint()) {
            return http_response_code(404);
        }

        $inspectionPoint = $inspection->getProblemPoint();
        $inspectionPoint->comments = $request->comment;
        $inspectionPoint->save();

        return redirect()->route('inspections.problem-evidence', ['uuid' => $uuid]);
    }

    // LINK Guardar evidenvia

    public function saveEvidence(Request $request, string $uuid)
    {
        if (! $request->hasFile('files')) {
            return back()->withErrors(['files' => 'No hay archivos']);
        }

        $validated = $request->validate([
            'files' => 'required|array|min:1',
            'files.*' => 'required|file|image|mimes:jpeg,png,jpg|max:20480',
        ]);

        $inspection = Inspection::firstWhere('uuid', $uuid);

        // Usa $request->file('files') en lugar de $request->files
        foreach ($request->file('files') as $file) {
            if (! $file->isValid()) {
                continue;
            }

            // Usa getClientOriginalExtension()
            $filename = time().'_'.uniqid().'.'.$file->getClientOriginalExtension();
            $path = $file->storeAs('evidences', $filename, 'public');
            $inspection->evidences()->create([
                'path' => $path,
            ]);
        }

        return redirect()->route('inspections.show', ['uuid' => $uuid]);
    }


    // SECTION EXPORTS

    // LINK EXCEL

    public function exportExcel (string $uuid) {
        $inspection = Inspection::firstWhere('uuid', $uuid);
        $filename = "$inspection->uuid.xlsx";
        return Excel::download(new InspectionPoints($inspection->id), $filename);
    }
    // LINK PDF

    public function exportPdf (string $uuid) {
        $inspection = Inspection::with(['trailers'])->firstWhere('uuid', $uuid);
        $filename = "$uuid.pdf";
        $pdf = Pdf::loadView("reports.inspection-points", compact('inspection'));
        return $pdf->stream($filename);
        
    }
}
