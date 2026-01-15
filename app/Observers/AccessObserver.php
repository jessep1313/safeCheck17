<?php

namespace App\Observers;

use App\Models\Access;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AccessObserver
{
    public function creating(Access $access): void
    {
        $access->uuid = Str::uuid();
        $access->user_by_id = Auth::user()->id;
    }

    /**
     * Handle the Access "updated" event.
     */
    public function updated(Access $access): void
    {
        //
    }

    /**
     * Handle the Access "deleted" event.
     */
    public function deleted(Access $access): void
    {
        //
    }

    /**
     * Handle the Access "restored" event.
     */
    public function restored(Access $access): void
    {
        //
    }

    /**
     * Handle the Access "force deleted" event.
     */
    public function forceDeleted(Access $access): void
    {
        //
    }
}
