<?php

namespace App\Http\Controllers;

use App\Enums\AuditType;
use App\Models\Audit;
use App\Models\AuditReportView;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuditController extends Controller
{

    public function index(Request $request)
    {
        $perPage = $request->get("per_page", 10);
        $page = $request->get("page", 1);
        $sortBy = $request->get("sort_by", "created_at");
        $sort = $request->get("sort", "desc");
        $search = $request->get("search", "");

        $audits = AuditReportView::orderBy($sortBy, $sort)
            ->searchValue($search)
            ->paginate(page: $page, perPage: $perPage)
            ->withQueryString();

        return Inertia::render('audit/home', [
            "paginator" => $audits,
            "filter" => [
                "per_page" => $perPage,
                "page" => $page,
                "search" => $search,
                "sort_by" => $sortBy,
                "sort" => $sort
            ]
        ]);
    }

    public function storeInspection () {
        Audit::create([
            'type' => AuditType::INSPECTION,
        ]);
        return redirect()->route('audit.home');
    }
}
