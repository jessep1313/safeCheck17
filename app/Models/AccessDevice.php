<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccessDevice extends Model
{
    protected $fillable = [
        'access_id',
        'type',
        'brand',
        'model',
        'quantity',
    ];

    protected $casts = [
        'quantity' => 'integer',
    ];

    public function access()
    {
        return $this->belongsTo(Access::class);
    }
}
