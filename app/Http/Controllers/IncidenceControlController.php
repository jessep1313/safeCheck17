<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class IncidenceControlController extends Controller
{
    public function index()
    {
        return Inertia::render('controlIncidences/home');
    }
}