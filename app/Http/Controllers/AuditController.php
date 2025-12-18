<?php

namespace App\Http\Controllers;

use App\Enums\AuditInspectionStatus;
use App\Enums\AuditType;
use App\Models\Audit;
use App\Models\AuditInspection;
use App\Models\AuditInspectionQuestion;
use App\Models\AuditReportView;
use App\Models\Inspection;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuditController extends Controller
{

    // SECTION Views

    // LINK Index
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
            ->withQueryString()
            ->through(fn($audit) => [
                ...$audit->toArray(),
                'created_at' => Carbon::parse($audit->created_at)->format('d/m/Y, h:i a'),
                'updated_at' => Carbon::parse($audit->created_at)->format('d/m/Y, h:i a'),
            ]);

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

    // LINK Auditar inspeccion

    public function inspectionQuestion(string $uuid)
    {
        $audit = AuditInspection::with('inspection')->firstWhere('uuid', $uuid);
        $question = AuditInspectionQuestion::latest()
            ->where('audit_inspection_id', $audit->id)
            ->where('answared', false)
            ->first();

        return Inertia::render('audit/inspection/question', [
            'question' => $question,
            'audit' => $audit,
            'inspectionUuid' => $audit->inspection->uuid
        ]);
    }

    // !SECTION

    // SECTION Actions

    // LINK Store Inspect Question

    public function storeInspectQuestion(string $id, bool $value)
    {
        $question = AuditInspectionQuestion::with('auditInspection')
            ->where('answared', false)
            ->findOrFail($id);

        $countQuestions = $question->auditInspection()->first()->questions()->count();
        $countAnswed = $question->auditInspection()->first()->questions()->answed()->count();
        $isLastQuestion = ($countQuestions - 1) === $countAnswed;

        $question->result = $value;
        $question->answared = true;
        $question->save();

        if ($isLastQuestion) {
            $audit = $question->auditInspection()->first();
            $audit->status = AuditInspectionStatus::FINISHED;
            $audit->save();
            return redirect()->route('audit.home');
        }

        return redirect()->route('audit.inspection.question', ['uuid' => $question->auditInspection->uuid]);
    }

    // LINK Store Inspect

    public function storeInspection () {
        Audit::create([
            'type' => AuditType::INSPECTION,
        ]);
        return redirect()->route('audit.home');
    }

    // NOTE Store Round
    public function storeRounds()
    {
    }

    // !SECTION

    // SECTION Reports Download

    // LINK Download PDF
    public function exportAuditInspection(string $id)
    {
        $audit = AuditInspection::with('questions')->findOrFail($id);
        $inspection = Inspection::with(['trailers'])
            ->findOrFail($audit->inspection_id);

        $pdf = Pdf::loadView('reports.audit-inspection', compact('inspection', 'audit'));
        return $pdf->stream("audit-{$audit->uuid}.pdf");
    }

    // !SECTION

}
