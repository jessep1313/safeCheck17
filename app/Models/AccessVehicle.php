<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccessVehicle extends Model
{
    protected $fillable = [
        'access_id',
        'plate',
        'model',
        'color',
    ];

    public function access() {
        return $this->belongsTo(Access::class);
    }
}
