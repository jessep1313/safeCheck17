<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Access extends Model
{
    protected $fillable = [
        'user_by_id',
        'building_id',
        'booth_id',
        'uuid',
        'name',
        'contractor',
        'type',
        'motive',
        'finish',
        'expires',
        'check_out',
        'check_in'
    ];

    protected $casts = [
        'expires' => 'datetime',
        'check_out' => 'datetime',
        'check_in' => 'datetime',
        'finish' => 'boolean'
    ];

    public function userBy () {
        return $this->belongsTo(User::class, 'user_by_id');;
    }

    public function building() {
        return $this->belongsTo(Building::class);
    }

    public function booth () {
        return $this->belongsTo(Booth::class);
    }
}
