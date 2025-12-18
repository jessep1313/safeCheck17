<?php

namespace App\Http\Controllers;

use App\Enums\InspectStatus;
use App\Http\Requests\TourIncidenceRequest;
use App\Http\Requests\TourStoreRequest;
use App\Models\Tour;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TourController extends Controller
{

    // SECTION Views

    // LINK - Home

    function index(request $request)
    {
        $currentPage = $request->input('page', 1);
        $perPage = $request->input('per_page', 15);
        $sort = $request->input('sort', 'desc');
        $sortBy = $request->input('sort_by', 'created_at');
        $search = $request->input('search', '');

        $paginator = Tour::with('responsed', 'createdBy', 'evidences')
            ->orderBy($sortBy, $sort)
            ->paginate(page: $currentPage, perPage: $perPage)
            ->withQueryString()
            ->through(fn($row) => [
                'id' => $row->id,
                'uuid' => $row->uuid,
                'status' => $row->status,
                'responsed' => $row->responsed->name,
                'responsed_id' => $row->responsed->id,
                'created_by' => $row->createdBy->name,
                'created_by_id' => $row->createdBy->id,
                'comments' => $row->comments,
                'duration' => $row->duration,
                'evidences' => $row->status === InspectStatus::Rejected
                    ? $row->evidences->pluck('path') : [],
                'created_at' => $row->created_at->format('d/m/Y H:i a'),
                'finished_at' => $row->finished_at ? $row->finished_at->format('d/m/Y H:i a') : "No finalizado",
            ]);

        return Inertia::render("tours/home", [
            "paginator" => $paginator,
            "filter" => [
                "per_page" => $perPage,
                "page" => $currentPage,
                "sort" => $sort,
                "sort_by" => $sortBy,
                "search" => $search
            ],
        ]);
    }

    // LINK - Inicializado

    function initialize() {
        $users = User::select('id', 'name')
            ->get()
            ->map(fn($user) => ['label' => $user->name, 'value' => $user->id]);
        return Inertia::render("tours/initialize", [
            'users' => $users,
        ]);
    }

    // LINK - Timer

    public function timer(string $uuid)
    {
        return Inertia::render('tours/timer', [
            'uuid' => $uuid
        ]);
    }

    // LINK - Comentario

    public function comment(string $uuid)
    {
        $tour = Tour::firstWhere('uuid', $uuid);
        if (!$tour) {
            return http_response_code(404);
        }
        if (!$tour->comments && $tour->duration) {
            return Inertia::render('tours/comment', [
                'uuid' => $uuid
            ]);
        } else {
            return redirect()->route('tours.home');
        }
    }

    public function evidences(string $uuid)
    {
        $tour = Tour::firstWhere('uuid', $uuid);

        if (!$tour) {
            return http_response_code(404);
        }

        return Inertia::render('tours/evidences', [
            'uuid' => $uuid
        ]);
    }

    // !SECTION

    // LINK - Store

    public function store(TourStoreRequest $request)
    {
        $tour = Tour::create([
            'uuid' => Str::uuid(),
            'responsed_id' => $request->responsed_id,
            'status' => InspectStatus::Pending,
        ]);

        return redirect()->route('tours.timer', ['uuid' => $tour->uuid]);
    }

    // LINK incidence

    public function incidence(string $uuid)
    {
        $tour = Tour::firstWhere('uuid', $uuid);
        if (!$tour) {
            return http_response_code(404);
        }

        try {
            $this->setTime($uuid);
            $tour->status = InspectStatus::Rejected;
            $tour->finished_at = Carbon::now();
            $tour->save();
            return redirect()->route('tours.comment', ['uuid' => $uuid]);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    // LINK - Save Comment

    public function saveComment(TourIncidenceRequest $request, string $uuid)
    {
        $tour = Tour::firstWhere('uuid', $uuid);
        if (!$tour) {
            return http_response_code(404);
        }
        try {
            $tour->comments = $request->comment;
            $tour->save();
            return redirect()->route('tours.evidences', ['uuid' => $uuid]);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function saveEvidence(Request $request, string $uuid)
    {
        if (!$request->hasFile('files')) {
            return back()->withErrors(['files' => 'No hay archivos']);
        }

        $request->validate([
            'files' => 'required|array|min:1',
            'files.*' => 'required|file|image|mimes:jpeg,png,jpg|max:20480',
        ]);

        $tour = Tour::firstWhere('uuid', $uuid);

        // Usa $request->file('files') en lugar de $request->files
        foreach ($request->file('files') as $file) {
            if (!$file->isValid()) {
                continue;
            }

            // Usa getClientOriginalExtension()
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('evidences', $filename, 'public');
            $tour->evidences()->create([
                'path' => $path,
            ]);
        }

        return redirect()->route('tours.home');
    }

    // LINK - finish

    public function finish($uuid)
    {
        $tour = Tour::firstWhere('uuid', $uuid);
        if (!$tour) {
            return http_response_code(404);
        }
        try {
            $this->setTime($uuid);
            $tour->finished_at = now();
            $tour->status = InspectStatus::Approved;
            $tour->save();
            return redirect()->route('tours.home');
        } catch (\Exception $e) {
            throw $e;
        }
    }

    // LINK Time

    private function setTime($uuid)
    {
        $tour = Tour::firstWhere('uuid', $uuid);
        try {
            $tour->created_at = Carbon::parse($tour->created_at);

            $totalSeconds = $tour->created_at->diffInSeconds(Carbon::now());

            $hours = floor($totalSeconds / 3600);
            $minutes = floor(($totalSeconds % 3600) / 60);
            $seconds = $totalSeconds % 60;

            $elapsedTime = sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);

            $tour->duration = $elapsedTime;
            $tour->save();

            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }

}
