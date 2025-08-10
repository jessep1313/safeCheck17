<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SessionController extends Controller
{
    public function index() {
        $currentSessionId = request()->session()->getId();
        $sessions = DB::table('sessions')
            ->select('id', 'ip_address', 'user_agent', 'last_activity')
            ->where('user_id', Auth::id())
            ->orderBy('last_activity', 'DESC')
            ->get()
            ->map(function ($session) use($currentSessionId) {
                $session->last_activity_human = Carbon::createFromTimestamp($session->last_activity)->diffForHumans();
                $session->is_current = $session->id === $currentSessionId;
                return $session;
            });
        return Inertia::render('settings/sessions', [
            'sessions' => $sessions
        ]);
    }

    public function destroy (string $id) {
        DB::table('sessions')
            ->where('id', $id)
            ->where('user_id', Auth::id())
            ->delete();

        return to_route('sessions.index');
    }
}
