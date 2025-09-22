<?php

namespace App\Providers;

use App\Models\InspectForm;
use App\Observers\InspectFormObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        InspectForm::observe(InspectFormObserver::class);
    }
}
