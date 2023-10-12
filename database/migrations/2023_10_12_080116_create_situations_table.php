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
        Schema::create('situations', function (Blueprint $table) {
            $table->id();
            $table->string('start_point', 80);
            $table->string('goal_point', 80);
            $table->integer('weather_before_id');
            $table->integer('weather_after_id');
            $table->boolean('is_running'); 
            // $table->foreignId('weather_before_id ')->constrained("weathers");
            // $table->foreignId('weather_after_id')->constrained("weathers");
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
        Schema::dropIfExists('situations');
    }
};
