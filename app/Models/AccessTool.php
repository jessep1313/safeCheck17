<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccessTool extends Model
{
    protected $fillable = [
        'access_id',
        'type',
        'brand',
        'model',
        'quantity',
    ];

    public function access()
    {
        return $this->belongsTo(Access::class);
    }
    
}
