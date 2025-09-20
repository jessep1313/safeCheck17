<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FormController extends Controller
{
    public function index() {
        return Inertia::render('form/home');
    }

    public function create() {
        return Inertia::render('form/create');
    }
}
