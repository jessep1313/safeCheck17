<?php

namespace App\Models;

use App\Enum\InspectFormFieldLocation;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class InspectFormField extends Model
{
    protected $fillable = [
        'inspect_form_id',
        'label',
        'description',
        'img_src',
        'location',
    ];

    protected $casts = [
        'location' => InspectFormFieldLocation::class,
    ];

    public function getImgSrcPublic()
    {
        if ($this->img_src) {
            return '/storage/'.$this->img_src;
        } else {
            return null;
        }
    }

    /** SECTION Ralaciones */

    // LINK formulario

    public function inspectForm()
    {
        return $this->belongsTo(InspectForm::class);
    }

    // LINK Punto de inspección

    public function inspectionPoint()
    {
        return $this->hasMany(InspectionPoint::class);
    }

    // !SECTION FIN RELACIONES

    // SECTION SCOPES

    public function scopeVehicleLocation(Builder $query)
    {
        return $query->where('location', InspectFormFieldLocation::VEHICLE);
    }

    public function scopeTrailerLocation(Builder $query)
    {
        return $query->where('location', InspectFormFieldLocation::BOX);
    }

    // !SECTION FIN SCOPES
}
