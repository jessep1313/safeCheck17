<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewAccessVehicleRequest;
use App\Http\Requests\UpdateAccessVehicleRequest;
use App\Models\AccessVehicle;
use Illuminate\Http\Request;

class AccessVehicleController extends Controller
{
    public function store(NewAccessVehicleRequest $request, int $id) {
        AccessVehicle::create([
            'access_id' => $id,
            'plate' => $request->plate,
            'model' => $request->model,
            'color' => $request->color,
        ]);
        return redirect()->back();
    }

    public function update(UpdateAccessVehicleRequest $request, int $id) {
        $vehicle = AccessVehicle::findOrFail($id);
        $vehicle->update([
            'plate' => $request->plate,
            'model' => $request->model,
            'color' => $request->color,
        ]);

        return redirect()->back();
    }

    public function destroy(int $id) {
        AccessVehicle::findOrFail($id)->delete();
        return redirect()->back();
    }
}
