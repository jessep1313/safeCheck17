<?php

namespace App\Models;

use App\Enums\InspectionType;
use App\Enums\InspectStatus;
use App\Enums\Step;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Inspection extends Model
{
    protected $fillable = [
        'user_id',
        'certification_id',
        'vehicle_type_id',
        'driver_id',
        'guard_id',
        'inspect_form_id',
        'guard_name',
        'customer_name',
        'driver_name',
        'uuid',
        'trailer_quantity',
        'company_transport',
        'company_property',
        'type',
        'plate_number',
        'status',
        'current_step',
        'questions_init',
    ];

    protected $casts = [
        'type' => InspectionType::class,
        'current_step' => Step::class,
        'status' => InspectStatus::class,
        'questions_init' => 'boolean',
    ];

    // SECTION SCOPES
    
    public function scopeIncidences(Builder $query) {
        return $query->where('status', InspectStatus::Rejected);
    }

    public function scopeSearchValues(Builder $query, ?string $search)
    {
        if ($search) {
            return $query->where('plate_number', 'like', "%$search%");
        }

        return $query;
    }

    // !SECTION FIN SCOPES

    // SECTION RELATIONSHIPS

    // LINK Usuario que creó la inspección

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // LINK Certificación asociada a la inspección

    public function certification()
    {
        return $this->belongsTo(Certification::class);
    }

    // LINK Tipo de vehículo inspeccionado

    public function vehicleType()
    {
        return $this->belongsTo(VehicleType::class);
    }

    // LINK Conductor del vehículo inspeccionado

    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }

    // LINK Guardia que supervisó la inspección

    public function userGuard()
    {
        return $this->belongsTo(User::class, 'guard_id');
    }

    // LINK Formulario de inspección utilizado

    public function inspectForm()
    {
        return $this->belongsTo(InspectForm::class, 'inspect_form_id');
    }

    // LINK Información de las cajas de la unidad

    public function trailers()
    {
        return $this->hasMany(InspectionTrailer::class);
    }

    // LINK Puntos de inspección
    public function points()
    {
        return $this->hasMany(InspectionPoint::class);
    }

    // LINK Evidencias
    public function evidences()
    {
        return $this->hasMany(InspectionEvidence::class, 'inspection_id');
    }

    // !SECTION FIN RELATIONSHIPS

    // SECTION FUNCIONALIDADES

    // LINK Obtener punto con problema

    public function getProblemPoint(): ?InspectionPoint
    {
        if ($this->status === InspectStatus::Rejected) {
            return $this
                ->points()
                ?->where('result', 0)
                ->where('answered', true)
                ?->first() ?? null;
        } else {
            return null;
        }
    }

    // LINK Crear cuestionario

    public function createForm()
    {

        if ($this->points->count() > 0) {
            return;
        }

        $inspectForm = InspectForm::firstWhere(['certification_id' => $this->certification_id, 'vehicle_type_id' => $this->vehicle_type_id]);

        $this->inspect_form_id = $inspectForm->id;
        $this->save();

        $vehicleFieldIds = $inspectForm->fields()->vehicleLocation()->pluck('id')->all();
        $trailerFieldIds = $inspectForm->fields()->trailerLocation()->pluck('id')->all();
        $trailersCount = $this->trailer_quantity;
        $points = [];
        $numberPoint = 1;

        /** Agregar los puntos de inspección
         * Se deben tomar en cuenta la cantidad de remolques que tiene la inspección:
         * - trailer_quantity
         * - los puntos con location trailer se repetiran segun la cantidad de inspección
         * Los puntos del tracto (vehicle) solo se agregarán una vez
         */
        $pushPoints = function (array $fieldIds) use (&$points, &$numberPoint) {
            foreach ($fieldIds as $fieldId) {
                $points[] = [
                    'inspect_form_field_id' => $fieldId,
                    'number' => $numberPoint,
                    'evidence' => null,
                    'result' => false,
                    'answered' => false,
                    'comments' => null,
                ];
                $numberPoint++;
            }
        };

        // Puntos para unidad
        $pushPoints($vehicleFieldIds);

        // Puntos para trailer
        for ($i = 0; $i < $trailersCount; $i++) {
            $pushPoints($trailerFieldIds);
        }

        if (! empty($points)) {
            $this->points()->createMany($points);
        }

    }

    // !SECTION FIN DE FUNCIONALIDADES

}
