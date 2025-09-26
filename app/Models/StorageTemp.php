<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StorageTemp extends Model
{
    protected $fillable = [
        "key",
        "path",
        "filename",
        "original_filename",
        "mime_type",
        "file_size",
        "destroy_at",
    ];

    protected $casts = [
        "destroy_at" => "timestamp"
    ];
}
