<?php

namespace App\Http\Controllers;

use App\Http\Requests\TourStoreRequest;
use App\Models\Tour;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TourController extends Controller
{
    function index() {
        return Inertia::render("tours/home");
    }

    function initialize() {
        $users = User::select('id', 'name')->get()->map(fn ($user) => ['label'=> $user->name, 'value' => $user->id]);
        return Inertia::render("tours/initialize", [
            'users' => $users,
        ]);
    }


    function store(TourStoreRequest $request) {
        $tour = Tour::create($request->all());
        dd($tour);
    }
}
