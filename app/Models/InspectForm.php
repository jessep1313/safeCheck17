<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class InspectForm extends Model
{
    protected $fillable = [
        'vehicle_type_id',
        'certification_id',
        'status',
        'preload_fields',
        'folio',
    ];

    /** SECTION Relaciones */

    // LINK Fields

    public function fields()
    {
        return $this->hasMany(InspectFormField::class);
    }

    // LINK certificado

    public function certificate()
    {
        return $this->belongsTo(Certification::class, 'certification_id');
    }

    // LINK tipo de vehiculo

    public function vehicleType()
    {
        return $this->belongsTo(VehicleType::class, 'vehicle_type_id');
    }

    // LINK Inspecciones realizadas

    public function inspections()
    {
        return $this->hasMany(Inspection::class, 'inspect_form_id');
    }

    /** !SECTION */

    /** SECTION Scopes */
    public function scopeSearchValues(Builder $query, ?string $search = '')
    {
        $search ??= '';

        return $query->whereLike('folio', "%$search%");
    }

    /** !SECTION */
}
