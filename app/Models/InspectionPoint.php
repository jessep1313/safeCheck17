<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionPoint extends Model
{
    protected $fillable = [
        'inspect_form_field_id',
        'evidence',
        'result',
        'answered',
        'comments',
    ];

    // SECTION RELATIONSHIPS

    // LINK Inspección a la que pertenece

    public function inspection()
    {
        return $this->belongsTo(Inspection::class);
    }

    // !SECTION FIN RELATIONSHIPS


}