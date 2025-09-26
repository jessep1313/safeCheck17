<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    protected $fillable = [
        'name'
    ];

    /** SECTION Relaciones */

    public function inspectForms()
    {
        return $this->belongsTo(InspectForm::class);
    }

    public function vehicleTypes () {
        return $this->belongsToMany(VehicleType::class, 'inspect_forms');
    }

    // !SECTION
}
