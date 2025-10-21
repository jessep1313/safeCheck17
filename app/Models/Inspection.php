<?php

namespace App\Models;

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
        'uuid',
        'trailer_quantity',
        'company_transport',
        'company_property',
        'type',
        'plate_number',
        'status',
    ];

    // SECTION SCOPES

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

    public function points()
    {
        return $this->hasMany(InspectionPoint::class);
    }

    // !SECTION FIN RELATIONSHIPS
}