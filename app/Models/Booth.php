<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booth extends Model
{
    protected $fillable = [
        "name"
    ];

    public function accesses() {
        return $this->hasMany(Access::class);
    }
}
