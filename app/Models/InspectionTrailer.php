<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionTrailer extends Model
{
    protected $fillable = [
        'inspection_id',
        'vin',
        'plate',
        'seal',
    ];

    // SECTION RELATIONSHIPS

    // LINK Inspección asociada al tráiler

    public function inspection()
    {
        return $this->belongsTo(Inspection::class);
    }

    // !SECTION FIN RELATIONSHIPS
}