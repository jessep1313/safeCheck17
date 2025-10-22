<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use App\Models\VehicleType;
use Illuminate\Http\Request;

class UtilsController extends Controller
{
    function vehicleTypesAvailables(string $certification_id)
    {
        $vehicles = VehicleType::availableByCertificate($certification_id)
            ->select(['id', 'name'])
            ->orderBy('name', 'asc')
            ->get();

        return response()->json($vehicles);
    }

    function vehicleTypeByCertificate(string $certification_id)
    {
        $vehicles = Certification::with('vehicleTypes')
            ->find($certification_id)
                ?->vehicleTypes()
                ?->get()
                ?->map(fn($type) => [
                'value' => $type->id,
                'label' => $type->name,
            ]);

        if ($vehicles) {
            return response()->json($vehicles);
        } else {
            return response()->json([]);
        }

    }
}