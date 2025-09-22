<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectFormField extends Model
{
    protected $fillable = [
        'inspect_form_id',
        'label',
        'description',
        'img_src'
    ];

    /** SECTION Ralaciones */

    // LINK formulario

    public function inspectForm()
    {
        return $this->belongsTo(InspectForm::class);
    }
}
