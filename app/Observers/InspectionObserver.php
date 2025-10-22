<?php

namespace App\Observers;

use App\Models\Inspection;
use Illuminate\Support\Facades\Auth;

class InspectionObserver
{
    /**
     * Handle the Inspection "creating" event.
     */
    public function creating(Inspection $inspection): void
    {
        $inspection->user_id = Auth::id();
    }

    /**
     * Handle the Inspection "updated" event.
     */
    public function updated(Inspection $inspection): void
    {
        //
    }

    /**
     * Handle the Inspection "deleted" event.
     */
    public function deleted(Inspection $inspection): void
    {
        //
    }

    /**
     * Handle the Inspection "restored" event.
     */
    public function restored(Inspection $inspection): void
    {
        //
    }

    /**
     * Handle the Inspection "force deleted" event.
     */
    public function forceDeleted(Inspection $inspection): void
    {
        //
    }
}