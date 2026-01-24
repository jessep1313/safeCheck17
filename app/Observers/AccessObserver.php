<?php

namespace App\Observers;

use App\Models\Access;
use App\Models\StorageTemp;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AccessObserver
{
    public function creating(Access $access): void
    {
        $access->uuid = Str::uuid();
        $access->user_by_id = Auth::user()->id;
        $access->identification = $this->moveFileToFolder($access);
    }

    private function moveFileToFolder(Access $access): string {
        $storageTemp = StorageTemp::where('filename', $access->identification)->first();
        $newPath = 'access/' . $access->uuid . '/' . $storageTemp->filename;
        if(!Storage::disk('public')->directoryExists('access')) {
            Storage::disk('public')->makeDirectory('access');
        }
        $tempPath = '/temp/' . $storageTemp->filename;
        $result = Storage::disk('public')->move($tempPath, $newPath);
        if($result) {
            $storageTemp->delete();
            return $newPath;
        }
        return '';
    }
}
