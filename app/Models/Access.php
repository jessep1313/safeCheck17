<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Access extends Model
{
    protected $fillable = [
        'user_by_id',
        'building_id',
        'booth_id',
        'uuid',
        'who_visits',
        'identification',
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

    public function scopeDateCheckIn(Builder $query, ?string $check_in = "", ?string $check_out = "")
    {
        $checkIn = !empty(trim($check_in)) ? trim($check_in) : null;
        $checkOut = !empty(trim($check_out)) ? trim($check_out) : null;

        if ($checkIn && $checkOut) {
            $query->whereBetween('created_at', [
                Carbon::parse($checkIn)->startOfDay(),
                Carbon::parse($checkOut)->endOfDay()
            ]);
        } else if ($checkIn) {
            $query->where('created_at', '>=', Carbon::parse($checkIn)->startOfDay());
        } else if ($checkOut) {
            $query->where('created_at', '<=', Carbon::parse($checkOut)->endOfDay());
        }
    }

    public function userBy () {
        return $this->belongsTo(User::class, 'user_by_id');;
    }

    public function building() {
        return $this->belongsTo(Building::class);
    }

    public function booth () {
        return $this->belongsTo(Booth::class);
    }

    public function vehicles() {
        return $this->hasMany(AccessVehicle::class);
    }

    public function tools () {
        return $this->hasMany(AccessTool::class);
    }

    public function devices () {
        return $this->hasMany(AccessDevice::class);
    }
}
