<?php

namespace App\Models;

use Attribute;
use Illuminate\Database\Eloquent\Model;

class TourEvidence extends Model
{
    protected $table = "tour_evidences";
    protected $fillable = [
        'tour_id',
        'path'
    ];

    public function tour() {
        return $this->belongsTo(Tour::class);
    }

    public function fullpath ():Attribute {
        return "/storage" . $this->path;
    }
}