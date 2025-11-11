<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionEvidence extends Model
{
    protected $fillable = ['path'];

    public function inspection()
    {
        return $this->belongsTo(Inspection::class, 'inspection_id');
    }
}
