<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewAccessToolRequest;
use App\Http\Requests\UpdateAccessToolRequest;
use App\Models\AccessTool;

class AccessToolController extends Controller
{
    /**
     * Guarda el registro de una herramienta en el acceso de control
     * @param string $id: Id del acceso
     */
    public function store (NewAccessToolRequest $request, string $id) {
        $data = $request->validated();
        $data['access_id'] = $id;
        AccessTool::create($data);

        return redirect()->back();
    }

    /**
     * Actualiza la información de la herramienta
     * @param string $id: Id de la herramienta
     */
    public function update (UpdateAccessToolRequest $request, string $id) {
        $tool = AccessTool::findOrFail($id);
        $tool->update($request->all());

        return redirect()->back();
    }

    /**
     * Elimina la herramienta
     * @param string $id: Id de la herramienta
     */
    public function destroy (string $id) {
        $tool = AccessTool::findOrFail($id);
        $tool->delete();

        return redirect()->back();
    }
}
