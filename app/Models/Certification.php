<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    protected $fillable = [
        'name'
    ];

    public function inspectForms()
    {
        return $this->belongsTo(InspectForm::class);
    }
}
