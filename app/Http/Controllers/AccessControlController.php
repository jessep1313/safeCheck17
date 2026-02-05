<?php

namespace App\Http\Controllers;

use App\Exports\ExportAccessControlList;
use App\Http\Requests\AccessCreateRequest;
use App\Models\Access;
use App\Models\Booth;
use App\Models\Building;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
class AccessControlController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $currentPage = $request->get('page', 1);
        $perPage = $request->get('per_page', 15);
        $sortBy = $request->get('sort_by', 'created_at');
        $sort = $request->get('sort', 'desc');
        $dateFrom = $request->get('check_in');
        $dateTo = $request->get('check_out');
        $buildingId = $request->get('building_id', '');
        $boothId = $request->get('booth_id', '');

        $paginator = Access::with(['booth', 'userBy', 'building', 'vehicles', 'tools', 'devices'])
            ->orderBy($sortBy, $sort)
            ->dateCheckIn($dateFrom, $dateTo)
            ->buildingId($buildingId)
            ->boothId($boothId)
            ->paginate(perPage: $perPage, page: $currentPage)
            ->through(fn($row) => [
                'id' => $row->id,
                'uuid' => $row->uuid,
                'name' => $row->name,
                'contractor' => $row->contractor,
                'building' => $row->building->name,
                'booth' => $row->booth->name,
                'motive' => $row->motive,
                'vehicles' => $row->vehicles->count(),
                'tools' => $row->tools->sum('quantity'),
                'devices' => $row->devices->sum('quantity'),
                'expires' => $row->expires->format('d/m/Y, h:i a'),
                'created_at' => $row->created_at->format('d/m/Y, h:i a')
            ]);


        return Inertia::render('controlAccess/home', [
            "paginator" => $paginator,
            "catalogs" => [
                "buildings" => Building::select(['id', 'name'])->get(),
                "boots" => Booth::select(['id', 'name'])->get()
            ],
            "filter" => [
                "per_page" => $perPage,
                "page" => $currentPage,
                "sort_by" => $sortBy,
                "sort" => $sort,
                "check_in" => $dateFrom,
                "check_out" => $dateTo,
                "building_id" => $buildingId,
                "booth_id" => $boothId,
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

    public function createTools (string $uuid) {
        $access = Access::firstWhere('uuid', $uuid);
        if(!$access) {
            return http_response_code(404);
        }
        return Inertia::render('controlAccess/create/tools', [
            'tools' => $access->tools,
            'uuid' => $access->uuid,
            'accessId' => $access->id
        ]);
    }

    public function createDevices (string $uuid) {
        $access = Access::firstWhere('uuid', $uuid);
        if(!$access) {
            return http_response_code(404);
        }
        return Inertia::render('controlAccess/create/devices', [
            'devices' => $access->devices,
            'uuid' => $access->uuid,
            'accessId' => $access->id
        ]);
    }

    public function createVehicles (string $uuid) {
        $access = Access::firstWhere('uuid', $uuid);
        if(!$access) {
            return http_response_code(404);
        }
        return Inertia::render('controlAccess/create/vehicles', [
            'vehicles' => $access->vehicles,
            'uuid' => $access->uuid,
            'accessId' => $access->id
        ]);
    }

    public function show(string $uuid)
    {
        $access = Access::with(['building', 'booth', 'vehicles', 'tools', 'devices'])->firstWhere('uuid', $uuid);
        if (!$access) {
            return http_response_code(404);
        }

        $data = $access->toArray();
        $data["created_at"] = $access->created_at->format('d/F/Y');
        $data['vehicles_count'] = $access->vehicles->count();
        $data['tools_count'] = $access->tools->sum('quantity');
        $data['devices_count'] = $access->devices->sum('quantity');

        return Inertia::render('controlAccess/show', [
            "data" => $data, 
            "uuid" => $access->uuid, 
            'accessId' => $access->id, 
            'vehicles' => $access["vehicles"], 
            'tools' => $access["tools"], 
            'devices' => $access["devices"]
        ]);
    }


    public function store(AccessCreateRequest $request)
    {
        $newAccess = Access::create($request->all());
        return redirect()->route('access-control.create.vehicles', ['uuid' => $newAccess->uuid]);
    }

    public function exportPdfList (Request $request) {
        $checkIn = $request->get('check_in', "");
        $checkOut = $request->get('check_out', "");
        
        $accesses = Access::with(['userBy', 'vehicles'])
        ->dateCheckIn($checkIn, $checkOut)
        ->get()
        ->map(fn ($access) => [
            'name' => $access->name,
            'checkIn' => $access->created_at ? $access->created_at->format('d/m/Y, h:i a') : '---',
            'motive' => $access->motive,
            'authorizedBy' => $access->userBy->name,
            'checkOut' => $access->check_out ? $access->check_out->format('d/m/Y, h:i a') : '---',
            'vehicle' => $access->vehicles->count() > 0 ? $access->vehicles->pluck('plate')->join(', ') : '---',
        ]);
        $fileName = "control-de-acceso-" . date('ymdhis') . ".pdf";
        $pdf = Pdf::loadView('reports.access-control.list', [
            'accesses' => $accesses
        ])
            ->setPaper('legal', 'landscape');
        return $pdf->download($fileName);
    }

    public function exportExcelList (Request $request) {
        $fromDate = $request->get('check_in', "");
        $toDate = $request->get('check_out', "");
        $fileName = "control-de-acceso-" . date('ymdhis') . ".xlsx";

        return Excel::download(new ExportAccessControlList($fromDate, $toDate), $fileName);
    }

    public function exportPdfShow (string $uuid) {
        $access = Access::with([])->firstWhere('uuid', $uuid);
        if(!$access) {
            abort (404, 'No se encontró el registro');
        }

        $pdf = Pdf::loadView('reports.access-control.show', [
            'access' => $access
        ]);
        return $pdf->stream('control-de-acceso-' . $uuid . '.pdf');
    }
}