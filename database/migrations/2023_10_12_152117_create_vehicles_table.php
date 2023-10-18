<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->boolean('walk_available'); 
            $table->boolean('bicycle_available'); 
            $table->boolean('car_available'); 
            $table->boolean('bus_available'); 
            $table->boolean('train_available'); 
            $table->boolean('shinkansen_available'); 
            $table->boolean('plane_available'); 
            $table->boolean('ship_available'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vehicles');
    }
};
