<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AccessControlController extends Controller
{
    public function index()
    {
        return Inertia::render('controlAccess/home');
    }
}