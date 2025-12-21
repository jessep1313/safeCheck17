<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TourQuestion extends Model
{
    protected $fillable = [
        "tour_id",
        "question",
        "position",
        "result",
        "answered",
        "comments"
    ];

    protected $casts = [
        "answered" => "boolean",
        "result" => "boolean"
    ];

    public function Tour () {
        return $this->belongsTo(Tour::class);
    }
}
