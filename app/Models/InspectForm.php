<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectForm extends Model
{
    protected $fillable = [
        'vehicle_type_id',
        'certification_id',
        'status',
        'folio'
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

    /** !SECTION */
}
