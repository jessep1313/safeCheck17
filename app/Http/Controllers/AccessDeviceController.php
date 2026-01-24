<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewAccessDeviceRequest;
use App\Http\Requests\UpdateAccessDeviceRequest;
use App\Models\Access;
use App\Models\AccessDevice;
use Illuminate\Http\Request;

class AccessDeviceController extends Controller
{
    /**
     * Guardar los dispositivos dentro del acceso
     * @param string $id: ID del acceso
     */
    public function store (NewAccessDeviceRequest $request, string $id) {
        $access = Access::findOrFail($id);
        $access->devices()->create($request->validated());
        return redirect()->back();
    }

    /**
     * Actualizar los dispositivos dentro del acceso
     * @param string $id: ID del device
     */
    public function update (UpdateAccessDeviceRequest $request, string $id) {
        AccessDevice::findOrFail($id)->update($request->all());
        return redirect()->back();
    }

    /**
     * Eliminar el dispositivo
     * @param string $id: ID del device
     */
    public function destroy (string $id) {
        AccessDevice::findOrFail($id)->delete();
        return redirect()->back();
    }
}
