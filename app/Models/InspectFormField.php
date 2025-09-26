<?php

namespace App\Models;

use App\Enum\InspectFormFieldLocation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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
        'location' => InspectFormFieldLocation::class
    ];

    public function getImgSrcPublic() {
        if($this->img_src) {
            return "/storage/" . $this->img_src;
        }else{
            return null;
        }
    }

    /** SECTION Ralaciones */

    // LINK formulario

    public function inspectForm()
    {
        return $this->belongsTo(InspectForm::class);
    }
}
