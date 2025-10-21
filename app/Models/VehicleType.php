<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class VehicleType extends Model
{
    protected $fillable = [
        'name'
    ];

    /** SECTION Scopes */

    public function scopeAvailableByCertificate(Builder $query, $certification_id)
    {
        return $query
            ->whereDoesntHave(
                'certifications',
                fn($query) => $query
                    ->where('certification_id', $certification_id)
            );
    }

    /** !SECTION */


    /** SECTION Relaciones */

    public function inspectForm()
    {
        return $this->hasMany(InspectForm::class);
    }

    public function certifications()
    {
        return $this->belongsToMany(Certification::class, 'inspect_forms');
    }

    public function inspections()
    {
        return $this->hasMany(Inspection::class);
    }

    /** !SECTION */
}