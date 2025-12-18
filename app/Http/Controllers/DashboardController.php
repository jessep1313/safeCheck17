<?php

namespace App\Http\Controllers;

use App\Models\Inspection;
use App\Models\Tour;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{

    // LINK View Dashboard

    public function index () {
        $inpsectionAllCount = $this->formatNumber(Inspection::count() ?? 0);
        $toursAllCount = $this->formatNumber(Tour::count() ?? 0);
        $accessCurrentDay = $this->formatNumber(0);

        $chartTourData = [
            ["category" => "notIncidence", "quantity" => Tour::notIncidences()->count() ?? 0, "fill" => "var(--color-chart-2)"],
            ["category" => "incidence", "quantity" => Tour::incidences()->count() ?? 0, "fill" => "var(--color-chart-5)"],
        ];

        $chartInspectionStatusData = [
            ["category" => "notIncidence", "quantity" => Inspection::notIncidences()->count() ?? 0, "fill" => "var(--color-chart-2)"],
            ["category" => "incidence", "quantity" => Inspection::incidences()->count() ?? 0, "fill" => "var(--color-chart-5)"],
        ];
        $chartInspectionTypeData = [
            ["category" => "entries", "quantity" => Inspection::entries()->count() ?? 0, "fill" => "var(--color-chart-1)"],
            ["category" => "outputs", "quantity" => Inspection::outputs()->count() ?? 0, "fill" => "var(--color-chart-3)"],
        ];

        return Inertia::render('dashboard', [
            'inspections' => $inpsectionAllCount,
            'tours' => $toursAllCount,
            'access' => $accessCurrentDay,
            'chartTourData' => $chartTourData,
            'chartInspectionStatusData' => $chartInspectionStatusData,
            'chartInspectionTypeData' => $chartInspectionTypeData
        ]);
    }

    // LINK Format Number

    private function formatNumber($number)
    {
        if ($number < 10) {
            return "0$number";
        }
        return number_format($number, '0', '.', ',');
    }
}
