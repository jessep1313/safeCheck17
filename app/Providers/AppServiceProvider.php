<?php

namespace App\Providers;

use App\Models\Audit;
use App\Models\InspectForm;
use App\Models\Inspection;
use App\Models\Tour;
use App\Observers\AuditObserver;
use App\Observers\InspectFormObserver;
use App\Observers\InspectionObserver;
use App\Observers\TourObserver;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

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
        Inspection::observe(InspectionObserver::class);
        Audit::observe(AuditObserver::class);
        Tour::observe(TourObserver::class);

        Inertia::share([
            'csrf_token' => fn() => csrf_token()
        ]);
    }
}