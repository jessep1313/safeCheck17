<?php

namespace App\Http\Controllers;

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

    public function index()
    {
        return Inertia::render('inspect/list', []);
    }

    public function create()
    {
        return Inertia::render('inspect/create', []);
    }

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

}
