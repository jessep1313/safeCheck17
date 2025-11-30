<?php

namespace App\Models;

use App\Enum\InspectFormFieldLocation;
use Illuminate\Database\Eloquent\Builder;
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

    // SECTION SCOPES

    // LINK Vehicle Points

    public function scopeVehiclePoints (Builder $query) {
        return $query->whereHas('field', function ($q) {
            $q->where('location', InspectFormFieldLocation::VEHICLE)->orWhere('location', InspectFormFieldLocation::ALL);
        });
    }

    // LINK Trailer Points

    public function scopeTrailerPoints (Builder $query) {
        return $query->whereHas('field', function ($q) {
            $q->where('location', InspectFormFieldLocation::BOX);
        });
    }

    // !SECTION FIN SCOPES

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
