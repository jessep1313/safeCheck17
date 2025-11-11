<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionPoint extends Model
{
    protected $fillable = [
        'inspect_form_field_id',
        'number',
        'evidence',
        'result',
        'answered',
        'comments',
    ];

    protected $casts = [
        'number' => 'integer',
        'result' => 'boolean',
        'answered' => 'boolean',
    ];

    // SECTION RELATIONSHIPS

    // LINK Inspección a la que pertenece

    public function inspection()
    {
        return $this->belongsTo(Inspection::class);
    }

    public function field()
    {
        return $this->belongsTo(InspectFormField::class, 'inspect_form_field_id');
    }

    // !SECTION FIN RELATIONSHIPS

}
