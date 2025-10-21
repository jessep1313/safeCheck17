<?php

namespace App\Http\Controllers;

use App\Models\Inspection;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        $search = $request->input('search', "");

        $paginator = Inspection::with('certification', 'user', 'vehicleType')
            ->orderBy($sortBy, $sort)
            ->searchValues($search)
            ->paginate(page: $currentPage, perPage: $perPage)
            ->withQueryString()
            ->through(fn($row) => [
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
                'search' => $search
            ]
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
        return Inertia::render('inspect/create/prepare', [
            'inspection' => $inspection,
            'uuid' => $uuid,
            'pageStep' => 'prepare',
        ]);
    }

    // LINK Form datos de inspeccion

    public function stepData(string $uuid)
    {
        $inspection = Inspection::firstWhere('uuid', $uuid);
        return Inertia::render('inspect/create/inspection-data', [
            'inspection' => $inspection,
            'uuid' => $uuid,
            'pageStep' => 'data',
        ]);
    }

    // LINK Form Preguntas

    public function stepQuestions(string $uuid)
    {
        $inspection = Inspection::firstWhere('uuid', $uuid);
        return Inertia::render('inspect/create/questions', [
            'inspection' => $inspection,
            'uuid' => $uuid,
            'pageStep' => 'questions',
        ]);
    }

    // LINK Resumen de Formulario

    public function stepSummary(string $uuid)
    {
        $inspection = Inspection::firstWhere('uuid', $uuid);
        return Inertia::render('inspect/create/summary', [
            'inspection' => $inspection,
            'uuid' => $uuid,
            'pageStep' => 'summary',
        ]);
    }

    // LINK Ver inspección

    public function show()
    {
        return Inertia::render('inspect/show', []);
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

    public function savePrepare()
    {
        return redirect()->route('inspections.step-data');
    }

    // LINK Guardar datos de la inspección

    public function saveData()
    {
        return redirect()->route('inspections.step-questions');
    }

    // LINK Guardar respuestas de la inspección

    public function saveQuestions()
    {
        return redirect()->route('inspections.step-summary');
    }

    // LINK Finalizar inspección

    public function finishInspection()
    {
        return redirect()->route('inspections.home');
    }
}