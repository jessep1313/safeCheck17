<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    protected $fillable = [
        'name'
    ];

    public function scopeSearchValues(Builder $query, ?string $search = "")
    {
        $search ??= "";
        return $query->whereLike('name', "%$search%");
    }

    /** SECTION Relaciones */

    public function inspectForms()
    {
        return $this->belongsTo(InspectForm::class);
    }

    public function vehicleTypes()
    {
        return $this->belongsToMany(VehicleType::class, 'inspect_forms');
    }

    // !SECTION
}