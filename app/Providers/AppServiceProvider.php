<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Library\Recommend;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
        $this->app->bind('recommend', function () {
            return new Recommend();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        \URL::forceScheme("https");
    }
}
